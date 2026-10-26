import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  ArrowRight,
  Activity,
  Waves,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PageHero, BottomCTA } from "@/components/InteriorPage";
import { CityLinkGrid } from "@/components/pSEO/CityLinkGrid";
import { ServicesSidebar } from "@/components/ServicesSidebar";
import { SectionEyebrow, ValueCard, RelatedChips } from "@/components/InteriorMotion";
import { Reveal } from "@/components/Motion";
import { SITE } from "@/lib/navigation";
import heroImage from "@/images/clone/menshealth_img.jpg";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/services/gainswave/", {
  title: "GAINSWave® in Fernley, NV",
  description:
    "GAINSWave® - Here at Ascension Health, we are proud to provide GAINSWave® services to our male patients struggling with sexual dysfunction. This treatment uses",
  alternates: { canonical: "/services/gainswave/" },
  openGraph: {
    title: "GAINSWave® in Fernley, NV",
    description:
      "Acoustic wave therapy for men in Fernley, NV, improve blood flow, sensitivity and sexual function without medication.",
    url: "https://ascensionhealthnv.com/services/gainswave/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "GAINSWave® in Fernley, NV",
    description:
      "Acoustic wave therapy for men in Fernley, NV, improve blood flow, sensitivity and sexual function without medication.",
  },
});
}

const benefits = [
  {
    icon: <Waves className="h-5 w-5" />,
    title: "Low-Intensity Sound Waves",
    body: "Targeted acoustic-wave therapy stimulates new blood-vessel growth and breaks up plaque.",
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: "Improved Blood Flow",
    body: "Better circulation supports harder, more sustainable erections naturally.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Quick In-Office Sessions",
    body: "Each session takes just 15 to 20 minutes, most patients need 6 to 12 visits.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Drug-Free & Non-Invasive",
    body: "A safe alternative for ED and Peyronie's disease, no medication or surgery.",
  },
];

const related = [
  { label: "Bioidentical Hormones", href: "/services/bioidentical-hormone-replacement-therapy/" },
  { label: "Nutritional IVs", href: "/services/nutritional-ivs/" },
  { label: "Medical Weight Loss", href: "/services/medical-weight-loss/" },
  { label: "All Services", href: "/services/" },
];

export default function GainsWavePage() {
  return (
    <main className="bg-slate-50">
      <ServiceSchema
        name="GAINSWave"
        description="Acoustic wave therapy for men that improves blood flow and supports sexual health, a drug-free alternative to medication."
        pagePath="/services/gainswave/"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services/" },
          { name: "GAINSWave", url: "/services/gainswave/" },
        ]}
      />
      <PageHero title="GAINSWave®" parent={{ label: "Services", href: "/services/" }} />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-xl shadow-brand-900/10">
                <Image
                  src={heroImage}
                  alt="GAINSWave® acoustic wave therapy at Ascension Health"
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
                Here at Ascension Health, we are proud to provide GAINSWave®
                services to our male patients struggling with sexual
                dysfunction. This treatment uses low-intensity sound waves, 
                also known as acoustic wave therapy, to help deliver increased
                blood flow to the penis and improve sexual function with
                harder, more sustainable erections. This procedure has even
                proven helpful for men who have erectile dysfunction and
                Peyronie&apos;s disease.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                While treatment times vary depending on your specific
                condition, most patients need 6 to 12 sessions for the
                treatment to be most effective. In each 15 to 20 minute
                session, we&apos;ll break up plaque that has formed in existing
                blood vessels, stimulate the generation of new blood vessels,
                and activate dormant stem cells that help with cell production.
                The process increases blood flow and allows for enhanced
                sensitivity.
              </p>
            </Reveal>

            <div className="mt-12">
              <Reveal>
                <SectionEyebrow
                  kicker="Why it works"
                  title="What GAINSWave® can do for you."
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
                To learn more or book a confidential consultation, call{" "}
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
            <ServicesSidebar currentSlug="gainswave" />
          </div>
        </div>
      </section>

      <CityLinkGrid
        heading="Serving These Nevada Cities"
        intro="GAINSWave shockwave therapy for ED and male sexual wellness, discreet treatment from our Fernley clinic for patients across Nevada."
        topic={{ slug: "gainswave-therapy", name: "GAINSWave Therapy", kind: "service" }}
      />

      <BottomCTA
        kicker="Questions?"
        heading={`Call ${SITE.phone}`}
        body="Our Fernley team is here to answer any questions you have about GAINSWave®."
      />
    </main>
  );
}
