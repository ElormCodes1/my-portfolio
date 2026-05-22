import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import CaseStudyExhibit from "@/components/work/CaseStudyExhibit";
import { caseStudies, getCaseStudy } from "@/lib/work-data";
import {
  breadcrumbSchema,
  caseStudySchema,
  SITE_URL,
} from "@/lib/structured-data";
import type { Metadata } from "next";

function toEmbedUrl(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    const id = u.searchParams.get("v");
    if (id) return `https://www.youtube.com/embed/${id}`;
  } catch {
    /* use raw */
  }
  return url;
}

export async function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const study = getCaseStudy(params.slug);
  if (!study) return {};
  return {
    title: `${study.title} — Case Study`,
    description: study.tagline,
    openGraph: {
      title: study.title,
      description: study.tagline,
      url: `https://elormdokosi.com/work/${study.id}`,
    },
    alternates: { canonical: `https://elormdokosi.com/work/${study.id}` },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  const others = caseStudies.filter((s) => s.id !== study.id).slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          caseStudySchema(study),
          breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Work", url: `${SITE_URL}/work` },
            { name: study.title, url: `${SITE_URL}/work/${study.id}` },
          ]),
        ]}
      />
      <div className="pt-24 pb-20 md:pt-28 md:pb-28">
      <div className="container">
        <Link
          href="/work"
          className="label-mono mb-6 inline-block text-radar hover:text-frost"
        >
          ← All work
        </Link>

        <header className="mb-12 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-wider text-radar">
            {study.category}
          </span>
          <h1 className="heading-display mt-2 text-4xl md:text-5xl">
            {study.title}
          </h1>
          <p className="mt-4 text-xl text-steel">{study.tagline}</p>
        </header>

        {study.exhibit && (
          <div className="mb-10">
            <CaseStudyExhibit exhibit={study.exhibit} />
          </div>
        )}

        {study.videoUrl && (
          <section className="card-lab mb-10 overflow-hidden p-0">
            <div className="border-b border-[var(--color-border)] px-6 py-4">
              <h2 className="heading-display text-xl">Walkthrough</h2>
            </div>
            <div className="aspect-video w-full">
              <iframe
                title={`${study.title} walkthrough`}
                src={toEmbedUrl(study.videoUrl)}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {study.pipelineNotes && study.pipelineNotes.length > 0 && (
          <section className="card-lab mt-10 p-6 md:p-8">
            <h2 className="heading-display mb-4 text-2xl">Pipeline log</h2>
            <ul className="space-y-3">
              {study.pipelineNotes.map((note) => (
                <li
                  key={`${note.phase}-${note.event}`}
                  className="flex gap-4 border-b border-[var(--color-border)] pb-3 last:border-0 last:pb-0"
                >
                  <span className="shrink-0 font-mono text-xs uppercase tracking-wider text-radar">
                    {note.phase}
                  </span>
                  <span className="text-sm leading-relaxed text-steel">
                    {note.event}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="space-y-10">
            <section className="card-lab p-6 md:p-8">
              <h2 className="heading-display mb-4 text-2xl">The problem</h2>
              <p className="leading-relaxed text-steel">{study.problem}</p>
            </section>

            <section className="card-lab p-6 md:p-8">
              <h2 className="heading-display mb-4 text-2xl">Approach</h2>
              <ol className="space-y-4">
                {study.approach.map((step, i) => (
                  <li key={step} className="flex gap-4 text-steel">
                    <span className="font-mono text-sm text-radar">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="card-lab p-6 md:p-8">
              <h2 className="heading-display mb-4 text-2xl">Deliverables</h2>
              <ul className="space-y-2">
                {study.deliverables.map((d) => (
                  <li key={d} className="flex gap-2 text-steel">
                    <span className="text-radar">▸</span>
                    {d}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="card-lab p-6">
              <h3 className="label-mono mb-4">Results</h3>
              <dl className="space-y-3">
                {study.results.map((r) => (
                  <div key={r.label}>
                    <dt className="font-mono text-[0.65rem] uppercase text-steel">
                      {r.label}
                    </dt>
                    <dd className="mt-0.5 font-medium text-frost">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="card-lab p-6">
              <h3 className="label-mono mb-4">Stack</h3>
              <div className="flex flex-wrap gap-2">
                {study.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-[var(--color-border)] px-2 py-1 font-mono text-xs text-steel"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-lab space-y-3 p-6">
              <h3 className="label-mono mb-2">Explore</h3>
              {study.cta.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    link.href === study.cta[0]?.href
                      ? "btn-primary block text-center"
                      : "btn-ghost block text-center"
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </aside>
        </div>

        {others.length > 0 && (
          <section className="mt-16 border-t border-[var(--color-border)] pt-12">
            <h2 className="heading-display mb-6 text-2xl">More work</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {others.map((s) => (
                <Link
                  key={s.id}
                  href={`/work/${s.id}`}
                  className="card-lab block p-5 transition-colors hover:border-radar/40"
                >
                  <span className="font-mono text-[0.65rem] uppercase text-radar">
                    {s.category}
                  </span>
                  <p className="heading-display mt-2 text-lg">{s.title}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
    </>
  );
}
