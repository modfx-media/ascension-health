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
import heroImage from "@/images/clone/man.jpg";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/conditions-treated/sexual-dysfunction/", {
  title: "Sexual Dysfunction in Fernley, NV",
  description:
    "Treatment for sexual dysfunction in Fernley, NV. Ascension Health offers GAINSWave, BHRT and other non-surgical options for erectile dysfunction and low libido.",
  alternates: { canonical: "/conditions-treated/sexual-dysfunction/" },
  openGraph: {
    title: "Sexual Dysfunction in Fernley, NV",
    description:
      "Confidential, non-surgical care for sexual dysfunction in Fernley, NV.",
    url: "https://ascensionhealthnv.com/conditions-treated/sexual-dysfunction/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "Sexual Dysfunction in Fernley, NV",
    description:
      "Confidential, non-surgical care for sexual dysfunction in Fernley, NV.",
  },
});
}

const benefits = [
  { icon: <Sparkles className="h-5 w-5" />, title: "Restored Confidence", body: "Reliable performance that helps you feel like yourself again." },
  { icon: <HeartPulse className="h-5 w-5" />, title: "Better Circulation", body: "GAINSWave therapy stimulates new blood vessel growth for stronger response." },
  { icon: <Activity className="h-5 w-5" />, title: "Hormone Support", body: "BHRT can restore testosterone and other hormones that drive libido." },
  { icon: <ShieldCheck className="h-5 w-5" />, title: "Discreet & Non-Surgical", body: "Drug-free, needle-light, no downtime, and always confidential." },
];

const related = [
  { label: "GAINSWave", href: "/services/gainswave/" },
  { label: "Hormonal Imbalance", href: "/conditions-treated/hormonal-imbalance/" },
  { label: "Bioidentical HRT", href: "/services/bioidentical-hormone-replacement-therapy/" },
  { label: "Pain Relief", href: "/conditions-treated/pain-relief/" },
];

export default function SexualDysfunctionPage() {
  return (
    <main className="bg-slate-50">
      <ServiceSchema
        kind="condition"
        name="Sexual Dysfunction"
        description="GAINSWave, BHRT and other non-surgical options for erectile dysfunction and low libido."
        pagePath="/conditions-treated/sexual-dysfunction/"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Conditions Treated", url: "/conditions-treated/" },
          { name: "Sexual Dysfunction", url: "/conditions-treated/sexual-dysfunction/" },
        ]}
      />
      <PageHero title="Sexual Dysfunction" parent={{ label: "Conditions Treated", href: "/conditions-treated/" }} />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-xl shadow-brand-900/10">
                <Image src={heroImage} alt="Confidential men's health and sexual wellness care at Ascension Health" fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" priority placeholder="blur" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent" />
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="mt-8 text-[16px] leading-relaxed text-slate-700">
                Sexual dysfunction is more common than most people realise, and far more treatable than people fear. Whether the concern is erectile dysfunction, low libido, premature ejaculation or a drop in stamina, these symptoms almost always trace back to something physical: blood flow, hormones, nerves, medications or stress.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                At Ascension Health our approach is straightforward and confidential. We take time to understand the full picture, labs, lifestyle and medical history, and then put together a non-surgical plan that addresses the underlying cause rather than just masking it with a pill before intimacy.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                For many men, GAINSWave acoustic-wave therapy combined with bioidentical hormone replacement provides remarkable improvements in performance, sensitivity and confidence, without surgery and without ongoing prescriptions.
              </p>
            </Reveal>

            <div className="mt-12">
              <Reveal>
                <SectionEyebrow kicker="Why patients choose us" title="Real solutions, no judgment, no surgery." align="left" />
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
            <ConditionsSidebar currentSlug="sexual-dysfunction" />
          </div>
        </div>
      </section>

      <CityLinkGrid
        heading="Serving These Nevada Cities"
        intro="Discreet, evidence-based sexual wellness care from our Fernley clinic, serving patients across Nevada."
        topic={{ slug: "sexual-wellness-treatment", name: "Sexual Wellness Treatment", kind: "service" }}
      />

      <BottomCTA kicker="Questions?" heading={`Call ${SITE.phone}`} body="Speak privately with our Fernley team about discreet, non-surgical options." />
    </main>
  );
}
