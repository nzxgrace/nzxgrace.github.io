import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — Indian VTuber Index" },
      { name: "description", content: "Debuts, graduations, events, and community stories." },
      { property: "og:title", content: "News — Indian VTuber Index" },
      { property: "og:description", content: "Latest news from the Indian VTuber community." },
    ],
  }),
  component: NewsPage,
});

const POSTS = [
  { tag: "Event", title: "IVI Summer Fest 2026 lineup revealed", desc: "48 hours of non-stop streams featuring 50+ creators from across India.", date: "3 days ago" },
  { tag: "Debut", title: "Aether Live Gen 2 debut date confirmed", desc: "Three new talents set to take the stage next month.", date: "5 days ago" },
  { tag: "Milestone", title: "Community crosses 2M combined followers", desc: "A landmark moment for the Indian VTuber scene.", date: "1 week ago" },
  { tag: "Graduation", title: "Farewell stream announced for Mira Nakamura", desc: "After two amazing years, Mira will be moving on to new adventures.", date: "1 week ago" },
  { tag: "Agency", title: "Neo Desi Productions announces Wave 3 auditions", desc: "Looking for the next generation of desi virtual creators.", date: "2 weeks ago" },
  { tag: "Update", title: "New verification system launches this month", desc: "Agencies and indies can now request verified badges directly.", date: "2 weeks ago" },
];

function NewsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10 md:px-6">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold md:text-4xl">News</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Debuts, graduations, events, and community stories.
          </p>
        </div>
        <div className="space-y-4">
          {POSTS.map((p, i) => (
            <article key={i} className="rounded-2xl glass p-6 transition-all hover:-translate-y-0.5">
              <div className="flex items-center gap-3 text-xs">
                <span className="rounded-full bg-neon-purple/20 px-2 py-0.5 font-bold uppercase tracking-widest text-neon-purple">
                  {p.tag}
                </span>
                <span className="text-muted-foreground">{p.date}</span>
              </div>
              <h2 className="mt-3 font-display text-xl font-bold">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
