import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { AGENCIES, VTUBERS } from "@/lib/mock-data";

export const Route = createFileRoute("/agencies")({
  head: () => ({
    meta: [
      { title: "Agencies — Indian VTuber Index" },
      { name: "description", content: "Talent agencies shaping the Indian VTuber scene." },
      { property: "og:title", content: "VTuber Agencies — Indian VTuber Index" },
      { property: "og:description", content: "Discover Indian VTuber talent agencies and their rosters." },
    ],
  }),
  component: AgenciesPage,
});

function AgenciesPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold md:text-4xl">Agencies</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Talent agencies shaping the Indian VTuber scene.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {AGENCIES.map((a) => {
            const roster = VTUBERS.filter((v) => v.agency === a.name).slice(0, 6);
            return (
              <div key={a.slug} className="relative overflow-hidden rounded-3xl glass p-6">
                <div
                  className="absolute -right-16 -top-16 size-56 rounded-full opacity-30 blur-3xl"
                  style={{ background: a.color }}
                />
                <div className="relative flex items-start gap-4">
                  <div
                    className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-2xl"
                    style={{ background: `linear-gradient(135deg, ${a.color}, oklch(0.2 0.03 285))` }}
                  >
                    <img src={a.logo} alt={a.name} className="size-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-xl font-bold">{a.name}</h2>
                    <p className="text-sm text-muted-foreground">{a.tagline}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span>Est. {a.founded}</span>
                      <span>·</span>
                      <span>{a.memberCount} members</span>
                      <span>·</span>
                      <span>{a.generations.join(" · ")}</span>
                    </div>
                  </div>
                </div>

                {roster.length > 0 && (
                  <>
                    <div className="relative mt-6 mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Roster
                    </div>
                    <div className="relative grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {roster.map((v) => (
                        <Link
                          key={v.slug}
                          to="/vtuber/$slug"
                          params={{ slug: v.slug }}
                          className="flex flex-col items-center gap-1 rounded-xl p-2 text-center transition-colors hover:bg-white/5"
                        >
                          <div
                            className="size-14 overflow-hidden rounded-full"
                            style={{ background: `linear-gradient(135deg, ${v.color}, oklch(0.2 0.03 285))` }}
                          >
                            <img src={v.avatar} alt="" className="size-full object-cover" />
                          </div>
                          <span className="line-clamp-1 text-[10px] font-medium">{v.name}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
