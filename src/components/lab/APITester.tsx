"use client";

import { useState } from "react";

interface APITesterProps {
  apiName: string;
  endpoint: string;
  exampleRequest: string;
  method?: "GET" | "POST";
}

export default function APITester({
  apiName,
  endpoint,
  exampleRequest,
  method = "GET",
}: APITesterProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [customRequest, setCustomRequest] = useState(exampleRequest);

  const handleTest = async () => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(customRequest);
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-lab p-6">
      <h3 className="heading-display text-xl">Test {apiName}</h3>
      <p className="mt-1 font-mono text-xs text-steel">{endpoint}</p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="label-mono mb-2 block">Request URL</label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <span className="inline-flex items-center justify-center rounded-md border border-[var(--color-border)] bg-ink-muted px-3 py-2 font-mono text-xs uppercase text-radar sm:rounded-r-none">
              {method}
            </span>
            <input
              type="text"
              value={customRequest}
              onChange={(e) => setCustomRequest(e.target.value)}
              className="min-w-0 flex-1 rounded-md border border-[var(--color-border)] bg-ink-muted px-3 py-2 font-mono text-sm text-frost outline-none focus:border-radar/50 sm:rounded-l-none"
              placeholder="Enter full API URL"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleTest}
          disabled={isLoading || !customRequest}
          className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Running request…" : "Send request"}
        </button>

        {error && (
          <div className="rounded-md border border-red-500/30 bg-red-500/10 p-4">
            <p className="font-mono text-xs uppercase text-red-400">Error</p>
            <p className="mt-1 text-sm text-steel">{error}</p>
          </div>
        )}

        {response !== null && (
          <div className="rounded-md border border-signal/30 bg-signal/5 p-4">
            <p className="font-mono text-xs uppercase text-signal">Response</p>
            <pre className="mt-3 max-h-80 overflow-auto font-mono text-xs leading-relaxed text-frost/90">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
