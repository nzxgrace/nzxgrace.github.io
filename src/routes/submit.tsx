import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submit a VTuber — Indian VTuber Index" },
      { name: "description", content: "Submit your VTuber profile to the Indian VTuber Index." },
      { property: "og:title", content: "Submit — Indian VTuber Index" },
      { property: "og:description", content: "Add yourself or a VTuber you love to the index." },
    ],
  }),
  component: SubmitPage,
});

function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-16 md:px-6">
        {submitted ? (
          <div className="rounded-3xl glass p-10 text-center">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-gradient-brand">
              <CheckCircle2 className="size-8 text-white" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-bold">Submission received!</h1>
            <p className="mt-2 text-muted-foreground">
              Thanks! Our team will review and get back to you soon.
            </p>
            <Link
              to="/directory"
              className="mt-6 inline-flex rounded-full bg-gradient-brand px-6 py-2.5 text-sm font-semibold text-white"
            >
              Browse Directory
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-brand shadow-lg glow-purple">
                <Sparkles className="size-6 text-white" />
              </div>
              <h1 className="font-display text-3xl font-bold md:text-4xl">Submit a VTuber</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Add yourself or a creator you love. All submissions are reviewed before going live.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4 rounded-2xl glass p-6"
            >
              <Field label="VTuber Name *">
                <input required className="input" placeholder="e.g. Mira Nakamura" />
              </Field>
              <Field label="Twitter / X Handle">
                <input className="input" placeholder="@handle" />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="YouTube URL">
                  <input className="input" placeholder="https://youtube.com/@..." />
                </Field>
                <Field label="Twitch URL">
                  <input className="input" placeholder="https://twitch.tv/..." />
                </Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Agency">
                  <input className="input" placeholder="Independent, or agency name" />
                </Field>
                <Field label="Languages">
                  <input className="input" placeholder="Hindi, English, ..." />
                </Field>
              </div>
              <Field label="Short Bio">
                <textarea className="input min-h-[100px]" placeholder="Tell us about them..." />
              </Field>
              <button
                type="submit"
                className="w-full rounded-full bg-gradient-brand py-3 font-semibold text-white shadow-lg transition-transform hover:scale-[1.01]"
              >
                Submit for Review
              </button>
              <p className="text-center text-xs text-muted-foreground">
                By submitting, you agree that this info is accurate and public-facing.
              </p>
            </form>

            <style>{`
              .input {
                width: 100%;
                background: color-mix(in oklab, white 5%, transparent);
                border: 1px solid var(--border);
                border-radius: 12px;
                padding: 10px 14px;
                font-size: 14px;
                color: inherit;
                outline: none;
                transition: border-color 0.15s;
              }
              .input:focus { border-color: var(--primary); }
            `}</style>
          </>
        )}
      </main>
      <SiteFooter />
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
