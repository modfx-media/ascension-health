import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { CmsFooterSlot, CmsHeaderSlot } from "@/components/cms/CMSChrome";
import { SiteSchema } from "@/components/seo/SiteSchema";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://ascensionhealthnv.com";
const TITLE_DEFAULT =
  "Chiropractor & Wellness Clinic in Fernley, NV | Ascension Health";
const TITLE_TEMPLATE = "%s | Ascension Health";
const DESCRIPTION =
  "Chiropractic care, joint injections and medical weight loss in Fernley, NV. Same-week appointments, insurance accepted. Book online today.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ascensionhealthnv.com"),
  title: {
    default: TITLE_DEFAULT,
    template: TITLE_TEMPLATE,
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    siteName: "Ascension Health",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans">
        <SiteSchema />
        <ScrollToTop />
        <CmsHeaderSlot />
        <main className="flex-1">
          <CMSRoute>{children}</CMSRoute>
        </main>
        <CmsFooterSlot />
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "yj6n6x32a5");
          `}
        </Script>
      </body>
      <GoogleAnalytics gaId="G-K3W3CS67N8" />
    </html>
  );
}
