import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { isAdmin, unlockAdmin, lockAdmin } from "../lib/admin";
import { usePhotos, useNews, useBlog, useHidden, fileToDataUrl, type NewsItem, type BlogPost } from "../lib/store";
import { seedNews } from "../lib/seed-news";
import { seedPhotos } from "../lib/seed-gallery";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Staff · Mayflower" }, { name: "robots", content: "noindex" }] }),
  component: Admin,
});

function Admin() {
  const [unlocked, setUnlocked] = useState(isAdmin());
  const [key, setKey] = useState("");
  const [err, setErr] = useState(false);
  const [tab, setTab] = useState<"gallery" | "news" | "blog">("gallery");

  if (!unlocked) {
    return (
      <section className="section min-h-[70vh] flex items-center">
        <div className="container-page max-w-md">
          <p className="eyebrow">Staff area</p>
          <h1 className="serif text-4xl mt-3">Enter your key.</h1>
          <p className="mt-3 text-sm text-muted-foreground">This area is reserved for the school office.</p>
          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (unlockAdmin(key)) { setUnlocked(true); setErr(false); }
              else { setErr(true); }
            }}
          >
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Key"
              className="w-full bg-transparent border-b border-border py-3 text-forest focus:outline-none focus:border-forest"
              autoFocus
            />
            {err && <p className="text-xs text-destructive">That key was not recognised.</p>}
            <button className="btn-primary" type="submit">Unlock</button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="section admin-shell">
      <div className="container-page max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Staff console</p>
            <h1 className="serif text-3xl md:text-4xl mt-2">Manage the website.</h1>
            <p className="mt-2 text-sm text-forest/70">
              Anything you add here appears on the public site straight away.
            </p>
          </div>
          <button className="btn-ghost" onClick={() => { lockAdmin(); setUnlocked(false); }}>Lock</button>
        </div>

        <div className="mt-8 flex gap-2 border-b border-border">
          {([
            ["gallery", "Photos"],
            ["news", "News & Events"],
            ["blog", "Blog"],
          ] as const).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-5 py-3 text-sm tracking-wider uppercase transition border-b-2 -mb-px ${tab === k ? "border-forest text-forest" : "border-transparent text-forest/50 hover:text-forest"}`}
            >{label}</button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "gallery" ? <GalleryAdmin /> : tab === "news" ? <NewsAdmin /> : <BlogAdmin />}
        </div>
      </div>

      {/* The admin console is a working surface: no drifting petals, no
          entrance animations, no watermark — everything stays put. */}
      <style>{`
        .admin-shell { position: relative; z-index: 2; background: var(--warm, #f6f4ec); }
        .admin-shell * { animation: none !important; }
        .admin-input {
          width: 100%;
          background: transparent;
          border-bottom: 1px solid var(--border);
          padding: 0.55rem 0;
          color: var(--forest);
          font-size: 1rem;
        }
        .admin-input:focus { outline: none; border-color: var(--forest); }
        .admin-select {
          width: 100%;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 0.6rem;
          padding: 0.6rem 0.75rem;
          color: var(--forest);
        }
        .admin-select:focus { outline: none; border-color: var(--forest); }
      `}</style>
    </section>
  );
}

/* ───────────── Photos ───────────── */

const BASE_ALBUMS = [
  "Campus", "Renovated Classes", "Admin Block", "ICT Centre",
  "Library", "E-Library", "The Garden", "Assembly", "Events", "People",
];

function GalleryAdmin() {
  const { photos, add, remove, update } = usePhotos();

  const albums = useMemo(() => {
    const set = new Set<string>(BASE_ALBUMS);
    seedPhotos.forEach(p => set.add(p.album));
    photos.forEach(p => p.album && set.add(p.album));
    return Array.from(set).sort();
  }, [photos]);

  const [album, setAlbum] = useState("Campus");
  const [newAlbum, setNewAlbum] = useState("");
  const [caption, setCaption] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const fileRef = useRef<HTMLInputElement>(null);

  const target = newAlbum.trim() || album;
  const visible = filter === "all" ? photos : photos.filter(p => (p.album || "Campus") === filter);

  async function onFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    setBusy(true); setMsg(null);
    try {
      let count = 0;
      for (const file of Array.from(list)) {
        const src = await fileToDataUrl(file);
        add({ src, caption: caption || undefined, album: target });
        count++;
      }
      setMsg(`Added ${count} photo${count === 1 ? "" : "s"} to “${target}”.`);
      setCaption("");
      setNewAlbum("");
      setAlbum(target);
      if (fileRef.current) fileRef.current.value = "";
    } catch {
      setMsg("Something went wrong. Please try again.");
    } finally { setBusy(false); }
  }

  return (
    <div className="space-y-10">
      {/* Step 1 — add */}
      <div className="card-soft p-6 md:p-8">
        <p className="eyebrow">Step 1</p>
        <h2 className="serif text-2xl mt-1">Add photos to an album</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-sage mb-2">
              Put them in
            </label>
            <select value={album} onChange={e => { setAlbum(e.target.value); setNewAlbum(""); }} className="admin-select">
              {albums.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            <input
              value={newAlbum}
              onChange={e => setNewAlbum(e.target.value)}
              placeholder="…or type a brand-new album name"
              className="admin-input mt-3 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-sage mb-2">
              Caption (optional)
            </label>
            <input
              value={caption}
              onChange={e => setCaption(e.target.value)}
              placeholder="e.g. Founder's Day 2026"
              className="admin-input"
            />
          </div>
        </div>

        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className="btn-primary w-full md:w-auto mt-6 disabled:opacity-60"
        >
          {busy ? "Adding…" : `Choose photos for “${target}”`}
        </button>
        <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={e => onFiles(e.target.files)} />
        <p className="mt-2 text-xs text-forest/60">You can pick several photos at once.</p>

        {msg && (
          <p className="mt-4 text-sm text-forest bg-sage/20 border border-sage/40 rounded-lg px-3 py-2">{msg}</p>
        )}
      </div>

      <BuiltIn title="Built-in photos" items={seedPhotos.map(p => ({ id: p.id, label: p.caption || p.album, img: p.src }))} />

      {/* Step 2 — manage */}
      <div>
        <p className="eyebrow">Step 2</p>
        <div className="flex flex-wrap items-baseline justify-between gap-3 mt-1 mb-4">
          <h2 className="serif text-2xl">Photos you added</h2>
          <span className="text-xs tracking-widest uppercase text-forest/60">
            {photos.length} photo{photos.length === 1 ? "" : "s"}
          </span>
        </div>

        {photos.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {(["all", ...Array.from(new Set(photos.map(p => p.album || "Campus"))).sort()]).map(a => (
              <button
                key={a}
                onClick={() => setFilter(a)}
                className={`px-3 py-1.5 rounded-full text-xs tracking-wider uppercase border transition ${filter === a ? "bg-forest text-warm border-forest" : "border-border text-forest/70"}`}
              >{a === "all" ? "All" : a}</button>
            ))}
          </div>
        )}

        {photos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-forest/60 bg-beige/20">
            <p className="serif text-xl">Nothing added yet.</p>
            <p className="text-sm mt-2">
              The nine campus photographs already on the gallery stay there. Anything you add here joins them.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map(p => (
              <div key={p.id} className="rounded-xl overflow-hidden bg-beige/30 border border-border/60">
                <div className="aspect-[4/3] bg-beige/50">
                  <img src={p.src} alt="" className="w-full h-full object-cover block" />
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <span className="text-[0.65rem] tracking-[0.2em] uppercase text-sage">Album</span>
                    <select
                      value={p.album || "Campus"}
                      onChange={e => update(p.id, { album: e.target.value })}
                      className="admin-select mt-1 text-sm"
                    >
                      {albums.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                  <div>
                    <span className="text-[0.65rem] tracking-[0.2em] uppercase text-sage">Caption</span>
                    <input
                      value={p.caption ?? ""}
                      onChange={e => update(p.id, { caption: e.target.value })}
                      placeholder="Add a caption…"
                      className="admin-input text-sm"
                    />
                  </div>
                  <button
                    onClick={() => { if (confirm("Delete this photo?")) remove(p.id); }}
                    className="text-xs text-destructive hover:underline"
                  >Delete photo</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────────── News ───────────── */

function NewsAdmin() {
  const { items, add, remove, update } = useNews();
  const [draft, setDraft] = useState<Omit<NewsItem, "id" | "createdAt">>({
    kind: "news", title: "", summary: "", date: "", cover: undefined,
  });
  const [msg, setMsg] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  async function onCover(f: File | null) {
    if (!f) return;
    const src = await fileToDataUrl(f);
    setDraft(d => ({ ...d, cover: src }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.title || !draft.summary || !draft.date) return;
    add(draft);
    setDraft({ kind: draft.kind, title: "", summary: "", date: "", cover: undefined });
    if (coverRef.current) coverRef.current.value = "";
    setMsg("Published to the News page.");
    setTimeout(() => setMsg(null), 2500);
  }

  return (
    <div className="space-y-10">
      <div className="card-soft p-6 md:p-8">
        <p className="eyebrow">Step 1</p>
        <h2 className="serif text-2xl mt-1">Write a news item or event</h2>

        <form onSubmit={submit} className="mt-6 space-y-6">
          <div className="flex gap-2">
            {(["news", "event"] as const).map(k => (
              <button
                key={k}
                type="button"
                onClick={() => setDraft(d => ({ ...d, kind: k }))}
                className={`flex-1 px-4 py-2 rounded-full text-xs tracking-wider uppercase border transition ${draft.kind === k ? "bg-forest text-warm border-forest" : "border-border text-forest/70"}`}
              >{k === "news" ? "News article" : "Event"}</button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Row label="Title">
              <input value={draft.title} onChange={e => setDraft(d => ({ ...d, title: e.target.value }))} className="admin-input" placeholder="e.g. Founder's Day 2026" required />
            </Row>
            <Row label="Date">
              <input value={draft.date} onChange={e => setDraft(d => ({ ...d, date: e.target.value }))} placeholder="e.g. 27 January 2026" className="admin-input" required />
            </Row>
          </div>

          <Row label="Summary">
            <textarea rows={5} value={draft.summary} onChange={e => setDraft(d => ({ ...d, summary: e.target.value }))} className="admin-input resize-none" placeholder="A short paragraph…" required />
          </Row>

          <Row label="Picture or poster (optional)">
            <button type="button" onClick={() => coverRef.current?.click()} className="btn-ghost text-sm">
              {draft.cover ? "Replace picture" : "Choose a picture"}
            </button>
            <input ref={coverRef} type="file" accept="image/*" hidden onChange={e => onCover(e.target.files?.[0] ?? null)} />
            {draft.cover && (
              <div className="mt-3 relative inline-block">
                <img src={draft.cover} alt="" className="h-28 rounded-lg object-cover block" />
                <button
                  type="button"
                  onClick={() => setDraft(d => ({ ...d, cover: undefined }))}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-forest text-warm text-xs"
                  aria-label="Remove picture"
                >×</button>
              </div>
            )}
          </Row>

          <button className="btn-primary w-full md:w-auto" type="submit">Publish</button>
          {msg && <p className="text-sm text-forest bg-sage/20 border border-sage/40 rounded-lg px-3 py-2">{msg}</p>}
        </form>
      </div>

      <BuiltIn title="Built-in announcements" items={seedNews.map(n => ({ id: n.id, label: n.title }))} />

      <div>
        <p className="eyebrow">Step 2</p>
        <div className="flex flex-wrap items-baseline justify-between gap-3 mt-1 mb-4">
          <h2 className="serif text-2xl">Published posts</h2>
          <span className="text-xs tracking-widest uppercase text-forest/60">
            {items.length} post{items.length === 1 ? "" : "s"}
          </span>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-forest/60 bg-beige/20">
            <p className="serif text-xl">Nothing published yet.</p>
            <p className="text-sm mt-2">The admissions announcement from the school office stays on the News page regardless.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {items.map(n => (
              <article key={n.id} className="card-soft p-5">
                <div className="flex gap-4 items-start">
                  {n.cover && <img src={n.cover} alt="" className="w-20 h-20 rounded-lg object-cover shrink-0 block" />}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs tracking-widest uppercase text-sage">{n.kind} · {n.date}</div>
                    <h3 className="serif text-lg text-forest mt-1">{n.title}</h3>
                    <p className="text-sm text-forest/70 mt-1 line-clamp-2">{n.summary}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-4">
                  <button
                    onClick={() => setEditing(editing === n.id ? null : n.id)}
                    className="text-xs text-forest hover:underline"
                  >{editing === n.id ? "Close" : "Edit"}</button>
                  <button
                    onClick={() => { if (confirm("Remove this post?")) remove(n.id); }}
                    className="text-xs text-destructive hover:underline"
                  >Delete</button>
                </div>

                {editing === n.id && (
                  <div className="mt-4 pt-4 border-t border-border space-y-4">
                    <Row label="Title">
                      <input value={n.title} onChange={e => update(n.id, { title: e.target.value })} className="admin-input" />
                    </Row>
                    <Row label="Date">
                      <input value={n.date} onChange={e => update(n.id, { date: e.target.value })} className="admin-input" />
                    </Row>
                    <Row label="Summary">
                      <textarea rows={4} value={n.summary} onChange={e => update(n.id, { summary: e.target.value })} className="admin-input resize-none" />
                    </Row>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs tracking-[0.2em] uppercase text-sage">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function BuiltIn({ title, items }: { title: string; items: { id: string; label: string; img?: string }[] }) {
  const { isHidden, hide, show } = useHidden();
  return (
    <div className="card-soft p-6">
      <h2 className="serif text-2xl">{title}</h2>
      <p className="text-sm text-forest/60 mt-1">Items that came with the website. Remove any you no longer need (you can bring them back).</p>
      <div className="mt-4 space-y-3">
        {items.map(it => (
          <div key={it.id} className="flex items-center gap-3 border-b border-border/60 pb-3">
            {it.img && <img src={it.img} alt="" className="w-14 h-14 rounded-md object-cover shrink-0 block" />}
            <span className={`flex-1 min-w-0 text-sm break-words ${isHidden(it.id) ? "line-through text-forest/40" : "text-forest"}`}>{it.label}</span>
            {isHidden(it.id)
              ? <button onClick={() => show(it.id)} className="text-xs text-forest hover:underline shrink-0">Restore</button>
              : <button onClick={() => hide(it.id)} className="text-xs text-destructive hover:underline shrink-0">Remove</button>}
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogAdmin() {
  const { posts, add, remove, update } = useBlog();
  const empty: Omit<BlogPost, "id" | "createdAt"> = { title: "", body: "", date: "", image: undefined, video: "" };
  const [d, setD] = useState(empty);
  const [msg, setMsg] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const vidRef = useRef<HTMLInputElement>(null);

  async function onVideo(f: File | null) {
    if (!f) return;
    if (f.size > 3_000_000) { setMsg("That video is too big to upload here. Put it on YouTube and paste the link instead."); return; }
    setD(x => ({ ...x, video: "" })); const src = await fileToDataUrl(f); setD(x => ({ ...x, video: src }));
  }

  return (
    <div className="space-y-10">
      <div className="card-soft p-6 md:p-8">
        <h2 className="serif text-2xl">Write a blog post</h2>
        <form className="mt-6 space-y-6" onSubmit={e => {
          e.preventDefault(); if (!d.title || !d.body) return;
          add({ ...d, date: d.date || new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }), video: d.video || undefined });
          setD(empty); setMsg("Posted to the Blog page."); setTimeout(() => setMsg(null), 2500);
        }}>
          <div className="grid gap-6 md:grid-cols-2">
            <Row label="Title"><input className="admin-input" value={d.title} onChange={e => setD({ ...d, title: e.target.value })} required /></Row>
            <Row label="Date (optional)"><input className="admin-input" value={d.date} onChange={e => setD({ ...d, date: e.target.value })} placeholder="Today if empty" /></Row>
          </div>
          <Row label="Description"><textarea rows={6} className="admin-input resize-none" value={d.body} onChange={e => setD({ ...d, body: e.target.value })} required /></Row>
          <Row label="Video — YouTube link (best) or short clip">
            <input className="admin-input" value={d.video?.startsWith("data:") ? "(uploaded clip)" : d.video} onChange={e => setD({ ...d, video: e.target.value })} placeholder="https://youtube.com/..." />
            <button type="button" className="btn-ghost text-sm mt-3" onClick={() => vidRef.current?.click()}>Upload short clip</button>
            <input ref={vidRef} type="file" accept="video/*" hidden onChange={e => onVideo(e.target.files?.[0] ?? null)} />
          </Row>
          <Row label="Picture (optional)">
            <button type="button" className="btn-ghost text-sm" onClick={() => imgRef.current?.click()}>{d.image ? "Replace picture" : "Choose a picture"}</button>
            <input ref={imgRef} type="file" accept="image/*" hidden onChange={async e => { const f = e.target.files?.[0]; if (f) { const src = await fileToDataUrl(f); setD(x => ({ ...x, image: src })); } }} />
            {d.image && <img src={d.image} alt="" className="mt-3 h-28 rounded-lg object-cover block" />}
          </Row>
          <button className="btn-primary w-full md:w-auto" type="submit">Post</button>
          {msg && <p className="text-sm text-forest bg-sage/20 border border-sage/40 rounded-lg px-3 py-2">{msg}</p>}
        </form>
      </div>
      <div className="space-y-4">
        <h2 className="serif text-2xl">Your posts ({posts.length})</h2>
        {posts.map(p => (
          <div key={p.id} className="card-soft p-5 space-y-3">
            <Row label="Title"><input className="admin-input" value={p.title} onChange={e => update(p.id, { title: e.target.value })} /></Row>
            <Row label="Description"><textarea rows={3} className="admin-input resize-none" value={p.body} onChange={e => update(p.id, { body: e.target.value })} /></Row>
            <button onClick={() => { if (confirm("Delete this post?")) remove(p.id); }} className="text-xs text-destructive hover:underline">Delete post</button>
          </div>
        ))}
      </div>
    </div>
  );
}
