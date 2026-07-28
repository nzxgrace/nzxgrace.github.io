import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { VTuberCard } from "@/components/vtuber-card";
import { VTUBERS } from "@/lib/mock-data";

export const Route = createFileRoute("/directory")({
  head: () => ({
    meta: [
      { title: "Directory — Indian VTuber Index" },
      { name: "description", content: "Browse and filter every Indian VTuber in one place." },
      { property: "og:title", content: "VTuber Directory — Indian VTuber Index" },
      { property: "og:description", content: "Search, filter, and discover Indian VTubers." },
    ],
  }),
  component: DirectoryPage,
});

const SORTS = ["Most Popular", "Recently Added", "Alphabetical", "Trending"] as const;
type Sort = (typeof SORTS)[number];

function DirectoryPage() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("Most Popular");
  const [agency, setAgency] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [model, setModel] = useState<string>("all");
  const [lang, setLang] = useState<string>("all");

  const agencies = useMemo(
    () => Array.from(new Set(VTUBERS.map((v) => v.agency).filter(Boolean))) as string[],
    [],
  );
  const languages = useMemo(
    () => Array.from(new Set(VTUBERS.flatMap((v) => v.languages))),
    [],
  );

  const filtered = useMemo(() => {
    let list = VTUBERS.filter((v) => {
      if (q && !v.name.toLowerCase().includes(q.toLowerCase()) && !v.tags.some((t) => t.toLowerCase().includes(q.toLowerCase()))) return false;
      if (agency !== "all") {
        if (agency === "indie" && v.agency) return false;
        if (agency !== "indie" && v.agency !== agency) return false;
      }
      if (status !== "all" && v.status !== status) return false;
      if (model !== "all" && v.modelType !== model) return false;
      if (lang !== "all" && !v.languages.includes(lang)) return false;
      return true;
    });
    if (sort === "Most Popular") list = [...list].sort((a, b) => b.followers - a.followers);
    if (sort === "Alphabetical") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "Recently Added") list = [...list].sort((a, b) => b.debut.localeCompare(a.debut));
    if (sort === "Trending") list = [...list].sort((a, b) => (b.status === "live" ? 1 : 0) - (a.status === "live" ? 1 : 0));
    return list;
  }, [q, sort, agency, status, model, lang]);

  const activeFilters = [agency, status, model, lang].filter((f) => f !== "all").length;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold md:text-4xl">Directory</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {filtered.length} of {VTUBERS.length} VTubers
          </p>
        </div>

        {/* Search + sort */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or tag..."
              className="w-full rounded-full glass py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-neon-purple/50"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-full glass px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-neon-purple/50"
          >
            {SORTS.map((s) => (
              <option key={s} value={s}>
                Sort: {s}
              </option>
            ))}
          </select>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-2 rounded-2xl glass p-3">
          <div className="flex items-center gap-2 px-2 text-xs font-semibold text-muted-foreground">
            <SlidersHorizontal className="size-3.5" /> Filters
            {activeFilters > 0 && (
              <span className="rounded-full bg-neon-purple/20 px-2 py-0.5 text-neon-purple">
                {activeFilters}
              </span>
            )}
          </div>
          <FilterSelect value={agency} onChange={setAgency} label="Agency">
            <option value="all">All</option>
            <option value="indie">Independent</option>
            {agencies.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect value={status} onChange={setStatus} label="Status">
            <option value="all">All</option>
            <option value="live">Live Now</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </FilterSelect>
          <FilterSelect value={model} onChange={setModel} label="Model">
            <option value="all">All</option>
            <option value="2D">2D</option>
            <option value="3D">3D</option>
          </FilterSelect>
          <FilterSelect value={lang} onChange={setLang} label="Language">
            <option value="all">All</option>
            {languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </FilterSelect>
          {activeFilters > 0 && (
            <button
              onClick={() => {
                setAgency("all");
                setStatus("all");
                setModel("all");
                setLang("all");
              }}
              className="ml-auto rounded-full px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl glass py-24 text-center text-muted-foreground">
            No VTubers match your filters.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((v, i) => (
              <VTuberCard key={v.slug} v={v} index={i} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}

function FilterSelect({
  value,
  onChange,
  label,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs">
      <span className="text-muted-foreground">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer bg-transparent font-medium outline-none"
      >
        {children}
      </select>
    </label>
  );
}
