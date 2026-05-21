import Link from "next/link";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  ResumeIcon,
  YouTubeIcon,
} from "@/components/icons/SocialIcons";
import { labStats, socialLinks } from "@/lib/site-data";

const socialIcons: Record<string, React.ReactNode> = {
  LinkedIn: <LinkedInIcon />,
  GitHub: <GitHubIcon />,
  Email: <MailIcon />,
  Resume: <ResumeIcon />,
  YouTube: <YouTubeIcon />,
};

const pipelineSteps = ["Target", "Fetch", "Parse", "Structure", "Ship"];

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div
        className="site-grid-bg pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 top-20 hidden h-96 w-96 rounded-full bg-radar/5 blur-3xl md:block"
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="hero-enter mx-auto max-w-4xl">
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <span className="label-mono text-radar">Extraction Lab</span>
            <span className="hidden h-px w-12 bg-[var(--color-border)] sm:block" />
            <span className="flex items-center gap-2 font-mono text-xs text-steel">
              <span
                className="h-1.5 w-1.5 animate-pulse-signal rounded-full bg-signal"
                aria-hidden="true"
              />
              {labStats.status}
            </span>
          </div>

          <h1 className="heading-display text-4xl leading-[1.1] sm:text-5xl md:text-6xl lg:text-[3.5rem]">
            I turn messy websites into{" "}
            <span className="text-radar">structured data</span> and{" "}
            <span className="italic text-frost/90">AI-ready pipelines</span>.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-steel md:text-xl">
            Web scraping, data acquisition, and AI engineer — building datasets,
            APIs, and automation systems for teams that need reliable extraction
            at scale.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs text-steel">
            <span className="rounded border border-[var(--color-border)] px-3 py-1.5">
              {labStats.datasets} datasets in Lab
            </span>
            <span className="rounded border border-[var(--color-border)] px-3 py-1.5">
              {labStats.apisActive}+ live APIs
            </span>
            <span className="rounded border border-[var(--color-border)] px-3 py-1.5">
              Python · GCP · Next.js
            </span>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/lab" className="btn-primary">
              Open the Lab
            </Link>
            <Link href="/contact" className="btn-ghost">
              Request a scrape
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={
                  link.label === "Email" || link.label === "Resume"
                    ? undefined
                    : "_blank"
                }
                rel={
                  link.label === "Email" || link.label === "Resume"
                    ? undefined
                    : "noreferrer"
                }
                download={link.label === "Resume" ? true : undefined}
                aria-label={link.label}
                className="social-chip"
              >
                {socialIcons[link.label]}
              </a>
            ))}
          </div>
        </div>

        <div
          className="hero-pipeline-terminal mx-auto mt-16 max-w-3xl rounded-lg border border-[var(--color-border)] bg-ink-elevated/60 p-4 font-mono text-xs backdrop-blur-sm md:p-5"
          aria-hidden="true"
        >
          <div className="mb-3 flex items-center gap-2 text-steel">
            <span className="text-radar">▸</span>
            <span>pipeline.run</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {pipelineSteps.map((step, i) => (
              <span key={step} className="hero-pipeline-step rounded px-2 py-1">
                {step}
                {i < 4 ? " →" : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
