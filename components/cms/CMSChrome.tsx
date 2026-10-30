import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPublishedFooter, getPublishedHeader } from "@/lib/cms/queries";
import { cmsConfiguredForRequest, withCMS } from "@/lib/cms/safe";

export async function CmsHeaderSlot() {
  if (!cmsConfiguredForRequest()) return <Header />;
  const doc = await withCMS(() => getPublishedHeader(), null);
  if (!doc?.nav?.length) return <Header />;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-6 py-4">
        <Link href="/" className="font-display text-lg font-semibold text-brand-900">
          Ascension Health
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-700">
          {doc.nav.map((item) =>
            item.label && item.href ? (
              <Link key={`${item.href}-${item.label}`} href={item.href} className="hover:text-brand-800">
                {item.label}
              </Link>
            ) : null,
          )}
        </nav>
      </div>
    </header>
  );
}

export async function CmsFooterSlot() {
  if (!cmsConfiguredForRequest()) return <Footer />;
  const doc = await withCMS(() => getPublishedFooter(), null);
  if (!doc) return <Footer />;

  return (
    <footer className="border-t border-slate-200 bg-brand-950 text-brand-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12">
        {doc.blurb ? <p className="max-w-xl text-sm leading-relaxed text-brand-100/80">{doc.blurb}</p> : null}
        {doc.links?.length ? (
          <nav className="flex flex-wrap gap-4 text-sm">
            {doc.links.map((item) =>
              item.label && item.href ? (
                <Link key={`${item.href}-${item.label}`} href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              ) : null,
            )}
          </nav>
        ) : null}
        <p className="text-xs text-brand-100/70">© {new Date().getFullYear()} Ascension Health</p>
      </div>
    </footer>
  );
}
