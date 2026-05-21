import { pipelineSteps } from "@/lib/site-data";

export default function Pipeline() {
  return (
    <section
      id="pipeline"
      className="section-reveal relative border-y border-[var(--color-border)] bg-ink-elevated/30 py-20 md:py-28"
    >
      <div className="container">
        <div className="mb-12 max-w-xl">
          <p className="label-mono mb-3">How it works</p>
          <h2 className="heading-display text-3xl md:text-4xl">
            From URL to deliverable
          </h2>
          <p className="mt-4 text-steel">
            Every engagement follows the same disciplined pipeline — whether
            the output is a one-off dataset or a production API.
          </p>
        </div>

        <ol className="pipeline-cycle grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
          {pipelineSteps.map((step, index) => (
            <li key={step.id} className="pipeline-cycle-step card-lab flex flex-col p-5">
              <span className="font-mono text-[0.65rem] text-steel/80">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-mono text-sm font-medium uppercase tracking-wider text-frost">
                {step.label}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-steel">
                {step.detail}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
