import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  MapPin,
  Phone,
  Stethoscope,
  Activity,
} from "lucide-react";
import { BottomCTA } from "@/components/InteriorPage";
import { Reveal } from "@/components/Motion";
import { SITE } from "@/lib/navigation";
import { PSEO_CONDITIONS, PSEO_SERVICES } from "@/lib/pSEO-data";
import { PSEO_TARGET_CITIES, buildPageMetadata } from "@/lib/pSEO-routing";

/**
 * Public-facing directory of every programmatic SEO page.
 *
 * 16 cities × (1 hub + 17 services + 25 conditions) → 688 internal links,
 * plus the 16 hub links and an alphabetical jump-nav. Every link is a real
 * `<Link>` so Googlebot can walk the silo with no JavaScript.
 */

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/areas-we-serve/", buildPageMetadata({
  title: "Areas We Serve in Fernley, NV",
  description:
    "Browse every Nevada city Ascension Health serves, chiropractic, joint injections, medical weight loss, hormone therapy and more from our Fernley clinic.",
  path: "/areas-we-serve/",
}));
}

// Sorted copy so the directory reads alphabetically regardless of source order.
const CITIES = [...PSEO_TARGET_CITIES].sort((a, b) =>
  a.name.localeCompare(b.name)
);

export default function AreasWeServePage() {
  return (
    <main className="bg-slate-50">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 text-white">
        <div
          aria-hidden
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div
          aria-hidden
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-400/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-brand-100/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden>·</li>
              <li className="text-white font-medium">Areas We Serve</li>
            </ol>
          </nav>

          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent ring-1 ring-white/15">
              <MapPin className="h-3.5 w-3.5" />
              {CITIES.length + 1} Cities Served
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight max-w-4xl">
              Areas We Serve Across the West
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-5 max-w-2xl text-lg text-brand-100/90 leading-relaxed">
              Ascension Health serves patients from {CITIES.length} Nevada
              cities at our Fernley clinic, plus auto accident injury care in
              Eugene, OR. Choose your city for chiropractic
              care, injections, medical weight loss,
              hormone therapy and more, with same-week appointments and
              most major insurance accepted.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={SITE.appointmentsHref}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-brand-950 hover:bg-accent-soft transition-colors shadow-lg shadow-accent/20"
              >
                Request Appointment
              </Link>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/20 transition-colors"
              >
                <Phone className="h-4 w-4" /> Call {SITE.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── JUMP NAV ─── */}
      <section className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
              Jump to:
            </span>
            <ul className="flex flex-wrap items-center gap-1.5">
              {CITIES.map((c) => (
                <li key={c.slug}>
                  <a
                    href={`#${c.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-800 transition-colors"
                  >
                    <MapPin className="h-3 w-3" />
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── CITY HUB GRID (top-level entry points) ─── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
              City Hubs
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-brand-950">
              Start with your city
            </h2>
            <p className="mt-3 max-w-2xl text-slate-700 leading-relaxed">
              Each city hub lists every service and condition we treat for
              local patients, plus drive time, nearby cities, and what to
              expect on your first visit.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {CITIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}-nv/`}
                    className="group flex h-full items-start gap-3 rounded-2xl bg-gradient-to-br from-slate-50 to-white p-5 ring-1 ring-slate-200/70 hover:from-brand-50 hover:to-white hover:ring-brand-200 transition-all"
                  >
                    <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 text-white shadow-md">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-base font-semibold text-brand-950 leading-tight">
                        {c.name}, NV
                      </span>
                      <span className="mt-1 block text-xs text-slate-600">
                        {c.region}
                      </span>
                    </span>
                    <ArrowRight className="mt-1 h-4 w-4 text-brand-600 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
              <li key="eugene-or">
                <Link
                  href="/eugene-or/"
                  className="group flex h-full items-start gap-3 rounded-2xl bg-gradient-to-br from-slate-50 to-white p-5 ring-1 ring-slate-200/70 hover:from-brand-50 hover:to-white hover:ring-brand-200 transition-all"
                >
                  <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 text-white shadow-md">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-base font-semibold text-brand-950 leading-tight">
                      Eugene, OR
                    </span>
                    <span className="mt-1 block text-xs text-slate-600">
                      Auto Accident Injury Care
                    </span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 text-brand-600 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ─── PER-CITY DIRECTORIES ─── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 space-y-16">
          {CITIES.map((city) => (
            <article
              key={city.slug}
              id={city.slug}
              className="scroll-mt-24 rounded-3xl bg-white p-7 sm:p-10 shadow-sm ring-1 ring-slate-100"
            >
              <header className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                    {city.region}
                  </p>
                  <h2 className="mt-1 font-display text-3xl sm:text-4xl font-semibold text-brand-950">
                    {city.name}, NV
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    {PSEO_SERVICES.length} services · {PSEO_CONDITIONS.length}{" "}
                    conditions treated
                  </p>
                </div>
                <Link
                  href={`/${city.slug}-nv/`}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 transition-colors"
                >
                  Visit {city.name} Hub
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </header>

              <div className="mt-8 grid gap-10 lg:grid-cols-2">
                {/* Services column */}
                <div>
                  <div className="flex items-center gap-2 text-brand-800">
                    <Stethoscope className="h-5 w-5" />
                    <h3 className="font-display text-lg font-semibold">
                      Services in {city.name}
                    </h3>
                  </div>
                  <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                    {PSEO_SERVICES.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/${s.slug}/${city.slug}-nv/`}
                          className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-800 transition-colors"
                        >
                          <span className="truncate">
                            {s.name} in {city.name}
                          </span>
                          <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-600" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Conditions column */}
                <div>
                  <div className="flex items-center gap-2 text-brand-800">
                    <Activity className="h-5 w-5" />
                    <h3 className="font-display text-lg font-semibold">
                      Conditions Treated in {city.name}
                    </h3>
                  </div>
                  <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                    {PSEO_CONDITIONS.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/${c.slug}/${city.slug}-nv/`}
                          className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-800 transition-colors"
                        >
                          <span className="truncate">
                            {c.name} in {city.name}
                          </span>
                          <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-600" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <BottomCTA
        kicker="Don't see your city?"
        heading={`Call ${SITE.phone}`}
        body="We see patients from across Nevada, even outside the cities listed here. Call our Fernley team to check availability and verify your insurance."
      />
    </main>
  );
}
