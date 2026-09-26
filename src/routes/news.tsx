import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "../components/Reveal";
import { useNews, useHidden, type NewsItem } from "../lib/store";
import { seedNews } from "../lib/seed-news";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Events — Mayflower Junior School, Ikenne" },
      { name: "description", content: "News articles and event announcements from Mayflower Junior School, Ikenne." },
      { property: "og:title", content: "News & Events — Mayflower Junior School" },
      { property: "og:description", content: "News and events at Mayflower Junior School, Ikenne." },
    ],
  }),
  component: News,
});

function News() {
  const { items } = useNews();
  const { isHidden } = useHidden();
  const merged = [...seedNews.filter(s => !isHidden(s.id)), ...items];
  const [tab, setTab] = useState<"all" | "news" | "event">("all");
  const filtered = tab === "all" ? merged : merged.filter(i => i.kind === tab);


  return (
    <>
      <section className="section pb-8">
        <div className="container-page max-w-4xl">
          <Reveal><p className="eyebrow">News & Events</p></Reveal>
          <Reveal delay={120}>
            <h1 className="serif text-5xl md:text-7xl mt-4 leading-[1.02]">
              What is happening at Mayflower.
            </h1>
          </Reveal>
          <Reveal delay={280}>
            <p className="mt-6 text-lg text-forest/80 leading-relaxed max-w-2xl">
              Announcements from the school office, event posters, and quiet notes from campus life.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-4">
        <div className="container-page">
          <div className="flex gap-2 mb-10">
            {(["all", "news", "event"] as const).map(k => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase border ${tab === k ? "bg-forest text-warm border-forest" : "border-border text-forest/70 hover:border-forest"}`}
              >
                {k === "all" ? "All" : k === "news" ? "News" : "Events"}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border p-14 text-center bg-beige/30">
              <p className="serif text-3xl text-forest">Nothing to announce just yet.</p>
              <p className="mt-3 text-forest/70 max-w-md mx-auto">
                When there is news to share or an event on the horizon, it will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map(item => <NewsCard key={item.id} item={item}/>)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="card-soft overflow-hidden flex flex-col">
      {item.cover && (
        <div className="aspect-[16/10] overflow-hidden">
          <img src={item.cover} alt="" loading="lazy" className="w-full h-full object-cover"/>
        </div>
      )}
      <div className="p-7 flex-1 flex flex-col">
        <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-sage">
          <span>{item.kind === "news" ? "News" : "Event"}</span>
          <span className="w-4 h-px bg-sage"/>
          <span>{item.date}</span>
        </div>
        <h3 className="serif text-2xl mt-3 text-forest">{item.title}</h3>
        <p className="mt-3 text-sm text-forest/75 leading-relaxed flex-1">{item.summary}</p>
      </div>
    </article>
  );
}
