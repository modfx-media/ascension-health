import type { Metadata } from "next";
import Link from "next/link";
import {
  Home as HomeIcon,
  UserPlus,
  CalendarCheck,
  Stethoscope,
  Activity,
  FileText,
  Map as MapIcon,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { PageHero, BottomCTA } from "@/components/InteriorPage";
import { Reveal } from "@/components/Motion";
import { PSEO_TARGET_CITIES } from "@/lib/pSEO-routing";

export const metadata: Metadata = {
  title: "Sitemap in Fernley, NV",
  description:
    "Browse every page on the Ascension Health website, services, conditions treated, patient resources and contact information for our Fernley, NV practice.",
  alternates: { canonical: "/sitemap/" },
};

type SitemapLink = { label: string; href: string };
type SitemapGroup = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  links: SitemapLink[];
};

const GROUPS: SitemapGroup[] = [
  {
    title: "Main Pages",
    icon: HomeIcon,
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about/" },
      { label: "Our Team", href: "/our-team/" },
      { label: "Appointments", href: "/appointments/" },
      { label: "Contact", href: "/contact/" },
      { label: "Reviews", href: "/reviews/" },
    ],
  },
  {
    title: "New Patients",
    icon: UserPlus,
    links: [
      { label: "New Patients", href: "/new-patients/" },
      { label: "Online Forms", href: "/new-patients/online-forms/" },
    ],
  },
  {
    title: "Services",
    icon: Stethoscope,
    links: [
      { label: "Services Overview", href: "/services/" },
      { label: "Chiropractic Care", href: "/services/chiropractic-care/" },
      { label: "Spinal Decompression", href: "/services/spinal-decompression/" },
      { label: "Joint Injections", href: "/services/joint-injections/" },
      { label: "Trigger Point Injections", href: "/services/trigger-point-injections/" },
      { label: "Nutritional IVs", href: "/services/nutritional-ivs/" },
      {
        label: "Bioidentical Hormone Replacement Therapy",
        href: "/services/bioidentical-hormone-replacement-therapy/",
      },
      { label: "Medical Weight Loss", href: "/services/medical-weight-loss/" },
      { label: "GAINSWave®", href: "/services/gainswave/" },
    ],
  },
  {
    title: "Conditions Treated",
    icon: Activity,
    links: [
      { label: "Conditions Treated", href: "/conditions-treated/" },
      { label: "Back Pain", href: "/conditions-treated/back-pain/" },
      { label: "Carpal Tunnel", href: "/conditions-treated/carpal-tunnel/" },
      { label: "Headaches / Migraines", href: "/conditions-treated/headaches-migraines/" },
      { label: "Intersegmental Traction", href: "/conditions-treated/intersegmental-traction/" },
      { label: "Myofascial Release", href: "/conditions-treated/myofascial-release/" },
      { label: "Neck Pain", href: "/conditions-treated/neck-pain/" },
      { label: "Sciatica", href: "/conditions-treated/sciatica/" },
      { label: "Scoliosis", href: "/conditions-treated/scoliosis/" },
      { label: "Shoulder Pain", href: "/conditions-treated/shoulder-pain/" },
      { label: "Whiplash", href: "/conditions-treated/whiplash/" },
      { label: "Work Injury", href: "/conditions-treated/work-injury/" },
    ],
  },
  {
    title: "Wellness & Recovery",
    icon: CalendarCheck,
    links: [
      { label: "Pain Relief", href: "/conditions-treated/pain-relief/" },
      { label: "Joint Pain", href: "/conditions-treated/joint-pain/" },
      { label: "Knee Pain", href: "/conditions-treated/knee-pain/" },
      { label: "Neuropathy", href: "/conditions-treated/neuropathy/" },
      { label: "Hormonal Imbalance", href: "/conditions-treated/hormonal-imbalance/" },
      { label: "Sexual Dysfunction", href: "/conditions-treated/sexual-dysfunction/" },
      { label: "Sports Injuries", href: "/sports-injuries/" },
      { label: "Spinal Decompression", href: "/spinal-decompression/" },
    ],
  },
  {
    title: "Resources",
    icon: FileText,
    links: [
      { label: "Sitemap", href: "/sitemap/" },
      { label: "What Can We Improve?", href: "/what-can-we-improve/" },
      { label: "Thank You", href: "/thank-you/" },
    ],
  },
  {
    title: "Areas We Serve",
    icon: MapPin,
    links: [
      { label: "All Areas We Serve", href: "/areas-we-serve/" },
      ...[...PSEO_TARGET_CITIES]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((c) => ({ label: `${c.name}, NV`, href: `/${c.slug}-nv/` })),
      { label: "Eugene, OR", href: "/eugene-or/" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <PageHero title="Sitemap" />

      <section className="relative pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 pt-16 sm:pt-20">
          <Reveal>
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                Find Your Way Around
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
                Every page on Ascension Health
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                A complete index of services, conditions, and patient resources,
                organized to help you find what you need quickly.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {GROUPS.map((group, i) => {
              const Icon = group.icon;
              return (
                <Reveal key={group.title} delay={i * 0.05}>
                  <div className="group relative h-full overflow-hidden rounded-2xl bg-white p-7 shadow-lg shadow-brand-900/5 ring-1 ring-slate-100 transition-all hover:shadow-xl hover:shadow-brand-900/10 hover:ring-brand-200">
                    <span
                      aria-hidden
                      className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-accent/10 to-brand-200/20 blur-2xl transition-transform group-hover:scale-125"
                    />
                    <div className="relative flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 text-white shadow-md">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="font-display text-lg font-semibold text-slate-900">
                        {group.title}
                      </h3>
                    </div>

                    <ul className="relative mt-5 space-y-1.5">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="group/item flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-800 transition-colors"
                          >
                            <span>{link.label}</span>
                            <ChevronRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-brand-600" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-12 flex items-center justify-center gap-2 text-sm text-slate-500">
              <MapIcon className="h-4 w-4" />
              <span>
                Looking for an XML version?{" "}
                <Link
                  href="/sitemap.xml"
                  className="font-semibold text-brand-700 hover:text-brand-900"
                >
                  /sitemap.xml
                </Link>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <BottomCTA />
    </>
  );
}
