import type { MigrateUpArgs } from "@payloadcms/db-vercel-postgres";


/**
 * Split a migration script into single statements.
 * Neon's HTTP driver rejects more than one statement per query.
 */
export function splitSqlStatements(source: string): string[] {
  const statements: string[] = [];
  let current = "";
  let index = 0;

  while (index < source.length) {
    const char = source[index];
    if (char === "'") {
      current += char;
      index += 1;
      while (index < source.length) {
        current += source[index];
        if (source[index] === "'" && source[index + 1] === "'") {
          current += source[index + 1];
          index += 2;
          continue;
        }
        if (source[index] === "'") {
          index += 1;
          break;
        }
        index += 1;
      }
      continue;
    }

    if (char === ";") {
      const statement = current.trim();
      if (statement) statements.push(statement);
      current = "";
      index += 1;
      continue;
    }

    current += char;
    index += 1;
  }

  const tail = current.trim();
  if (tail) statements.push(tail);
  return statements;
}

export async function runSqlStatements(
  db: MigrateUpArgs["db"],
  source: string,
): Promise<void> {
  for (const statement of splitSqlStatements(source)) {
    await db.execute(statement);
  }
}
