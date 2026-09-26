// Curated campus photographs, always present on the gallery page.
// Admin-uploaded photos appear alongside these. These are served from
// the Lovable CDN so they load fast and never bloat the repo.
const a1 = { url: "/lovable-uploads/IMG-20260716-WA0020.jpg" };
const a2 = { url: "/lovable-uploads/IMG-20260716-WA0022.jpg" };
const a3 = { url: "/lovable-uploads/IMG-20260716-WA0024.jpg" };
const a4 = { url: "/lovable-uploads/IMG-20260716-WA0028.jpg" };
const a5 = { url: "/lovable-uploads/IMG-20260716-WA0051.jpg" };
const a6 = { url: "/lovable-uploads/IMG-20260716-WA0042.jpg" };
const a7 = { url: "/lovable-uploads/IMG-20260716-WA0038.jpg" };
const a8 = { url: "/lovable-uploads/IMG-20260716-WA0032.jpg" };
const a9 = { url: "/lovable-uploads/IMG-20260716-WA0048.jpg" };

export type SeedPhoto = {
  id: string;
  src: string;
  album: string;
  caption?: string;
};

export const seedPhotos: SeedPhoto[] = [
  { id: "seed-classes-1", src: a1.url, album: "Renovated Classes", caption: "Sheila House — recently refreshed." },
  { id: "seed-classes-2", src: a2.url, album: "Renovated Classes", caption: "A quiet corridor between classes." },
  { id: "seed-admin", src: a3.url, album: "Admin Block", caption: "The school's administrative block." },
  { id: "seed-ict", src: a4.url, album: "ICT Centre", caption: "The ICT centre." },
  { id: "seed-library-ext", src: a5.url, album: "Library", caption: "14th Generation Library — a gift of the 1969–1973 set." },
  { id: "seed-elib-1", src: a6.url, album: "E-Library", caption: "Silence, please — reading in progress." },
  { id: "seed-elib-2", src: a7.url, album: "E-Library", caption: "Study carrels in the E-Library." },
  { id: "seed-elib-3", src: a8.url, album: "E-Library", caption: "Learning at the keyboard." },
  { id: "seed-garden", src: a9.url, album: "The Garden", caption: "The school garden — hands, soil, patience." },
];
