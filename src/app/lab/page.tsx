import LabPage from "@/components/lab/LabPage";
import JsonLd from "@/components/seo/JsonLd";
import { loadDatasetCards } from "@/lib/loadDatasetCards";
import { professionalServiceSchema } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Lab — Datasets & APIs | Elorm Dokosi",
  description:
    "Explore web-scraping datasets, data extraction APIs, and a live request playground.",
  openGraph: {
    title: "The Lab — Datasets & APIs",
    description:
      "Datasets, APIs, and playground for web scraping and data acquisition.",
    url: "https://elormdokosi.com/lab",
  },
  alternates: {
    canonical: "https://elormdokosi.com/lab",
  },
};

export const revalidate = 600;

export default function Page({
  searchParams,
}: {
  searchParams?: { tab?: string; api?: string };
}) {
  const datasets = loadDatasetCards();
  const tab = searchParams?.tab;
  const initialTab =
    tab === "apis" || tab === "playground" || tab === "datasets"
      ? tab
      : undefined;

  return (
    <>
      <JsonLd data={professionalServiceSchema()} />
      <LabPage
        datasets={datasets}
        initialTab={initialTab}
        initialApiId={searchParams?.api ?? null}
      />
    </>
  );
}
