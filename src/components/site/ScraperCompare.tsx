"use client";

import { useState } from "react";

const manual = {
  label: "Manual copy-paste",
  timePer100: "6–8 hrs",
  errorRate: "15–25%",
  cost: "Analyst time",
  consistency: "Low",
};

const pipeline = {
  label: "Automated pipeline",
  timePer100: "Minutes",
  errorRate: "<2%",
  cost: "Infra + maintenance",
  consistency: "High",
};

export default function ScraperCompare() {
  const [mode, setMode] = useState<"manual" | "pipeline">("manual");
  const active = mode === "manual" ? manual : pipeline;

  return (
    <section className="border-t border-[var(--color-border)] bg-ink-elevated/40 py-16 md:py-20">
      <div className="container">
        <header className="mb-8 max-w-2xl">
          <p className="label-mono mb-3 text-radar">ROI</p>
          <h2 className="heading-display text-3xl md:text-4xl">
            Manual vs pipeline
          </h2>
          <p className="mt-3 text-steel">
            Same hundred records — different economics. Toggle to compare how
            extraction work actually scales.
          </p>
        </header>

        <div className="card-lab max-w-2xl p-6">
          <div className="mb-6 flex gap-2">
            <button
              type="button"
              onClick={() => setMode("manual")}
              className={`flex-1 rounded border px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                mode === "manual"
                  ? "border-radar/50 text-radar"
                  : "border-[var(--color-border)] text-steel hover:text-frost"
              }`}
            >
              Manual
            </button>
            <button
              type="button"
              onClick={() => setMode("pipeline")}
              className={`flex-1 rounded border px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                mode === "pipeline"
                  ? "border-radar/50 text-radar"
                  : "border-[var(--color-border)] text-steel hover:text-frost"
              }`}
            >
              Pipeline
            </button>
          </div>

          <p className="font-mono text-xs uppercase text-radar">{active.label}</p>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-[0.65rem] uppercase text-steel">
                Time / 100 records
              </dt>
              <dd className="mt-1 text-lg text-frost">{active.timePer100}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.65rem] uppercase text-steel">
                Error rate
              </dt>
              <dd className="mt-1 text-lg text-frost">{active.errorRate}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.65rem] uppercase text-steel">
                Cost model
              </dt>
              <dd className="mt-1 text-lg text-frost">{active.cost}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.65rem] uppercase text-steel">
                Consistency
              </dt>
              <dd className="mt-1 text-lg text-frost">{active.consistency}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
