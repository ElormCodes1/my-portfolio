import { apiProducts } from "@/lib/apis-data";
import { caseStudies } from "@/lib/work-data";

export const SITE_URL = "https://elormdokosi.com";
export const SITE_NAME = "Elorm Marrion Dokosi";
export const SITE_TAGLINE =
  "Web scraping, data acquisition, and AI engineering";

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL,
    jobTitle: "Web Scraping, Data Acquisition & AI Engineer",
    description: SITE_TAGLINE,
    sameAs: [
      "https://www.linkedin.com/in/elormdokosimarrion",
      "https://github.com/ElormCodes1",
      "https://www.youtube.com/channel/UCu9o9jAc_oYXbQmIIb3aWkg",
    ],
    knowsAbout: [
      "Web scraping",
      "Data acquisition",
      "Python automation",
      "API development",
      "Machine learning data pipelines",
    ],
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_TAGLINE,
    publisher: { "@type": "Person", name: SITE_NAME },
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "EMKO Extraction Lab",
    url: `${SITE_URL}/lab`,
    description:
      "Web scraping datasets, data extraction APIs, and automation for engineering teams.",
    provider: { "@type": "Person", name: SITE_NAME },
    areaServed: "Worldwide",
    serviceType: [
      "Web scraping",
      "Data extraction",
      "API development",
      "Python automation",
    ],
  };
}

export function caseStudySchema(study: (typeof caseStudies)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${SITE_URL}/work/${study.id}`,
    name: study.title,
    description: study.tagline,
    url: `${SITE_URL}/work/${study.id}`,
    author: { "@type": "Person", name: SITE_NAME },
    about: study.problem,
    keywords: study.stack.join(", "),
  };
}

export function blogPostSchema({
  title,
  description,
  slug,
  datePublished,
  image,
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: `${SITE_URL}/blog/${slug}`,
    datePublished,
    author: { "@type": "Person", name: SITE_NAME },
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
    },
    ...(image ? { image } : {}),
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
  };
}

export function apiServiceSchema(api: (typeof apiProducts)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "WebAPI",
    name: api.name,
    description: api.description,
    url: `${SITE_URL}/apis/${api.id}`,
    documentation: "https://data-apis.elormdokosi.com/docs",
    provider: { "@type": "Person", name: SITE_NAME },
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
