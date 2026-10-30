import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import Link from "next/link";
import {
  Stethoscope,
  Activity,
  Dumbbell,
  HeartPulse,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { PageHero, AppointmentSidebar, BottomCTA } from "@/components/InteriorPage";
import {
  InteriorCollage,
  SectionEyebrow,
  ValueCard,
  RelatedChips,
} from "@/components/InteriorMotion";
import { Reveal } from "@/components/Motion";
import { SITE } from "@/lib/navigation";
import skeletonImage from "@/images/Chiropractic-skeleton.jpg";

const ABOUT_DESCRIPTION =
  "Our mission at Ascension Health is to provide excellent chiropractic care in Fernley, NV. We assess the patient as a whole and lead you into a lifestyle of being pain free. Call (775) 575-9922.";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/about/", {
  title: "About Ascension Health in Fernley, NV",
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: "/about/" },
  openGraph: {
    title: "About Ascension Health in Fernley, NV",
    description: ABOUT_DESCRIPTION,
    url: "https://ascensionhealthnv.com/about/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "About Ascension Health in Fernley, NV",
    description: ABOUT_DESCRIPTION,
  },
});
}

const approach = [
  {
    icon: <Stethoscope className="h-5 w-5" />,
    title: "Chiropractic Manipulation",
    body: "Precise, gentle spinal adjustments to restore proper motion and relieve pressure on the nervous system.",
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: "Soft-Tissue Techniques",
    body: "Targeted work on muscles, tendons and fascia to release tension and accelerate recovery.",
  },
  {
    icon: <Dumbbell className="h-5 w-5" />,
    title: "Therapeutic Rehabilitation",
    body: "Personalized exercises that rebuild strength and stability so your results last beyond the visit.",
  },
  {
    icon: <HeartPulse className="h-5 w-5" />,
    title: "Whole-Person Care",
    body: "We address the main concern and guide you toward a long-term, pain-free lifestyle.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-slate-50">
      <PageHero title="About" />

      <section className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                Our Mission
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
                Excellent chiropractic care, built around you.
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed text-slate-700">
                Our mission at Ascension Health is simply to serve you. We
                provide excellent chiropractic care to help our patients reach
                and exceed their health goals. We assess the patient as a
                whole. We want to address the main concern, but also lead you
                into a lifestyle of being pain free. We do all of this by
                offering an evidence-based approach to chiropractic care by
                utilizing chiropractic manipulation, soft-tissue techniques,
                therapeutic rehabilitation, and a variety of chiropractic
                services to help achieve your health goals.
              </p>
              <p className="mt-5 text-[16px] leading-relaxed text-slate-800 font-medium">
                Call us today at{" "}
                <a
                  href={SITE.phoneHref}
                  className="text-brand-700 hover:text-brand-800 underline-offset-4 hover:underline"
                >
                  {SITE.phone}
                </a>{" "}
                to request an appointment!
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
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

              <div className="mt-12 lg:hidden">
                <InteriorCollage
                  primary="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=80"
                  primaryAlt="Compassionate chiropractic care at Ascension Health"
                  secondary={skeletonImage.src}
                  secondaryAlt="Spinal anatomy illustration"
                  tertiary="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=600&q=80"
                  tertiaryAlt="Wellness consultation"
                  stat={{ value: "9 yrs", label: "Caring for Fernley families" }}
                  badge={{ kicker: "Trusted", value: "4.9 \u2605" }}
                />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <AppointmentSidebar />
          </div>
        </div>

        <div className="mt-16 hidden lg:block">
          <div className="grid grid-cols-12 gap-10 items-center">
            <div className="col-span-5">
              <InteriorCollage
                primary="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=80"
                primaryAlt="Compassionate chiropractic care at Ascension Health"
                secondary={skeletonImage.src}
                secondaryAlt="Spinal anatomy illustration"
                tertiary="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=600&q=80"
                tertiaryAlt="Wellness consultation"
                stat={{ value: "9 yrs", label: "Caring for Fernley families" }}
                badge={{ kicker: "Trusted", value: "4.9 \u2605" }}
              />
            </div>
            <div className="col-span-7">
              <Reveal>
                <SectionEyebrow
                  kicker="The Ascension Approach"
                  title="Evidence-based chiropractic, tailored to your goals."
                  description="Every plan is built around your history, your activity and what you want to get back to doing. Care is hands-on, integrative and rooted in current clinical research."
                  align="left"
                />
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {approach.map((a, i) => (
                    <ValueCard
                      key={a.title}
                      index={i}
                      icon={a.icon}
                      title={a.title}
                      body={a.body}
                    />
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="mt-12 lg:hidden">
          <SectionEyebrow
            kicker="The Ascension Approach"
            title="Evidence-based chiropractic, tailored to your goals."
            description="Every plan is built around your history, your activity and what you want to get back to doing."
            align="left"
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {approach.map((a, i) => (
              <ValueCard
                key={a.title}
                index={i}
                icon={a.icon}
                title={a.title}
                body={a.body}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-20">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(67,86,39,0.6) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionEyebrow
            kicker="What we offer"
            title="A full range of services under one roof"
            description="From chiropractic adjustments and spinal decompression to medical weight loss and nutritional IVs, we bring it all together for you."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Chiropractic Care", href: "/services/chiropractic-care/" },
              { label: "Spinal Decompression", href: "/services/spinal-decompression/" },
              { label: "Joint Injections", href: "/services/joint-injections/" },
              { label: "Trigger Point Injections", href: "/services/trigger-point-injections/" },
              { label: "Nutritional IVs", href: "/services/nutritional-ivs/" },
              { label: "Medical Weight Loss", href: "/services/medical-weight-loss/" },
            ].map((s, i) => (
              <Reveal key={s.href} delay={i * 0.04}>
                <Link
                  href={s.href}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-brand-600 hover:shadow-lg hover:shadow-brand-900/10"
                >
                  <div>
                    <p className="font-display text-base font-semibold text-slate-900 group-hover:text-brand-700">
                      {s.label}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Learn more about this service
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-brand-500 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 sm:grid-cols-3">
          {[
            { icon: <Phone className="h-5 w-5" />, label: "Call Us", value: SITE.phone, href: SITE.phoneHref },
            { icon: <MapPin className="h-5 w-5" />, label: "Address", value: SITE.address, href: SITE.mapsHref },
            { icon: <Clock className="h-5 w-5" />, label: "Office Hours", value: "Mon–Thu · 9:00am – 6:00pm" },
          ].map((it, i) => (
            <Reveal key={it.label} delay={i * 0.05}>
              <a
                href={it.href ?? "#"}
                className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  {it.icon}
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-brand-700">
                  {it.label}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-800">
                  {it.value}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionEyebrow
            kicker="Conditions we treat"
            title="Common reasons our patients visit"
            align="left"
          />
          <div className="mt-8">
            <RelatedChips
              items={[
                { label: "Back Pain", href: "/conditions-treated/back-pain/" },
                { label: "Neck Pain", href: "/conditions-treated/neck-pain/" },
                { label: "Shoulder Pain", href: "/conditions-treated/shoulder-pain/" },
                { label: "Sciatica", href: "/conditions-treated/sciatica/" },
                { label: "Headaches & Migraines", href: "/conditions-treated/headaches-migraines/" },
                { label: "Joint Pain", href: "/conditions-treated/joint-pain/" },
                { label: "Knee Pain", href: "/conditions-treated/knee-pain/" },
                { label: "Neuropathy", href: "/conditions-treated/neuropathy/" },
              ]}
            />
          </div>
        </div>
      </section>

      <BottomCTA />
    </main>
  );
}
