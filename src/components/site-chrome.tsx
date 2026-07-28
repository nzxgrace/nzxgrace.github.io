import { Link } from "@tanstack/react-router";
import { Search, Menu } from "lucide-react";
import { useState } from "react";

const NAV = [
  { to: "/directory", label: "Directory" },
  { to: "/live", label: "Live Now" },
  { to: "/agencies", label: "Agencies" },
  { to: "/news", label: "News" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-gradient-brand font-display text-sm font-bold text-white">
              IV
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              Indian VTuber Index
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-md px-3 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                activeProps={{ className: "text-foreground bg-white/5" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/directory"
            className="hidden sm:inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <Search className="size-3.5" /> Search VTubers...
          </Link>
          <Link
            to="/submit"
            className="hidden md:inline-flex items-center rounded-full bg-gradient-brand px-4 py-1.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
          >
            Submit Profile
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden rounded-md p-2 hover:bg-white/5"
            aria-label="Menu"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border px-4 py-3 flex flex-col gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/submit"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-gradient-brand px-4 py-2 text-center text-sm font-semibold text-white"
          >
            Submit Profile
          </Link>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-gradient-brand font-display text-sm font-bold text-white">
                IV
              </span>
              <span className="font-display text-lg font-bold">Indian VTuber Index</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The definitive community-driven hub for VTubers from India. Built by fans, for fans.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/directory" className="hover:text-foreground">Directory</Link></li>
              <li><Link to="/live" className="hover:text-foreground">Live Now</Link></li>
              <li><Link to="/agencies" className="hover:text-foreground">Agencies</Link></li>
              <li><Link to="/submit" className="hover:text-foreground">Submit VTuber</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Discord</a></li>
              <li><a href="#" className="hover:text-foreground">Twitter / X</a></li>
              <li><a href="#" className="hover:text-foreground">GitHub</a></li>
              <li><a href="#" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Indian VTuber Index. Fan-run, not affiliated with any agency.</p>
          <p>Made with ♡ for the community.</p>
        </div>
      </div>
    </footer>
  );
}
