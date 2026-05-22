"use client";

import { useState } from "react";
import {
  getExportSnippet,
  type ExportFormat,
} from "@/lib/api-export";

const formats: { id: ExportFormat; label: string }[] = [
  { id: "curl", label: "curl" },
  { id: "python", label: "Python" },
  { id: "fetch", label: "fetch" },
];

export default function QueryExport({
  url,
  method = "GET",
}: {
  url: string;
  method?: "GET" | "POST";
}) {
  const [format, setFormat] = useState<ExportFormat>("curl");
  const [copied, setCopied] = useState(false);
  const snippet = getExportSnippet(format, url, method);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="rounded-md border border-[var(--color-border)] bg-ink-muted/50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase text-radar">Export this query</p>
        <div className="flex gap-1">
          {formats.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFormat(f.id)}
              className={`rounded border px-2 py-1 font-mono text-[0.65rem] uppercase transition-colors ${
                format === f.id
                  ? "border-radar/50 text-radar"
                  : "border-[var(--color-border)] text-steel hover:text-frost"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <pre className="mt-3 max-h-40 overflow-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-frost/90">
        {snippet}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="btn-ghost mt-3 text-[0.65rem]"
      >
        {copied ? "Copied" : "Copy to clipboard"}
      </button>
    </div>
  );
}
