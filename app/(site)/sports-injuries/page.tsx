import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import Image from "next/image";
import Link from "next/link";
import { Activity, ShieldCheck, Sparkles, HeartPulse, Phone, ArrowRight } from "lucide-react";
import { PageHero, BottomCTA } from "@/components/InteriorPage";
import { CityLinkGrid } from "@/components/pSEO/CityLinkGrid";
import { ConditionsSidebar } from "@/components/ConditionsSidebar";
import { SectionEyebrow, RelatedChips, ValueCard } from "@/components/InteriorMotion";
import { Reveal } from "@/components/Motion";
import { SITE } from "@/lib/navigation";
import heroImage from "@/images/clone/football.jpg";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/sports-injuries/", {
  title: "Sports Injuries in Fernley, NV",
  description:
    "Sports injury care in Fernley, NV. Ascension Health helps athletes recover from recent and lingering injuries with chiropractic care and injections.",
  alternates: { canonical: "/sports-injuries/" },
  openGraph: {
    title: "Sports Injuries in Fernley, NV",
    description:
      "Sports injury recovery for athletes of every level in Fernley, NV.",
    url: "https://ascensionhealthnv.com/sports-injuries/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "Sports Injuries in Fernley, NV",
    description:
      "Sports injury recovery for athletes of every level in Fernley, NV.",
  },
});
}

const benefits = [
  { icon: <Activity className="h-5 w-5" />, title: "Back in the Game", body: "Recovery plans aim to return you to your sport, not just out of pain." },
  { icon: <HeartPulse className="h-5 w-5" />, title: "Acute & Lingering", body: "From fresh strains to old injuries that never fully healed, we treat both." },
  { icon: <ShieldCheck className="h-5 w-5" />, title: "Drug-Free First", body: "Chiropractic and targeted injections before medication." },
  { icon: <Sparkles className="h-5 w-5" />, title: "Performance Boost", body: "Better alignment and recovery often mean stronger performance afterward." },
];

const related = [
  { label: "Joint Pain", href: "/conditions-treated/joint-pain/" },
  { label: "Knee Pain", href: "/conditions-treated/knee-pain/" },
  { label: "Trigger Point Injections", href: "/services/trigger-point-injections/" },
  { label: "Chiropractic Care", href: "/services/chiropractic-care/" },
];

export default function SportsInjuriesPage() {
  return (
    <main className="bg-slate-50">
      <ServiceSchema
        kind="condition"
        name="Sports Injuries"
        description="Recovery from recent and lingering sports injuries with chiropractic care and injections."
        pagePath="/sports-injuries/"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Conditions Treated", url: "/conditions-treated/" },
          { name: "Sports Injuries", url: "/sports-injuries/" },
        ]}
      />
      <PageHero title="Sports Injuries" parent={{ label: "Conditions Treated", href: "/conditions-treated/" }} />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-xl shadow-brand-900/10">
                <Image src={heroImage} alt="Sports injury recovery at Ascension Health in Fernley, NV" fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" priority placeholder="blur" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent" />
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="mt-8 text-[16px] leading-relaxed text-slate-700">
                Here at Ascension Health, we are proud to help people who are dealing with recent or even lingering sports injuries. Sports can be very taxing on your body, no matter what you play. Our trusted staff will work with you to get to the root of your problem and help you feel better again.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                Whether you tweaked something this weekend or have been quietly compensating for an old injury for years, our team takes it seriously. Sports injuries that get only partial attention almost always come back, usually right when you least want them to.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                A typical sports recovery plan combines chiropractic adjustments to restore proper motion, targeted rehab to rebuild strength and stability, and targeted injections when inflammation needs to be calmed quickly. The goal is to get you back to your sport in better shape than you were before the injury.
              </p>
            </Reveal>

            <div className="mt-12">
              <Reveal>
                <SectionEyebrow kicker="Athlete care" title="Recover fully. Then perform better." align="left" />
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
            <ConditionsSidebar currentSlug="sports-injuries" />
          </div>
        </div>
      </section>

      <CityLinkGrid
        heading="Find Sports Injury Care Near You"
        intro="Recovery-focused sports injury care from our Fernley clinic, serving athletes and active patients across Nevada."
        topic={{ slug: "sports-injuries", name: "Sports Injuries", kind: "condition" }}
      />

      <BottomCTA kicker="Questions?" heading={`Call ${SITE.phone}`} body="Tell our Fernley team about your injury, recent or lingering, and we'll map a recovery plan." />
    </main>
  );
}
