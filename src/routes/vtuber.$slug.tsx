import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  CheckCircle2,
  Radio,
  Youtube,
  Twitch,
  Twitter,
  Instagram,
  MessageCircle,
  Users,
  Calendar,
  MapPin,
  Ruler,
  Heart,
  Share2,
  Star,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { VTuberCard } from "@/components/vtuber-card";
import { getVTuber, VTUBERS, formatNumber } from "@/lib/mock-data";

export const Route = createFileRoute("/vtuber/$slug")({
  loader: ({ params }) => {
    const v = getVTuber(params.slug);
    if (!v) throw notFound();
    return { v };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "VTuber not found" }, { name: "robots", content: "noindex" }] };
    const v = loaderData.v;
    return {
      meta: [
        { title: `${v.name} — Indian VTuber Index` },
        { name: "description", content: v.bio },
        { property: "og:title", content: `${v.name} — Indian VTuber Index` },
        { property: "og:description", content: v.bio },
        { property: "og:image", content: v.banner },
        { name: "twitter:image", content: v.banner },
      ],
    };
  },
  notFoundComponent: () => (
    <>
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl font-bold">VTuber not found</h1>
        <p className="mt-2 text-muted-foreground">This profile doesn't exist yet.</p>
        <Link to="/directory" className="mt-6 inline-block rounded-full bg-gradient-brand px-5 py-2 text-sm font-semibold text-white">
          Back to directory
        </Link>
      </div>
      <SiteFooter />
    </>
  ),
  component: ProfilePage,
});

function ProfilePage() {
  const { v } = Route.useLoaderData();
  const collaborators = VTUBERS.filter((x) => x.slug !== v.slug && x.agency === v.agency && v.agency).slice(0, 4);
  const recommended = VTUBERS.filter((x) => x.slug !== v.slug).slice(0, 4);

  return (
    <>
      <SiteHeader />
      {/* Banner */}
      <div className="relative h-[280px] w-full overflow-hidden md:h-[380px]">
        <img src={v.banner} alt="" className="h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div
          className="absolute inset-0 opacity-40 mix-blend-color"
          style={{ background: `linear-gradient(135deg, ${v.color}, transparent)` }}
        />
      </div>

      <main className="mx-auto -mt-32 max-w-7xl px-4 pb-16 md:px-6">
        {/* Header row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end">
          <div
            className="relative size-40 shrink-0 overflow-hidden rounded-3xl glass p-1 md:size-52"
            style={{ background: `linear-gradient(135deg, ${v.color}, oklch(0.2 0.03 285))` }}
          >
            <img src={v.avatar} alt={v.name} className="size-full rounded-3xl object-cover" />
          </div>
          <div className="flex-1 pb-2">
            <div className="mb-2 flex flex-wrap gap-2">
              {v.status === "live" && (
                <span className="inline-flex items-center gap-1 rounded-md bg-live px-2 py-1 text-[11px] font-bold text-white">
                  <Radio className="size-3 animate-pulse" /> LIVE NOW
                </span>
              )}
              {v.verified && (
                <span className="inline-flex items-center gap-1 rounded-md bg-neon-cyan/20 px-2 py-1 text-[11px] font-bold text-neon-cyan ring-1 ring-neon-cyan/40">
                  <CheckCircle2 className="size-3" /> VERIFIED
                </span>
              )}
              {v.agency && (
                <span className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-medium text-muted-foreground">
                  {v.agency} · {v.generation}
                </span>
              )}
            </div>
            <h1 className="font-display text-4xl font-bold md:text-5xl">
              {v.name} <span className="text-neon-pink">{v.oshiMark}</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {v.handle} · {v.fanName}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-lg">
              <Heart className="size-4" /> Follow
            </button>
            <button className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-semibold">
              <Share2 className="size-4" />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {/* Live embed */}
            {v.liveInfo && (
              <div className="overflow-hidden rounded-2xl glass">
                <div className="relative aspect-video">
                  <img src={v.liveInfo.thumbnail} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-md bg-live px-2 py-1 text-[11px] font-bold text-white">
                    <Radio className="size-3 animate-pulse" /> LIVE · {formatNumber(v.liveInfo.viewers)} viewers
                  </div>
                  <div className="absolute inset-x-4 bottom-4">
                    <p className="line-clamp-2 font-display text-lg font-semibold text-white">
                      {v.liveInfo.title}
                    </p>
                    <p className="text-xs text-white/80">
                      {v.liveInfo.game} · on {v.liveInfo.platform}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bio */}
            <Panel title="About">
              <p className="text-sm leading-relaxed text-muted-foreground">{v.bio}</p>
              <div className="mt-6 rounded-xl bg-white/5 p-4">
                <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-neon-cyan">Lore</div>
                <p className="text-sm italic text-muted-foreground">{v.lore}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {v.tags.map((t: string) => (
                  <span key={t} className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                    #{t}
                  </span>
                ))}
              </div>
            </Panel>

            {/* Latest videos placeholder */}
            <Panel title="Latest Videos">
              <div className="grid gap-4 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="overflow-hidden rounded-xl bg-white/5">
                    <div
                      className="aspect-video"
                      style={{
                        background: `linear-gradient(135deg, ${v.color}, oklch(0.2 0.03 285))`,
                      }}
                    />
                    <div className="p-3">
                      <div className="line-clamp-2 text-sm font-medium">
                        Stream Highlights #{i + 1} — {v.tags[i % v.tags.length]}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {formatNumber(Math.floor(Math.random() * 50000))} views · {i + 1}d ago
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            {/* Collaborators */}
            {collaborators.length > 0 && (
              <Panel title="Collaborators">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {collaborators.map((c) => (
                    <Link
                      key={c.slug}
                      to="/vtuber/$slug"
                      params={{ slug: c.slug }}
                      className="flex flex-col items-center gap-2 rounded-xl p-3 text-center hover:bg-white/5"
                    >
                      <div
                        className="size-16 overflow-hidden rounded-full"
                        style={{ background: `linear-gradient(135deg, ${c.color}, oklch(0.2 0.03 285))` }}
                      >
                        <img src={c.avatar} alt="" className="size-full object-cover" />
                      </div>
                      <span className="line-clamp-1 text-xs font-medium">{c.name}</span>
                    </Link>
                  ))}
                </div>
              </Panel>
            )}
          </div>

          {/* Right sidebar */}
          <aside className="space-y-6">
            <Panel title="Stats">
              <div className="grid grid-cols-2 gap-4">
                <StatBox icon={<Users className="size-3.5" />} label="Followers" value={formatNumber(v.followers)} />
                <StatBox icon={<Star className="size-3.5" />} label="Subscribers" value={formatNumber(v.subscribers)} />
              </div>
            </Panel>

            <Panel title="Details">
              <dl className="divide-y divide-border text-sm">
                <Row icon={<Calendar className="size-3.5" />} label="Debut" value={new Date(v.debut).toLocaleDateString()} />
                <Row icon={<Calendar className="size-3.5" />} label="Birthday" value={v.birthday} />
                <Row icon={<MapPin className="size-3.5" />} label="From" value={v.state} />
                <Row icon={<Ruler className="size-3.5" />} label="Height" value={v.height} />
                <Row label="Model" value={v.modelType} />
                <Row label="Languages" value={v.languages.join(", ")} />
                <Row label="Fan Name" value={v.fanName} />
                <Row label="Hashtag" value={v.hashtag} />
              </dl>
            </Panel>

            <Panel title="Find them on">
              <div className="grid grid-cols-2 gap-2">
                {v.socials.youtube && <SocialLink icon={<Youtube className="size-4" />} label="YouTube" href={v.socials.youtube} />}
                {v.socials.twitch && <SocialLink icon={<Twitch className="size-4" />} label="Twitch" href={v.socials.twitch} />}
                {v.socials.twitter && <SocialLink icon={<Twitter className="size-4" />} label="Twitter" href={v.socials.twitter} />}
                {v.socials.instagram && <SocialLink icon={<Instagram className="size-4" />} label="Instagram" href={v.socials.instagram} />}
                {v.socials.discord && <SocialLink icon={<MessageCircle className="size-4" />} label="Discord" href={v.socials.discord} />}
              </div>
            </Panel>
          </aside>
        </div>

        {/* Recommended */}
        <section className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-bold">Recommended VTubers</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {recommended.map((r, i) => (
              <VTuberCard key={r.slug} v={r} index={i} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl glass p-6">
      <h2 className="mb-4 font-display text-lg font-bold">{title}</h2>
      {children}
    </div>
  );
}

function StatBox({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/5 p-4">
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        {icon} {label}
      </div>
      <div className="mt-1 font-display text-xl font-bold">{value}</div>
    </div>
  );
}

function Row({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon} {label}
      </dt>
      <dd className="text-sm font-medium">{value}</dd>
    </div>
  );
}

function SocialLink({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs font-medium transition-colors hover:bg-white/10"
    >
      {icon} {label}
    </a>
  );
}
