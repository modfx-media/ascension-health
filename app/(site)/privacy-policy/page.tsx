import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import { ShieldCheck } from "lucide-react";
import { PageHero, AppointmentSidebar, BottomCTA } from "@/components/InteriorPage";
import { Reveal } from "@/components/Motion";
import { SITE } from "@/lib/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/privacy-policy/", {
  title: "Privacy Policy",
  description:
    "Read the Ascension Health privacy policy to learn how we collect, use, and protect your personal information.",
  alternates: { canonical: "/privacy-policy/" },
  openGraph: {
    title: "Privacy Policy | Ascension Health",
    description:
      "Read the Ascension Health privacy policy to learn how we collect, use, and protect your personal information.",
    url: "https://ascensionhealthnv.com/privacy-policy/",
    type: "article",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "Privacy Policy | Ascension Health",
    description:
      "Read the Ascension Health privacy policy to learn how we collect, use, and protect your personal information.",
  },
});
}

const sections = [
  {
    title: "Information We Collect",
    body: [
      "We may collect personal information you voluntarily provide when you request an appointment, fill out a contact form, or otherwise communicate with us, including your name, phone number, email address, and any health information you choose to share.",
      "We may also automatically collect certain technical information, such as your IP address, browser type, and pages visited, through standard web analytics tools to help us understand and improve our website.",
    ],
  },
  {
    title: "How We Use Your Information",
    body: [
      "We use the information we collect to respond to appointment requests and inquiries, schedule and manage patient care, communicate with you about our services, and improve the content and functionality of our website.",
      "We do not sell, rent, or trade your personal information to third parties for their marketing purposes.",
    ],
  },
  {
    title: "Protected Health Information",
    body: [
      "Any protected health information (PHI) you share with us in connection with your care is handled in accordance with applicable federal and state privacy laws, including the Health Insurance Portability and Accountability Act (HIPAA), and is not covered solely by this website privacy policy.",
    ],
  },
  {
    title: "Cookies & Analytics",
    body: [
      "Our website may use cookies and similar technologies to enhance your browsing experience and to gather aggregate, anonymized data about site usage. You can adjust your browser settings to refuse cookies, though some parts of the site may not function as intended.",
    ],
  },
  {
    title: "Sharing of Information",
    body: [
      "We may share information with trusted service providers who assist us in operating our website and practice (such as hosting or scheduling software), and when required to comply with applicable law, legal process, or governmental request.",
    ],
  },
  {
    title: "Data Security",
    body: [
      "We take reasonable administrative, technical, and physical measures designed to protect the information we collect. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "Your Choices",
    body: [
      "You may contact us at any time to ask questions about the information we hold about you, request corrections, or opt out of non-essential communications.",
    ],
  },
  {
    title: "Changes to This Policy",
    body: [
      "We may update this privacy policy from time to time. Any changes will be posted on this page with an updated effective date.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-slate-50">
      <PageHero title="Privacy Policy" />

      <section className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                Your Privacy
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
                Privacy Policy
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-slate-700">
                Ascension Health (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
                &ldquo;our&rdquo;) is committed to protecting your privacy.
                This policy explains how we collect, use, and safeguard
                information when you visit our website or interact with our
                practice.
              </p>

              <div className="mt-8 space-y-6">
                {sections.map((section) => (
                  <div
                    key={section.title}
                    className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
                  >
                    <h3 className="font-display text-xl font-semibold text-slate-900">
                      {section.title}
                    </h3>
                    <div className="mt-2 space-y-3">
                      {section.body.map((paragraph, i) => (
                        <p
                          key={i}
                          className="text-sm leading-relaxed text-slate-700"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h3 className="font-display text-xl font-semibold text-slate-900">
                    Contact Us
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    If you have any questions about this privacy policy or
                    how your information is handled, please{" "}
                    <a
                      href="/contact/"
                      className="font-semibold text-brand-700 hover:text-brand-800 underline underline-offset-2"
                    >
                      contact us
                    </a>{" "}
                    or reach us at {SITE.address}, {SITE.phone}.
                  </p>
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
