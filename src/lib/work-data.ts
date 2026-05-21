export type CaseStudy = {
  id: string;
  title: string;
  category: "Dataset" | "API" | "Automation";
  tagline: string;
  problem: string;
  approach: string[];
  stack: string[];
  results: { label: string; value: string }[];
  deliverables: string[];
  cta: { label: string; href: string }[];
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "chrome-extensions",
    title: "Chrome Web Store Extensions",
    category: "Dataset",
    tagline: "Market intelligence from 18 extension categories at scale.",
    problem:
      "A research team needed structured metadata — ratings, reviews, developer signals, and pricing — across the Chrome Web Store without manual copy-paste or brittle one-off scripts.",
    approach: [
      "Mapped category URLs and pagination patterns across 18 store segments.",
      "Built resilient fetch logic with rate limiting and session rotation.",
      "Normalized records into a consistent JSON schema with deduplication by extension ID.",
      "Delivered preview samples in the Lab and full export on request.",
    ],
    stack: ["Python", "Playwright", "PostgreSQL", "GCP"],
    results: [
      { label: "Categories", value: "18" },
      { label: "Fields per record", value: "12+" },
      { label: "Format", value: "JSON / CSV" },
    ],
    deliverables: [
      "Structured JSON dataset with extension metadata",
      "Screenshot-backed previews in the Lab",
      "Repeatable scrape pipeline for refresh cycles",
    ],
    cta: [
      { label: "View in Lab", href: "/lab#datasets" },
      { label: "Request full dataset", href: "/contact" },
    ],
    featured: true,
  },
  {
    id: "deloitte-profiles",
    title: "Professional Profiles Extraction",
    category: "Dataset",
    tagline: "Directory pages turned into searchable professional records.",
    problem:
      "Professional directory listings buried contact details, titles, and LinkedIn references in inconsistent HTML. The client needed a clean, queryable dataset for outreach and market mapping.",
    approach: [
      "Identified stable DOM selectors and fallback parsing rules per profile template.",
      "Extracted name, email, title, phone, and social links with validation passes.",
      "Staged data in PostgreSQL for column-level exploration via the Data Explorer.",
      "Published anonymized samples for portfolio demonstration.",
    ],
    stack: ["Python", "BeautifulSoup", "PostgreSQL", "Next.js"],
    results: [
      { label: "Record types", value: "Professional profiles" },
      { label: "Key fields", value: "Contact + title + LinkedIn" },
      { label: "Explorer", value: "Live column select" },
    ],
    deliverables: [
      "Cleaned profile records with normalized contact fields",
      "Interactive explorer for column selection and CSV sample export",
      "Documented schema for downstream CRM import",
    ],
    cta: [
      { label: "Open explorer", href: "/lab/explorer?dataset=deloitte_profiles" },
      { label: "Start a similar project", href: "/contact" },
    ],
    featured: true,
  },
  {
    id: "google-maps-api",
    title: "Google Maps Business API",
    category: "API",
    tagline: "Programmatic local business intelligence on demand.",
    problem:
      "Teams doing lead generation and market research needed reliable access to business listings, reviews, and coordinates — not one-off CSV dumps that go stale overnight.",
    approach: [
      "Designed REST endpoints around search, detail, and async task patterns.",
      "Cached high-traffic queries and documented rate limits for fair use.",
      "Shipped OpenAPI docs and a playground-friendly example URL.",
      "Integrated with the portfolio Lab for live try-it-now demos.",
    ],
    stack: ["FastAPI", "Python", "Redis", "GCP", "OpenAPI"],
    results: [
      { label: "Endpoints", value: "Search + detail" },
      { label: "Data points", value: "Contact, reviews, geo" },
      { label: "Tier", value: "Free available" },
    ],
    deliverables: [
      "Production API at data-apis.elormdokosi.com",
      "Documentation and example requests",
      "Playground integration on this site",
    ],
    cta: [
      { label: "API details", href: "/apis/google-maps" },
      { label: "Try in playground", href: "/lab?tab=playground&api=google-maps" },
    ],
    featured: true,
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((s) => s.id === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((s) => s.featured);
}
