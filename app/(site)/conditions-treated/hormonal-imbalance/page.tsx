import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import Image from "next/image";
import Link from "next/link";
import { HeartPulse, Activity, ShieldCheck, Sparkles, Phone, ArrowRight } from "lucide-react";
import { PageHero, BottomCTA } from "@/components/InteriorPage";
import { CityLinkGrid } from "@/components/pSEO/CityLinkGrid";
import { ConditionsSidebar } from "@/components/ConditionsSidebar";
import { SectionEyebrow, RelatedChips, ValueCard } from "@/components/InteriorMotion";
import { Reveal } from "@/components/Motion";
import { SITE } from "@/lib/navigation";
import heroImage from "@/images/clone/BMS12-scaled-1.jpg";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/conditions-treated/hormonal-imbalance/", {
  title: "Hormonal Imbalance in Fernley, NV",
  description:
    "Hormonal imbalance care in Fernley, NV. Ascension Health offers bioidentical hormone replacement therapy (BHRT) for fatigue, weight gain, low libido, mood changes and more.",
  alternates: { canonical: "/conditions-treated/hormonal-imbalance/" },
  openGraph: {
    title: "Hormonal Imbalance in Fernley, NV",
    description:
      "Bioidentical hormone replacement therapy and hormonal balance care in Fernley, NV.",
    url: "https://ascensionhealthnv.com/conditions-treated/hormonal-imbalance/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "Hormonal Imbalance in Fernley, NV",
    description:
      "Bioidentical hormone replacement therapy and hormonal balance care in Fernley, NV.",
  },
});
}

const benefits = [
  { icon: <HeartPulse className="h-5 w-5" />, title: "Steady Energy", body: "Restore the daily energy and stamina that have slowly disappeared." },
  { icon: <Activity className="h-5 w-5" />, title: "Mood & Sleep", body: "Calmer moods, deeper sleep and clearer focus throughout the day." },
  { icon: <Sparkles className="h-5 w-5" />, title: "Libido & Vitality", body: "Reignite intimacy, performance and overall sense of wellbeing." },
  { icon: <ShieldCheck className="h-5 w-5" />, title: "Bioidentical & Safe", body: "Plant-derived hormones matched to your body, monitored by our physician." },
];

const related = [
  { label: "Sexual Dysfunction", href: "/conditions-treated/sexual-dysfunction/" },
  { label: "Bioidentical HRT", href: "/services/bioidentical-hormone-replacement-therapy/" },
  { label: "Medical Weight Loss", href: "/services/medical-weight-loss/" },
  { label: "Nutritional IVs", href: "/services/nutritional-ivs/" },
];

export default function HormonalImbalancePage() {
  return (
    <main className="bg-slate-50">
      <ServiceSchema
        kind="condition"
        name="Hormonal Imbalance"
        description="Bioidentical hormone replacement therapy for fatigue, weight gain, low libido, mood changes and other hormone imbalance symptoms."
        pagePath="/conditions-treated/hormonal-imbalance/"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Conditions Treated", url: "/conditions-treated/" },
          { name: "Hormonal Imbalance", url: "/conditions-treated/hormonal-imbalance/" },
        ]}
      />
      <PageHero title="Hormonal Imbalance" parent={{ label: "Conditions Treated", href: "/conditions-treated/" }} />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-xl shadow-brand-900/10">
                <Image src={heroImage} alt="Hormonal balance care at Ascension Health in Fernley, NV" fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" priority placeholder="blur" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent" />
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="mt-8 text-[16px] leading-relaxed text-slate-700">
                Hormones regulate most major body functions and processes. They regulate our metabolism and appetite, our heart rate, sleep cycle, growth and development, mood and stress level, body temperature, plus reproductive cycles and sexual functions.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                When even one hormone drifts out of balance, the symptoms can feel scattered and frustrating, stubborn weight gain, low energy, brain fog, mood swings, poor sleep, low libido, hot flashes or anxiety that wasn&apos;t there before. The good news is that these signals are exactly that: signals you can listen to and act on.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                Our team uses bioidentical hormone replacement therapy (BHRT) and a full lab work-up to understand what your body is asking for. Treatment is personalised, never one-size-fits-all, and re-evaluated regularly to make sure you are getting steady relief without overshooting.
              </p>
            </Reveal>

            <div className="mt-12">
              <Reveal>
                <SectionEyebrow kicker="What to expect" title="Personalised hormone care, monitored carefully." align="left" />
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
            <ConditionsSidebar currentSlug="hormonal-imbalance" />
          </div>
        </div>
      </section>

      <CityLinkGrid
        heading="Find Hormone Care Near You"
        intro="Lab-guided hormone therapy from our Fernley clinic, serving men and women across Nevada."
        topic={{ slug: "hormonal-imbalance", name: "Hormonal Imbalance", kind: "condition" }}
      />

      <BottomCTA kicker="Questions?" heading={`Call ${SITE.phone}`} body="Talk to our Fernley physician about a hormone plan that fits your labs and your life." />
    </main>
  );
}
