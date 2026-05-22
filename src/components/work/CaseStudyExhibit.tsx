import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import type { CaseStudyExhibit as ExhibitData } from "@/lib/work-data";

function loadSnippetPreview(snippetFile: string): string {
  const filePath = path.join(process.cwd(), "public/data_snippets", snippetFile);
  if (!fs.existsSync(filePath)) return "{}";
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw) as unknown;
  const preview = JSON.stringify(
    Array.isArray(data) ? data.slice(0, 2) : data,
    null,
    2,
  );
  return preview.length > 1200 ? `${preview.slice(0, 1200)}\n…` : preview;
}

export default function CaseStudyExhibit({
  exhibit,
}: {
  exhibit: ExhibitData;
}) {
  const snippet =
    exhibit.snippetFile != null
      ? loadSnippetPreview(exhibit.snippetFile)
      : null;

  return (
    <section className="card-lab overflow-hidden p-0">
      <div className="border-b border-[var(--color-border)] px-6 py-4">
        <p className="label-mono text-radar">Exhibit</p>
        <h2 className="heading-display mt-1 text-2xl">Source → structured output</h2>
        <p className="mt-2 text-sm text-steel">{exhibit.sourceLabel}</p>
      </div>

      <div className="grid gap-0 lg:grid-cols-2">
        <div className="border-b border-[var(--color-border)] p-4 lg:border-b-0 lg:border-r">
          <p className="label-mono mb-3">Before · source</p>
          {exhibit.screenshot ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[var(--color-border)] bg-ink-muted">
              <Image
                src={exhibit.screenshot}
                alt={`Source page for ${exhibit.sourceLabel}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center rounded-md border border-dashed border-[var(--color-border)] bg-ink-muted font-mono text-xs text-steel">
              API / headless pipeline — no page screenshot
            </div>
          )}
        </div>

        <div className="p-4">
          <p className="label-mono mb-3">After · sample records</p>
          {snippet ? (
            <pre className="max-h-72 overflow-auto rounded-md border border-[var(--color-border)] bg-ink-muted p-3 font-mono text-[0.7rem] leading-relaxed text-frost/90">
              {snippet}
            </pre>
          ) : (
            <p className="text-sm text-steel">Sample available on request.</p>
          )}
          {exhibit.explorerTable && (
            <Link
              href={`/lab/explorer?dataset=${encodeURIComponent(exhibit.explorerTable)}`}
              className="btn-ghost mt-4 inline-flex text-[0.65rem]"
            >
              Explore live sample →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
