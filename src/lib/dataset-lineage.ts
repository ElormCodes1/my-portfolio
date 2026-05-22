import fs from "fs";
import path from "path";

export type DatasetLineage = {
  id: string;
  name: string;
  category: string;
  sourceUrl: string;
  sourceLabel: string;
  scrapedAt: string;
  refreshCadence: string;
  rowCount: number;
  snippetFile: string;
  screenshot?: string;
  explorerTable: string;
  fields: { name: string; type: string; description: string }[];
  legalNote: string;
  caseStudyId?: string;
};

const registry: Omit<
  DatasetLineage,
  "rowCount" | "fields" | "scrapedAt"
>[] = [
  {
    id: "chrome_extensions",
    name: "Chrome Web Store Extensions",
    category: "Web apps",
    sourceUrl: "https://chromewebstore.google.com/",
    sourceLabel: "Chrome Web Store category listings",
    refreshCadence: "Weekly (on request)",
    snippetFile: "chrome_extensions|wep_apps.json",
    screenshot: "/data_screenshots/chrome_extensions.png",
    explorerTable: "chrome_extensions",
    legalNote:
      "Public listing metadata only. Use respects site terms; no redistribution of full store dumps without agreement.",
    caseStudyId: "chrome-extensions",
  },
  {
    id: "deloitte_profiles",
    name: "Professional Profiles",
    category: "Professional directories",
    sourceUrl: "https://www.deloitte.com/",
    sourceLabel: "Public professional directory pages",
    refreshCadence: "Monthly (on request)",
    snippetFile: "deloitte_profiles|professionals_profiles.json",
    screenshot: "/data_screenshots/deloitte_profiles.png",
    explorerTable: "deloitte_profiles",
    legalNote:
      "Public sample with anonymized fields where required. Production engagements include scope and compliance review.",
    caseStudyId: "deloitte-profiles",
  },
];

function inferFields(sample: Record<string, unknown>[]) {
  if (!sample.length) return [];
  const row = sample[0];
  return Object.keys(row).map((name) => {
    const v = row[name];
    let type = "string";
    if (v === null) type = "nullable";
    else if (typeof v === "number") type = "number";
    else if (typeof v === "boolean") type = "boolean";
    return {
      name,
      type,
      description: describeField(name),
    };
  });
}

function describeField(name: string): string {
  const hints: Record<string, string> = {
    email: "Contact email when exposed on listing",
    url: "Canonical source URL",
    name: "Display name",
    ratings: "Average rating",
    review: "Review count",
    users: "Install or user count",
    scraped_time: "ISO scrape timestamp",
    category: "Taxonomy label",
    description: "Short listing description",
    website: "Publisher website",
    owner: "Owner or developer name",
    title: "Job title",
    phone: "Phone number",
    linkedin: "LinkedIn profile URL",
  };
  return hints[name] ?? "Extracted attribute";
}

function loadSnippetMeta(snippetFile: string) {
  const jsonPath = path.join(
    process.cwd(),
    "public/data_snippets",
    snippetFile,
  );
  if (!fs.existsSync(jsonPath)) {
    return { rowCount: 0, fields: [] as DatasetLineage["fields"], scrapedAt: "—" };
  }
  const raw = JSON.parse(fs.readFileSync(jsonPath, "utf-8")) as Record<
    string,
    unknown
  >[];
  const scrapedAt =
    typeof raw[0]?.scraped_time === "string"
      ? String(raw[0].scraped_time)
      : "2025-06-28";
  return {
    rowCount: raw.length,
    fields: inferFields(raw),
    scrapedAt,
  };
}

export function getAllDatasetLineages(): DatasetLineage[] {
  return registry.map((entry) => {
    const meta = loadSnippetMeta(entry.snippetFile);
    return { ...entry, ...meta };
  });
}

export function getDatasetLineage(id: string): DatasetLineage | undefined {
  return getAllDatasetLineages().find((d) => d.id === id);
}

export function getDatasetLineageIds(): string[] {
  return registry.map((d) => d.id);
}
