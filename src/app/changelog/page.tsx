import { getChangelogEntries } from "@/lib/changelog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog | Elorm Dokosi",
  description: "Recent updates to the Extraction Lab, data APIs, and datasets.",
  alternates: { canonical: "https://elormdokosi.com/changelog" },
};

export default function ChangelogPage() {
  const entries = getChangelogEntries();

  return (
    <div className="pt-24 pb-20 md:pt-28 md:pb-28">
      <div className="container max-w-2xl">
        <header className="mb-10">
          <p className="label-mono mb-3 text-radar">Updates</p>
          <h1 className="heading-display text-4xl md:text-5xl">Changelog</h1>
          <p className="mt-4 text-steel">
            New capabilities in the Lab, APIs, and datasets.
          </p>
        </header>

        <ol className="space-y-8">
          {entries.map((entry) => (
            <li
              key={entry.slug}
              className="card-lab border-l-2 border-l-radar/40 p-6"
            >
              <time className="font-mono text-[0.65rem] uppercase text-steel">
                {new Date(entry.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h2 className="heading-display mt-2 text-xl">{entry.title}</h2>
              {entry.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {entry.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-[var(--color-border)] px-2 py-0.5 font-mono text-[0.6rem] uppercase text-steel"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <p className="mt-4 text-sm leading-relaxed text-steel whitespace-pre-wrap">
                {entry.content}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
