import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import Link from "next/link";
import { Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { PageHero, BottomCTA } from "@/components/InteriorPage";
import { Reveal } from "@/components/Motion";
import LeadForm from "@/components/LeadForm";
import { SITE } from "@/lib/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/contact/", {
  title: "Chiropractor Near Me - Contact Us",
  description:
    "Contact Ascension Health in Fernley, NV. Call (775) 575-9922, text (775) 204-4640, or request an appointment online. 415 HWY 95A Suite 503, Fernley, NV 89408.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: "Chiropractor Near Me - Contact Us",
    description:
      "Get in touch with Ascension Health, chiropractic care and wellness in Fernley, NV.",
    url: "https://ascensionhealthnv.com/contact/",
    type: "website",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "Chiropractor Near Me - Contact Us",
    description:
      "Get in touch with Ascension Health, chiropractic care and wellness in Fernley, NV.",
  },
});
}

const MAPS_QUERY = encodeURIComponent("415 HWY 95A Suite 503, Fernley, NV 89408");
const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;
const MAPS_LINK = SITE.mapsHref;

const INFO_CARDS = [
  {
    icon: Phone,
    eyebrow: "Call",
    title: SITE.phone,
    subtitle: "Speak with our Fernley team",
    href: SITE.phoneHref,
    cta: "Tap to call",
  },
  {
    icon: MapPin,
    eyebrow: "Visit Us",
    title: "415 HWY 95A Suite 503",
    subtitle: "Fernley, NV 89408",
    href: MAPS_LINK,
    cta: "Get directions",
    external: true,
  },
  {
    icon: Clock,
    eyebrow: "Business Hours",
    title: "Monday – Thursday",
    subtitle: "9:00 am – 6:00 pm",
    href: SITE.appointmentsHref,
    cta: "Book a time",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" />

      {/* Info cards */}
      <section className="relative -mt-12 lg:-mt-16 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-5 md:grid-cols-3">
            {INFO_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.eyebrow} delay={i * 0.08}>
                  <a
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
                    className="group relative block h-full overflow-hidden rounded-2xl bg-white p-7 shadow-xl shadow-brand-900/10 ring-1 ring-slate-100 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-900/15 hover:ring-brand-200"
                  >
                    <span
                      aria-hidden
                      className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-accent/20 to-brand-200/20 blur-2xl transition-transform group-hover:scale-125"
                    />
                    <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 text-white shadow-md">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="relative mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                      {card.eyebrow}
                    </p>
                    <h3 className="relative mt-1.5 font-display text-xl font-semibold text-slate-900">
                      {card.title}
                    </h3>
                    <p className="relative mt-1 text-sm text-slate-600">{card.subtitle}</p>
                    <span className="relative mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:gap-2 transition-all">
                      {card.cta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + map split */}
      <section className="relative pb-20 sm:pb-24">
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="mx-auto max-w-7xl px-6 pt-16 sm:pt-20">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
            {/* Form */}
            <div className="lg:col-span-3">
              <Reveal>
                <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                  Request an Appointment
                </span>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
                  Request An Appointment Today
                </h2>
                <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-xl">
                  Share a few details and our team will follow up within one
                  business day to confirm your visit.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-8">
                  <LeadForm instanceId="contact" />
                </div>
              </Reveal>
            </div>

            {/* Map + secondary contact */}
            <div className="lg:col-span-2 space-y-6">
              <Reveal delay={0.15}>
                <div className="overflow-hidden rounded-3xl shadow-xl shadow-brand-900/10 ring-1 ring-slate-100">
                  <div className="relative aspect-square sm:aspect-[4/5] lg:aspect-[3/4] w-full bg-slate-100">
                    <iframe
                      title="Ascension Health, 415 HWY 95A Suite 503, Fernley, NV 89408"
                      src={MAPS_EMBED}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 h-full w-full border-0"
                      allowFullScreen
                    />
                  </div>
                  <div className="bg-white p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
                      Our Location
                    </p>
                    <p className="mt-1.5 font-display text-lg font-semibold text-slate-900">
                      Ascension Health
                    </p>
                    <p className="text-sm text-slate-600">
                      415 HWY 95A Suite 503
                      <br />
                      Fernley, NV 89408
                    </p>
                    <Link
                      href={MAPS_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2 transition-all"
                    >
                      Get directions
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="rounded-3xl bg-gradient-to-br from-brand-800 to-brand-950 p-7 text-white shadow-xl shadow-brand-900/20 relative overflow-hidden">
                  <span
                    aria-hidden
                    className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-accent/20 blur-2xl"
                  />
                  <p className="relative text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                    Quick Connect
                  </p>
                  <h3 className="relative mt-2 font-display text-2xl font-semibold">
                    Prefer to talk now?
                  </h3>
                  <div className="relative mt-5 space-y-3">
                    <a
                      href={SITE.phoneHref}
                      className="flex items-center gap-3 rounded-xl bg-white/10 p-3.5 ring-1 ring-white/15 hover:bg-white/15 transition-colors"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-brand-950">
                        <Phone className="h-4 w-4" />
                      </span>
                      <span className="flex flex-col leading-tight">
                        <span className="text-[10px] uppercase tracking-widest text-brand-100/70">Call</span>
                        <span className="font-semibold">{SITE.phone}</span>
                      </span>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <BottomCTA />
    </>
  );
}
