import Link from "next/link";
import { apiCategories, apiProducts } from "@/lib/apis-data";

type LabApisProps = {
  onTryApi?: (apiId: string) => void;
};

export default function LabApis({ onTryApi }: LabApisProps) {
  return (
    <div>
      <p className="mb-6 max-w-2xl text-steel">
        Production scraping endpoints for maps, marketplaces, social platforms, and
        more. Free tier on all services.
      </p>

      <div className="mb-8 flex flex-wrap gap-2">
        {apiCategories.map((cat) => (
          <span
            key={cat.name}
            className="rounded border border-[var(--color-border)] px-3 py-1 font-mono text-xs text-steel"
          >
            {cat.name} ({cat.count})
          </span>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {apiProducts.map((api) => (
          <article key={api.id} className="card-lab flex flex-col p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden>
                {api.icon}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="heading-display text-lg leading-snug">{api.name}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[0.65rem] uppercase text-steel">
                    {api.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[0.65rem] text-signal">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                    {api.status}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-4 flex-1 text-sm text-steel">{api.description}</p>

            <ul className="mt-4 space-y-1">
              {api.features.slice(0, 3).map((f) => (
                <li key={f} className="flex gap-2 text-xs text-frost/80">
                  <span className="text-radar">▸</span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4">
              <span className="font-mono text-xs text-radar">{api.pricing}</span>
              <div className="flex gap-2">
                {onTryApi && (
                  <button
                    type="button"
                    onClick={() => onTryApi(api.id)}
                    className="btn-ghost px-3 py-1.5 text-[0.65rem]"
                  >
                    Try it
                  </button>
                )}
                <Link
                  href={`/apis/${api.id}`}
                  className="font-mono text-xs uppercase tracking-wider text-radar hover:text-frost"
                >
                  Details →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="card-lab mt-10 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="heading-display text-lg">Full API documentation</p>
          <p className="mt-1 text-sm text-steel">
            OpenAPI specs, auth, and rate limits on the docs site.
          </p>
        </div>
        <a
          href="https://data-apis.elormdokosi.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary shrink-0"
        >
          View docs
        </a>
      </div>
    </div>
  );
}
