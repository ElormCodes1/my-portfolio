import Link from "next/link";

type DatasetCardProps = {
  website: string;
  jsonData: object;
  totalRecords?: number;
  explorerHref: string;
};

export default function DatasetCard({
  website,
  jsonData,
  totalRecords,
  explorerHref,
}: DatasetCardProps) {
  const title = website.replace(/_/g, " ");
  const preview = JSON.stringify(jsonData, null, 2);
  const truncated =
    preview.length > 600 ? `${preview.slice(0, 600)}\n…` : preview;

  return (
    <Link href={explorerHref} className="group block shrink-0">
      <article className="card-lab flex h-full w-[min(88vw,22rem)] flex-col overflow-hidden sm:w-80 md:w-96">
        <div className="border-b border-[var(--color-border)] px-4 py-3">
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-radar">
            Dataset
          </p>
          <h3 className="heading-display mt-1 text-lg capitalize">{title}</h3>
          {totalRecords !== undefined && (
            <p className="mt-1 font-mono text-xs text-steel">
              {totalRecords.toLocaleString()} records
            </p>
          )}
        </div>
        <div className="max-h-48 flex-1 overflow-hidden bg-ink-muted p-3">
          <pre className="font-mono text-[0.7rem] leading-relaxed text-frost/85 whitespace-pre-wrap break-words">
            {truncated}
          </pre>
        </div>
        <div className="border-t border-[var(--color-border)] px-4 py-3">
          <span className="font-mono text-xs uppercase tracking-wider text-steel transition-colors group-hover:text-radar">
            Open explorer →
          </span>
        </div>
      </article>
    </Link>
  );
}
