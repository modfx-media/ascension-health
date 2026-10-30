import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  ArrowRight,
  HeartPulse,
  Sparkles,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { PageHero, BottomCTA } from "@/components/InteriorPage";
import { CityLinkGrid } from "@/components/pSEO/CityLinkGrid";
import { ServicesSidebar } from "@/components/ServicesSidebar";
import { SectionEyebrow, ValueCard, RelatedChips } from "@/components/InteriorMotion";
import { Reveal } from "@/components/Motion";
import { SITE } from "@/lib/navigation";
import heroImage from "@/images/clone/Smiles-10.jpg";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/services/bioidentical-hormone-replacement-therapy/", {
  title: "Bioidentical Hormone Replacement Therapy in Fernley, NV",
  description:
    "Bioidentical Hormone Replacement Therapy - Bioidentical Hormone Replacement Therapy (BHRT) is used to treat both men and women experiencing imbalances or drops in their naturally-occurring",
  alternates: { canonical: "/services/bioidentical-hormone-replacement-therapy/" },
  openGraph: {
    title: "Bioidentical Hormone Replacement Therapy in Fernley, NV",
    description:
      "BHRT for men and women in Fernley, NV, relief for menopause, andropause, fatigue, low libido and more.",
    url: "https://ascensionhealthnv.com/services/bioidentical-hormone-replacement-therapy/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "Bioidentical Hormone Replacement Therapy in Fernley, NV",
    description:
      "BHRT for men and women in Fernley, NV, relief for menopause, andropause, fatigue, low libido and more.",
  },
});
}

const conditions = [
  "Mental clarity",
  "Low sex drive or libido",
  "Incontinence",
  "Anxiety",
  "Depression",
  "Andropause",
  "Fatigue",
  "Erectile dysfunction",
  "Insulin resistance",
  "Adrenal and thyroid disorders",
  "Osteoporosis",
  "Fibromyalgia",
];

const options = ["Compounded natural hormones", "Nutraceutical supplementation"];
const delivery = ["Creams", "Patches", "Gels", "Injections"];

const benefits = [
  {
    icon: <HeartPulse className="h-5 w-5" />,
    title: "Rebalance Naturally",
    body: "BHRT uses hormones structurally identical to those your body produces.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Feel Like Yourself",
    body: "Improvements in mood, sleep, libido, weight, mental clarity and energy.",
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: "For Men & Women",
    body: "Tailored protocols for menopause, perimenopause, andropause and more.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Custom & Monitored",
    body: "Treatment plans built around your symptoms, history and lab results.",
  },
];

const related = [
  { label: "Nutritional IVs", href: "/services/nutritional-ivs/" },
  { label: "Medical Weight Loss", href: "/services/medical-weight-loss/" },
  { label: "GAINSWave®", href: "/services/gainswave/" },
  { label: "Chiropractic Care", href: "/services/chiropractic-care/" },
];

export default function BHRTPage() {
  return (
    <main className="bg-slate-50">
      <ServiceSchema
        name="Bioidentical Hormone Replacement Therapy"
        description="BHRT for men and women to address fatigue, mood, sleep, libido and metabolic concerns caused by hormone imbalances."
        pagePath="/services/bioidentical-hormone-replacement-therapy/"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services/" },
          { name: "Bioidentical Hormone Replacement Therapy", url: "/services/bioidentical-hormone-replacement-therapy/" },
        ]}
      />
      <PageHero
        title="Bioidentical Hormone Replacement Therapy"
        parent={{ label: "Services", href: "/services/" }}
      />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-xl shadow-brand-900/10">
                <Image
                  src={heroImage}
                  alt="Patient feeling vibrant after Bioidentical Hormone Replacement Therapy at Ascension Health"
                  fill
                  sizes="(min-width: 1024px) 720px, 100vw"
                  className="object-cover"
                  priority
                  placeholder="blur"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent" />
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="mt-8 text-[16px] leading-relaxed text-slate-700">
                Bioidentical Hormone Replacement Therapy (BHRT) is used to
                treat both men and women experiencing imbalances or drops in
                their naturally-occurring hormones. Hormones are responsible
                for most of your essential bodily functions, so when they are
                disrupted in any way, cascade effects across all your systems
                can ensue.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                Most commonly, BHRT is utilized to ease symptoms of
                perimenopause and menopause, although we can use it to treat a
                wide range of conditions, including:
              </p>
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <ul className="grid gap-2 sm:grid-cols-2">
                  {conditions.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-[15px] text-slate-700">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-8 text-[15.5px] leading-relaxed text-slate-700">
                Symptoms common with menopause, hot flashes, night sweats,
                mood changes, memory loss, weight gain, sleep issues and low
                libido, can be dramatically improved with BHRT. For many
                other conditions, BHRT can improve vitality, energy, mental
                clarity, mood, weight loss, and even muscle strength.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                BHRT comes in several different forms, and at Ascension Health,
                we carefully take into consideration your symptoms, medical
                conditions and history before making a recommendation. Options
                may include:
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                    Therapy options
                  </h4>
                  <ul className="mt-3 space-y-1.5 text-[15px] text-slate-700">
                    {options.map((o) => (
                      <li key={o} className="flex items-start gap-2">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                    Delivery methods
                  </h4>
                  <ul className="mt-3 space-y-1.5 text-[15px] text-slate-700">
                    {delivery.map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <div className="mt-12">
              <Reveal>
                <SectionEyebrow
                  kicker="Why it works"
                  title="Hormones, balanced for the way you live."
                  align="left"
                />
              </Reveal>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {benefits.map((b, i) => (
                  <ValueCard key={b.title} index={i} title={b.title} body={b.body} icon={b.icon} />
                ))}
              </div>
            </div>

            <Reveal delay={0.15}>
              <p className="mt-10 text-[15.5px] leading-relaxed text-slate-700">
                Hormones are a vital part of maintaining a healthy and active
                lifestyle. No one needs to suffer the symptoms of hormone
                imbalance, and at Ascension Health in Fernley, NV, we&apos;re
                confident we can find the right solution for your unique
                needs.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-12">
                <h3 className="font-display text-xl font-semibold text-slate-900">
                  Related services
                </h3>
                <div className="mt-5">
                  <RelatedChips items={related} />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-10 text-[15px] leading-relaxed text-slate-700">
                If you have questions about how BHRT can help you or would
                like to{" "}
                <Link href={SITE.appointmentsHref} className="font-semibold text-brand-700 hover:text-brand-800">
                  request an appointment
                </Link>,{" "}
                call our friendly office today at{" "}
                <a href={SITE.phoneHref} className="font-semibold text-brand-700 hover:text-brand-800">
                  {SITE.phone}
                </a>
                .
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-brand-800 transition-colors"
                >
                  <Phone className="h-4 w-4" /> Call {SITE.phone}
                </a>
                <Link
                  href={SITE.appointmentsHref}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-700 px-6 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
                >
                  Request Appointment <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-4">
            <ServicesSidebar currentSlug="bioidentical-hormone-replacement-therapy" />
          </div>
        </div>
      </section>

      <CityLinkGrid
        heading="Serving These Nevada Cities"
        intro="Bioidentical hormone replacement therapy for men and women, lab-guided plans from our Fernley clinic serving Nevada."
        topic={{ slug: "bioidentical-hormone-replacement-therapy", name: "Bioidentical Hormone Replacement Therapy", kind: "service" }}
      />

      <BottomCTA
        kicker="Questions?"
        heading={`Call ${SITE.phone}`}
        body="Our Fernley team will walk you through every BHRT option, in plain language."
      />
    </main>
  );
}
