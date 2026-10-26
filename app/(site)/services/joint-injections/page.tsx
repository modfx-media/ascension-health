import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  ArrowRight,
  Target,
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
import heroImage from "@/images/clone/man-running.jpg";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/services/joint-injections/", {
  title: "Joint Injections in Fernley, NV",
  description:
    "Joint Injections - Joint Injections At Ascension Health, we offer joint injections to those patients struggling with joint pain. Joint pain can occur in any joint of the",
  alternates: { canonical: "/services/joint-injections/" },
  openGraph: {
    title: "Joint Injections in Fernley, NV",
    description:
      "Non-surgical joint injections for knee, hip, shoulder and wrist pain in Fernley, NV.",
    url: "https://ascensionhealthnv.com/services/joint-injections/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "Joint Injections in Fernley, NV",
    description:
      "Non-surgical joint injections for knee, hip, shoulder and wrist pain in Fernley, NV.",
  },
});
}

const benefits = [
  {
    icon: <Target className="h-5 w-5" />,
    title: "Targeted Pain Relief",
    body: "Injections delivered straight to inflamed joints for fast, focused results.",
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: "Improved Range of Motion",
    body: "Many patients regain comfortable movement after just one or two treatments.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "Supports Recovery",
    body: "Less pain makes rehab and therapeutic exercise more effective and tolerable.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Non-Surgical Option",
    body: "A conservative alternative when medications and other conservative care alone aren't enough.",
  },
];

const related = [
  { label: "Trigger Point Injections", href: "/services/trigger-point-injections/" },
  { label: "Chiropractic Care", href: "/services/chiropractic-care/" },
  { label: "Spinal Decompression", href: "/services/spinal-decompression/" },
];

export default function JointInjectionsPage() {
  return (
    <main className="bg-slate-50">
      <ServiceSchema
        name="Joint Injections"
        description="Image-guided injections that reduce inflammation and restore comfortable movement in the knee, hip, shoulder and other joints."
        pagePath="/services/joint-injections/"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services/" },
          { name: "Joint Injections", url: "/services/joint-injections/" },
        ]}
      />
      <PageHero title="Joint Injections" parent={{ label: "Services", href: "/services/" }} />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-xl shadow-brand-900/10">
                <Image
                  src={heroImage}
                  alt="Active patient after joint injection therapy at Ascension Health"
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
                At Ascension Health, we offer joint injections to those
                patients struggling with joint pain. Joint pain can occur in
                any joint of the body, but most patients who experience joint
                pain tend to feel it in the wrists, knees, hips, or shoulders.
                Acute joint pain is typically the result of an injury or direct
                trauma, while chronic joint pain can be caused by rheumatoid
                arthritis or osteoarthritis.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                Persistent and/or severe pain that prohibits your ability to
                complete everyday tasks should be evaluated by a doctor. If you
                notice redness, joint deformity, swelling, or reduced range of
                motion, it&apos;s time to schedule an appointment.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
                If over-the-counter medications and conservative care prove
                unable to relieve your pain, we may proceed with another method
                of treatment such as joint injections. This non-surgical
                treatment option can not only help you experience pain relief,
                but also provide increased range of motion, which can make
                daily movement and rehab more comfortable.
              </p>
            </Reveal>

            <div className="mt-12">
              <Reveal>
                <SectionEyebrow
                  kicker="Why it works"
                  title="Benefits patients notice quickly."
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
                Ready to get moving again? Call{" "}
                <a href={SITE.phoneHref} className="font-semibold text-brand-700 hover:text-brand-800">
                  {SITE.phone}
                </a>{" "}
                today.
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
            <ServicesSidebar currentSlug="joint-injections" />
          </div>
        </div>
      </section>

      <CityLinkGrid
        heading="Serving These Nevada Cities"
        intro="In-office joint injections at Ascension Health in Fernley, knee, shoulder, hip, and more for patients across northern and southern Nevada."
        topic={{ slug: "joint-injections", name: "Joint Injections", kind: "service" }}
      />

      <BottomCTA
        kicker="Questions?"
        heading={`Call ${SITE.phone}`}
        body="Our Fernley team is here to help you find relief from joint pain."
      />
    </main>
  );
}
