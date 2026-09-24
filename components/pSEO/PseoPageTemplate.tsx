import Link from "next/link";
import {
  Award,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Clock,
  HeartHandshake,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/Motion";
import { SchemaMarkup, type Breadcrumb, type MedicalEntity } from "@/components/seo/SchemaMarkup";
import { InternalLinks, type InternalLinksTopic } from "@/components/pSEO/InternalLinks";
import { SITE } from "@/lib/navigation";
import { getCondition, getService } from "@/lib/pSEO-routing";
import type { PSEOCity } from "@/lib/pSEO-data";
import { CLINIC_FOUNDING_YEAR } from "@/lib/pSEO-content";
import type { FAQ } from "@/lib/pSEO-content";
import { GoogleReviews } from "@/components/home/GoogleReviews";
import { Testimonials } from "@/components/home/Testimonials";

/**
 * Universal page template for every programmatic SEO page in the Ascension
 * Health site. Renders nine sections (hero → CTA), emits the FAQPage,
 * LocalBusiness, and MedicalOrganization JSON-LD that Google reads.
 *
 * The same template powers service+city, condition+city, near-city, and
 * treatment-detail pages, each route passes a different mix of props
 * (notably `relatedItems`, `subSectionHeading`, and `city`) but the layout,
 * typography, and structured data stay consistent so every page is
 * indexable, internally linked, and >800 words.
 */

export type RelatedItem = { label: string; href: string };

export type PseoPageTemplateProps = {
  /** Slug of the primary topic (service or condition), drives schema. */
  topicSlug: string;
  /** Human-readable topic name, used in trust badge and JSON-LD. */
  topicName: string;
  /** Topic kind, selects MedicalCondition vs MedicalProcedure schema. */
  topicKind: "service" | "condition" | "treatment";
  /** Root-relative path of this page, used to build the canonical & breadcrumb URLs. */
  pagePath: string;
  /** Hero H1. */
  h1: string;
  /** Hero subheading sentence. */
  subheading: string;
  /** Hero badge (e.g. "Serving Reno & Surrounding Areas"). */
  trustBadge: string;
  /** Optional breadcrumb parent. */
  parent?: { label: string; href: string };
  /** Canonical hub URL for the topic (e.g. /services/chiropractic-care/), inserts an extra breadcrumb level when a city is present. */
  topicHubHref?: string;
  /** Section 2, "What is" content. */
  aboutHeading: string;
  aboutParagraphs: string[];
  /** Section 4, list label + linked items. */
  relatedHeading: string;
  relatedItems: RelatedItem[];
  /** Section 6, FAQs (rendered + emitted as FAQPage JSON-LD). */
  faqs: FAQ[];
  /** Section 8, only rendered when present. */
  city?: PSEOCity;
  /** Cities shown in the "Also serving" list. */
  nearbyCities?: PSEOCity[];
  /** Generator for nearby-city links (defaults to /{topicSlug}/{slug}-nv/). */
  buildNearbyHref?: (city: PSEOCity) => string;
  /** Optional bottom-CTA heading override. */
  ctaHeading?: string;
};

export function PseoPageTemplate(props: PseoPageTemplateProps) {
  const {
    topicSlug,
    topicName,
    topicKind,
    pagePath,
    h1,
    subheading,
    trustBadge,
    parent,
    topicHubHref,
    aboutHeading,
    aboutParagraphs,
    relatedHeading,
    relatedItems,
    faqs,
    city,
    nearbyCities = [],
    buildNearbyHref,
    ctaHeading,
  } = props;

  const cityName = city?.name;

  // Build breadcrumb trail. With a city, expand to:
  //   Home → parent → topic (hub link) → City, NV
  // Without a city (e.g. treatment pages), use:
  //   Home → parent → page leaf
  const cleanLeaf = h1.replace(/\s*\|\s*Ascension Health.*$/, "");
  const breadcrumbs: Breadcrumb[] = city
    ? [
        { name: "Home", url: "/" },
        ...(parent ? [{ name: parent.label, url: parent.href }] : []),
        ...(topicHubHref && topicHubHref !== parent?.href
          ? [{ name: topicName, url: topicHubHref }]
          : []),
        { name: `${city.name}, NV`, url: pagePath },
      ]
    : [
        { name: "Home", url: "/" },
        ...(parent ? [{ name: parent.label, url: parent.href }] : []),
        { name: cleanLeaf, url: pagePath },
      ];

  // City + surrounding city names for areaServed.
  const areaServed = cityName
    ? [cityName, ...nearbyCities.map((c) => c.name)]
    : [];

  // MedicalCondition vs MedicalProcedure based on topic kind.
  const medical: MedicalEntity =
    topicKind === "condition"
      ? { kind: "MedicalCondition", name: topicName, description: subheading }
      : { kind: "MedicalProcedure", name: topicName, description: subheading };

  return (
    <main className="bg-slate-50">
      <SchemaMarkup
        pagePath={pagePath}
        areaServed={areaServed}
        medicalSpecialty={[topicName]}
        breadcrumbs={breadcrumbs}
        faqs={faqs}
        medical={medical}
      />

      {/* ─────────── 1. HERO ─────────── */}
      <HeroSection h1={h1} subheading={subheading} trustBadge={trustBadge} breadcrumbs={breadcrumbs} />

      {/* ─────────── 2. WHAT IS ─────────── */}
      <AboutSection heading={aboutHeading} paragraphs={aboutParagraphs} cityName={cityName} />

      {/* ─────────── 3. WHY CHOOSE ─────────── */}
      <WhyChooseSection cityName={cityName} />

      {/* ─────────── 4. RELATED (services or conditions) ─────────── */}
      {/* Skip when InternalLinks (section 8b) will render, keeps total contextual link count under ~20. */}
      {relatedItems.length > 0 && !(city && (topicKind === "service" || topicKind === "condition")) && (
        <RelatedSection heading={relatedHeading} items={relatedItems} />
      )}

      {/* ─────────── 5. WHAT TO EXPECT ─────────── */}
      <WhatToExpectSection cityName={cityName} />

      {/* ─────────── 6. FAQ ─────────── */}
      <FaqSection faqs={faqs} cityName={cityName} topicName={topicName} />

      {/* ─────────── 7. GOOGLE REVIEWS ─────────── */}
      <GoogleReviews>
        {({ reviews, meta }) => (
          <Testimonials
            items={reviews.map((review) => ({
              name: review.name,
              quote: review.quote,
              when: review.relativeTime ?? "Posted on Google",
            }))}
            rating={meta.rating}
            reviewCount={meta.reviewCount}
            reviewsUrl={meta.reviewsUrl}
            heading={
              cityName
                ? `What ${cityName}-area patients say on Google`
                : "What patients say on Google"
            }
          />
        )}
      </GoogleReviews>

      {/* ─────────── 8. LOCAL AREA ─────────── */}
      {city && (
        <LocalAreaSection
          city={city}
          nearbyCities={nearbyCities}
          buildNearbyHref={buildNearbyHref ?? ((c) => `/${topicSlug}/${c.slug}-nv/`)}
        />
      )}

      {/* ─────────── 8b. INTERNAL LINKS (hub & spoke) ─────────── */}
      {city && (() => {
        const linkTopic: InternalLinksTopic | undefined =
          topicKind === "service"
            ? (getService(topicSlug) ? { kind: "service", service: getService(topicSlug)! } : undefined)
            : topicKind === "condition"
              ? (getCondition(topicSlug) ? { kind: "condition", condition: getCondition(topicSlug)! } : undefined)
              : undefined;
        if (!linkTopic) return null;
        return (
          <InternalLinks
            topic={linkTopic}
            city={city}
            nearbyCities={nearbyCities}
          />
        );
      })()}

      {/* ─────────── 9. BIG CTA ─────────── */}
      <BigCtaSection
        heading={
          ctaHeading ??
          (cityName ? `Ready to get started in ${cityName}?` : `Ready to get started?`)
        }
        cityName={cityName}
      />
    </main>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Section components
// ──────────────────────────────────────────────────────────────────────────

function HeroSection({
  h1,
  subheading,
  trustBadge,
  breadcrumbs,
}: {
  h1: string;
  subheading: string;
  trustBadge: string;
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 text-white">
      <div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div aria-hidden className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div aria-hidden className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-brand-500/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-28">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-brand-100/80">
            {breadcrumbs.map((b, i) => {
              const isLast = i === breadcrumbs.length - 1;
              return (
                <li key={`${i}-${b.url}`} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>·</span>}
                  {isLast ? (
                    <span className="text-white font-medium truncate max-w-[60ch]">{b.name}</span>
                  ) : (
                    <Link href={b.url} className="hover:text-white transition-colors">
                      {b.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent ring-1 ring-white/15">
            <MapPin className="h-3.5 w-3.5" />
            {trustBadge}
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight max-w-4xl">
            {h1}
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-5 max-w-2xl text-lg text-brand-100/90 leading-relaxed">{subheading}</p>
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

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-brand-100/80">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" /> Same-week appointments
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" /> Most insurance accepted
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" /> Drug-free, conservative care
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AboutSection({
  heading,
  paragraphs,
  cityName,
}: {
  heading: string;
  paragraphs: string[];
  cityName?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {cityName ? `For ${cityName}, NV patients` : "What you should know"}
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-brand-900">
              {heading}
            </h2>
          </Reveal>
          <div className="mt-6 space-y-5">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className="text-slate-700 leading-relaxed text-[17px]">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4">
          <AppointmentSidebar />
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection({ cityName }: { cityName?: string }) {
  const cards = [
    {
      icon: Award,
      title: "Local Experts",
      body: `Serving ${cityName ?? "Northern Nevada"} since ${CLINIC_FOUNDING_YEAR}, chiropractic, regenerative and medical services under one Fernley roof.`,
    },
    {
      icon: ClipboardList,
      title: "Personalized Plans",
      body: "Every patient gets a real evaluation and a written plan. No assembly-line care. No one-size-fits-all protocols.",
    },
    {
      icon: ShieldCheck,
      title: "Evidence-Based Care",
      body: "Proven, conservative techniques with clear progress markers. If care isn't working, we change the plan, we don't just keep going.",
    },
    {
      icon: CalendarCheck,
      title: "Easy Appointments",
      body: "Same-week new-patient slots, same-day options for acute pain and accident cases. Most insurance accepted.",
    },
  ];
  return (
    <section className="bg-white border-y border-slate-200/70">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent text-center">
            Why Ascension Health
          </p>
          <h2 className="mt-3 text-center font-display text-3xl sm:text-4xl font-semibold text-brand-900">
            {cityName ? `Why ${cityName} patients choose us` : "Why patients choose Ascension Health"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={0.06 * i}>
              <div className="h-full rounded-2xl bg-gradient-to-br from-brand-50 to-white p-6 ring-1 ring-brand-100 shadow-sm transition-transform hover:-translate-y-1">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-700 text-white shadow-md shadow-brand-900/20">
                  <c.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-brand-900">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedSection({
  heading,
  items,
}: {
  heading: string;
  items: RelatedItem[];
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          More from Ascension Health
        </p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-brand-900">
          {heading}
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.href} delay={0.04 * i}>
            <Link
              href={it.href}
              className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all hover:border-brand-300 hover:shadow-md"
            >
              <span className="text-brand-900 font-medium">{it.label}</span>
              <span className="text-brand-500 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function WhatToExpectSection({ cityName }: { cityName?: string }) {
  const steps = [
    {
      icon: Stethoscope,
      title: "Schedule Your Consultation",
      body: `Book online or call (775) 575-9922. We confirm your appointment by text and answer any insurance questions before you arrive${cityName ? ` from ${cityName}` : ""}.`,
    },
    {
      icon: ClipboardList,
      title: "Receive Your Personalized Plan",
      body: "Your first visit includes a thorough evaluation, exam, history, orthopedic and movement testing. We then build a written plan with clear progress markers.",
    },
    {
      icon: HeartHandshake,
      title: "Start Living Pain-Free",
      body: "Begin treatment, track measurable progress, and graduate out of care when you're ready. Long-term wellness is an option, never a requirement.",
    },
  ];
  return (
    <section className="bg-brand-50">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent text-center">
            Your path to relief
          </p>
          <h2 className="mt-3 text-center font-display text-3xl sm:text-4xl font-semibold text-brand-900">
            What to expect
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={0.08 * i}>
              <div className="relative h-full rounded-2xl bg-white p-7 ring-1 ring-brand-100 shadow-md">
                <span className="absolute -top-4 left-7 inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-accent px-3 text-xs font-bold text-brand-950 shadow-md">
                  Step {i + 1}
                </span>
                <span className="mt-2 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-700 text-white shadow-md">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-brand-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection({
  faqs,
  cityName,
  topicName,
}: {
  faqs: FAQ[];
  cityName?: string;
  topicName: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          Frequently Asked Questions
        </p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-brand-900 max-w-3xl">
          {cityName
            ? `${topicName} in ${cityName}, your questions, answered`
            : `${topicName}, your questions, answered`}
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-3">
        {faqs.map((f, i) => (
          <Reveal key={i} delay={0.03 * i}>
            <details className="group rounded-2xl bg-white p-5 ring-1 ring-slate-200 shadow-sm open:shadow-md open:ring-brand-200 transition-all">
              <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                <span className="font-display text-lg font-semibold text-brand-900">
                  {f.question}
                </span>
                <span
                  aria-hidden
                  className="mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-[15px] text-slate-700 leading-relaxed">{f.answer}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function LocalAreaSection({
  city,
  nearbyCities,
  buildNearbyHref,
}: {
  city: PSEOCity;
  nearbyCities: PSEOCity[];
  buildNearbyHref: (c: PSEOCity) => string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {city.region}
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-brand-900">
              Proudly serving {city.name}, NV
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-5 text-slate-700 leading-relaxed text-[17px]">
              Ascension Health is based in Fernley, NV, and serves patients
              from {city.name} and the surrounding {city.region} area. We see
              patients from across the region every week, and we coordinate
              appointment times so you&apos;re not making the trip more often
              than you have to.
            </p>
            <p className="mt-4 text-slate-700 leading-relaxed text-[17px]">
              Our clinic combines chiropractic, regenerative
              medicine, and physician-led metabolic and hormone care under one
              roof, so {city.name} patients can get a full workup without
              driving to four different offices. Free on-site parking, accessible
              entrance, evening flexibility when you need it.
            </p>
          </Reveal>

          {nearbyCities.length > 0 && (
            <Reveal delay={0.12}>
              <h3 className="mt-10 font-display text-xl font-semibold text-brand-900">
                Also serving these nearby {city.region} cities
              </h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {nearbyCities.map((n) => (
                  <li key={n.slug}>
                    <Link
                      href={buildNearbyHref(n)}
                      className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-brand-800 hover:border-brand-300 hover:bg-brand-50 transition-colors"
                    >
                      <span>
                        <MapPin className="mr-2 inline h-4 w-4 text-brand-500" />
                        {n.name}, NV
                      </span>
                      <span className="text-brand-400">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.1}>
            <div className="rounded-2xl bg-gradient-to-br from-brand-800 to-brand-900 p-7 text-white shadow-xl shadow-brand-900/20">
              <div className="flex items-start gap-3">
                <Navigation className="mt-1 h-5 w-5 flex-none text-accent" />
                <div>
                  <p className="font-semibold">Directions from {city.name}</p>
                  <p className="mt-1 text-sm text-brand-100/85">{SITE.address}</p>
                  <a
                    href={SITE.mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-brand-950 hover:bg-accent-soft transition-colors"
                  >
                    Get directions
                  </a>
                </div>
              </div>
              <div className="mt-6 grid gap-3 border-t border-white/15 pt-6">
                <a href={SITE.phoneHref} className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-accent" />
                  <span>{SITE.phone}</span>
                </a>
                <span className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-accent" />
                  <span>{SITE.hours}</span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BigCtaSection({
  heading,
  cityName,
}: {
  heading: string;
  cityName?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 text-white">
      <div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div aria-hidden className="absolute -top-24 -right-12 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
      <div aria-hidden className="absolute -bottom-16 -left-12 h-72 w-72 rounded-full bg-brand-500/25 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 py-20 sm:py-24 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent ring-1 ring-white/15">
            <Sparkles className="h-3.5 w-3.5" />
            New patients welcome
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl font-semibold">{heading}</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-5 mx-auto max-w-2xl text-brand-100/85 leading-relaxed">
            {cityName
              ? `Same-week appointments available for ${cityName} and surrounding areas. We'll verify your insurance, answer questions, and find a time that fits your schedule.`
              : "Same-week appointments available across Nevada. We'll verify your insurance, answer questions, and find a time that fits your schedule."}
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href={SITE.appointmentsHref}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-brand-950 hover:bg-accent-soft transition-colors shadow-lg shadow-accent/20"
            >
              Request Appointment
            </Link>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-7 py-3.5 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/20 transition-colors"
            >
              <Phone className="h-4 w-4" /> Call {SITE.phone}
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-brand-100/80">
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-accent" /> 1,200+ Nevadans treated
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" /> Most insurance accepted
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-accent" /> Same-week appointments
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Compact sidebar used inside the about section (kept lean to fit beside copy)
function AppointmentSidebar() {
  return (
    <aside className="lg:sticky lg:top-28 space-y-4">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-800 to-brand-900 p-6 text-white shadow-xl shadow-brand-900/20">
        <div aria-hidden className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
          Request Appointment
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold leading-tight">
          Let&apos;s get you feeling better
        </h3>
        <a
          href={SITE.phoneHref}
          className="mt-5 flex items-center gap-3 rounded-xl bg-white/10 p-3 ring-1 ring-white/15 hover:bg-white/20 transition-colors"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-brand-950">
            <Phone className="h-4 w-4" />
          </span>
          <span className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-brand-100/70">Call</span>
            <span className="font-display text-base font-semibold">{SITE.phone}</span>
          </span>
        </a>
        <Link
          href={SITE.appointmentsHref}
          className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-brand-950 hover:bg-accent-soft transition-colors"
        >
          Book Online
        </Link>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm">
        <p className="flex items-start gap-2 text-slate-700">
          <MapPin className="mt-0.5 h-4 w-4 flex-none text-brand-700" />
          <span>{SITE.address}</span>
        </p>
        <p className="mt-3 flex items-start gap-2 text-slate-700">
          <Clock className="mt-0.5 h-4 w-4 flex-none text-brand-700" />
          <span>{SITE.hours}</span>
        </p>
      </div>
    </aside>
  );
}
