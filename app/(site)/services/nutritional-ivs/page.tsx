import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  ArrowRight,
  Droplets,
  Zap,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PageHero, BottomCTA } from "@/components/InteriorPage";
import { CityLinkGrid } from "@/components/pSEO/CityLinkGrid";
import { ServicesSidebar } from "@/components/ServicesSidebar";
import { SectionEyebrow, ValueCard, RelatedChips } from "@/components/InteriorMotion";
import { Reveal } from "@/components/Motion";
import { SITE } from "@/lib/navigation";
import heroImage from "@/images/clone/IV-Therapy.jpg";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/services/nutritional-ivs/", {
  title: "Nutritional IVs in Fernley, NV",
  description:
    "Nutritional IVs - We specialize in correcting your body's misalignments. Our goal is to ensure that your spine and the rest of your body are working harmoniously. To",
  alternates: { canonical: "/services/nutritional-ivs/" },
  openGraph: {
    title: "Nutritional IVs in Fernley, NV",
    description:
      "IV vitamin and nutrient therapy in Fernley, NV, hydration, energy, immunity and recovery on your lunch break.",
    url: "https://ascensionhealthnv.com/services/nutritional-ivs/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "Nutritional IVs in Fernley, NV",
    description:
      "IV vitamin and nutrient therapy in Fernley, NV, hydration, energy, immunity and recovery on your lunch break.",
  },
});
}

const helps = [
  "Common skin problems, such as dull skin and acne",
  "Dehydration",
  "Stress",
  "Muscle soreness or fatigue",
  "Common cold",
  "Low energy and fatigue",
  "Excess weight",
];

const benefits = [
  {
    icon: <Droplets className="h-5 w-5" />,
    title: "Direct to Bloodstream",
    body: "Bypass the digestive system so nutrients reach the cells that need them.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Fast Energy & Hydration",
    body: "Most therapies take just 15–30 minutes, patients come in on lunch breaks.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Custom Blends",
    body: "Formulas tailored to weight loss, anti-aging, immunity and recovery goals.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Physician Supervised",
    body: "Every plan is created and monitored by our medical team in Fernley.",
  },
];

const related = [
  { label: "Bioidentical Hormones", href: "/services/bioidentical-hormone-replacement-therapy/" },
  { label: "Medical Weight Loss", href: "/services/medical-weight-loss/" },
  { label: "Chiropractic Care", href: "/services/chiropractic-care/" },
  { label: "GAINSWave®", href: "/services/gainswave/" },
];

export default function NutritionalIVsPage() {
  return (
    <main className="bg-slate-50">
      <ServiceSchema
        name="Nutritional IVs"
        description="IV vitamin and mineral therapy that supports energy, immunity and recovery when oral supplements aren't enough."
        pagePath="/services/nutritional-ivs/"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services/" },
          { name: "Nutritional IVs", url: "/services/nutritional-ivs/" },
        ]}
      />
      <PageHero title="Nutritional IVs" parent={{ label: "Services", href: "/services/" }} />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-xl shadow-brand-900/10">
                <Image
                  src={heroImage}
                  alt="Nutritional IV therapy at Ascension Health"
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
                We specialize in correcting your body&apos;s misalignments. Our
                goal is to ensure that your spine and the rest of your body are
                working harmoniously. To do so, we&apos;ll help you develop a
                plan that combines light stretching, exercise, chiropractic
                care and a healthy diet.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                The primary benefit of IV therapy is that it delivers needed
                nutrients directly to the bloodstream. Rather than waiting for
                nutrients to be absorbed through the digestive system, our
                patients can quickly receive them where the body will actually
                use them. Most therapies take between 15 and 30 minutes to
                administer, we even have patients come in on their lunch
                breaks.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-display text-xl font-semibold text-slate-900">
                  IV therapy can help with:
                </h3>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {helps.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-[15px] text-slate-700">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-8 text-[15.5px] leading-relaxed text-slate-700">
                Some patients receive regular IV therapy on a weekly or
                bi-weekly basis, while others come in only as needed. Our
                doctor will cover the available options and create a custom
                treatment plan for each patient, depending on their specific
                desires, needs and schedules.
              </p>
            </Reveal>

            <div className="mt-12">
              <Reveal>
                <SectionEyebrow
                  kicker="Why it works"
                  title="Wellness delivered, drop by drop."
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
                If you have questions about IV therapy or would like to
                schedule an appointment, please call our office at{" "}
                <a href={SITE.phoneHref} className="font-semibold text-brand-700 hover:text-brand-800">
                  {SITE.phone}
                </a>{" "}
                today.
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
            <ServicesSidebar currentSlug="nutritional-ivs" />
          </div>
        </div>
      </section>

      <CityLinkGrid
        heading="Serving These Nevada Cities"
        intro="Nutritional IV therapy at our Fernley clinic, hydration, energy, immune, and recovery blends for patients across Nevada."
        topic={{ slug: "nutritional-iv-therapy", name: "Nutritional IV Therapy", kind: "service" }}
      />

      <BottomCTA
        kicker="Questions?"
        heading={`Call ${SITE.phone}`}
        body="Our Fernley team is happy to talk you through every IV therapy option."
      />
    </main>
  );
}
