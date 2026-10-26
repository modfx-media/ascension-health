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
import heroImage from "@/images/clone/kneepain_img.jpg";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/conditions-treated/knee-pain/", {
  title: "Knee Pain in Fernley, NV",
  description:
    "Knee pain treatment in Fernley, NV. Ascension Health offers non-surgical care for osteoarthritis, meniscus injuries, runner's knee and post-injury rehab.",
  alternates: { canonical: "/conditions-treated/knee-pain/" },
  openGraph: {
    title: "Knee Pain in Fernley, NV",
    description:
      "Non-surgical knee pain care in Fernley, NV, chiropractic, joint injections and targeted rehab.",
    url: "https://ascensionhealthnv.com/conditions-treated/knee-pain/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "Knee Pain in Fernley, NV",
    description:
      "Non-surgical knee pain care in Fernley, NV, chiropractic, joint injections and targeted rehab.",
  },
});
}

const benefits = [
  { icon: <Activity className="h-5 w-5" />, title: "Real Cause Diagnosis", body: "We don't accept \"wear and tear\" as an answer, we find the actual cause." },
  { icon: <HeartPulse className="h-5 w-5" />, title: "Joint Injections", body: "Targeted injections reduce inflammation and lubricate the joint." },
  { icon: <ShieldCheck className="h-5 w-5" />, title: "Avoid Surgery", body: "Many patients postpone or avoid knee surgery with our conservative care." },
  { icon: <Sparkles className="h-5 w-5" />, title: "Strength Rebuild", body: "Targeted rehab rebuilds the muscles that protect and support the knee." },
];

const related = [
  { label: "Joint Pain", href: "/conditions-treated/joint-pain/" },
  { label: "Joint Injections", href: "/services/joint-injections/" },
  { label: "Sports Injuries", href: "/sports-injuries/" },
  { label: "Chiropractic Care", href: "/services/chiropractic-care/" },
];

export default function KneePainPage() {
  return (
    <main className="bg-slate-50">
      <ServiceSchema
        kind="condition"
        name="Knee Pain"
        description="Non-surgical care for osteoarthritis, meniscus injuries, runner's knee and post-injury knee rehab."
        pagePath="/conditions-treated/knee-pain/"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Conditions Treated", url: "/conditions-treated/" },
          { name: "Knee Pain", url: "/conditions-treated/knee-pain/" },
        ]}
      />
      <PageHero title="Knee Pain" parent={{ label: "Conditions Treated", href: "/conditions-treated/" }} />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-xl shadow-brand-900/10">
                <Image src={heroImage} alt="Knee pain evaluation at Ascension Health in Fernley, NV" fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" priority placeholder="blur" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent" />
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="mt-8 text-[16px] leading-relaxed text-slate-700">
                Knee pain is increasingly becoming a more common problem in society. It is a complaint we see frequently. The most common complaint associated with knee pain is considered the normal &ldquo;wear and tear.&rdquo; The truth is there is no such thing as normal wear and tear. Osteoarthritis is one of the most common conditions that affect people&apos;s knees, a degenerative process that starts when there is dysfunction in how the joint moves and loads.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                At Ascension Health we look beyond the knee itself. The hips, ankles and lower back all influence how the knee tracks and carries weight, and small imbalances elsewhere often show up as knee pain. A thorough examination tells us where the real problem lives.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                Treatment usually combines chiropractic adjustments, joint injections when appropriate, and a progressive rehab plan to restore strength and stability. Many patients who came in expecting they&apos;d need surgery leave with a plan that keeps them on their own two knees.
              </p>
            </Reveal>

            <div className="mt-12">
              <Reveal>
                <SectionEyebrow kicker="What we do differently" title={"Don't settle for \u201Cit's just wear and tear.\u201D"} align="left" />
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
            <ConditionsSidebar currentSlug="knee-pain" />
          </div>
        </div>
      </section>

      <CityLinkGrid
        heading="Find Knee Pain Treatment Near You"
        intro="Help your knees avoid surgery, conservative care from our Fernley clinic serving Nevada patients."
        topic={{ slug: "knee-pain", name: "Knee Pain", kind: "condition" }}
      />

      <BottomCTA kicker="Questions?" heading={`Call ${SITE.phone}`} body="Talk to our Fernley team about a knee plan that may help you avoid surgery." />
    </main>
  );
}
