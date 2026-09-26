// Lightweight browser-side content store for the gallery and news/events.
// Images and posters are stored as data URLs in localStorage under the
// keys below, so the admin can upload/delete/organise without a rebuild.
//
// This is intentionally simple — the site loads in any browser, and when
// the school is ready to migrate to a shared backend (Lovable Cloud
// storage), the same shape can be pointed at a remote store.

import { useEffect, useState } from "react";

export type Photo = {
  id: string;
  src: string;      // data URL or remote URL
  caption?: string;
  album?: string;
  createdAt: number;
};

export type NewsItem = {
  id: string;
  kind: "news" | "event";
  title: string;
  summary: string;
  date: string;       // ISO or free text
  cover?: string;     // data URL
  createdAt: number;
};

const K_PHOTOS = "mjs.photos.v1";
const K_NEWS = "mjs.news.v1";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
}

function write<T>(key: string, value: T) {
  try { window.localStorage.setItem(key, JSON.stringify(value)); }
  catch (err) { console.error("Storage write failed", err); }
  window.dispatchEvent(new CustomEvent("mjs:store", { detail: key }));
}

function useStore<T>(key: string, fallback: T): [T, (next: T) => void] {
  const [value, setValue] = useState<T>(() => read(key, fallback));
  useEffect(() => {
    const onChange = (e: Event) => {
      if ((e as CustomEvent).detail === key || (e as StorageEvent).key === key) {
        setValue(read(key, fallback));
      }
    };
    window.addEventListener("mjs:store", onChange as EventListener);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("mjs:store", onChange as EventListener);
      window.removeEventListener("storage", onChange);
    };
  }, [key]);
  const set = (next: T) => { write(key, next); setValue(next); };
  return [value, set];
}

export function usePhotos() {
  const [photos, setPhotos] = useStore<Photo[]>(K_PHOTOS, []);
  return {
    photos,
    add: (p: Omit<Photo, "id" | "createdAt">) =>
      setPhotos([{ id: crypto.randomUUID(), createdAt: Date.now(), ...p }, ...photos]),
    remove: (id: string) => setPhotos(photos.filter(p => p.id !== id)),
    update: (id: string, patch: Partial<Photo>) =>
      setPhotos(photos.map(p => p.id === id ? { ...p, ...patch } : p)),
    clear: () => setPhotos([]),
  };
}

export function useNews() {
  const [items, setItems] = useStore<NewsItem[]>(K_NEWS, []);
  return {
    items,
    add: (n: Omit<NewsItem, "id" | "createdAt">) =>
      setItems([{ id: crypto.randomUUID(), createdAt: Date.now(), ...n }, ...items]),
    remove: (id: string) => setItems(items.filter(n => n.id !== id)),
    update: (id: string, patch: Partial<NewsItem>) =>
      setItems(items.map(n => n.id === id ? { ...n, ...patch } : n)),
    clear: () => setItems([]),
  };
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Built-in (seeded) items the admin has chosen to hide from the public site.
const K_HIDDEN = "mjs.hidden.v1";
export function useHidden() {
  const [ids, setIds] = useStore<string[]>(K_HIDDEN, []);
  return {
    ids,
    isHidden: (id: string) => ids.includes(id),
    hide: (id: string) => setIds([...ids.filter(i => i !== id), id]),
    show: (id: string) => setIds(ids.filter(i => i !== id)),
  };
}

export type BlogPost = {
  id: string;
  title: string;
  body: string;
  date: string;
  image?: string;   // data URL
  video?: string;   // YouTube link, video URL, or small uploaded video (data URL)
  createdAt: number;
};
const K_BLOG = "mjs.blog.v1";
export function useBlog() {
  const [posts, setPosts] = useStore<BlogPost[]>(K_BLOG, []);
  return {
    posts,
    add: (b: Omit<BlogPost, "id" | "createdAt">) =>
      setPosts([{ id: crypto.randomUUID(), createdAt: Date.now(), ...b }, ...posts]),
    remove: (id: string) => setPosts(posts.filter(p => p.id !== id)),
    update: (id: string, patch: Partial<BlogPost>) =>
      setPosts(posts.map(p => p.id === id ? { ...p, ...patch } : p)),
  };
}

export function youtubeEmbed(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}
