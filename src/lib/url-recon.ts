export type ReconDifficulty = "low" | "medium" | "high";

export type UrlReconResult = {
  url: string;
  host: string;
  ok: boolean;
  statusCode: number | null;
  contentType: string | null;
  contentLength: number | null;
  hasRobotsTxt: boolean;
  hasSitemap: boolean;
  difficulty: ReconDifficulty;
  difficultyReason: string;
  hints: string[];
};

const BLOCKED_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "[::1]",
]);

function isPrivateIpv4(host: string): boolean {
  const parts = host.split(".").map(Number);
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return false;
  if (parts[0] === 10) return true;
  if (parts[0] === 127) return true;
  if (parts[0] === 169 && parts[1] === 254) return true;
  if (parts[0] === 192 && parts[1] === 168) return true;
  if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
  return false;
}

export function validatePublicUrl(input: string): URL {
  let parsed: URL;
  try {
    parsed = new URL(input.trim());
  } catch {
    throw new Error("Enter a valid URL including https://");
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Only http and https URLs are supported");
  }

  const host = parsed.hostname.toLowerCase();
  if (BLOCKED_HOSTS.has(host) || isPrivateIpv4(host) || host.endsWith(".local")) {
    throw new Error("That host is not allowed for recon");
  }

  return parsed;
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit = {},
  ms = 8000,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "ElormDokosi-Recon/1.0 (+https://elormdokosi.com)",
        ...(init.headers ?? {}),
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

function assessDifficulty(
  htmlSnippet: string,
  contentType: string | null,
): { difficulty: ReconDifficulty; reason: string } {
  const isHtml =
    contentType?.includes("text/html") ||
    htmlSnippet.includes("<html") ||
    htmlSnippet.includes("<!DOCTYPE");

  if (!isHtml) {
    return {
      difficulty: "low",
      reason: "Non-HTML response — often API or static asset; straightforward to pipe.",
    };
  }

  const scriptCount = (htmlSnippet.match(/<script/gi) ?? []).length;
  const spaSignals =
    /__NEXT_DATA__|react-root|ng-app|data-reactroot|window\.__/i.test(htmlSnippet);

  if (scriptCount > 15 || spaSignals) {
    return {
      difficulty: "high",
      reason: "Heavy client-side rendering — expect headless browser or API discovery.",
    };
  }

  if (scriptCount > 5) {
    return {
      difficulty: "medium",
      reason: "Moderate JavaScript — may need rendered DOM or network inspection.",
    };
  }

  return {
    difficulty: "low",
    reason: "Mostly server-rendered HTML — classic fetch-and-parse territory.",
  };
}

export async function runUrlRecon(input: string): Promise<UrlReconResult> {
  const parsed = validatePublicUrl(input);
  const origin = parsed.origin;
  const hints: string[] = [];

  let statusCode: number | null = null;
  let contentType: string | null = null;
  let contentLength: number | null = null;
  let htmlSnippet = "";

  try {
    const res = await fetchWithTimeout(parsed.toString(), { method: "GET" });
    statusCode = res.status;
    contentType = res.headers.get("content-type");
    const len = res.headers.get("content-length");
    contentLength = len ? Number(len) : null;
    htmlSnippet = (await res.text()).slice(0, 80_000);
    if (!res.ok) hints.push(`Initial response returned HTTP ${res.status}.`);
  } catch {
    hints.push("Could not fetch the page — it may block bots or require auth.");
  }

  let hasRobotsTxt = false;
  let hasSitemap = false;

  try {
    const robotsRes = await fetchWithTimeout(`${origin}/robots.txt`, {
      method: "GET",
    });
    if (robotsRes.ok) {
      hasRobotsTxt = true;
      const robotsText = (await robotsRes.text()).slice(0, 20_000).toLowerCase();
      if (robotsText.includes("sitemap:")) hasSitemap = true;
      if (robotsText.includes("disallow:")) {
        hints.push("robots.txt defines crawl rules — review before production scrapes.");
      }
    }
  } catch {
    /* optional */
  }

  if (!hasSitemap) {
    try {
      const sitemapRes = await fetchWithTimeout(`${origin}/sitemap.xml`, {
        method: "HEAD",
      });
      if (sitemapRes.ok) hasSitemap = true;
    } catch {
      /* optional */
    }
  }

  if (hasSitemap) hints.push("Sitemap detected — good anchor for scoped crawls.");

  const { difficulty, reason: difficultyReason } = assessDifficulty(
    htmlSnippet,
    contentType,
  );

  return {
    url: parsed.toString(),
    host: parsed.hostname,
    ok: statusCode !== null && statusCode < 500,
    statusCode,
    contentType,
    contentLength,
    hasRobotsTxt,
    hasSitemap,
    difficulty,
    difficultyReason,
    hints,
  };
}
