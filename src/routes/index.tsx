import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Radio, TrendingUp, Users, Globe, Building2, Zap } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { VTuberCard } from "@/components/vtuber-card";
import { VTUBERS, AGENCIES, STATS, formatNumber } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Indian VTuber Index — Discover Indian VTubers" },
      {
        name: "description",
        content:
          "The largest community-driven directory of VTubers from India. Discover indies, agencies, live streams, and more.",
      },
      { property: "og:title", content: "Indian VTuber Index" },
      { property: "og:description", content: "Discover the next generation of Indian virtual creators." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = VTUBERS.slice(0, 8);
  const trending = [...VTUBERS].sort((a, b) => b.followers - a.followers).slice(0, 4);
  const newest = [...VTUBERS].sort((a, b) => b.debut.localeCompare(a.debut)).slice(0, 4);
  const marqueeAvatars = [...VTUBERS, ...VTUBERS];

  return (
    <>
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden pt-16 pb-24">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-live" />
              </span>
              <span className="font-medium text-muted-foreground">
                {STATS.active} VTubers currently active
              </span>
            </div>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              Discover Indian
              <br />
              <span className="text-gradient-brand">VTubers</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              The largest community-driven directory of virtual creators from India. Explore indies, agencies, live streams, and everything in between.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/directory"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-lg glow-purple transition-transform hover:scale-[1.03]"
              >
                Browse Directory
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/submit"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold hover:bg-white/10"
              >
                <Sparkles className="size-4" /> Submit Your Profile
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Marquee */}
        <div className="mt-16 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-4">
            {marqueeAvatars.map((v, i) => (
              <div
                key={i}
                className="relative size-40 shrink-0 overflow-hidden rounded-2xl glass"
                style={{ background: `linear-gradient(135deg, ${v.color}, oklch(0.2 0.03 285))` }}
              >
                <img src={v.avatar} alt="" className="h-full w-full object-cover opacity-90" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-[10px] font-semibold text-white">
                  {v.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-3 rounded-3xl glass p-6 md:grid-cols-6">
          <Stat icon={<Users className="size-4" />} label="Total VTubers" value={STATS.total} color="text-neon-purple" />
          <Stat icon={<Radio className="size-4" />} label="Active" value={STATS.active} color="text-live" />
          <Stat icon={<Building2 className="size-4" />} label="Agencies" value={STATS.agencies} color="text-neon-cyan" />
          <Stat icon={<Sparkles className="size-4" />} label="Indies" value={STATS.indies} color="text-neon-pink" />
          <Stat icon={<Globe className="size-4" />} label="Languages" value={STATS.languages} color="text-neon-cyan" />
          <Stat icon={<Zap className="size-4" />} label="Followers" value={formatNumber(STATS.totalFollowers)} color="text-neon-pink" />
        </div>
      </section>

      {/* FEATURED */}
      <Section
        title="Featured VTubers"
        subtitle="Hand-picked creators making waves in the community."
        link={{ to: "/directory", label: "View all" }}
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {featured.map((v, i) => (
            <VTuberCard key={v.slug} v={v} index={i} />
          ))}
        </div>
      </Section>

      {/* TRENDING + NEWEST */}
      <div className="mx-auto mt-24 grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
        <SidebarSection title="Trending this Week" icon={<TrendingUp className="size-4 text-neon-pink" />}>
          {trending.map((v, i) => (
            <TrendingRow key={v.slug} v={v} rank={i + 1} />
          ))}
        </SidebarSection>
        <SidebarSection title="Newest Debuts" icon={<Sparkles className="size-4 text-neon-cyan" />}>
          {newest.map((v, i) => (
            <TrendingRow key={v.slug} v={v} rank={i + 1} />
          ))}
        </SidebarSection>
      </div>

      {/* AGENCIES */}
      <Section
        title="Featured Agencies"
        subtitle="Talent agencies shaping the Indian VTuber scene."
        link={{ to: "/agencies", label: "All agencies" }}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {AGENCIES.map((a) => (
            <Link
              key={a.slug}
              to="/agencies"
              className="group relative overflow-hidden rounded-2xl glass p-6 transition-all hover:-translate-y-1"
            >
              <div
                className="absolute -right-8 -top-8 size-32 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-60"
                style={{ background: a.color }}
              />
              <div className="relative flex items-center gap-4">
                <div
                  className="grid size-14 place-items-center rounded-xl"
                  style={{ background: `linear-gradient(135deg, ${a.color}, oklch(0.2 0.03 285))` }}
                >
                  <img src={a.logo} alt={a.name} className="size-full rounded-xl object-cover" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">{a.name}</h3>
                  <p className="text-xs text-muted-foreground">Est. {a.founded}</p>
                </div>
              </div>
              <p className="relative mt-4 text-sm text-muted-foreground">{a.tagline}</p>
              <div className="relative mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>{a.memberCount} members</span>
                <span>{a.generations.length} generations</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* NEWS teaser */}
      <Section title="Latest News" subtitle="Debuts, graduations, and community stories.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { tag: "Event", title: "IVI Summer Fest 2026 lineup revealed", desc: "48 hours of non-stop streams featuring 50+ creators." },
            { tag: "Debut", title: "Aether Live Gen 2 debut date confirmed", desc: "Three new talents set to take the stage next month." },
            { tag: "Milestone", title: "Community crosses 2M combined followers", desc: "A landmark moment for the Indian VTuber scene." },
          ].map((n, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl glass p-6 transition-all hover:-translate-y-1"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-neon-cyan">{n.tag}</span>
              <h3 className="mt-2 font-display text-lg font-semibold group-hover:text-neon-pink">{n.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{n.desc}</p>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="mx-auto mt-32 max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl glass p-12 text-center">
          <div className="absolute inset-0 bg-hero-glow opacity-60" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Are you a VTuber? Join the <span className="text-gradient-brand">index</span>.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Submit your profile and become part of the definitive directory for Indian VTubers.
            </p>
            <Link
              to="/submit"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-lg glow-pink"
            >
              Submit Your Profile <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

function Stat({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className={`flex items-center gap-1.5 ${color}`}>{icon}</div>
      <div className="font-display text-2xl font-bold">{value}</div>
      <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Section({
  title,
  subtitle,
  link,
  children,
}: {
  title: string;
  subtitle?: string;
  link?: { to: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-6">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold md:text-3xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {link && (
          <Link
            to={link.to}
            className="shrink-0 text-sm font-semibold text-neon-cyan hover:underline"
          >
            {link.label} →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function SidebarSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h2 className="font-display text-xl font-bold">{title}</h2>
      </div>
      <div className="divide-y divide-border rounded-2xl glass">{children}</div>
    </div>
  );
}

function TrendingRow({ v, rank }: { v: import("@/lib/mock-data").VTuber; rank: number }) {
  return (
    <Link
      to="/vtuber/$slug"
      params={{ slug: v.slug }}
      className="flex items-center gap-4 p-4 transition-colors hover:bg-white/5"
    >
      <span className="w-6 shrink-0 font-display text-2xl font-bold text-muted-foreground/50">
        {String(rank).padStart(2, "0")}
      </span>
      <div
        className="size-12 shrink-0 overflow-hidden rounded-lg"
        style={{ background: `linear-gradient(135deg, ${v.color}, oklch(0.2 0.03 285))` }}
      >
        <img src={v.avatar} alt={v.name} className="size-full object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-semibold">{v.name}</div>
        <div className="truncate text-xs text-muted-foreground">
          {v.agency ?? "Independent"} · {v.languages.join(", ")}
        </div>
      </div>
      <span className="shrink-0 text-xs font-medium text-muted-foreground">
        {formatNumber(v.followers)}
      </span>
    </Link>
  );
}
