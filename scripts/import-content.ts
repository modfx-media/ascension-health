import { config as loadEnv } from "dotenv";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import type { ContentExport, ContentRecord } from "./export-content";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

type ImportReport = {
  created: number;
  updated: number;
  skipped: number;
  errors: { legacyId?: string; message: string }[];
  drafts: number;
  published: number;
  collections: Record<string, { created: number; updated: number }>;
};

const TRANSIENT =
  /ECONNRESET|ECONNREFUSED|ETIMEDOUT|EAI_AGAIN|57P01|40001|40P01|53300|0800[0-6]|too many clients|Connection terminated|timeout|EPIPE/i;

function errorText(error: unknown): string {
  const parts: string[] = [];
  const walk = (value: unknown, depth: number) => {
    if (value == null || depth > 5) return;
    if (typeof value === "string") {
      parts.push(value);
      return;
    }
    if (value instanceof Error) {
      parts.push(value.message);
      const code = (value as { code?: string }).code;
      if (code) parts.push(code);
      walk((value as { cause?: unknown }).cause, depth + 1);
      return;
    }
    if (typeof value === "object" && "errors" in value && Array.isArray((value as { errors: unknown[] }).errors)) {
      for (const inner of (value as { errors: unknown[] }).errors) walk(inner, depth + 1);
    }
  };
  walk(error, 0);
  return parts.join(" ");
}

function isTransient(error: unknown): boolean {
  return TRANSIENT.test(errorText(error));
}

async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  let last: unknown;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      return await fn();
    } catch (error) {
      last = error;
      if (!isTransient(error) || attempt === 4) throw error;
      await new Promise((resolve) => setTimeout(resolve, 250 * 2 ** attempt));
    }
  }
  throw last;
}

function dropStandaloneDoubleDash(argv: string[]): string[] {
  return argv.filter((arg) => arg !== "--");
}

async function main() {
  dropStandaloneDoubleDash(process.argv.slice(2));

  const { getPayload } = await import("payload");
  const { default: config } = await import("@payload-config");
  const exported = JSON.parse(readFileSync("data/content-export.json", "utf8")) as ContentExport;
  if (exported.version !== 1) throw new Error("unsupported export version");

  const payload = await getPayload({ config });
  const report: ImportReport = {
    created: 0,
    updated: 0,
    skipped: 0,
    errors: [],
    drafts: 0,
    published: 0,
    collections: {},
  };

  const idByLegacy = new Map<string, string | number>();

  async function findExisting(collection: ContentRecord["collection"], record: ContentRecord) {
    const byLegacy = await withRetry(() =>
      payload.find({
        collection,
        depth: 0,
        draft: true,
        limit: 1,
        overrideAccess: true,
        where: { legacyId: { equals: record.legacyId } },
      }),
    );
    if (byLegacy.docs[0]) return byLegacy.docs[0];
    if (!record.sourceUrl) return null;
    const bySource = await withRetry(() =>
      payload.find({
        collection,
        depth: 0,
        draft: true,
        limit: 1,
        overrideAccess: true,
        where: { sourceUrl: { equals: record.sourceUrl } },
      }),
    );
    return bySource.docs[0] ?? null;
  }

  function tally(collection: string, kind: "created" | "updated") {
    report[kind] += 1;
    report.collections[collection] ??= { created: 0, updated: 0 };
    report.collections[collection][kind] += 1;
  }

  async function upsert(record: ContentRecord, data: Record<string, unknown>) {
    const existing = await findExisting(record.collection, record);
    const saved = existing
      ? await withRetry(() =>
          payload.update({
            collection: record.collection,
            id: existing.id,
            data,
            draft: true,
            overrideAccess: true,
          }),
        )
      : await withRetry(() =>
          payload.create({
            collection: record.collection,
            data,
            draft: true,
            overrideAccess: true,
          }),
        );
    tally(record.collection, existing ? "updated" : "created");
    const status = (saved as { _status?: string })._status;
    if (status === "published") report.published += 1;
    else report.drafts += 1;
    idByLegacy.set(record.legacyId, (saved as { id: string | number }).id);
    return saved;
  }

  const order: ContentRecord["collection"][] = ["authors", "categories", "posts", "pages"];
  for (const collection of order) {
    for (const record of exported.records.filter((item) => item.collection === collection)) {
      try {
        const data: Record<string, unknown> = { ...record.data, legacyId: record.legacyId };
        if (record.sourceUrl) data.sourceUrl = record.sourceUrl;
        if (collection === "posts") {
          const categoryLegacyId = data.categoryLegacyId;
          const authorLegacyId = data.authorLegacyId;
          delete data.categoryLegacyId;
          delete data.authorLegacyId;
          if (typeof categoryLegacyId === "string" && idByLegacy.has(categoryLegacyId)) {
            data.category = idByLegacy.get(categoryLegacyId);
          }
          if (typeof authorLegacyId === "string" && idByLegacy.has(authorLegacyId)) {
            data.author = idByLegacy.get(authorLegacyId);
          }
        }
        delete data._status;
        await upsert(record, data);
      } catch (error) {
        report.errors.push({ legacyId: record.legacyId, message: errorText(error) });
        console.error(`import failed ${record.legacyId}: ${errorText(error)}`);
      }
    }
  }

  const globalSlugs = ["header", "footer", "site-settings"] as const;
  for (const slug of globalSlugs) {
    try {
      await withRetry(() =>
        payload.updateGlobal({
          slug,
          data: exported.globals[slug] ?? {},
          draft: true,
          overrideAccess: true,
        }),
      );
      report.drafts += 1;
      tally("globals", "updated");
    } catch (error) {
      report.errors.push({ legacyId: `global:${slug}`, message: errorText(error) });
    }
  }

  mkdirSync("migration-data", { recursive: true });
  writeFileSync("migration-data/import-report.json", `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ ...report, errors: report.errors.length }, null, 2));
  if (report.errors.length || report.published > 0) process.exit(1);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
