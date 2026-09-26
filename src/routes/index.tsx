import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "../components/Reveal";
import { useNews, useHidden } from "../lib/store";
import { usePhotos } from "../lib/store";
import heroImg from "../assets/hero.jpg";

import heritageImg from "../assets/heritage.jpg";
import gateImg from "../assets/gate.jpg";
import { seedPhotos } from "../lib/seed-gallery";
import { seedNews } from "../lib/seed-news";

export const Route = createFileRoute("/")({ component: Home });


function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <Principal />
      <Highlights />
      <Latest />
      <GalleryPeek />
      <Closing />
    </>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden -mt-20 md:-mt-24">
      <img
        src={heroImg}
        alt="A misty morning on a school campus with cherry blossoms drifting through evergreen trees"
        width={1920} height={1280}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "saturate(0.9) brightness(0.92)" }}
      />
      <div className="absolute inset-0" style={{
        background: "linear-gradient(to bottom, oklch(0.34 0.055 152 / 0.35) 0%, oklch(0.22 0.02 150 / 0.15) 40%, oklch(0.22 0.02 150 / 0.7) 100%)"
      }}/>
      <div className="container-page relative pb-16 md:pb-24 pt-32 text-warm-white" style={{ color: "var(--warm-white)" }}>
        <Reveal>
          <p className="eyebrow" style={{ color: "oklch(0.85 0.04 148)" }}>Est. 1956 · Ikenne · Ogun State</p>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="serif mt-4 text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-4xl" style={{ color: "var(--warm-white)" }}>
            A home of learning<br/>and light.
          </h1>
        </Reveal>
        <Reveal delay={350}>
          <p className="mt-6 max-w-xl text-base md:text-lg opacity-90 leading-relaxed">
            For nearly seven decades, Mayflower Junior School has raised bright, disciplined and self-reliant young Nigerians beneath the trees of Ikenne.
          </p>
        </Reveal>
        <Reveal delay={500}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/history" className="btn-primary" style={{ background: "var(--warm-white)", color: "var(--forest)" }}>Our story</Link>
            <Link to="/about" className="btn-ghost" style={{ borderColor: "var(--warm-white)", color: "var(--warm-white)" }}>Discover Mayflower</Link>
          </div>
        </Reveal>
        <Reveal delay={700}>
          <div className="mt-16 flex items-center gap-3 text-xs tracking-[0.3em] uppercase opacity-80">
            <span className="inline-block w-8 h-px bg-current soft-pulse" />
            Knowledge is Light
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Welcome() {
  return (
    <section className="section">
      <div className="container-page grid md:grid-cols-12 gap-10 md:gap-14 items-center">
        <Reveal className="md:col-span-6">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={gateImg}
              alt="The Mayflower entrance gate at dawn — trees and red-earth road"
              width={1600}
              height={1200}
              loading="lazy"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "linear-gradient(to top, oklch(0.22 0.02 150 / 0.35), transparent 45%)"
            }}/>
            <p className="absolute bottom-4 left-5 right-5 text-warm serif italic text-sm md:text-base" style={{ color: "var(--warm-white)" }}>
              The gate is always open to those who once called this home.
            </p>
          </div>
        </Reveal>
        <div className="md:col-span-6">
          <Reveal><p className="eyebrow">A quiet welcome</p></Reveal>
          <Reveal delay={100}>
            <h2 className="serif text-4xl md:text-5xl mt-3 leading-[1.05]">Welcome home, Ex-May.</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 text-lg leading-relaxed text-forest/80">
              Whether you are a parent looking for a school your child will one day speak of with pride, a student stepping into a new chapter,
              or an old boy or girl returning after many rains — you are welcome. Mayflower has always been more than a school.
              It is a way of seeing the world: with clear eyes, honest hands, and a heart trained in service.
            </p>
            <div className="divider-leaf mt-8"><span className="text-gold" aria-hidden>❦</span></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Principal() {
  return (
    <section className="section bg-beige/50">
      <div className="container-page grid md:grid-cols-12 gap-12 items-center">
        <Reveal className="md:col-span-5">
          <div className="relative overflow-hidden rounded-3xl">
            <img src={heritageImg} alt="A quiet wooden classroom desk with an open book" width={1200} height={1400} loading="lazy" className="w-full h-auto object-cover" />
          </div>
        </Reveal>
        <div className="md:col-span-7">
          <Reveal><p className="eyebrow">From the Principal</p></Reveal>
          <Reveal delay={100}>
            <h2 className="serif text-3xl md:text-4xl mt-3">"We teach children to think — and to remain kind while they do."</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-forest/80 leading-relaxed">
              Every morning on these grounds, we return to a simple promise: to raise young people who ask good questions,
              who work with their hands as easily as they read, and who understand that learning is a form of love.
              Our doors are open. Our expectations are high. Our belief in every child is unshaken.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-8 serif italic text-sage">— The Principal, Mayflower Junior School, Ikenne</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  const items = [
    { t: "Founded 1956", d: "By Dr. Tai Solarin, with Madam Sheila Solarin as co-founder, on the ideals of self-reliance and honesty." },
    { t: "Knowledge is Light", d: "A motto that has quietly shaped generations of Nigerian leaders, writers, scientists and citizens." },
    { t: "The Ex-May tradition", d: "Old students carry Mayflower through their lives — a fellowship built on discipline and gratitude." },
    { t: "Service before self", d: "Manual labour, community service, and hard work are woven into the fabric of every school year." },
  ];
  return (
    <section className="section">
      <div className="container-page">
        <Reveal><p className="eyebrow">The Mayflower way</p></Reveal>
        <Reveal delay={100}><h2 className="serif text-4xl md:text-5xl mt-3 max-w-2xl leading-tight">Four quiet truths that shape everything we do.</h2></Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 120}>
              <div className="card-soft h-full p-8">
                <div className="w-10 h-10 rounded-full bg-sage/30 text-forest flex items-center justify-center serif text-lg">{i + 1}</div>
                <h3 className="serif text-xl mt-6">{it.t}</h3>
                <p className="mt-3 text-sm text-forest/75 leading-relaxed">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Latest() {
  const { items } = useNews();
  const { isHidden } = useHidden();
  const merged = [...seedNews.filter(s => !isHidden(s.id)), ...items];
  const news = merged.filter(i => i.kind === "news").slice(0, 2);
  const events = merged.filter(i => i.kind === "event").slice(0, 2);


  return (
    <section className="section">
      <div className="container-page grid md:grid-cols-2 gap-12">
        <div>
          <Reveal><p className="eyebrow">Latest news</p></Reveal>
          <Reveal delay={100}><h2 className="serif text-3xl md:text-4xl mt-3">From the notice board</h2></Reveal>
          <div className="mt-8 space-y-4">
            {news.length === 0 && <EmptyLine text="News will be posted here as it happens." />}
            {news.map(n => <MiniItem key={n.id} title={n.title} meta={n.date} body={n.summary} />)}
          </div>
          <Link to="/news" className="btn-ghost mt-8">All news</Link>
        </div>
        <div>
          <Reveal><p className="eyebrow">Upcoming events</p></Reveal>
          <Reveal delay={100}><h2 className="serif text-3xl md:text-4xl mt-3">On the school calendar</h2></Reveal>
          <div className="mt-8 space-y-4">
            {events.length === 0 && <EmptyLine text="Upcoming events will appear here." />}
            {events.map(n => <MiniItem key={n.id} title={n.title} meta={n.date} body={n.summary} />)}
          </div>
          <Link to="/news" className="btn-ghost mt-8">All events</Link>
        </div>
      </div>
    </section>
  );
}

function MiniItem({ title, meta, body }: { title: string; meta: string; body: string }) {
  return (
    <article className="card-soft p-6">
      <div className="text-xs tracking-[0.2em] uppercase text-sage">{meta}</div>
      <h3 className="serif text-xl mt-2 text-forest">{title}</h3>
      <p className="mt-2 text-sm text-forest/70 leading-relaxed line-clamp-3">{body}</p>
    </article>
  );
}

function EmptyLine({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground italic">
      {text}
    </div>
  );
}

function GalleryPeek() {
  const { photos } = usePhotos();
  const hiddenIds = useHidden().ids;
  const combined = [
    ...seedPhotos.filter(p => !hiddenIds.includes(p.id)).map(p => ({ id: p.id, src: p.src, caption: p.caption })),
    ...photos.map(p => ({ id: p.id, src: p.src, caption: p.caption })),
  ];
  const preview = combined.slice(0, 6);
  return (
    <section className="section bg-beige/40">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal><p className="eyebrow">Gallery</p></Reveal>
            <Reveal delay={100}><h2 className="serif text-4xl md:text-5xl mt-3 max-w-xl leading-tight">Moments that stay with us.</h2></Reveal>
          </div>
          <Link to="/gallery" className="btn-ghost">Open gallery</Link>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
          {preview.map(p => (
            <div key={p.id} className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img src={p.src} alt={p.caption ?? ""} loading="lazy" className="w-full h-full object-cover"/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="section">
      <div className="container-page text-center max-w-2xl mx-auto">
        <Reveal><p className="eyebrow">Come closer</p></Reveal>
        <Reveal delay={100}>
          <h2 className="serif text-4xl md:text-6xl mt-4 leading-[1.05]">Welcome home.</h2>
        </Reveal>
        <Reveal delay={250}>
          <p className="mt-6 text-lg text-forest/80 leading-relaxed">
            Read the story of Mayflower, walk our campus in pictures, or reach out. Wherever you find us from, there is always a chair kept.
          </p>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/history" className="btn-primary">Read our history</Link>
            <Link to="/contact" className="btn-ghost">Get in touch</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
