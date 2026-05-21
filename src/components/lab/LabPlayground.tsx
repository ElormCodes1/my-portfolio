"use client";

import { useEffect, useMemo, useState } from "react";
import { apiProducts } from "@/lib/apis-data";
import APITester from "./APITester";

type LabPlaygroundProps = {
  initialApiId?: string | null;
};

export default function LabPlayground({ initialApiId }: LabPlaygroundProps) {
  const defaultId = initialApiId ?? apiProducts[0]?.id ?? "";
  const [selectedId, setSelectedId] = useState(defaultId);

  useEffect(() => {
    if (initialApiId) setSelectedId(initialApiId);
  }, [initialApiId]);

  const selected = useMemo(
    () => apiProducts.find((a) => a.id === selectedId) ?? apiProducts[0],
    [selectedId],
  );

  if (!selected) {
    return (
      <div className="card-lab py-12 text-center text-steel">
        No APIs configured.
      </div>
    );
  }

  return (
    <div>
      <p className="mb-6 max-w-2xl text-steel">
        Send live requests against extraction APIs. CORS and auth may apply — use
        your API key in the URL if required by the docs.
      </p>

      <div className="mb-6">
        <label htmlFor="api-select" className="label-mono mb-2 block">
          Select endpoint
        </label>
        <select
          id="api-select"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full max-w-md rounded-md border border-[var(--color-border)] bg-ink-muted px-3 py-2 font-mono text-sm text-frost outline-none focus:border-radar/50"
        >
          {apiProducts.map((api) => (
            <option key={api.id} value={api.id}>
              {api.icon} {api.name}
            </option>
          ))}
        </select>
      </div>

      <APITester
        key={selected.id}
        apiName={selected.name}
        endpoint={selected.endpoint}
        exampleRequest={selected.exampleUrl}
      />
    </div>
  );
}
