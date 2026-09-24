/**
 * Per-client Google review types + fallback.
 * Fallback quotes are real 5-star Google reviews for THIS business.
 */
export const googleReviewsMeta = {
  rating: 4.9, // Google's overall, all stars
  reviewCount: 99, // Google's total, all stars
  fiveStarCount: 5,
  placeId: "ChIJPZ_gkuDnmIARhtXk5r9a9R0",
  reviewsUrl: "https://maps.google.com/?cid=2158731376653030790",
} as const;

export type GoogleReview = {
  quote: string;
  name: string;
  rating: number;
  relativeTime?: string;
};

export type GoogleReviewsMeta = {
  rating: number;
  reviewCount: number;
  fiveStarCount: number;
  placeId: string;
  reviewsUrl: string;
};

export const googleReviews: GoogleReview[] = [
  {
    name: "LCP 75",
    rating: 5,
    relativeTime: "6 months ago",
    quote:
      "I used to come here for chiropractic care a few years back at their old location on Main Street.\n\nToday I was here for much needed assistance with inflammation with my ankle and shoulder.\n\nQuick and easy - fast and friendly services provided by V - Daisy - Adrianne and Dr James Haakenson\n\nHelp with Pain for Joint - Neck - Back - Bulging Disc - Knee - Hip - Foot - Neuropathy - Low Libido - Low Energy - Trouble sleeping - Hormonal imbalance and Dry needling",
  },
  {
    name: "Sara G",
    rating: 5,
    relativeTime: "6 years ago",
    quote:
      "Dr Hanford is amazing! I had so many issues everywhere and he did an excellent job adjusting me and working on my muscles too!! He takes the time to listen to you! My old chiropractor was is town and he said my posture is so much better since a few years ago! He truly cares for his patients and has a great personality too! Always willing to help and get u in immediately as soon as possible if you have an emergency!",
  },
  {
    name: "Michelle Hanford",
    rating: 5,
    relativeTime: "3 years ago",
    quote:
      "Dr. Kyle is very knowledgeable and compassionate. Whenever I vacation in the area I stop in a time or two for much needed adjustments. He listens, addresses your concerns and really makes a difference. His staff is amazing,  helpful, friendly and very well organized. This is not your ordinary chiropractic, yes they do some ordinary, if it’s all you need. But if you have more severe issues the dr. Has degrees for more intense care and does an amazing job fixing your problems. And has the knowledge to know when you need something more.",
  },
  {
    name: "Dominic Smith",
    rating: 5,
    relativeTime: "2 years ago",
    quote:
      "Daisy is outstanding! She brings life to the office! Michelle is awesome! I highly recommend her! Dr. Haakenson is amazing with what he does! I haven’t met a more personable and outgoing chiropractor than himself.",
  },
  {
    name: "Emily Rivas",
    rating: 5,
    relativeTime: "6 years ago",
    quote:
      "Absolutely one of the best experiences I have had with a chiropractic office. I have had chronic pain most of my adult life and have been treated on and off pretty regularly. Dr. Hanford took the time to get to know me, worked to find the root of my issues and didn't just treat the symptoms. Relief was immediate but the lasting results were that he was helpful in educating me on my posture, daily life and exercise routine. I am glad to know and to trust him.",
  },
];

/** The only acceptance test for a card or a JSON-LD review. */
export function isFiveStarReview(review: GoogleReview): boolean {
  return review.rating === 5 && review.quote.trim().length > 0 && review.name.trim().length > 0;
}

export const fiveStarReviews = googleReviews.filter(isFiveStarReview);
