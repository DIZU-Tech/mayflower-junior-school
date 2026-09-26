import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/history", label: "History" },
  { to: "/gallery", label: "Gallery" },
  { to: "/news", label: "News & Events" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const pathname = useRouterState({ select: s => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className="fixed top-0 inset-x-0 z-40 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "color-mix(in oklch, var(--warm-white) 92%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div className="container-page flex items-center justify-between py-4 md:py-5">
        <Link to="/" className="flex items-center gap-3 group">
          <Emblem />
          <div className="leading-tight">
            <div className="serif text-lg md:text-xl text-forest">Mayflower</div>
            <div className="text-[0.65rem] tracking-[0.28em] uppercase text-sage">Junior · Ikenne</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map(n => {
            const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`link-underline text-sm tracking-wide ${active ? "text-forest" : "text-forest/70 hover:text-forest"}`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-forest/30 text-forest"
          onClick={() => setOpen(v => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span className="sr-only">Menu</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            {open
              ? <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              : <><path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-500 bg-warm border-t border-border"
        style={{ maxHeight: open ? 500 : 0, opacity: open ? 1 : 0 }}
      >
        <nav className="container-page py-6 flex flex-col gap-4">
          {NAV.map(n => (
            <Link
              key={n.to}
              to={n.to}
              className="serif text-2xl text-forest"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-beige/40">
      <div className="container-page py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Emblem />
            <div className="serif text-xl text-forest">Mayflower Junior School</div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
            A home of learning and light in Ikenne, Ogun State — founded in 1956 by
            Dr. Tai Solarin on the belief that knowledge is the birthright of every child.
          </p>
          <p className="mt-6 serif italic text-sage">"Knowledge is Light"</p>
        </div>

        <div>
          <div className="eyebrow mb-4">Visit</div>
          <ul className="space-y-2 text-sm text-forest/80">
            <li><Link to="/about" className="link-underline">About</Link></li>
            <li><Link to="/history" className="link-underline">Our History</Link></li>
            <li><Link to="/gallery" className="link-underline">Gallery</Link></li>
            <li><Link to="/news" className="link-underline">News & Events</Link></li>
            <li><Link to="/blog" className="link-underline">Blog</Link></li>
            <li><Link to="/contact" className="link-underline">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-4">Campus</div>
          <p className="text-sm text-forest/80 leading-relaxed">
            Ikenne-Remo<br/>
            Ogun State, Nigeria
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Mayflower Junior School, Ikenne. All rights reserved.</span>
          <span className="tracking-[0.3em] uppercase">Ex-Mays Forever</span>
        </div>
      </div>
    </footer>
  );
}

function Emblem() {
  return (
    <span aria-hidden className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-forest text-warm">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 3c2 3 2 6 0 9-2-3-2-6 0-9zM12 3c-2 3-2 6 0 9M4 12c3-2 6-2 9 0-3 2-6 2-9 0zM20 12c-3-2-6-2-9 0M12 21c2-3 2-6 0-9-2 3-2 6 0 9z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="1.4" fill="currentColor"/>
      </svg>
    </span>
  );
}
