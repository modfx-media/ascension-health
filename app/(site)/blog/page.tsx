import type { Metadata } from "next";
import { withCmsMetadata } from "@/lib/cms/metadata";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Clock, Search, Tag } from "lucide-react";
import { PageHero, BottomCTA } from "@/components/InteriorPage";
import { Reveal } from "@/components/Motion";
import { BlogFilterGrid } from "@/components/BlogFilterGrid";
import {
  BLOG_BASE,
  formatPostDate,
  type BlogPost,
} from "@/lib/blog";
import { BLOG_PUBLIC } from "@/lib/blog-visibility";
import { getPublishedSitePosts } from "@/lib/ranked/map-post";
import { resolvePublicSiteOrigin } from "@/lib/cms/server-url";

export const revalidate = 3600;

const BLOG_DESCRIPTION =
  "Insights from Ascension Health on chiropractic care, hormone health, weight loss, and pain-free living in Fernley, NV and Northern Nevada.";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsMetadata("/blog/", {
  title: "Blog, Chiropractic, Wellness & Pain-Free Living",
  description: BLOG_DESCRIPTION,
  robots: BLOG_PUBLIC ? undefined : { index: false, follow: false },
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: "Ascension Health Blog",
    description: BLOG_DESCRIPTION,
    url: `${resolvePublicSiteOrigin()}/blog/`,
    type: "website",
    siteName: "Ascension Health",
  },
  twitter: {
    title: "Ascension Health Blog",
    description: BLOG_DESCRIPTION,
  },
});
}

export default async function BlogIndexPage() {
  if (!BLOG_PUBLIC) notFound();
  const posts = await getPublishedSitePosts();
  const featured = posts[0];
  const rest = featured ? posts.filter((p) => p.slug !== featured.slug) : posts;
  const categories = [...new Set(posts.map((p) => p.category))].sort();

  return (
    <main className="bg-slate-50">
      <PageHero title="Blog" parent={{ label: "About", href: "/about/" }} />

      {/* Intro */}
      <section className="relative mx-auto max-w-7xl px-6 pt-14 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                The Ascension Journal
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-slate-900">
                Practical guidance for a stronger, pain-free life.
              </h2>
              <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-slate-600">
                {BLOG_DESCRIPTION}
              </p>
            </Reveal>
          </div>
          {categories.length > 0 && (
            <div className="lg:col-span-4">
              <Reveal delay={0.1}>
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  {categories.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-medium text-brand-800 shadow-sm"
                    >
                      <Tag className="h-3 w-3" aria-hidden /> {c}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </section>

      {/* Featured / empty state */}
      {featured ? (
        <section className="mx-auto max-w-7xl px-6 pt-12 sm:pt-16">
          <Reveal>
            <FeaturedCard post={featured} />
          </Reveal>
        </section>
      ) : (
        <section className="mx-auto max-w-7xl px-6 pt-12 sm:pt-16">
          <EmptyState />
        </section>
      )}

      {/* Grid of remaining posts */}
      {rest.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <BlogFilterGrid posts={rest} categories={categories} />
        </section>
      )}

      <BottomCTA
        kicker="Ready when you are"
        heading="Have a question our blog didn't answer?"
        body="Call our Fernley team, we're happy to help you find the right next step."
      />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Featured card                                                       */
/* ------------------------------------------------------------------ */

function FeaturedCard({ post }: { post: BlogPost | undefined }) {
  if (!post) return null;
  return (
    <Link
      href={`${BLOG_BASE}/${post.slug}/`}
      className="group grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-brand-900/10 lg:grid-cols-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          sizes="(min-width: 1024px) 640px, 100vw"
          className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent" />
        <span className="absolute left-5 top-5 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-brand-950 shadow-md">
          Featured
        </span>
      </div>
      <div className="flex flex-col justify-center gap-5 p-8 sm:p-10 lg:p-12">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-widest text-slate-500">
          <span className="rounded-full bg-brand-50 px-3 py-1 font-semibold text-brand-700">
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" aria-hidden />
            {formatPostDate(post.publishedAt)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden /> {post.readingMinutes}{" "}
            min read
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight text-slate-900 group-hover:text-brand-800 transition-colors">
          {post.title}
        </h2>
        <p className="text-[15.5px] leading-relaxed text-slate-600">
          {post.excerpt}
        </p>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
          Read the article
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Empty state, shown while no posts are published yet                */
/* ------------------------------------------------------------------ */

function EmptyState() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-dashed border-brand-200 bg-white p-10 text-center sm:p-16">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(67,86,39,0.12) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative mx-auto max-w-xl">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
          <Search className="h-6 w-6" aria-hidden />
        </span>
        <h2 className="mt-6 font-display text-3xl font-semibold text-slate-900">
          New articles are on the way
        </h2>
        <p className="mt-4 text-[15.5px] leading-relaxed text-slate-600">
          Our team is putting together practical guides on chiropractic care,
          recovery, hormone health and everyday movement. Check back soon, or
          call us with a question in the meantime.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/appointments/"
            className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-800"
          >
            Request Appointment
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="/services/"
            className="inline-flex items-center rounded-full border border-brand-200 bg-white px-6 py-3 text-sm font-semibold text-brand-800 hover:bg-brand-50"
          >
            Explore our services
          </Link>
        </div>
      </div>
    </div>
  );
}
