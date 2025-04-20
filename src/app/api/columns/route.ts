// app/api/columns/route.ts
import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  const table = req.nextUrl.searchParams.get("table");

  if (!table) {
    return NextResponse.json({ error: "Missing table name" }, { status: 400 });
  }

  const res = await pool.query(
    `
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = $1
  `,
    [table]
  );

  const columns = res.rows.map((row) => row.column_name);
  return NextResponse.json({ columns });
}
