// app/api/data/route.ts
import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { table, columns } = body;

  if (!table || !columns || columns.length === 0) {
    return NextResponse.json(
      { error: "Missing table or columns" },
      { status: 400 }
    );
  }

  const safeColumns = columns.map((col: string) => `"${col}"`).join(", ");
  const query = `SELECT ${safeColumns} FROM "${table}" LIMIT 10`;

  try {
    const res = await pool.query(query);
    return NextResponse.json({ rows: res.rows });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
