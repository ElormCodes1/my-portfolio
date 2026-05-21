import Link from "next/link";
import type { CaseStudy } from "@/lib/work-data";

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="card-lab flex flex-col p-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <span className="font-mono text-[0.65rem] uppercase tracking-wider text-radar">
          {study.category}
        </span>
        <span className="font-mono text-[0.6rem] text-steel/60">{study.id}</span>
      </div>
      <h2 className="heading-display text-xl">{study.title}</h2>
      <p className="mt-2 text-sm text-steel">{study.tagline}</p>
      <p className="mt-3 flex-1 text-sm text-frost/80">{study.problem}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {study.stack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="rounded border border-[var(--color-border)] px-2 py-0.5 font-mono text-[0.6rem] text-steel"
          >
            {tech}
          </span>
        ))}
      </div>
      <Link
        href={`/work/${study.id}`}
        className="mt-6 font-mono text-xs uppercase tracking-wider text-radar transition-colors hover:text-frost"
      >
        Read case study →
      </Link>
    </article>
  );
}
