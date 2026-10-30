import type { CollectionBeforeValidateHook } from "payload";

const UNIQUE_TEXT_FIELDS = ["slug", "path", "legacyId", "sourceUrl"] as const;

/**
 * Unique text columns treat '' as a value, so two unsaved docs would collide.
 * Normalize blanks to null before validation. Nulls are allowed to repeat.
 */
export const emptyStringToNull: CollectionBeforeValidateHook = ({ data }) => {
  if (!data || typeof data !== "object") return data;
  for (const key of UNIQUE_TEXT_FIELDS) {
    if (key in data && data[key] === "") {
      data[key] = null;
    }
  }
  return data;
};
