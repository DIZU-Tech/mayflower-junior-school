import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/Reveal";
import { useBlog, youtubeEmbed, type BlogPost } from "../lib/store";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Weekly Blog — Mayflower Junior School, Ikenne" },
      { name: "description", content: "Weekly stories, photos and videos from life at Mayflower Junior School, Ikenne." },
      { property: "og:title", content: "Weekly Blog — Mayflower Junior School" },
      { property: "og:description", content: "Stories, photos and videos from campus life at Mayflower." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Blog,
});

function Blog() {
  const { posts } = useBlog();
  return (
    <>
      <section className="section pb-8">
        <div className="container-page max-w-4xl">
          <Reveal><p className="eyebrow">Weekly Blog</p></Reveal>
          <Reveal delay={120}>
            <h1 className="serif text-5xl md:text-7xl mt-4 leading-[1.02]">Life at Mayflower, week by week.</h1>
          </Reveal>
        </div>
      </section>
      <section className="section pt-4">
        <div className="container-page max-w-3xl space-y-10">
          {posts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border p-14 text-center bg-beige/30">
              <p className="serif text-3xl text-forest">The first post is coming soon.</p>
            </div>
          ) : posts.map(p => <PostCard key={p.id} post={p} />)}
        </div>
      </section>
    </>
  );
}

export function PostMedia({ post }: { post: BlogPost }) {
  const yt = post.video ? youtubeEmbed(post.video) : null;
  return (
    <>
      {yt ? (
        <div className="aspect-video"><iframe src={yt} title={post.title} className="w-full h-full" allowFullScreen /></div>
      ) : post.video ? (
        <video src={post.video} controls className="w-full block bg-forest" />
      ) : null}
      {post.image && <img src={post.image} alt="" loading="lazy" className="w-full block object-cover" />}
    </>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="card-soft overflow-hidden">
      <PostMedia post={post} />
      <div className="p-7">
        <div className="text-xs tracking-[0.2em] uppercase text-sage">{post.date}</div>
        <h2 className="serif text-3xl mt-2 text-forest">{post.title}</h2>
        <p className="mt-4 text-forest/80 leading-relaxed whitespace-pre-line break-words">{post.body}</p>
      </div>
    </article>
  );
}
