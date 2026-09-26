import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Reveal } from "../components/Reveal";
import { usePhotos, useHidden, type Photo } from "../lib/store";
import { seedPhotos } from "../lib/seed-gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Mayflower Junior School, Ikenne" },
      { name: "description", content: "Moments from campus life at Mayflower Junior School, Ikenne — classrooms, library, ICT, and the school garden." },
      { property: "og:title", content: "Gallery — Mayflower Junior School, Ikenne" },
      { property: "og:description", content: "Photographs from the school and its people." },
    ],
  }),
  component: Gallery,
});

type Item = { id: string; src: string; album: string; caption?: string };

function Gallery() {
  const { photos } = usePhotos();
  const hiddenIds = useHidden().ids;

  const all: Item[] = useMemo(() => {
    const uploaded: Item[] = photos.map((p: Photo) => ({
      id: p.id, src: p.src, album: p.album || "Campus", caption: p.caption,
    }));
    return [...seedPhotos.filter(p => !hiddenIds.includes(p.id)), ...uploaded];
  }, [photos, hiddenIds]);

  const albums = useMemo(
    () => Array.from(new Set(all.map(p => p.album))).sort(),
    [all]
  );
  const [album, setAlbum] = useState<string | null>(null);
  const filtered = album ? all.filter(p => p.album === album) : all;

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null ? filtered[openIndex] : null;

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(() => {
    setOpenIndex(i => i === null ? null : (i + 1) % filtered.length);
  }, [filtered.length]);
  const prev = useCallback(() => {
    setOpenIndex(i => i === null ? null : (i - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, close, next, prev]);

  return (
    <>
      <section className="section pb-8">
        <div className="container-page max-w-4xl">
          <Reveal><p className="eyebrow">Gallery</p></Reveal>
          <Reveal delay={120}>
            <h1 className="serif text-5xl md:text-7xl mt-4 leading-[1.02]">Moments we keep.</h1>
          </Reveal>
          <Reveal delay={280}>
            <p className="mt-6 text-lg text-forest/80 leading-relaxed max-w-2xl">
              A quiet archive of school life — classrooms, library, the ICT centre, the garden. Tap a photograph to view it larger; use the arrows or your keyboard to move through the album.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page">
          {albums.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setAlbum(null)}
                className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase border transition ${album === null ? "bg-forest text-warm border-forest" : "border-border text-forest/70 hover:border-forest"}`}
              >All</button>
              {albums.map(a => (
                <button
                  key={a}
                  onClick={() => setAlbum(a)}
                  className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase border transition ${album === a ? "bg-forest text-warm border-forest" : "border-border text-forest/70 hover:border-forest"}`}
                >{a}</button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((p, i) => (
              <button
                key={p.id}
                className="group aspect-[4/5] rounded-2xl overflow-hidden bg-beige/40 relative"
                onClick={() => setOpenIndex(i)}
              >
                <img
                  src={p.src}
                  alt={p.caption ?? p.album}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
                />
                <span className="absolute bottom-2 left-2 text-[0.6rem] tracking-widest uppercase bg-black/50 text-white px-2 py-0.5 rounded backdrop-blur-sm">
                  {p.album}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 fade-in"
          style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(14px)" }}
          onClick={close}
          role="dialog"
          aria-label="Photo viewer"
        >
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Close"
            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl transition"
          >×</button>

          {/* Prev */}
          {filtered.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
              className="absolute left-2 md:left-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl transition"
            >‹</button>
          )}

          {/* Next */}
          {filtered.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
              className="absolute right-2 md:right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl transition"
            >›</button>
          )}

          <div className="max-w-5xl w-full max-h-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={open.src}
              alt={open.caption ?? open.album}
              className="max-h-[78vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <div className="mt-5 text-center max-w-2xl">
              <p className="text-[0.65rem] tracking-[0.3em] uppercase text-white/60">{open.album}</p>
              {open.caption && (
                <p className="mt-2 serif italic text-lg md:text-xl text-white">
                  {open.caption}
                </p>
              )}
              <p className="mt-3 text-xs text-white/50">
                {(openIndex ?? 0) + 1} / {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
