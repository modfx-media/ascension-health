import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import Image from "next/image";
import Link from "next/link";
import { Zap, Activity, ShieldCheck, Sparkles, Phone, ArrowRight } from "lucide-react";
import { PageHero, BottomCTA } from "@/components/InteriorPage";
import { CityLinkGrid } from "@/components/pSEO/CityLinkGrid";
import { ConditionsSidebar } from "@/components/ConditionsSidebar";
import { SectionEyebrow, RelatedChips, ValueCard } from "@/components/InteriorMotion";
import { Reveal } from "@/components/Motion";
import { SITE } from "@/lib/navigation";
import heroImage from "@/images/clone/neuropathy_img.jpg";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/conditions-treated/neuropathy/", {
  title: "Neuropathy in Fernley, NV",
  description:
    "Neuropathy treatment in Fernley, NV. Ascension Health offers non-surgical, drug-free care for peripheral neuropathy, numbness, tingling and burning nerve pain.",
  alternates: { canonical: "/conditions-treated/neuropathy/" },
  openGraph: {
    title: "Neuropathy in Fernley, NV",
    description:
      "Non-surgical, drug-free care for peripheral neuropathy in Fernley, NV.",
    url: "https://ascensionhealthnv.com/conditions-treated/neuropathy/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "Neuropathy in Fernley, NV",
    description:
      "Non-surgical, drug-free care for peripheral neuropathy in Fernley, NV.",
  },
});
}

const benefits = [
  { icon: <Zap className="h-5 w-5" />, title: "Calms Nerve Pain", body: "Targeted protocols reduce burning, tingling and shooting sensations." },
  { icon: <Activity className="h-5 w-5" />, title: "Restores Function", body: "Improves balance, sensation and grip so daily life feels normal again." },
  { icon: <ShieldCheck className="h-5 w-5" />, title: "Non-Surgical", body: "Drug-free, non-invasive care, no incisions, no opioid prescriptions." },
  { icon: <Sparkles className="h-5 w-5" />, title: "Whole-Person Plan", body: "We combine chiropractic, nutrition and supportive therapies for lasting relief." },
];

const related = [
  { label: "Pain Relief", href: "/conditions-treated/pain-relief/" },
  { label: "Joint Pain", href: "/conditions-treated/joint-pain/" },
  { label: "Knee Pain", href: "/conditions-treated/knee-pain/" },
  { label: "Back Pain", href: "/conditions-treated/back-pain/" },
];

export default function NeuropathyPage() {
  return (
    <main className="bg-slate-50">
      <ServiceSchema
        kind="condition"
        name="Neuropathy"
        description="Non-surgical, drug-free care for peripheral neuropathy, numbness, tingling and burning nerve pain."
        pagePath="/conditions-treated/neuropathy/"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Conditions Treated", url: "/conditions-treated/" },
          { name: "Neuropathy", url: "/conditions-treated/neuropathy/" },
        ]}
      />
      <PageHero title="Neuropathy" parent={{ label: "Conditions Treated", href: "/conditions-treated/" }} />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-xl shadow-brand-900/10">
                <Image src={heroImage} alt="Neuropathy care at Ascension Health in Fernley, NV" fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" priority placeholder="blur" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent" />
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="mt-8 text-[16px] leading-relaxed text-slate-700">
                Peripheral neuropathy is nerve damage that interferes with the way signals travel between your brain and the rest of your body. For many people it shows up first as numbness, tingling, burning or stabbing pain in the hands and feet, and gradually starts to interfere with balance, sleep and the simple things you used to enjoy.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                At Ascension Health, our Fernley team takes a non-surgical, drug-free approach to neuropathy. We combine chiropractic adjustments, targeted nerve-supporting therapies, IV nutrition and lifestyle coaching to calm symptoms and help the nerves heal. The goal is straightforward: get you back on your feet, comfortably, without relying on opioids.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                Most people who walk through our doors have already tried medications that masked symptoms but never resolved the underlying problem. We start with a thorough evaluation, identify the contributing factors, diabetes, chemotherapy aftermath, spinal compression or vitamin deficiencies are common, and build a plan around what your nerves actually need to recover.
              </p>
            </Reveal>

            <div className="mt-12">
              <Reveal>
                <SectionEyebrow kicker="Why patients choose us" title="A neuropathy plan that addresses the cause." align="left" />
              </Reveal>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {benefits.map((b, i) => (
                  <ValueCard key={b.title} index={i} title={b.title} body={b.body} icon={b.icon} />
                ))}
              </div>
            </div>

            <Reveal delay={0.15}>
              <div className="mt-12">
                <h3 className="font-display text-xl font-semibold text-slate-900">Related conditions we treat</h3>
                <div className="mt-5"><RelatedChips items={related} /></div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href={SITE.phoneHref} className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-brand-800 transition-colors">
                  <Phone className="h-4 w-4" /> Call {SITE.phone}
                </a>
                <Link href={SITE.appointmentsHref} className="inline-flex items-center gap-2 rounded-full border border-brand-700 px-6 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50 transition-colors">
                  Request Appointment <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-4">
            <ConditionsSidebar currentSlug="neuropathy" />
          </div>
        </div>
      </section>

      <CityLinkGrid
        heading="Find Neuropathy Treatment Near You"
        intro="Multi-modal neuropathy care from our Fernley clinic, serving patients across Nevada."
        topic={{ slug: "neuropathy-treatment", name: "Neuropathy Treatment", kind: "service" }}
      />

      <BottomCTA kicker="Questions?" heading={`Call ${SITE.phone}`} body="Our Fernley team can walk you through a neuropathy plan tailored to your symptoms." />
    </main>
  );
}
