import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CheckCircle2, Radio, Youtube, Twitch, Twitter, Instagram, Users } from "lucide-react";
import type { VTuber } from "@/lib/mock-data";
import { formatNumber } from "@/lib/mock-data";

export function VTuberCard({ v, index = 0 }: { v: VTuber; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.03 }}
    >
      <Link
        to="/vtuber/$slug"
        params={{ slug: v.slug }}
        className="group relative block overflow-hidden rounded-2xl glass transition-all hover:-translate-y-1 hover:shadow-2xl"
        style={
          {
            ["--glow-color" as string]: v.color,
          } as React.CSSProperties
        }
      >
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at 50% 0%, ${v.color}, transparent 70%)`,
            opacity: 0,
          }}
        />
        <div className="relative aspect-[3/4] overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${v.color}, oklch(0.2 0.03 285))`,
            }}
          />
          <img
            src={v.avatar}
            alt={v.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/60 to-transparent" />

          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {v.status === "live" && (
              <span className="inline-flex items-center gap-1 rounded-md bg-live px-2 py-0.5 text-[10px] font-bold text-white shadow-lg">
                <Radio className="size-2.5 animate-pulse" /> LIVE
              </span>
            )}
            {v.verified && (
              <span className="inline-flex items-center gap-1 rounded-md bg-neon-cyan/20 px-2 py-0.5 text-[10px] font-bold text-neon-cyan ring-1 ring-neon-cyan/40 backdrop-blur">
                <CheckCircle2 className="size-2.5" /> VERIFIED
              </span>
            )}
          </div>
        </div>

        <div className="relative -mt-14 space-y-3 p-4">
          <div>
            <h3 className="font-display text-base font-semibold leading-tight">
              {v.name} <span className="text-neon-pink">{v.oshiMark}</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              {v.agency ?? "Independent"}
              {v.generation && <> · {v.generation}</>}
            </p>
          </div>

          <div className="flex flex-wrap gap-1">
            {v.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-border pt-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              {v.socials.youtube && <Youtube className="size-3.5 hover:text-live" />}
              {v.socials.twitch && <Twitch className="size-3.5 hover:text-neon-purple" />}
              {v.socials.twitter && <Twitter className="size-3.5 hover:text-neon-cyan" />}
              {v.socials.instagram && <Instagram className="size-3.5 hover:text-neon-pink" />}
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <Users className="size-3" /> {formatNumber(v.followers)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
