import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  ArrowRight,
  Zap,
  Activity,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { PageHero, BottomCTA } from "@/components/InteriorPage";
import { CityLinkGrid } from "@/components/pSEO/CityLinkGrid";
import { ServicesSidebar } from "@/components/ServicesSidebar";
import { SectionEyebrow, ValueCard, RelatedChips } from "@/components/InteriorMotion";
import { Reveal } from "@/components/Motion";
import { SITE } from "@/lib/navigation";
import heroImage from "@/images/clone/knee-pain-1-2.jpg";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/services/trigger-point-injections/", {
  title: "Trigger Point Injections in Fernley, NV",
  description:
    "Trigger Point Injections - Here at Ascension Health, we are proud to offer trigger point injections for patients struggling with fibromyalgia, tension headaches, myofascial pain,",
  alternates: { canonical: "/services/trigger-point-injections/" },
  openGraph: {
    title: "Trigger Point Injections in Fernley, NV",
    description:
      "Trigger point injections for fibromyalgia, tension headaches and chronic muscle pain in Fernley, NV.",
    url: "https://ascensionhealthnv.com/services/trigger-point-injections/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "Trigger Point Injections in Fernley, NV",
    description:
      "Trigger point injections for fibromyalgia, tension headaches and chronic muscle pain in Fernley, NV.",
  },
});
}

const benefits = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Fast Symptom Relief",
    body: "Small amounts of anesthetic calm the trigger point and ease referred pain.",
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: "Return to Activity",
    body: "Use your muscles right after treatment, just avoid strenuous activity for a few days.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "Treats Many Conditions",
    body: "Helpful for fibromyalgia, tension headaches and myofascial pain syndromes.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Safe & Low-Risk",
    body: "A well-tolerated procedure with a very low risk of complications.",
  },
];

const related = [
  { label: "Joint Injections", href: "/services/joint-injections/" },
  { label: "Chiropractic Care", href: "/services/chiropractic-care/" },
  { label: "Spinal Decompression", href: "/services/spinal-decompression/" },
];

export default function TriggerPointInjectionsPage() {
  return (
    <main className="bg-slate-50">
      <ServiceSchema
        name="Trigger Point Injections"
        description="Quick in-office injections that release knotted muscle bands and calm myofascial pain, tension headaches and fibromyalgia symptoms."
        pagePath="/services/trigger-point-injections/"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services/" },
          { name: "Trigger Point Injections", url: "/services/trigger-point-injections/" },
        ]}
      />
      <PageHero
        title="Trigger Point Injections"
        parent={{ label: "Services", href: "/services/" }}
      />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-xl shadow-brand-900/10">
                <Image
                  src={heroImage}
                  alt="Patient with muscle pain, trigger point injections at Ascension Health"
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
                Here at Ascension Health, we are proud to offer trigger point
                injections for patients struggling with fibromyalgia, tension
                headaches, myofascial pain, and muscle pain in the arms, legs,
                lower back and neck.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                During your appointment, we&apos;ll locate the area where
                you&apos;re experiencing pain and inject small amounts of
                anesthetic to help alleviate your symptoms.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                This procedure is safe and the risk of possible complications
                is very low. You may experience soreness or numbness at the
                injection site for a temporary period of time. While you should
                avoid strenuous activity for a few days, you should be able to
                actively use your muscles immediately following treatment.
              </p>
            </Reveal>

            <div className="mt-12">
              <Reveal>
                <SectionEyebrow
                  kicker="Why it works"
                  title="A simple, in-office way to break the pain cycle."
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
                For more information or to request an appointment, contact us
                today at{" "}
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
            <ServicesSidebar currentSlug="trigger-point-injections" />
          </div>
        </div>
      </section>

      <CityLinkGrid
        heading="Serving These Nevada Cities"
        intro="Trigger point injections for stubborn muscle knots, tension headaches, and myofascial pain, from our Fernley clinic serving Nevada cities."
        topic={{ slug: "trigger-point-injections", name: "Trigger Point Injections", kind: "service" }}
      />

      <BottomCTA
        kicker="Questions?"
        heading={`Call ${SITE.phone}`}
        body="Our Fernley team will help you find lasting relief from chronic muscle pain."
      />
    </main>
  );
}
