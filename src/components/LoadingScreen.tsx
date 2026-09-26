import { useEffect, useState } from "react";

// Emotional intro: one cherry blossom petal drifts across the screen,
// motto beneath the school name, then fades into the site.
export function LoadingScreen() {
  const [gone, setGone] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    // If a returning visitor has seen the intro this session, skip it.
    const seen = sessionStorage.getItem("mjs.intro");
    if (seen) { setGone(true); return; }
    const t1 = setTimeout(() => setHiding(true), 2600);
    const t2 = setTimeout(() => {
      setGone(true);
      sessionStorage.setItem("mjs.intro", "1");
    }, 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 flex flex-col items-center justify-center bg-warm"
      style={{
        zIndex: 100,
        transition: "opacity 0.8s ease",
        opacity: hiding ? 0 : 1,
      }}
    >
      <span
        className="petal"
        style={{
          top: 0, left: 0,
          width: 22, height: 22,
          animation: "petalCross 3s cubic-bezier(0.22,1,0.36,1) forwards",
        }}
      />
      <div className="fade-in text-center px-6" style={{ animationDelay: "0.4s" }}>
        <p className="eyebrow mb-6">Est. 1956 · Ikenne</p>
        <h1 className="serif text-4xl md:text-6xl leading-tight text-forest">
          Mayflower Junior School
        </h1>
        <div className="divider-leaf mt-8 mb-6">
          <span className="text-gold" aria-hidden>❦</span>
        </div>
        <p className="serif italic text-xl md:text-2xl text-sage">
          Knowledge is Light
        </p>
      </div>
    </div>
  );
}
