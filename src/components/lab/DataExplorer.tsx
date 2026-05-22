"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TableSelect from "@/components/TableSelect/page";
import ColumnCheckboxes from "@/components/ColumnCheckboxes/page";
import DataTable from "@/components/DataTable/page";

export default function DataExplorer() {
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [sampleUrl, setSampleUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingTables, setLoadingTables] = useState(true);
  const [loadingColumns, setLoadingColumns] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoadingTables(true);
    fetch("/api/tables")
      .then(async (res) => {
        const payload = await res.json();
        if (!res.ok) {
          throw new Error(payload.error ?? "Failed to load datasets");
        }
        return payload;
      })
      .then((payload) => {
        setTables(payload.tables ?? []);
        const tableFromUrl = searchParams.get("dataset");
        if (tableFromUrl && payload.tables?.includes(tableFromUrl)) {
          setSelectedTable(tableFromUrl);
        }
        setError(null);
      })
      .catch((err: Error) =>
        setError(err.message ?? "Failed to load datasets. Please try again."),
      )
      .finally(() => setLoadingTables(false));
  }, [searchParams]);

  useEffect(() => {
    if (!selectedTable) return;
    setLoadingColumns(true);
    fetch(`/api/columns?table=${selectedTable}`)
      .then((res) => res.json())
      .then((payload) => {
        setColumns(payload.columns);
        setSelectedColumns([]);
        setError(null);
      })
      .catch(() => setError("Failed to load columns. Please try again."))
      .finally(() => setLoadingColumns(false));
  }, [selectedTable]);

  const handleFetchData = async () => {
    if (!selectedTable || selectedColumns.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: selectedTable,
          columns: selectedColumns,
        }),
      });
      if (!res.ok) throw new Error("Failed to fetch data");
      const result = await res.json();
      setData(result.rows);

      if (result.rows?.length > 0) {
        const sample = result.rows.slice(0, 10);
        const headers = Object.keys(sample[0]);
        const csvRows = [
          headers.join(","),
          ...sample.map((row: Record<string, unknown>) =>
            headers
              .map((field) => {
                const value = row[field];
                if (typeof value === "string") {
                  return `"${value.replace(/"/g, '""')}"`;
                }
                return String(value ?? "");
              })
              .join(","),
          ),
        ];
        const blob = new Blob([csvRows.join("\n")], {
          type: "text/csv;charset=utf-8;",
        });
        setSampleUrl(URL.createObjectURL(blob));
      }
    } catch {
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const panelClass = "card-lab p-5 md:p-6";

  return (
    <div className="pt-24 pb-20 md:pt-28">
      <div className="container">
        <Link
          href="/lab#datasets"
          className="label-mono mb-6 inline-block text-radar hover:text-frost"
        >
          ← Back to Lab
        </Link>

        <header className="mb-8 max-w-2xl">
          <p className="label-mono mb-2 text-radar">Dataset explorer</p>
          <h1 className="heading-display text-3xl md:text-4xl">Data Explorer</h1>
          <p className="mt-3 text-steel">
            Select a table, choose columns, and preview rows. Export a sample CSV or
            request the full dataset.
          </p>
        </header>

        {error && (
          <div className="mb-6 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-steel">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="space-y-6 lg:col-span-1">
            <div className={panelClass}>
              <h2 className="font-mono text-xs uppercase tracking-wider text-radar">
                1 · Dataset
              </h2>
              {loadingTables ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-radar border-t-transparent" />
                </div>
              ) : (
                <div className="mt-4">
                  <TableSelect
                    tables={tables}
                    selectedTable={selectedTable}
                    onChange={setSelectedTable}
                  />
                </div>
              )}
            </div>

            {selectedTable && (
              <div className={panelClass}>
                <h2 className="font-mono text-xs uppercase tracking-wider text-radar">
                  2 · Columns
                </h2>
                {loadingColumns ? (
                  <div className="flex justify-center py-8">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-radar border-t-transparent" />
                  </div>
                ) : (
                  <div className="mt-4">
                    <ColumnCheckboxes
                      columns={columns}
                      selectedColumns={selectedColumns}
                      onChange={setSelectedColumns}
                    />
                  </div>
                )}
              </div>
            )}

            {selectedTable && selectedColumns.length > 0 && (
              <div className={panelClass}>
                <button
                  type="button"
                  onClick={handleFetchData}
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {loading ? "Loading…" : "Explore data"}
                </button>
                {data.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <button
                      type="button"
                      disabled={!sampleUrl}
                      className="btn-ghost w-full text-[0.65rem] disabled:opacity-50"
                      onClick={() => {
                        if (!sampleUrl) return;
                        const link = document.createElement("a");
                        link.href = sampleUrl;
                        link.download = `${selectedTable}_sample.csv`;
                        link.click();
                      }}
                    >
                      Download sample CSV
                    </button>
                    <Link href="/contact" className="btn-primary block w-full text-center">
                      Get full dataset
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            {data.length > 0 ? (
              <div className={panelClass}>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="heading-display text-lg">Preview</h2>
                    <p className="font-mono text-xs text-steel">
                      {data.length} rows · {selectedTable}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-steel">
                    {selectedColumns.length} columns
                  </span>
                </div>
                <DataTable columns={selectedColumns} data={data} />
              </div>
            ) : (
              <div className={`${panelClass} py-16 text-center`}>
                <p className="text-steel">
                  {selectedTable
                    ? "Select columns and run Explore data."
                    : `Choose a dataset to begin. ${tables.length} available.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
