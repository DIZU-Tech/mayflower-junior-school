import { useMemo } from "react";

// Gentle floating cherry blossom petals across the whole page.
// Pure CSS animation — no JS loop, so it's smooth and battery-friendly.
export function Petals({ count = 10 }: { count?: number }) {
  const petals = useMemo(() => (
    Array.from({ length: count }).map((_, i) => {
      const left = Math.random() * 100;
      const drift = (Math.random() * 200 - 100) + "px";
      const duration = 18 + Math.random() * 22;
      const delay = -Math.random() * duration;
      const scale = 0.6 + Math.random() * 0.9;
      return { i, left, drift, duration, delay, scale };
    })
  ), [count]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 2 }}>
      {petals.map(p => (
        <span
          key={p.i}
          className="petal"
          style={{
            left: `${p.left}vw`,
            // @ts-expect-error custom prop
            "--drift": p.drift,
            animation: `petalFall ${p.duration}s linear ${p.delay}s infinite`,
            transform: `scale(${p.scale})`,
          }}
        />
      ))}
    </div>
  );
}
