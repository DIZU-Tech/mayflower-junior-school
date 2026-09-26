import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/Reveal";
import heritageImg from "../assets/heritage.jpg";
import campusImg from "../assets/campus.jpg";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Our History — Mayflower School, Ikenne (Est. 1956)" },
      { name: "description", content: "The story of Mayflower School, Ikenne — founded on 27 January 1956 by Dr. Tai Solarin and Madam Sheila Solarin, and the school's enduring impact on Nigerian education." },
      { property: "og:title", content: "Our History — Mayflower School, Ikenne" },
      { property: "og:description", content: "Founded 27 January 1956 by Dr. Tai Solarin. Knowledge is Light." },
    ],
  }),
  component: History,
});

function History() {
  return (
    <>
      <section className="section">
        <div className="container-page max-w-3xl">
          <Reveal><p className="eyebrow">Our history</p></Reveal>
          <Reveal delay={120}>
            <h1 className="serif text-5xl md:text-7xl leading-[1.02] mt-4">
              A school born of quiet courage.
            </h1>
          </Reveal>
          <Reveal delay={280}>
            <p className="mt-8 text-lg md:text-xl text-forest/80 leading-relaxed">
              On the 27th of January 1956, a small group of teachers and children gathered under the trees of Ikenne, Ogun State,
              and began something that would echo through Nigerian life for generations.
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container-page">
          <Reveal>
            <div className="rounded-3xl overflow-hidden">
              <img src={campusImg} alt="A tree-lined avenue on the Mayflower campus at first light" width={1600} height={1000} loading="lazy" className="w-full h-[46vh] md:h-[60vh] object-cover"/>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4 md:sticky md:top-28 md:self-start">
            <Reveal>
              <p className="eyebrow">A living story</p>
              <h2 className="serif text-3xl mt-3">Est. 27 January 1956</h2>
              <p className="mt-4 text-forest/70 leading-relaxed">
                Founded by <span className="serif italic">Dr. Tai Solarin</span>, with <span className="serif italic">Madam Sheila Solarin</span>,
                in Ikenne, Ogun State, Nigeria.
              </p>
              <div className="divider-leaf my-8"><span className="text-gold" aria-hidden>❦</span></div>
              <p className="serif italic text-sage text-xl">"Knowledge is Light."</p>
            </Reveal>
          </div>

          <article className="md:col-span-8 space-y-8 text-forest/85 text-lg leading-[1.85]">
            <Reveal>
              <p>
                Mayflower School was founded on <strong className="text-forest">27 January 1956</strong> in the town of Ikenne, Ogun State,
                by <strong className="text-forest">Dr. Augustus Taiwo "Tai" Solarin</strong>, one of the most radical, generous
                and clear-eyed educators Nigeria has ever produced. He was joined by his wife, the British-born teacher
                <strong className="text-forest"> Madam Sheila Solarin</strong>, whose unwavering discipline, warmth and pedagogical
                intelligence would come to shape the daily life of the school for decades. Their vision was simple, and revolutionary
                for its time: a Nigerian school that welcomed every child on the strength of their mind alone — not their tribe,
                their creed, or their father's title.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <p>
                The school took its name from the <strong className="text-forest">Mayflower</strong>, the ship that had once carried a small
                band of pilgrims across a vast and uncertain ocean in search of a freer life. Tai Solarin saw in that name a fitting
                emblem for the pupils he hoped to raise — young Nigerians ready to journey courageously into a new age, willing to leave
                behind superstition and inherited fear, and to build a country worthy of their children. The motto he gave them was as
                unadorned as it was luminous: <em className="serif">Knowledge is Light.</em>
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p>
                From its earliest days, Mayflower stood apart. Solarin refused to make religion compulsory, insisting that a child's
                conscience belonged only to that child. He wove <strong className="text-forest">manual labour</strong> into the timetable
                so that every student — regardless of background — would learn the dignity of work with their hands: cutting grass,
                planting, sweeping, mending, building. Morning assembly, Spartan meals, communal chores and long hours of study were not
                punishments but instruments — tools for shaping a certain kind of Nigerian: <strong className="text-forest">self-reliant,
                honest, hard-working, disciplined, kind, and unafraid</strong>.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <p>
                Madam Sheila's contribution to this project cannot be told in a single paragraph. She taught, she led, she governed the
                school through many decades, and she outlived her husband to carry his ideals into a new century. When the Solarins
                eventually handed the school over to the Ogun State Government in the 1970s, they did so not out of failure but out of
                belief — a belief that this kind of education belonged to the whole Nigerian people, and not to any one family. Sheila
                remained a mother to countless Ex-Mays until her final years, and her name is spoken on the campus with the tenderness
                usually reserved for one's own grandmother.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p>
                The impact of Mayflower on Nigerian education has been quiet, but immense. Its alumni — proudly called
                <strong className="text-forest"> Ex-Mays</strong> — have gone on to lead in medicine, law, journalism, engineering,
                the arts, public service and the church. Ministers, professors, judges, entrepreneurs, doctors and writers all carry
                the marks of an Ikenne morning: the habit of thinking for oneself, the courage to speak plainly, the reflex to help
                without being asked. Every year, on the last Saturday of January, Ex-Mays gather from across the world to remember,
                to laugh, and to renew their vows to the school and to each other.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <p>
                Today, Mayflower Junior School remains a proud and defining institution of Ogun State and of Nigeria — a place where
                the ideals of Tai and Sheila Solarin still live in the trees, the corridors, and the quiet respectful greetings of
                children. Times have changed. New subjects, new tools and new dreams have entered the classroom. But the covenant
                Mayflower makes with each child who walks through its gates has not changed since 1956:
              </p>
              <p className="serif italic text-2xl text-forest">
                Come with an honest heart, and we will give you a mind that is free. Knowledge is Light.
              </p>
            </Reveal>
          </article>
        </div>
      </section>

      <section className="section bg-beige/50">
        <div className="container-page">
          <Reveal><p className="eyebrow">A living timeline</p></Reveal>
          <Reveal delay={100}><h2 className="serif text-4xl md:text-5xl mt-3 max-w-2xl leading-tight">Milestones on the long road.</h2></Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { y: "1956", t: "Founded", d: "Dr. Tai Solarin and Madam Sheila Solarin open Mayflower School in Ikenne on 27 January." },
              { y: "1960s", t: "A school apart", d: "Compulsory religion is set aside; manual labour and self-reliance become the school's heart." },
              { y: "1970s", t: "A gift to Nigeria", d: "The Solarins hand the school to the Ogun State Government so its ideals may serve every child." },
              { y: "Today", t: "The Ex-May family", d: "Alumni across the world return each January to renew the covenant of 1956." },
            ].map((m, i) => (
              <Reveal key={m.y} delay={i * 100}>
                <div className="card-soft h-full p-8">
                  <div className="serif text-3xl text-gold">{m.y}</div>
                  <h3 className="serif text-xl mt-4">{m.t}</h3>
                  <p className="mt-3 text-sm text-forest/75 leading-relaxed">{m.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page max-w-3xl">
          <Reveal>
            <img src={heritageImg} alt="A wooden classroom desk with an open book and a small cherry blossom branch" width={1200} height={1400} loading="lazy" className="w-full rounded-3xl object-cover"/>
          </Reveal>
          <Reveal delay={150}>
            <blockquote className="mt-10 serif text-2xl md:text-3xl leading-[1.35] text-forest">
              "May you never be afraid of the truth, and may the truth make you free."
            </blockquote>
            <p className="mt-4 text-sage serif italic">— attributed, in spirit, to Dr. Tai Solarin</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
