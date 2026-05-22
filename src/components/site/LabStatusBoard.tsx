"use client";

import { useEffect, useState } from "react";

type LabStatusPayload = {
  overall: string;
  message: string;
  datasets: number;
  apisActive: number;
  checks: {
    dataApi: {
      label: string;
      status: string;
      latencyMs: number | null;
    };
  };
};

const statusDot: Record<string, string> = {
  up: "bg-signal",
  down: "bg-radar",
  unknown: "bg-steel",
};

export default function LabStatusBoard({ compact = false }: { compact?: boolean }) {
  const [data, setData] = useState<LabStatusPayload | null>(null);

  useEffect(() => {
    fetch("/api/lab-status")
      .then((r) => r.json())
      .then(setData)
      .catch(() => null);
  }, []);

  const message = data?.message ?? "Checking status…";
  const datasets = data?.datasets ?? 2;
  const apis = data?.apisActive ?? 6;

  if (compact) {
    return (
      <span className="flex items-center gap-2 font-mono text-xs text-steel">
        <span
          className={`h-1.5 w-1.5 rounded-full ${data ? (data.overall === "operational" ? "animate-pulse-signal bg-signal" : "bg-radar") : "bg-steel"}`}
          aria-hidden="true"
        />
        {message}
      </span>
    );
  }

  return (
    <div className="card-lab p-4 md:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="label-mono text-radar">Lab status</p>
        <span className="flex items-center gap-2 font-mono text-xs text-steel">
          <span
            className={`h-1.5 w-1.5 rounded-full ${data?.overall === "operational" ? "animate-pulse-signal bg-signal" : "bg-radar"}`}
          />
          {message}
        </span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 font-mono text-xs text-steel">
        <span className="rounded border border-[var(--color-border)] px-2 py-1">
          {datasets} datasets
        </span>
        <span className="rounded border border-[var(--color-border)] px-2 py-1">
          {apis} APIs
        </span>
      </div>

      {data && (
        <ul className="space-y-2 font-mono text-xs">
          <li className="flex items-center justify-between gap-2 text-steel">
            <span className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${statusDot[data.checks.dataApi.status] ?? statusDot.unknown}`}
              />
              {data.checks.dataApi.label}
            </span>
            <span className="text-frost">
              {data.checks.dataApi.status === "up"
                ? `${data.checks.dataApi.latencyMs ?? "—"}ms`
                : "unreachable"}
            </span>
          </li>
        </ul>
      )}
    </div>
  );
}
