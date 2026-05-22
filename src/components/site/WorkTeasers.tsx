import Link from "next/link";
import { getFeaturedCaseStudies } from "@/lib/work-data";

const WorkTeasers = () => {
  const featured = getFeaturedCaseStudies();

  return (
    <section id="work" className="py-20 md:py-28">
      <div className="container">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="label-mono mb-3">Selected work</p>
            <h2 className="heading-display text-3xl md:text-4xl">
              Proof, not promises
            </h2>
            <p className="mt-4 text-steel">
              Real datasets and APIs from extraction projects — read the case
              study or jump straight into the Lab.
            </p>
          </div>
          <Link href="/work" className="btn-ghost shrink-0 self-start md:self-auto">
            All work →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((study) => (
            <article key={study.id} className="card-lab flex flex-col p-6">
              <div className="mb-4 flex items-center justify-between gap-2">
                <span className="font-mono text-[0.65rem] uppercase tracking-wider text-radar">
                  {study.category}
                </span>
              </div>
              <h3 className="heading-display text-xl">{study.title}</h3>
              <p className="mt-3 text-sm text-steel">{study.tagline}</p>
              <Link
                href={`/work/${study.id}`}
                className="mt-6 font-mono text-xs uppercase tracking-wider text-radar transition-colors hover:text-frost"
              >
                Read case study →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-dashed border-[var(--color-border)] p-6 text-center md:p-8">
          <p className="font-mono text-xs uppercase tracking-wider text-steel">
            Explore live samples
          </p>
          <p className="mt-2 text-sm text-steel">
            Datasets, API catalog, and request playground in one place.
          </p>
          <Link href="/lab" className="btn-primary mt-5 inline-flex">
            Open the Lab
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorkTeasers;
