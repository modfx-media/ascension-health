import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  ArrowRight,
  Scale,
  Salad,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";
import { PageHero, BottomCTA } from "@/components/InteriorPage";
import { CityLinkGrid } from "@/components/pSEO/CityLinkGrid";
import { ServicesSidebar } from "@/components/ServicesSidebar";
import { SectionEyebrow, ValueCard, RelatedChips } from "@/components/InteriorMotion";
import { Reveal } from "@/components/Motion";
import { SITE } from "@/lib/navigation";
import heroImage from "@/images/clone/weightloss_img.jpg";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/services/medical-weight-loss/", {
  title: "Medical Weight Loss in Fernley, NV",
  description:
    "Medical Weight Loss - Weight Loss is a process that is definitely easier said than done. So often people hear from their medical providers,\u201dYou should probably lose a little",
  alternates: { canonical: "/services/medical-weight-loss/" },
  openGraph: {
    title: "Medical Weight Loss in Fernley, NV",
    description:
      "Physician-guided medical weight loss in Fernley, NV, a real plan, not just advice to eat less and move more.",
    url: "https://ascensionhealthnv.com/services/medical-weight-loss/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "Medical Weight Loss in Fernley, NV",
    description:
      "Physician-guided medical weight loss in Fernley, NV, a real plan, not just advice to eat less and move more.",
  },
});
}

const benefits = [
  {
    icon: <Scale className="h-5 w-5" />,
    title: "A Real Plan, Not Advice",
    body: "Every plan is built around your body, your goals and your daily life.",
  },
  {
    icon: <Salad className="h-5 w-5" />,
    title: "Nutrition That Makes Sense",
    body: "Clear, sustainable guidance, no fads, no overwhelming conflicting rules.",
  },
  {
    icon: <HeartPulse className="h-5 w-5" />,
    title: "Movement You Can Do",
    body: "Activity recommendations that work even with joint pain or low fitness.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Physician Supervised",
    body: "Medical oversight keeps your plan safe, sustainable and effective.",
  },
];

const related = [
  { label: "Nutritional IVs", href: "/services/nutritional-ivs/" },
  { label: "Bioidentical Hormones", href: "/services/bioidentical-hormone-replacement-therapy/" },
  { label: "Chiropractic Care", href: "/services/chiropractic-care/" },
];

export default function MedicalWeightLossPage() {
  return (
    <main className="bg-slate-50">
      <ServiceSchema
        name="Medical Weight Loss"
        description="Physician-guided weight management combining nutrition, accountability and medical support for sustainable results."
        pagePath="/services/medical-weight-loss/"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services/" },
          { name: "Medical Weight Loss", url: "/services/medical-weight-loss/" },
        ]}
      />
      <PageHero
        title="Medical Weight Loss"
        parent={{ label: "Services", href: "/services/" }}
      />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-xl shadow-brand-900/10">
                <Image
                  src={heroImage}
                  alt="Medical weight loss program at Ascension Health"
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
                Weight loss is a process that is definitely easier said than
                done. So often people hear from their medical providers, &quot;You
                should probably lose a little weight, it will be good for
                you.&quot; Their advice is correct, however there usually isn&apos;t
                a plan that comes with it.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                Diet and exercise is the usual recommendation. That can be
                challenging, some people have so much weight to lose that
                they cannot exercise for very long, or they have joint pain
                that prohibits them from exercising. Diet can be very
                confusing too: there is so much information out there it can
                leave a person feeling overwhelmed.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                At Ascension Health, our medical weight loss program is
                designed to give you the structure that&apos;s usually missing.
                We combine clinical evaluation, sustainable nutrition coaching,
                realistic movement guidance and the right medical support, so
                you have a clear path forward instead of guesswork.
              </p>
            </Reveal>

            <div className="mt-12">
              <Reveal>
                <SectionEyebrow
                  kicker="Why it works"
                  title="A real, supported plan, built for your life."
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
                Ready to start a plan that actually fits your life? Call our
                Fernley office at{" "}
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
            <ServicesSidebar currentSlug="medical-weight-loss" />
          </div>
        </div>
      </section>

      <CityLinkGrid
        heading="Serving These Nevada Cities"
        intro="Physician-led medical weight loss with GLP-1 options, real labs, and accountability, from Fernley for patients across Nevada."
        topic={{ slug: "medical-weight-loss", name: "Medical Weight Loss", kind: "service" }}
      />

      <BottomCTA
        kicker="Questions?"
        heading={`Call ${SITE.phone}`}
        body="Our Fernley team will help you build a weight-loss plan you can actually stick with."
      />
    </main>
  );
}
