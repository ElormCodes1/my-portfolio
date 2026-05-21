"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { apiProducts } from "@/lib/apis-data";
import LabApis from "./LabApis";
import LabDatasets from "./LabDatasets";

const LabPlayground = dynamic(() => import("./LabPlayground"), {
  loading: () => (
    <p className="font-mono text-sm text-steel">Loading playground…</p>
  ),
  ssr: false,
});

export type LabTab = "datasets" | "apis" | "playground";

type DatasetData = Record<
  string,
  Array<{
    screenshotPath: string;
    jsonData: object;
    website: string;
    totalRecords?: number;
  }>
>;

const tabs: { id: LabTab; label: string }[] = [
  { id: "datasets", label: "Datasets" },
  { id: "apis", label: "APIs" },
  { id: "playground", label: "Playground" },
];

function tabFromHash(): LabTab {
  if (typeof window === "undefined") return "datasets";
  const hash = window.location.hash.replace("#", "");
  if (hash === "apis" || hash === "playground" || hash === "datasets") {
    return hash;
  }
  return "datasets";
}

export default function LabPage({
  datasets,
  initialTab,
  initialApiId,
}: {
  datasets: DatasetData;
  initialTab?: LabTab;
  initialApiId?: string | null;
}) {
  const [activeTab, setActiveTab] = useState<LabTab>(initialTab ?? "datasets");
  const [playgroundApiId, setPlaygroundApiId] = useState<string | null>(
    initialApiId ?? null,
  );

  const setTab = useCallback((tab: LabTab) => {
    setActiveTab(tab);
    window.history.replaceState(null, "", `/lab#${tab}`);
  }, []);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
      window.history.replaceState(null, "", `/lab#${initialTab}`);
    } else {
      setActiveTab(tabFromHash());
    }
    const onHashChange = () => setActiveTab(tabFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [initialTab]);

  const handleTryApi = (apiId: string) => {
    setPlaygroundApiId(apiId);
    setTab("playground");
  };

  const datasetCount = Object.values(datasets).reduce(
    (n, s) => n + s.length,
    0,
  );

  return (
    <div className="pt-24 pb-20 md:pt-28 md:pb-28">
      <div className="container">
        <header className="mb-10 max-w-3xl">
          <p className="label-mono mb-3 text-radar">Extraction Lab</p>
          <h1 className="heading-display text-4xl md:text-5xl">The Lab</h1>
          <p className="mt-4 text-lg text-steel">
            Datasets, live APIs, and a request playground — everything I ship for
            data acquisition in one place.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 font-mono text-xs text-steel">
            <span className="rounded border border-[var(--color-border)] px-3 py-1.5">
              {datasetCount} datasets
            </span>
            <span className="rounded border border-[var(--color-border)] px-3 py-1.5">
              {apiProducts.length} APIs
            </span>
          </div>
        </header>

        <nav
          className="mb-10 flex gap-1 overflow-x-auto border-b border-[var(--color-border)]"
          aria-label="Lab sections"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setTab(tab.id)}
              className={`shrink-0 border-b-2 px-4 py-3 font-mono text-xs uppercase tracking-[0.15em] transition-colors ${
                activeTab === tab.id
                  ? "border-radar text-radar"
                  : "border-transparent text-steel hover:text-frost"
              }`}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {activeTab === "datasets" && <LabDatasets data={datasets} />}
        {activeTab === "apis" && <LabApis onTryApi={handleTryApi} />}
        {activeTab === "playground" && (
          <LabPlayground initialApiId={playgroundApiId} />
        )}
      </div>
    </div>
  );
}
