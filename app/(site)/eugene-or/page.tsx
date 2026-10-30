import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import Link from "next/link";
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
import { SITE } from "@/lib/navigation";
import { buildPageMetadata } from "@/lib/pSEO-routing";
import { resolvePublicSiteOrigin } from "@/lib/cms/server-url";

/**
 * Standalone auto-accident geo landing page, `/eugene-or/`.
 *
 * Eugene, OR sits outside the Nevada programmatic SEO silo (which is keyed
 * on the `-nv` city slugs), so this page is hand-built rather than routed
 * through the pSEO templates. It mirrors the city-hub structure, components,
 * and Tailwind classes used by the Nevada geo pages while focusing the copy,
 * services, conditions, and JSON-LD on car-accident injury recovery.
 */

const CITY = "Eugene, OR";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/eugene-or/", buildPageMetadata({
  title: "Auto Accident Chiropractor in Eugene, OR",
  description:
    "Injured in a car accident in Eugene, OR? Ascension Health provides expert chiropractic care and pain relief for auto accident injuries. Same-week appointments. Most insurance accepted.",
  path: "/eugene-or/",
}));
}

const SERVICES: { name: string; href: string; benefit: string }[] = [
  {
    name: "Chiropractic Care",
    href: "/services/chiropractic-care/",
    benefit:
      "Gentle spinal adjustments realign the joints jolted by a Eugene collision, easing whiplash and restoring mobility without medication.",
  },
  {
    name: "Spinal Decompression",
    href: "/services/spinal-decompression/",
    benefit:
      "Non-surgical decompression relieves the disc pressure and nerve pain that often follow the impact of an auto accident.",
  },
  {
    name: "Trigger Point Injections",
    href: "/services/trigger-point-injections/",
    benefit:
      "Precise injections release the muscle knots and spasms that develop in the neck and back after a Eugene crash.",
  },
  {
    name: "Joint Injections",
    href: "/services/joint-injections/",
    benefit:
      "Anti-inflammatory joint injections calm the swelling and pain in shoulders, knees, and other joints injured in a collision.",
  },
];

const CONDITIONS: { name: string; href: string }[] = [
  { name: "Whiplash", href: "/conditions-treated/whiplash/" },
  { name: "Back Pain", href: "/conditions-treated/back-pain/" },
  { name: "Neck Pain", href: "/conditions-treated/neck-pain/" },
  { name: "Shoulder Pain", href: "/conditions-treated/shoulder-pain/" },
  { name: "Sciatica", href: "/conditions-treated/sciatica/" },
  {
    name: "Headaches & Migraines",
    href: "/conditions-treated/headaches-migraines/",
  },
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "How soon after a car accident should I see a chiropractor?",
    answer:
      "You should see a chiropractor as soon as possible after a car accident, ideally within 72 hours. Early treatment helps prevent injuries like whiplash from becoming chronic conditions.",
  },
  {
    question:
      "Does insurance cover chiropractic care after an auto accident in Oregon?",
    answer:
      "In most cases, yes. Oregon auto insurance policies typically include Personal Injury Protection (PIP) that covers chiropractic treatment after an accident. We accept most major insurance plans.",
  },
  {
    question: "What injuries are most common after a car accident?",
    answer:
      "The most common auto accident injuries include whiplash, herniated discs, back and neck pain, shoulder injuries, and headaches. Many of these don't show symptoms immediately but worsen over time without treatment.",
  },
  {
    question: "Can a chiropractor treat whiplash in Eugene, OR?",
    answer:
      "Yes. Chiropractic care is one of the most effective treatments for whiplash. At Ascension Health, we use a combination of spinal adjustments, targeted rehab, and soft tissue techniques to relieve pain and restore mobility.",
  },
];

const PAGE_URL = `${resolvePublicSiteOrigin()}/eugene-or/`;

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Ascension Health",
  url: PAGE_URL,
  telephone: "(775) 575-9922",
  image: `${resolvePublicSiteOrigin()}/og.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Eugene",
    addressRegion: "OR",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "City",
    name: "Eugene",
    containedInPlace: { "@type": "State", name: "Oregon" },
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  priceRange: "$$",
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

/** Serialise JSON-LD safely, escape `<` to block XSS. */
function ldJson(payload: unknown): string {
  return JSON.stringify(payload).replace(/</g, "\\u003c");
}

export default function EugeneAutoAccidentPage() {
  return (
    <main className="bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(LOCAL_BUSINESS_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(FAQ_SCHEMA) }}
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
        <div
          aria-hidden
          className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-brand-500/30 blur-3xl"
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
              <li className="text-white font-medium">{CITY}</li>
            </ol>
          </nav>

          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent ring-1 ring-white/15">
              <MapPin className="h-3.5 w-3.5" />
              Auto Accident Injury Care in {CITY}
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight max-w-4xl">
              Auto Accident Chiropractor in {CITY}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-5 max-w-2xl text-lg text-brand-100/90 leading-relaxed">
              Fast, effective care for whiplash, back pain, and soft tissue
              injuries after a car accident.
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

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-brand-100/80">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" /> Same-week
                appointments
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" /> Most insurance
                accepted
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" /> Drug-free,
                conservative care
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── INTRO ─── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
              Local Care in {CITY}
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-brand-950">
              Don&apos;t wait for hidden car accident injuries to get worse
            </h2>
            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
              <p>
                After a car accident in {CITY}, the adrenaline can mask real
                damage. Auto accident injuries like whiplash, neck pain, and
                soft tissue tears often go undetected in the first hours and
                days, and without prompt chiropractic treatment they quietly
                worsen, stiffening into chronic pain, reduced range of motion,
                and nagging headaches that linger for months.
              </p>
              <p>
                At Ascension Health, we evaluate the injuries that imaging in
                the ER frequently misses and build a real recovery plan with
                measurable progress markers. Early, conservative care helps
                {" "}
                {CITY} drivers heal completely instead of living with the
                long-term effects of an untreated collision.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <CheckCircle2 className="h-5 w-5" />,
                t: "Same-Week Appointments",
                b: "Often see accident patients within days, not weeks.",
              },
              {
                icon: <ShieldCheck className="h-5 w-5" />,
                t: "Most Insurance Accepted",
                b: "We verify PIP and benefits before your first visit.",
              },
              {
                icon: <Stethoscope className="h-5 w-5" />,
                t: "Evidence-Based Plans",
                b: "Written goals, measurable progress markers.",
              },
              {
                icon: <CalendarCheck className="h-5 w-5" />,
                t: "One Clinical Team",
                b: "Chiro + PT + injections under one roof.",
              },
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

      {/* ─── SERVICES ─── */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
              Services
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-brand-950">
              Auto accident recovery services in {CITY}
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="group flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-200/70 hover:bg-brand-50 hover:ring-brand-200 transition-colors h-full"
                  >
                    <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                      <Stethoscope className="h-4 w-4" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-display font-semibold text-brand-950 leading-snug">
                        {s.name} in {CITY}
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

      {/* ─── CONDITIONS ─── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
              Conditions
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-brand-950">
              Car accident injuries we treat in {CITY}
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {CONDITIONS.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="group flex items-center gap-3 rounded-xl bg-slate-50 p-3.5 ring-1 ring-slate-200/70 hover:bg-brand-50 hover:ring-brand-200 transition-colors h-full"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-brand-700 ring-1 ring-brand-100">
                      <Activity className="h-4 w-4" />
                    </span>
                    <span className="flex-1 text-sm font-medium text-slate-800 group-hover:text-brand-900 leading-snug">
                      {c.name} after a car accident in {CITY}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ─── WHY ASCENSION HEALTH ─── */}
      <section className="bg-slate-50 border-y border-slate-200/70">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700 text-center">
              Why Ascension Health
            </p>
            <h2 className="mt-2 text-center font-display text-3xl sm:text-4xl font-semibold text-brand-950">
              Why {CITY} accident patients choose us
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Stethoscope className="h-6 w-6" />,
                t: "Accident Injury Experts",
                b: "We focus on the whiplash and soft-tissue injuries that follow a collision, not just general aches.",
              },
              {
                icon: <ShieldCheck className="h-6 w-6" />,
                t: "Insurance & PIP Handled",
                b: "We verify your Oregon PIP coverage and document everything your claim needs.",
              },
              {
                icon: <CalendarCheck className="h-6 w-6" />,
                t: "Fast Access to Care",
                b: "Same-week new-patient slots and same-day options for acute accident pain.",
              },
              {
                icon: <CheckCircle2 className="h-6 w-6" />,
                t: "Drug-Free Recovery",
                b: "Conservative, evidence-based care with clear progress markers, not endless adjustments.",
              },
            ].map((c, i) => (
              <Reveal key={c.t} delay={0.06 * i}>
                <div className="h-full rounded-2xl bg-gradient-to-br from-brand-50 to-white p-6 ring-1 ring-brand-100 shadow-sm transition-transform hover:-translate-y-1">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-700 text-white shadow-md shadow-brand-900/20">
                    {c.icon}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-brand-950">
                    {c.t}
                  </h3>
                  <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                    {c.b}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
            Frequently Asked Questions
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-brand-950 max-w-3xl">
            Auto accident chiropractic care in {CITY}, your questions, answered
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-3">
          {FAQS.map((f, i) => (
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
                <p className="mt-3 text-[15px] text-slate-700 leading-relaxed">
                  {f.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 py-16 text-white">
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold">
              {CITY} residents: get seen fast after your accident
            </h2>
            <p className="mt-3 text-brand-100/90 max-w-2xl mx-auto">
              The sooner you&apos;re evaluated, the better your recovery. Most
              new {CITY} accident patients are seen within the week, we&apos;ll
              verify your insurance and build a real plan with progress markers.
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
        </div>
      </section>
    </main>
  );
}
