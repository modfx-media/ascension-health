import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import Image from "next/image";
import Link from "next/link";
import { Activity, ShieldCheck, HeartPulse, Sparkles, Phone, ArrowRight } from "lucide-react";
import { PageHero, BottomCTA } from "@/components/InteriorPage";
import { CityLinkGrid } from "@/components/pSEO/CityLinkGrid";
import { ConditionsSidebar } from "@/components/ConditionsSidebar";
import { SectionEyebrow, RelatedChips, ValueCard } from "@/components/InteriorMotion";
import { Reveal } from "@/components/Motion";
import { SITE } from "@/lib/navigation";
import heroImage from "@/images/clone/jointpain_img.jpg";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/conditions-treated/joint-pain/", {
  title: "Joint Pain in Fernley, NV",
  description:
    "Joint pain treatment in Fernley, NV. Ascension Health treats hip, shoulder, spine and other joint pain with chiropractic care, joint injections and targeted rehab.",
  alternates: { canonical: "/conditions-treated/joint-pain/" },
  openGraph: {
    title: "Joint Pain in Fernley, NV",
    description:
      "Non-surgical joint pain care in Fernley, NV, chiropractic, injections and targeted rehab.",
    url: "https://ascensionhealthnv.com/conditions-treated/joint-pain/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "Joint Pain in Fernley, NV",
    description:
      "Non-surgical joint pain care in Fernley, NV, chiropractic, injections and targeted rehab.",
  },
});
}

const benefits = [
  { icon: <Activity className="h-5 w-5" />, title: "Restored Range", body: "Adjustments and therapy restore the motion your joints have lost." },
  { icon: <HeartPulse className="h-5 w-5" />, title: "Targeted Injections", body: "Trigger-point and joint injections calm inflammation right at the source." },
  { icon: <ShieldCheck className="h-5 w-5" />, title: "Drug-Free Options", body: "Most patients improve without long-term medication or surgery." },
  { icon: <Sparkles className="h-5 w-5" />, title: "Whole-Body Plan", body: "Nutrition and supportive therapies speed recovery and protect the joint long term." },
];

const related = [
  { label: "Knee Pain", href: "/conditions-treated/knee-pain/" },
  { label: "Joint Injections", href: "/services/joint-injections/" },
  { label: "Trigger Point Injections", href: "/services/trigger-point-injections/" },
  { label: "Chiropractic Care", href: "/services/chiropractic-care/" },
];

export default function JointPainPage() {
  return (
    <main className="bg-slate-50">
      <ServiceSchema
        kind="condition"
        name="Joint Pain"
        description="Joint pain treatment for hip, shoulder, spine and other joints, chiropractic care, joint injections and targeted rehab."
        pagePath="/conditions-treated/joint-pain/"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Conditions Treated", url: "/conditions-treated/" },
          { name: "Joint Pain", url: "/conditions-treated/joint-pain/" },
        ]}
      />
      <PageHero title="Joint Pain" parent={{ label: "Conditions Treated", href: "/conditions-treated/" }} />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-xl shadow-brand-900/10">
                <Image src={heroImage} alt="Joint pain evaluation at Ascension Health in Fernley, NV" fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" priority placeholder="blur" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent" />
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="mt-8 text-[16px] leading-relaxed text-slate-700">
                Joint pain can occur in any joint of the body, but most patients who experience joint pain do so in the knees, hips, shoulders, or spine. Persistent and severe pain that prohibits your ability to complete everyday tasks should be evaluated by a doctor as soon as possible. If you notice redness, joint deformity, swelling, or reduced range of motion, please contact our office.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                Most joint pain has a clear, identifiable cause, osteoarthritis, an old injury that never healed correctly, repetitive strain, poor posture or inflammation linked to diet and stress. Our job is to find that cause and treat it directly so the pain does not creep back the moment medication wears off.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                Care at Ascension Health typically combines chiropractic adjustments to restore proper motion, targeted joint or trigger-point injections to calm inflammation, and a targeted rehab program to strengthen the muscles that support the joint. For many patients this combination delivers the relief they had hoped surgery would provide, without the recovery time.
              </p>
            </Reveal>

            <div className="mt-12">
              <Reveal>
                <SectionEyebrow kicker="How we help" title="Find the cause. Treat the joint. Keep it working." align="left" />
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
            <ConditionsSidebar currentSlug="joint-pain" />
          </div>
        </div>
      </section>

      <CityLinkGrid
        heading="Find Joint Pain Treatment Near You"
        intro="Non-surgical joint pain care from our Fernley clinic, serving patients across northern and southern Nevada."
        topic={{ slug: "joint-pain", name: "Joint Pain", kind: "condition" }}
      />

      <BottomCTA kicker="Questions?" heading={`Call ${SITE.phone}`} body="Tell our Fernley team where it hurts, we'll outline non-surgical options that can help." />
    </main>
  );
}
