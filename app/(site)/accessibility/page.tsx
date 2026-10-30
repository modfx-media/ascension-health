import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import {
  Accessibility,
  Keyboard,
  Eye,
  Mic,
  ArrowUpRight,
} from "lucide-react";
import { PageHero, AppointmentSidebar, BottomCTA } from "@/components/InteriorPage";
import { Reveal } from "@/components/Motion";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/accessibility/", {
  title: "Accessibility in Fernley, NV",
  description:
    "Ascension Health is committed to making our website accessible to everyone. Find tips and resources to help you browse our site more comfortably.",
  alternates: { canonical: "/accessibility/" },
  openGraph: {
    title: "Accessibility in Fernley, NV",
    description:
      "Ascension Health is committed to making our website accessible to everyone.",
    url: "https://ascensionhealthnv.com/accessibility/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "Accessibility in Fernley, NV",
    description:
      "Ascension Health is committed to making our website accessible to everyone.",
  },
});
}

const ssaTips = [
  {
    label: "Use your computer to read web pages out loud",
    href: "https://www.ssa.gov/accessibility/browseAloud.html",
  },
  {
    label: "Use the keyboard to navigate screens",
    href: "https://www.ssa.gov/accessibility/keyboard_nav.html",
  },
  {
    label: "Increase text size",
    href: "https://www.ssa.gov/accessibility/textsize.html",
  },
  {
    label: "Magnify your screen",
    href: "https://www.ssa.gov/accessibility/magnifyscreen.html",
  },
  {
    label: "Change background and text colors",
    href: "https://www.ssa.gov/accessibility/changecolors.html",
  },
  {
    label: "Make your mouse pointer more visible (Windows only)",
    href: "https://www.ssa.gov/accessibility/mousepointer.html",
  },
];

export default function AccessibilityPage() {
  return (
    <main className="bg-slate-50">
      <PageHero title="Accessibility" />

      <section className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                <Accessibility className="h-3.5 w-3.5" />
                Our Commitment
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
                Accessibility at Ascension Health
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-slate-700">
                We are continuously working to improve the accessibility of
                content on our website. Below, you&rsquo;ll find a few
                recommendations to help make your browsing experience more
                accessible.
              </p>

              <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Eye className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-slate-900">
                      If you have trouble seeing web pages
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      The US Social Security Administration offers these tips
                      for optimizing your computer and browser to improve your
                      online experience.
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {ssaTips.map((tip) => (
                        <li key={tip.href}>
                          <a
                            href={tip.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-start gap-2 text-sm text-brand-700 hover:text-brand-800"
                          >
                            <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            <span className="underline-offset-2 group-hover:underline">
                              {tip.label}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Mic className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-slate-900">
                      Mouse and keyboard alternatives
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      If you are looking for mouse and keyboard alternatives,
                      speech recognition software such as Dragon Naturally
                      Speaking may help you navigate web pages and online
                      services. This software allows the user to move focus
                      around a web page or application screen through voice
                      controls.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Keyboard className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-slate-900">
                      Need more help?
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      If the recommendations above do not meet your needs, we
                      invite you to{" "}
                      <a
                        href="/contact/"
                        className="font-semibold text-brand-700 hover:text-brand-800 underline underline-offset-2"
                      >
                        contact us
                      </a>{" "}
                      for assistance.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <AppointmentSidebar />
          </div>
        </div>
      </section>

      <BottomCTA />
    </main>
  );
}
