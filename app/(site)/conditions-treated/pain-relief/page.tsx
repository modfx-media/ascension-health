import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import Image from "next/image";
import Link from "next/link";
import { HeartPulse, ShieldCheck, Sparkles, Activity, Phone, ArrowRight } from "lucide-react";
import { PageHero, BottomCTA } from "@/components/InteriorPage";
import { CityLinkGrid } from "@/components/pSEO/CityLinkGrid";
import { ConditionsSidebar } from "@/components/ConditionsSidebar";
import { SectionEyebrow, RelatedChips, ValueCard } from "@/components/InteriorMotion";
import { Reveal } from "@/components/Motion";
import { SITE } from "@/lib/navigation";
import heroImage from "@/images/clone/people-3.jpg";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/conditions-treated/pain-relief/", {
  title: "Pain Relief in Fernley, NV",
  description:
    "Pain relief in Fernley, NV. Ascension Health treats the underlying cause of your pain, not just the symptoms, with chiropractic, injections, IV therapy and BHRT.",
  alternates: { canonical: "/conditions-treated/pain-relief/" },
  openGraph: {
    title: "Pain Relief in Fernley, NV",
    description:
      "Whole-person pain relief in Fernley, NV, treating the cause, not just the symptoms.",
    url: "https://ascensionhealthnv.com/conditions-treated/pain-relief/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "Pain Relief in Fernley, NV",
    description:
      "Whole-person pain relief in Fernley, NV, treating the cause, not just the symptoms.",
  },
});
}

const benefits = [
  { icon: <HeartPulse className="h-5 w-5" />, title: "Root-Cause Care", body: "We treat the underlying condition, not just the symptom on the surface." },
  { icon: <Activity className="h-5 w-5" />, title: "Whole-Person Plan", body: "Physical, psychological and emotional wellbeing all factor into your plan." },
  { icon: <ShieldCheck className="h-5 w-5" />, title: "Non-Opioid Options", body: "Drug-free, non-surgical pathways come first whenever possible." },
  { icon: <Sparkles className="h-5 w-5" />, title: "Coordinated Team", body: "Chiropractic, injections, IV therapy and BHRT under one roof, one team." },
];

const related = [
  { label: "Joint Pain", href: "/conditions-treated/joint-pain/" },
  { label: "Neuropathy", href: "/conditions-treated/neuropathy/" },
  { label: "Trigger Point Injections", href: "/services/trigger-point-injections/" },
  { label: "Spinal Decompression", href: "/spinal-decompression/" },
];

export default function PainReliefPage() {
  return (
    <main className="bg-slate-50">
      <ServiceSchema
        kind="condition"
        name="Pain Relief"
        description="Comprehensive pain relief in Fernley, NV, chiropractic care, injections, IV therapy and BHRT that treat the underlying cause, not just the symptoms."
        pagePath="/conditions-treated/pain-relief/"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Conditions Treated", url: "/conditions-treated/" },
          { name: "Pain Relief", url: "/conditions-treated/pain-relief/" },
        ]}
      />
      <PageHero title="Pain Relief" parent={{ label: "Conditions Treated", href: "/conditions-treated/" }} />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-xl shadow-brand-900/10">
                <Image src={heroImage} alt="Pain relief care team at Ascension Health in Fernley, NV" fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" priority placeholder="blur" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent" />
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="mt-8 text-[16px] leading-relaxed text-slate-700">
                At Ascension Health, we believe in treating pain by identifying and effectively treating your underlying condition, not simply suppressing the symptoms. Our treatment focuses not only on addressing your physical pain, but your total health including your physical, psychological, and emotional wellbeing.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                Pain is the body&apos;s way of asking for attention. When we silence it with medication alone, the underlying problem keeps developing in the background. Our team takes the time up front to figure out exactly what is being asked for so the plan we build solves it instead of postponing it.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                Depending on what we find, a pain-relief plan might include chiropractic adjustments, spinal decompression, joint or trigger-point injections, targeted rehab, IV nutrition, hormone optimization or simple lifestyle adjustments. Most patients see relief in the first few visits and steady improvement from there.
              </p>
            </Reveal>

            <div className="mt-12">
              <Reveal>
                <SectionEyebrow kicker="Our philosophy" title="Treat the cause. Heal the person." align="left" />
              </Reveal>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {benefits.map((b, i) => (
                  <ValueCard key={b.title} index={i} title={b.title} body={b.body} icon={b.icon} />
                ))}
              </div>
            </div>

            <Reveal delay={0.15}>
              <div className="mt-12">
                <h3 className="font-display text-xl font-semibold text-slate-900">Related services & conditions</h3>
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
            <ConditionsSidebar currentSlug="pain-relief" />
          </div>
        </div>
      </section>

      <CityLinkGrid
        heading="Serving These Nevada Cities"
        intro="Conservative, non-surgical pain management at our Fernley clinic, chiropractic, PT, and injections for patients across Nevada."
        topic={{ slug: "pain-management", name: "Pain Management", kind: "service" }}
      />

      <BottomCTA kicker="Questions?" heading={`Call ${SITE.phone}`} body="Tell us where the pain is, our Fernley team will help map out a plan." />
    </main>
  );
}
