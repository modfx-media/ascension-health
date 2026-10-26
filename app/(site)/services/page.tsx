import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import Link from "next/link";
import {
  Syringe,
  Activity,
  Stethoscope,
  Droplet,
  HeartPulse,
  Move3d,
  Waves,
  Scale,
  ArrowRight,
} from "lucide-react";
import { PageHero, BottomCTA } from "@/components/InteriorPage";
import { CityLinkGrid } from "@/components/pSEO/CityLinkGrid";
import { SectionEyebrow } from "@/components/InteriorMotion";
import { Reveal } from "@/components/Motion";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/services/", {
  title: "Services in Fernley, NV",
  description:
    "Ascension Health in Fernley, NV offers chiropractic care, spinal decompression, injections, IV therapy, hormones and medical weight loss.",
  alternates: { canonical: "/services/" },
  openGraph: {
    title: "Services in Fernley, NV",
    description:
      "Chiropractic care, spinal decompression, injections, IV therapy, hormones, GAINSWave and medical weight loss in Fernley, NV.",
    url: "https://ascensionhealthnv.com/services/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "Services in Fernley, NV",
    description:
      "Chiropractic care, spinal decompression, injections, IV therapy, hormones, GAINSWave and medical weight loss in Fernley, NV.",
  },
});
}

const ICONS: Record<string, React.ReactNode> = {
  "joint-injections": <Syringe className="h-6 w-6" />,
  "trigger-point-injections": <Activity className="h-6 w-6" />,
  "chiropractic-care": <Stethoscope className="h-6 w-6" />,
  "nutritional-ivs": <Droplet className="h-6 w-6" />,
  "bioidentical-hormone-replacement-therapy": <HeartPulse className="h-6 w-6" />,
  "spinal-decompression": <Move3d className="h-6 w-6" />,
  "gainswave": <Waves className="h-6 w-6" />,
  "medical-weight-loss": <Scale className="h-6 w-6" />,
};

export default function ServicesPage() {
  return (
    <main className="bg-slate-50">
      <PageHero title="Services" />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <Reveal>
          <SectionEyebrow
            kicker="What we offer"
            title="Care designed around your goals."
            description="Ascension Health offers a full range of services to help you feel better, move better and live better, whether you're recovering from an injury, managing a chronic condition or simply trying to feel your best."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <Link
                href={s.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/10"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-600 via-accent to-brand-800 opacity-0 transition-opacity group-hover:opacity-100"
                />
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 text-white shadow-md shadow-brand-900/20">
                  {ICONS[s.slug]}
                </span>
                <h2 className="mt-5 font-display text-xl font-semibold text-slate-900">
                  {s.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {s.summary}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors group-hover:text-brand-800">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}

          <Reveal delay={SERVICES.length * 0.05}>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-dashed border-brand-300 bg-brand-50/60 p-7">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-800 ring-1 ring-brand-200">
                  <Move3d className="h-6 w-6" />
                </span>
                <h2 className="mt-5 font-display text-xl font-semibold text-slate-900">
                  Knee Decompression
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Non-surgical decompression therapy for chronic knee pain and
                  arthritis discomfort.
                </p>
              </div>
              <a
                href={SITE.phoneHref}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                Call for details
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-14 max-w-3xl text-center text-[15px] leading-relaxed text-slate-600">
            These are just some of the services we provide at Ascension Health.
            If you have questions about any treatment, please{" "}
            <Link href="/contact/" className="font-semibold text-brand-700 hover:text-brand-800">
              contact us
            </Link>{" "}
            today at{" "}
            <a href={SITE.phoneHref} className="font-semibold text-brand-700 hover:text-brand-800">
              {SITE.phone}
            </a>
            .
          </p>
        </Reveal>
      </section>

      <CityLinkGrid
        heading="Serving Nevada Communities"
        intro="Ascension Health treats patients from across Nevada. Explore the cities we serve to find local care details for your area."
      />

      <BottomCTA />
    </main>
  );
}
