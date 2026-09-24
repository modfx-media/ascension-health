"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";
import { NAVIGATION, SITE } from "@/lib/navigation";
import logo from "@/images/logo.png";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Our Team", href: "/our-team/" },
  { label: "Blog", href: "/blog/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "New Patients", href: "/new-patients/" },
  { label: "Online Forms", href: "/new-patients/online-forms/" },
  { label: "Appointments", href: "/appointments/" },
  { label: "Areas We Serve", href: "/areas-we-serve/" },
  { label: "Contact", href: "/contact/" },
];

const services =
  NAVIGATION.find((n) => n.label === "Services")?.children ?? [];
const conditions =
  NAVIGATION.find((n) => n.label === "Conditions Treated")?.children ?? [];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#202f19] text-brand-50/90">
      {/* Top accent */}
      <div className="h-1 w-full bg-gradient-to-r from-brand-500 via-brand-400 to-brand-500" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + contact */}
          <div className="lg:col-span-4 space-y-5">
            <Link
              href="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-3"
              aria-label="Ascension Health, Home"
            >
              <span className="relative block h-14 w-14 shrink-0 overflow-hidden">
                <Image
                  src={logo}
                  alt=""
                  quality={95}
                  className="h-full w-auto max-w-none object-left object-contain"
                  sizes="56px"
                />
              </span>
              <span className="font-display text-2xl font-semibold tracking-tight text-white">
                Ascension Health
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-brand-100/70 max-w-sm">
              Personalized chiropractic and wellness care
              focused on relieving pain and helping you live an active,
              pain-free life.
            </p>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={SITE.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-brand-100/80 hover:text-white transition-colors"
                >
                  <MapPin className="h-4 w-4 mt-0.5 text-brand-400 shrink-0" />
                  <span>{SITE.address}</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-3 text-brand-100/80 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 text-brand-400 shrink-0" />
                  <span>{SITE.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-brand-100/80">
                <Clock className="h-4 w-4 mt-0.5 text-brand-400 shrink-0" />
                <span>{SITE.hours}</span>
              </li>
            </ul>

            <div className="flex items-center gap-3 pt-2">
              <SocialIcon
                href={SITE.social.facebook}
                label="Facebook"
                Icon={FacebookLogo}
              />
              <SocialIcon
                href={SITE.social.twitter}
                label="Twitter / X"
                Icon={XLogo}
              />
              <SocialIcon
                href={SITE.social.google}
                label="Google Business Profile"
                Icon={MapPin}
              />
            </div>
          </div>

          {/* Quick Links */}
          <FooterColumn className="lg:col-span-2" title="Quick Links">
            {QUICK_LINKS.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Services */}
          <FooterColumn className="lg:col-span-3" title="Services">
            <FooterLink href="/services/" highlight>
              All Services
            </FooterLink>
            {services.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Conditions */}
          <FooterColumn className="lg:col-span-3" title="Conditions Treated">
            <FooterLink href="/conditions-treated/" highlight>
              All Conditions
            </FooterLink>
            {conditions.slice(0, 12).map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        {/* CTA strip */}
        <div className="mt-14 rounded-2xl bg-brand-800/40 border border-brand-700/40 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-serif text-lg text-white">
              Ready to feel your best?
            </p>
            <p className="text-sm text-brand-200/80">
              Book a visit with our Fernley team today.
            </p>
          </div>
          <Link
            href={SITE.appointmentsHref}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-brand-950 hover:bg-accent-soft transition-colors shadow"
          >
            Request Appointment
          </Link>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-brand-800/50">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-200/60">
          <p>
            © {year} Ascension Health. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/sitemap/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-white transition-colors"
            >
              Sitemap
            </Link>
            <Link
              href="/accessibility/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-white transition-colors"
            >
              Accessibility
            </Link>
            <Link
              href="/privacy-policy/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-5 text-center text-xs text-brand-200/50">
          Powered by{" "}
          <a
            href="https://modfxmedia.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors underline-offset-2 hover:underline"
          >
            ModFXMedia.com
          </a>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------- helpers --------------------------- */

function FooterColumn({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300 mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  highlight,
}: {
  href: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={
          highlight
            ? "inline-flex items-center font-semibold text-white hover:text-brand-300 transition-colors"
            : "text-brand-100/75 hover:text-white transition-colors"
        }
      >
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-700/50 text-brand-200 hover:bg-brand-500 hover:text-[#202f19] hover:border-brand-500 transition-colors"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}

function XLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.78l-5.31-6.94L4.36 22H1.1l8.02-9.17L1.5 2h6.94l4.8 6.34L18.244 2Zm-1.19 18h1.87L7.05 4H5.05l12 16Z" />
    </svg>
  );
}

function FacebookLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.92.26-1.55 1.58-1.55H16.7V4.28c-.3-.04-1.3-.13-2.46-.13-2.43 0-4.1 1.49-4.1 4.22v2.43H7.4V14h2.74v8h3.36Z" />
    </svg>
  );
}
