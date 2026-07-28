import { createFileRoute, Link } from "@tanstack/react-router";
import { Radio, Users, Youtube, Twitch } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { VTUBERS, formatNumber } from "@/lib/mock-data";

export const Route = createFileRoute("/live")({
  head: () => ({
    meta: [
      { title: "Live Now — Indian VTuber Index" },
      { name: "description", content: "Watch Indian VTubers streaming right now." },
      { property: "og:title", content: "Who's Live — Indian VTuber Index" },
      { property: "og:description", content: "Currently live Indian VTubers, all in one place." },
    ],
  }),
  component: LivePage,
});

function LivePage() {
  const live = VTUBERS.filter((v) => v.status === "live" && v.liveInfo);
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-75" />
            <span className="relative inline-flex size-3 rounded-full bg-live" />
          </div>
          <h1 className="font-display text-3xl font-bold md:text-4xl">Live Now</h1>
          <span className="ml-2 rounded-full bg-live/20 px-3 py-1 text-xs font-bold text-live">
            {live.length} streaming
          </span>
        </div>

        {live.length === 0 ? (
          <div className="rounded-2xl glass py-24 text-center text-muted-foreground">
            No one is live right now. Check back later!
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {live.map((v) => (
              <Link
                to="/vtuber/$slug"
                params={{ slug: v.slug }}
                key={v.slug}
                className="group overflow-hidden rounded-2xl glass transition-all hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img src={v.liveInfo!.thumbnail} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-live px-2 py-1 text-[10px] font-bold text-white">
                    <Radio className="size-3 animate-pulse" /> LIVE
                  </div>
                  <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur">
                    <Users className="size-3" /> {formatNumber(v.liveInfo!.viewers)}
                  </div>
                  <div className="absolute left-3 right-3 bottom-3">
                    <p className="line-clamp-2 text-sm font-semibold text-white">{v.liveInfo!.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4">
                  <div
                    className="size-10 shrink-0 overflow-hidden rounded-full"
                    style={{ background: `linear-gradient(135deg, ${v.color}, oklch(0.2 0.03 285))` }}
                  >
                    <img src={v.avatar} alt="" className="size-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold">{v.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{v.liveInfo!.game}</div>
                  </div>
                  {v.liveInfo!.platform === "YouTube" ? (
                    <Youtube className="size-4 text-live" />
                  ) : (
                    <Twitch className="size-4 text-neon-purple" />
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
