import type { Metadata } from "next";
import { PageHero, BottomCTA } from "@/components/InteriorPage";
import { GoogleReviews } from "@/components/home/GoogleReviews";
import { Testimonials } from "@/components/home/Testimonials";

export const metadata: Metadata = {
  title: "Google Reviews in Fernley, NV",
  description:
    "Read 5-star Google reviews for Ascension Health in Fernley, NV. Real patient comments from Google, plus the clinic’s overall Google rating.",
  alternates: { canonical: "/reviews/" },
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero title="Google Reviews" />
      <GoogleReviews>
        {({ reviews, meta }) => (
          <Testimonials
            items={reviews.map((review) => ({
              name: review.name,
              quote: review.quote,
              when: review.relativeTime ?? "Posted on Google",
            }))}
            rating={meta.rating}
            reviewCount={meta.reviewCount}
            reviewsUrl={meta.reviewsUrl}
            heading="5-star reviews from Google"
            showSiteLink={false}
          />
        )}
      </GoogleReviews>
      <BottomCTA />
    </>
  );
}
