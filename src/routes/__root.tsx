import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header, Footer } from "../components/SiteChrome";
import { Petals } from "../components/Petals";
import { LoadingScreen } from "../components/LoadingScreen";
const logoAsset = { url: "/lovable-uploads/mayflower-logo.jpeg" };


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-warm px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow mb-6">The path has parted from the map</p>
        <h1 className="serif text-6xl text-forest">404</h1>
        <p className="mt-4 text-muted-foreground">This page has drifted away like a petal in the wind.</p>
        <div className="mt-8">
          <Link to="/" className="btn-primary">Return home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-warm px-4">
      <div className="max-w-md text-center">
        <h1 className="serif text-3xl text-forest">A quiet interruption</h1>
        <p className="mt-3 text-sm text-muted-foreground">Something didn't load. Please try again in a moment.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-primary">Try again</button>
          <a href="/" className="btn-ghost">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mayflower Junior School, Ikenne — Knowledge is Light" },
      { name: "description", content: "Founded in 1956 by Dr. Tai Solarin in Ikenne, Ogun State — Mayflower Junior School is a home of learning, discipline and light for the leaders of tomorrow." },
      { name: "author", content: "Mayflower Junior School, Ikenne" },
      { name: "theme-color", content: "#f6f4ec" },
      { property: "og:title", content: "Mayflower Junior School, Ikenne — Knowledge is Light" },
      { property: "og:description", content: "Founded in 1956 by Dr. Tai Solarin in Ikenne, Ogun State — Mayflower Junior School is a home of learning, discipline and light for the leaders of tomorrow." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Mayflower Junior School" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Mayflower Junior School, Ikenne — Knowledge is Light" },
      { name: "twitter:description", content: "Founded in 1956 by Dr. Tai Solarin in Ikenne, Ogun State — Mayflower Junior School is a home of learning, discipline and light for the leaders of tomorrow." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/9b3035c5-2d4e-4495-bf5d-9a6c21c08cb7" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/9b3035c5-2d4e-4495-bf5d-9a6c21c08cb7" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" },
      { rel: "stylesheet", href: appCss },
    ],

  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body style={{ ["--watermark-url" as string]: `url(${logoAsset.url})` }}>
        {children}
        <Scripts />
      </body>
    </html>
  );
}


function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingScreen />
      <Petals count={8} />
      <Header />
      <main className="relative pt-20 md:pt-24" style={{ zIndex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
