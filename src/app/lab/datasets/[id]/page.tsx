import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import {
  getDatasetLineage,
  getDatasetLineageIds,
} from "@/lib/dataset-lineage";
import { breadcrumbSchema, SITE_URL } from "@/lib/structured-data";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getDatasetLineageIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const dataset = getDatasetLineage(params.id);
  if (!dataset) return {};
  return {
    title: `${dataset.name} — Dataset details`,
    description: `Source, schema, and refresh cadence for ${dataset.name}.`,
    alternates: {
      canonical: `https://elormdokosi.com/lab/datasets/${dataset.id}`,
    },
  };
}

export default function DatasetLineagePage({ params }: { params: { id: string } }) {
  const dataset = getDatasetLineage(params.id);
  if (!dataset) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Lab", url: `${SITE_URL}/lab` },
          {
            name: dataset.name,
            url: `${SITE_URL}/lab/datasets/${dataset.id}`,
          },
        ])}
      />
      <div className="pt-24 pb-20 md:pt-28 md:pb-28">
        <div className="container max-w-4xl">
          <Link
            href="/lab#datasets"
            className="label-mono mb-6 inline-block text-radar hover:text-frost"
          >
            ← Lab datasets
          </Link>

          <header className="mb-10">
            <p className="label-mono mb-2 text-radar">Dataset</p>
            <h1 className="heading-display text-3xl md:text-4xl">{dataset.name}</h1>
            <p className="mt-3 font-mono text-xs uppercase text-steel">
              {dataset.category}
            </p>
          </header>

          {dataset.screenshot && (
            <div className="mb-10 overflow-hidden rounded-lg border border-[var(--color-border)]">
              <Image
                src={dataset.screenshot}
                alt={`Source preview for ${dataset.name}`}
                width={1200}
                height={600}
                className="w-full object-cover object-top"
              />
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="card-lab p-6">
              <h2 className="label-mono mb-4">Source</h2>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase text-steel">
                    Label
                  </dt>
                  <dd className="mt-1 text-frost">{dataset.sourceLabel}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase text-steel">
                    URL
                  </dt>
                  <dd className="mt-1 break-all">
                    <a
                      href={dataset.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-radar hover:text-frost"
                    >
                      {dataset.sourceUrl}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase text-steel">
                    Last updated
                  </dt>
                  <dd className="mt-1 text-frost">{dataset.scrapedAt}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase text-steel">
                    Refresh cadence
                  </dt>
                  <dd className="mt-1 text-frost">{dataset.refreshCadence}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase text-steel">
                    Records in public sample
                  </dt>
                  <dd className="mt-1 text-frost">
                    {dataset.rowCount.toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="card-lab p-6">
              <h2 className="label-mono mb-4">Access</h2>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href={`/lab/explorer?dataset=${encodeURIComponent(dataset.explorerTable)}`}
                    className="text-radar hover:text-frost"
                  >
                    Open in Data Explorer →
                  </Link>
                </li>
                {dataset.caseStudyId && (
                  <li>
                    <Link
                      href={`/work/${dataset.caseStudyId}`}
                      className="text-radar hover:text-frost"
                    >
                      Read case study →
                    </Link>
                  </li>
                )}
                <li>
                  <Link href="/contact?mode=scrape" className="text-radar hover:text-frost">
                    Request full export →
                  </Link>
                </li>
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-steel">
                {dataset.legalNote}
              </p>
            </div>
          </div>

          <section className="card-lab mt-8 p-6">
            <h2 className="heading-display mb-4 text-xl">Field dictionary</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)] font-mono text-[0.65rem] uppercase text-steel">
                    <th className="py-2 pr-4">Field</th>
                    <th className="py-2 pr-4">Type</th>
                    <th className="py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {dataset.fields.map((f) => (
                    <tr
                      key={f.name}
                      className="border-b border-[var(--color-border)]/60"
                    >
                      <td className="py-2 pr-4 font-mono text-xs text-radar">
                        {f.name}
                      </td>
                      <td className="py-2 pr-4 font-mono text-xs text-steel">
                        {f.type}
                      </td>
                      <td className="py-2 text-steel">{f.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
