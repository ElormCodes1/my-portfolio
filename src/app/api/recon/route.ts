import { NextResponse } from "next/server";
import { runUrlRecon } from "@/lib/url-recon";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const url = typeof body?.url === "string" ? body.url : "";
    if (!url.trim()) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const result = await runUrlRecon(url);
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Recon failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
