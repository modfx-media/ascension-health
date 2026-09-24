import { cache } from "react";
import {
  fiveStarReviews,
  googleReviewsMeta,
  isFiveStarReview,
  type GoogleReview,
  type GoogleReviewsMeta,
} from "./reviews";

const REVIEWS_REVALIDATE_SECONDS = 60 * 60 * 24;
const PLACES_FIELD_MASK = "id,rating,userRatingCount,googleMapsUri,reviews";

export type GoogleReviewsPayload = {
  reviews: GoogleReview[];
  meta: GoogleReviewsMeta;
};

type PlacesReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string };
};

type PlacesDetailsResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
  error?: { message?: string; status?: string };
};

function fallbackPayload(): GoogleReviewsPayload {
  return {
    reviews: fiveStarReviews,
    meta: { ...googleReviewsMeta },
  };
}

function reviewKey(review: GoogleReview): string {
  return `${review.name.trim().toLowerCase()}::${review.quote.trim().toLowerCase()}`;
}

function mergeUniqueFiveStar(
  live: GoogleReview[],
  saved: GoogleReview[],
): GoogleReview[] {
  const seen = new Set<string>();
  const out: GoogleReview[] = [];
  for (const review of [...live, ...saved].filter(isFiveStarReview)) {
    const key = reviewKey(review);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(review);
  }
  return out;
}

type LegacyReview = {
  author_name?: string;
  rating?: number;
  relative_time_description?: string;
  text?: string;
};

/** Places Details returns 5 reviews per sort. Newest is a different set than most relevant. */
async function fetchNewestFiveStarReviews(
  apiKey: string,
  placeId: string,
): Promise<GoogleReview[]> {
  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "reviews");
  url.searchParams.set("reviews_sort", "newest");
  url.searchParams.set("key", apiKey);

  const response = await fetch(url, {
    next: {
      revalidate: REVIEWS_REVALIDATE_SECONDS,
      tags: ["google-reviews"],
    },
  });
  const data = (await response.json()) as {
    status?: string;
    result?: { reviews?: LegacyReview[] };
  };
  if (!response.ok || data.status !== "OK") return [];

  return (data.result?.reviews ?? [])
    .map((review) =>
      mapPlaceReview({
        rating: review.rating,
        relativePublishTimeDescription: review.relative_time_description,
        text: { text: review.text },
        authorAttribution: { displayName: review.author_name },
      }),
    )
    .filter((review): review is GoogleReview => review !== null)
    .filter(isFiveStarReview);
}

function mapPlaceReview(review: PlacesReview): GoogleReview | null {
  const quote = (review.text?.text ?? review.originalText?.text ?? "").trim();
  const name = review.authorAttribution?.displayName?.trim() ?? "";
  const rating = review.rating ?? 0;

  // Exact 5 only. Drop 4, 4.5, empty text, and nameless authors here.
  if (rating !== 5 || !quote || !name) return null;

  return {
    quote,
    name,
    rating: 5,
    relativeTime: review.relativePublishTimeDescription,
  };
}

/**
 * Places API (New), then 5-star reviews with text only.
 * Google returns at most 5 most-relevant reviews. Filter that set.
 */
export const getDisplayedGoogleReviews = cache(
  async (): Promise<GoogleReviewsPayload> => {
    const apiKey =
      process.env.GOOGLE_PLACES_API_KEY?.trim() ||
      process.env.GOOGLE_API_KEY?.trim();
    const placeId =
      process.env.GOOGLE_PLACE_ID?.trim() || googleReviewsMeta.placeId;

    if (!apiKey || placeId.startsWith("REPLACE_")) return fallbackPayload();

    try {
      const response = await fetch(
        `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
        {
          headers: {
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": PLACES_FIELD_MASK,
          },
          next: {
            revalidate: REVIEWS_REVALIDATE_SECONDS,
            tags: ["google-reviews"],
          },
        },
      );

      const data = (await response.json()) as PlacesDetailsResponse;

      if (!response.ok || data.error) {
        console.error(
          "Google Places reviews request failed:",
          data.error?.message ?? response.statusText,
        );
        return fallbackPayload();
      }

      const liveReviews = (data.reviews ?? [])
        .map(mapPlaceReview)
        .filter((review): review is GoogleReview => review !== null)
        .filter(isFiveStarReview);
      const newestReviews = await fetchNewestFiveStarReviews(apiKey, placeId);

      const merged = mergeUniqueFiveStar(
        [...liveReviews, ...newestReviews],
        fiveStarReviews,
      );
      if (merged.length === 0) return fallbackPayload();

      return {
        reviews: merged,
        meta: {
          rating: data.rating ?? googleReviewsMeta.rating,
          reviewCount: data.userRatingCount ?? googleReviewsMeta.reviewCount,
          fiveStarCount: merged.length,
          placeId,
          reviewsUrl: data.googleMapsUri ?? googleReviewsMeta.reviewsUrl,
        },
      };
    } catch (error) {
      console.error("Google Places reviews fetch error:", error);
      return fallbackPayload();
    }
  },
);
