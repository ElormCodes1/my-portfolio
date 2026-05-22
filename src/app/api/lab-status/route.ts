import { NextResponse } from "next/server";
import { apiProducts } from "@/lib/apis-data";
import { loadDatasetCards } from "@/lib/loadDatasetCards";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type CheckStatus = "up" | "down" | "unknown";

async function pingUrl(
  url: string,
  ms = 6000,
): Promise<{ status: CheckStatus; latencyMs: number | null }> {
  const start = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": "ElormDokosi-LabStatus/1.0" },
    });
    clearTimeout(timer);
    if (res.status < 500) {
      return { status: "up", latencyMs: Date.now() - start };
    }
    const getRes = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(ms),
      headers: { "User-Agent": "ElormDokosi-LabStatus/1.0" },
    });
    return {
      status: getRes.status < 500 ? "up" : "down",
      latencyMs: Date.now() - start,
    };
  } catch {
    clearTimeout(timer);
    return { status: "down", latencyMs: null };
  }
}

export async function GET() {
  const datasets = loadDatasetCards();
  const datasetCount = Object.values(datasets).reduce(
    (sum, arr) => sum + arr.length,
    0,
  );

  const apiBase =
    process.env.LAB_API_HEALTH_URL ??
    "https://data-apis.elormdokosi.com/docs";
  const apiCheck = await pingUrl(apiBase);

  const apisUp = apiCheck.status === "up";
  const overall = apisUp ? "operational" : "degraded";

  return NextResponse.json({
    overall,
    message:
      overall === "operational"
        ? "Services online"
        : "Some services unavailable",
    datasets: datasetCount,
    apisActive: apiProducts.length,
    checks: {
      dataApi: {
        label: "Data APIs",
        url: apiBase,
        status: apiCheck.status,
        latencyMs: apiCheck.latencyMs,
      },
    },
    updatedAt: new Date().toISOString(),
  });
}
