import { Pool } from "pg";

function getPoolConfig() {
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.PGSSLMODE === "require"
          ? { rejectUnauthorized: false }
          : undefined,
    };
  }

  const user = process.env.PGUSER;
  const host = process.env.PGHOST;
  const database = process.env.PGDATABASE;
  const password = process.env.PGPASSWORD;
  const port = Number(process.env.PGPORT ?? "5432");

  if (!user || !host || !database || !password) {
    throw new Error(
      "Database env missing. Set DATABASE_URL or PGUSER, PGHOST, PGDATABASE, PGPASSWORD (and optional PGPORT, PGSSLMODE).",
    );
  }

  return {
    user,
    host,
    database,
    password,
    port,
    ssl:
      process.env.PGSSLMODE === "require"
        ? { rejectUnauthorized: false }
        : undefined,
  };
}

const pool = new Pool(getPoolConfig());

export function isDbAuthError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: string }).code === "28P01"
  );
}

export default pool;
