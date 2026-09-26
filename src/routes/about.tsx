import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/Reveal";
import campusImg from "../assets/campus.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Mayflower Junior School, Ikenne" },
      { name: "description", content: "Our vision, our values and the culture that has shaped Mayflower students since 1956." },
      { property: "og:title", content: "About Mayflower Junior School, Ikenne" },
      { property: "og:description", content: "Vision, values, culture and academic excellence." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="section">
        <div className="container-page max-w-4xl">
          <Reveal><p className="eyebrow">About the school</p></Reveal>
          <Reveal delay={120}>
            <h1 className="serif text-5xl md:text-7xl leading-[1.02] mt-4">
              A school that teaches you to see clearly.
            </h1>
          </Reveal>
          <Reveal delay={280}>
            <p className="mt-8 text-lg md:text-xl text-forest/80 leading-relaxed max-w-2xl">
              Mayflower Junior School exists to raise thoughtful, disciplined and self-reliant young Nigerians —
              children who leave our gates with a mind trained to think, a heart trained to serve, and hands that are not afraid of work.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative">
        <div className="container-page">
          <div className="rounded-3xl overflow-hidden">
            <img src={campusImg} alt="A tree-lined avenue on the Mayflower campus at first light" width={1600} height={1000} loading="lazy" className="w-full h-[46vh] object-cover"/>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid md:grid-cols-2 gap-12">
          <Reveal>
            <p className="eyebrow">Vision</p>
            <h2 className="serif text-3xl md:text-4xl mt-3">To raise leaders who serve.</h2>
            <p className="mt-5 text-forest/80 leading-relaxed">
              We imagine a Nigeria — and a world — shaped by young people who are competent, curious and quietly courageous.
              We believe education must reach both the head and the hands, and that no child should ever be made to feel small.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Mission</p>
            <h2 className="serif text-3xl md:text-4xl mt-3">Learning grounded in life.</h2>
            <p className="mt-5 text-forest/80 leading-relaxed">
              We deliver a rigorous academic programme alongside manual labour, service and character formation.
              We build students who can solve a problem, mend a chair, write an essay and comfort a friend — all before lunch.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-beige/50">
        <div className="container-page">
          <Reveal><p className="eyebrow">Our values</p></Reveal>
          <Reveal delay={100}><h2 className="serif text-4xl md:text-5xl mt-3 max-w-2xl leading-tight">Six words we return to, every single day.</h2></Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Self-Reliance", d: "We teach a child to depend on their own effort before anything else." },
              { t: "Honesty", d: "In word and in work — nothing is more important than a name kept clean." },
              { t: "Hard Work", d: "There is no shortcut to excellence; only long, patient practice." },
              { t: "Discipline", d: "Freedom is real only when a young person has learned to govern themselves." },
              { t: "Service", d: "The educated life is a life spent lifting other people up." },
              { t: "Leadership", d: "To lead is first to listen — and then to act with courage." },
            ].map((v, i) => (
              <Reveal key={v.t} delay={i * 80}>
                <div className="card-soft h-full p-8">
                  <h3 className="serif text-2xl">{v.t}</h3>
                  <p className="mt-3 text-sm text-forest/75 leading-relaxed">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid md:grid-cols-2 gap-12 items-start">
          <Reveal>
            <p className="eyebrow">Academic life</p>
            <h2 className="serif text-3xl md:text-4xl mt-3">A rigorous, humane education.</h2>
            <p className="mt-5 text-forest/80 leading-relaxed">
              Our teachers do not hurry through material; they hold each child until real understanding arrives.
              Our classrooms remain places of curiosity, questions, and small daily victories.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Culture</p>
            <h2 className="serif text-3xl md:text-4xl mt-3">Quiet, kind, deeply Nigerian.</h2>
            <p className="mt-5 text-forest/80 leading-relaxed">
              We keep the old customs that matter — morning assembly, greetings, tending the grounds — and we welcome the new ideas that make our children stronger citizens of the world.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
