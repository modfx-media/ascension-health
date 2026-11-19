import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

import { normalizePath } from "./path";

function safeRevalidate(path: string | null | undefined) {
  if (!path || !path.startsWith("/")) return;
  const normalized = normalizePath(path);
  try {
    revalidatePath(normalized);
    if (normalized !== "/" && normalized.endsWith("/")) {
      revalidatePath(normalized.slice(0, -1));
    }
    if (normalized === "/blog/" || normalized.startsWith("/blog/")) {
      revalidatePath("/blog/");
      revalidatePath("/blog");
    }
  } catch (error) {
    console.error("[cms] revalidate failed", error);
  }
}

type StatusDoc = {
  path?: unknown;
  _status?: unknown;
};

/** Paths whose cached HTML must be dropped after a publish, unpublish, move, or delete. */
export function pathsToRevalidate(doc?: StatusDoc | null, previousDoc?: StatusDoc | null): string[] {
  const path = typeof doc?.path === "string" ? doc.path : undefined;
  const prev = typeof previousDoc?.path === "string" ? previousDoc.path : undefined;
  const paths: string[] = [];
  if (doc?._status === "published" && path) paths.push(path);
  if (
    previousDoc?._status === "published" &&
    prev &&
    (prev !== path || doc?._status !== "published")
  ) {
    paths.push(prev);
  }
  return paths;
}

export const revalidatePublished: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  for (const path of pathsToRevalidate(doc, previousDoc)) safeRevalidate(path);
  return doc;
};

export const revalidateDeleted: CollectionAfterDeleteHook = ({ doc }) => {
  const path = typeof doc?.path === "string" ? doc.path : undefined;
  if (doc?._status === "published" || path) safeRevalidate(path);
  return doc;
};
