// app/api/tables/route.ts
import { NextResponse } from "next/server";
import pool, { isDbAuthError } from "@/lib/db";

export async function GET() {
  try {
    const client = await pool.connect();
    const res = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
    `);
    client.release();

    const tables = res.rows.map((row) => row.table_name);
    return NextResponse.json({ tables });
  } catch (error) {
    console.error("Error fetching tables:", error);
    const message = isDbAuthError(error)
      ? "Database authentication failed. Check PGUSER/PGPASSWORD (or DATABASE_URL) in .env."
      : "Failed to fetch tables";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
