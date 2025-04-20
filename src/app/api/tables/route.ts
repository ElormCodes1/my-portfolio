// app/api/tables/route.ts
import { NextResponse } from "next/server";
import pool from "@/lib/db";
// import { Pool } from "pg";

// export async function GET() {
//   const res = await pool.query(`
//     SELECT table_name
//     FROM information_schema.tables
//     WHERE table_schema = 'public'
//   `);
//   const tables = res.rows.map((row) => row.table_name);
//   return NextResponse.json({ tables });
// }

// const pool = new Pool({
//   database: "webscraping_business_data",
//   user: "postgres",
//   password: "ElormmkD@17$.vps",
//   host: "107.155.87.197",
//   port: 5432,
// });

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
    return NextResponse.json(
      { error: "Failed to fetch tables" },
      { status: 500 }
    );
  }
}
