import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Activity,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Reveal } from "@/components/Motion";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SITE } from "@/lib/navigation";
import { PSEO_CONDITIONS, PSEO_SERVICES } from "@/lib/pSEO-data";
import {
  PSEO_TARGET_CITIES,
  buildPageMetadata,
  parseCityNvSlug,
} from "@/lib/pSEO-routing";
import { nearbyCities } from "@/lib/pSEO-content";
import { getDisplayedGoogleReviews } from "@/lib/google-reviews";

/**
 * City hub page, `/{city}-nv/` (e.g. /fernley-nv/).
 *
 * Lives under the existing `[service]` dynamic segment so it can co-exist
 * with `[service]/[city]/page.tsx` without creating sibling dynamic
 * folders at the same level (Next.js would reject that). The param is
 * still called `service` for the router, but it always carries a
 * `{city-slug}-nv` value here.
 */

export const dynamicParams = false;

type Params = { service: string };

export async function generateStaticParams(): Promise<Params[]> {
  return PSEO_TARGET_CITIES.map((c) => ({ service: `${c.slug}-nv` }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { service } = await params;
  const cityObj = parseCityNvSlug(service);
  if (!cityObj) return {};
  return buildPageMetadata({
    title: `Chiropractic & Medical Services in ${cityObj.name}, NV`,
    description: `Find chiropractic care, joint injections, medical weight loss and more in ${cityObj.name}, NV. Same-week appointments at Ascension Health serving ${cityObj.region}.`,
    path: `/${service}/`,
  });
}

export default async function CityHubPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { service } = await params;
  const cityObj = parseCityNvSlug(service);
  if (!cityObj) notFound();

  const cityName = cityObj.name;
  const surrounding = nearbyCities(cityObj);
  const { reviews } = await getDisplayedGoogleReviews();
  const featuredReview = reviews[0];

  const pagePath = `/${service}/`;

  return (
    <main className="bg-slate-50">
      <SchemaMarkup
        pagePath={pagePath}
        areaServed={[cityName, ...surrounding.map((c) => c.name)]}
        medicalSpecialty={["Chiropractic", "PainManagement"]}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: `${cityName}, NV`, url: pagePath },
        ]}
      />

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
        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-28">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-brand-100/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden>·</li>
              <li className="text-white font-medium">{cityName}, NV</li>
            </ol>
          </nav>

          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent ring-1 ring-white/15">
              <MapPin className="h-3.5 w-3.5" />
              Serving {cityName} & {cityObj.region}
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight max-w-4xl">
              Chiropractic & Medical Services in {cityName}, NV
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-5 max-w-2xl text-lg text-brand-100/90 leading-relaxed">
              Ascension Health serves {cityName} from our Fernley clinic with
              chiropractic, joint and trigger-point
              injections, medical weight loss, hormone therapy, and a full
              line of pain and wellness services, drug-free,
              evidence-based, and built around a real plan with progress
              markers.
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

      {/* ─── INTRO + WHY CHOOSE ─── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
              Local Care in {cityName}
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-brand-950">
              One clinical team for everything that hurts, or holds you back
            </h2>
            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
              <p>
                Most {cityName} patients come to us because they're tired of
                being passed between specialists who only see one piece of
                the puzzle. We're built differently: chiropractic, physical
                therapy, injections, and medical wellness are all in-house,
                so your plan can change shape as your body responds, 
                without starting over with a new clinic.
              </p>
              <p>
                We see {cityName} residents the same week, accept most major
                insurance, and document everything Medicare and workers'
                comp need. If we're not the right fit, we'll tell you and
                point you to who is.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <CheckCircle2 className="h-5 w-5" />, t: "Same-Week Appointments", b: "Often see new patients within 5 days." },
              { icon: <ShieldCheck className="h-5 w-5" />, t: "Most Insurance Accepted", b: "We verify benefits before your first visit." },
              { icon: <Stethoscope className="h-5 w-5" />, t: "Evidence-Based Plans", b: "Written goals, measurable progress markers." },
              { icon: <CalendarCheck className="h-5 w-5" />, t: "One Clinical Team", b: "Chiro + PT + medical wellness under one roof." },
            ].map((c) => (
              <Reveal key={c.t}>
                <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200/70 h-full">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                    {c.icon}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-brand-950">
                    {c.t}
                  </h3>
                  <p className="mt-1 text-sm text-slate-700">{c.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES IN THIS CITY ─── */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
              Services
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-brand-950">
              Treatments available in {cityName}
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {PSEO_SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}/${cityObj.slug}-nv/`}
                    className="group flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-200/70 hover:bg-brand-50 hover:ring-brand-200 transition-colors h-full"
                  >
                    <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                      <Stethoscope className="h-4 w-4" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-display font-semibold text-brand-950 leading-snug">
                        {s.name} in {cityName}
                      </span>
                      <span className="mt-1 block text-xs text-slate-600 leading-snug">
                        {s.benefit}
                      </span>
                    </span>
                    <ArrowRight className="mt-1 h-4 w-4 text-brand-600 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ─── CONDITIONS IN THIS CITY ─── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
              Conditions
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-brand-950">
              What we treat for {cityName} patients
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {PSEO_CONDITIONS.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}/${cityObj.slug}-nv/`}
                    className="group flex items-center gap-3 rounded-xl bg-slate-50 p-3.5 ring-1 ring-slate-200/70 hover:bg-brand-50 hover:ring-brand-200 transition-colors h-full"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-brand-700 ring-1 ring-brand-100">
                      <Activity className="h-4 w-4" />
                    </span>
                    <span className="flex-1 text-sm font-medium text-slate-800 group-hover:text-brand-900 leading-snug">
                      {c.name} treatment in {cityName}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ─── NEARBY CITIES ─── */}
      {surrounding.length > 0 && (
        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-brand-950">
                Also serving cities near {cityName}
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <ul className="mt-6 flex flex-wrap gap-2">
                {surrounding.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/${c.slug}-nv/`}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-brand-800 ring-1 ring-brand-100 hover:bg-brand-50 transition-colors"
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      {c.name}, NV
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 py-16 text-white">
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold">
              Ready to get started in {cityName}?
            </h2>
            <p className="mt-3 text-brand-100/90 max-w-2xl mx-auto">
              Most new {cityName} patients are seen within the week. We'll
              verify your insurance before your first visit and build a real
              plan with progress markers, not just a stack of adjustments.
            </p>
          </Reveal>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
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
          {featuredReview && (
            <Reveal delay={0.1}>
              <figure className="mt-12 max-w-2xl mx-auto rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 text-left">
                <blockquote className="text-brand-100/90 italic whitespace-pre-line">
                  &ldquo;{featuredReview.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-sm text-brand-100/70">
                  {featuredReview.name}
                  {featuredReview.relativeTime ? ` · ${featuredReview.relativeTime}` : ""}
                  {" · Google"}
                </figcaption>
              </figure>
            </Reveal>
          )}
        </div>
      </section>
    </main>
  );
}
