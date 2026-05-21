import Link from "next/link";
import CaseStudyCard from "@/components/work/CaseStudyCard";
import JsonLd from "@/components/seo/JsonLd";
import { caseStudies } from "@/lib/work-data";
import { breadcrumbSchema, SITE_URL } from "@/lib/structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Case Studies",
  description:
    "Web scraping, data acquisition, and API projects — datasets, pipelines, and production endpoints.",
  alternates: { canonical: "https://elormdokosi.com/work" },
};

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Work", url: `${SITE_URL}/work` },
        ])}
      />
      <div className="pt-24 pb-20 md:pt-28 md:pb-28">
        <div className="container">
          <header className="mb-12 max-w-3xl">
            <p className="label-mono mb-3 text-radar">Case studies</p>
            <h1 className="heading-display text-4xl md:text-5xl">Work</h1>
            <p className="mt-4 text-lg text-steel">
              Real extraction projects — how the problem was scoped, what shipped,
              and where to explore samples in the Lab.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </div>

          <div className="card-lab mt-12 flex flex-col items-start gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="heading-display text-lg">Have a similar project?</p>
              <p className="mt-1 text-sm text-steel">
                Scraping, APIs, automation, or AI-ready data pipelines.
              </p>
            </div>
            <Link href="/contact" className="btn-primary shrink-0">
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
