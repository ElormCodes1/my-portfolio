"use client";

import Link from "next/link";
import { useState } from "react";
import type { UrlReconResult } from "@/lib/url-recon";

const difficultyStyles: Record<
  UrlReconResult["difficulty"],
  string
> = {
  low: "text-signal border-signal/40 bg-signal/10",
  medium: "text-radar border-radar/40 bg-radar/10",
  high: "text-frost border-[var(--color-border)] bg-ink-muted",
};

export default function UrlRecon() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UrlReconResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/recon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Recon failed");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Recon failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card-lab mt-10 p-5 md:p-6">
      <div className="mb-4">
        <p className="label-mono text-radar">URL check</p>
        <h2 className="heading-display mt-1 text-xl md:text-2xl">
          Paste a target URL
        </h2>
        <p className="mt-2 text-sm text-steel">
          A quick feasibility check before we scope a project — response status,
          crawl hints, and estimated extraction effort.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/listing"
          className="input-lab flex-1 font-mono text-sm"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-primary shrink-0 disabled:opacity-50"
        >
          {loading ? "Scanning…" : "Run recon"}
        </button>
      </form>

      {error && (
        <p className="mt-4 font-mono text-sm text-radar">{error}</p>
      )}

      {result && (
        <div className="mt-5 space-y-4 border-t border-[var(--color-border)] pt-5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded border px-2 py-1 font-mono text-xs uppercase tracking-wider ${difficultyStyles[result.difficulty]}`}
            >
              {result.difficulty} effort
            </span>
            {result.statusCode !== null && (
              <span className="font-mono text-xs text-steel">
                HTTP {result.statusCode}
              </span>
            )}
          </div>

          <p className="text-sm text-steel">{result.difficultyReason}</p>

          <dl className="grid gap-3 font-mono text-xs sm:grid-cols-2">
            <div>
              <dt className="text-steel">Host</dt>
              <dd className="mt-0.5 text-frost">{result.host}</dd>
            </div>
            <div>
              <dt className="text-steel">Content-Type</dt>
              <dd className="mt-0.5 truncate text-frost">
                {result.contentType ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="text-steel">Crawl rules</dt>
              <dd className="mt-0.5 text-frost">
                {result.hasRobotsTxt ? "Found" : "Not found"}
              </dd>
            </div>
            <div>
              <dt className="text-steel">Sitemap</dt>
              <dd className="mt-0.5 text-frost">
                {result.hasSitemap ? "Detected" : "Not detected"}
              </dd>
            </div>
          </dl>

          {result.hints.length > 0 && (
            <ul className="space-y-1 text-sm text-steel">
              {result.hints.map((hint) => (
                <li key={hint} className="flex gap-2">
                  <span className="text-radar">▸</span>
                  {hint}
                </li>
              ))}
            </ul>
          )}

          <Link
            href={`/contact?mode=scrape&target=${encodeURIComponent(result.url)}`}
            className="btn-ghost inline-flex text-[0.65rem]"
          >
            Request full extraction →
          </Link>
        </div>
      )}
    </div>
  );
}
