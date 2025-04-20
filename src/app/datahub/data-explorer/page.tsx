"use client";

import { useEffect, useState } from "react";
import TableSelect from "@/components/TableSelect/page";
import ColumnCheckboxes from "@/components/ColumnCheckboxes/page";
import DataTable from "@/components/DataTable/page";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [sampleUrl, setSampleUrl] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // useEffect(() => {
  //   fetch("/src/app/api/tables")
  //     .then((res) => res.json())
  //     .then((data) => setTables(data.tables));
  // }, []);

  useEffect(() => {
    fetch("/api/tables")
      .then((res) => res.json())
      .then((data) => {
        setTables(data.tables);
        const tableFromUrl = searchParams.get("dataset");
        console.log("Table from URL:", tableFromUrl);
        if (tableFromUrl && data.tables.includes(tableFromUrl)) {
          setSelectedTable(tableFromUrl);
        }
      })
      .catch((err) => console.error("❌ Failed to fetch tables", err));
  }, []);

  useEffect(() => {
    if (selectedTable) {
      fetch(`/api/columns?table=${selectedTable}`)
        .then((res) => res.json())
        .then((data) => setColumns(data.columns));
    }
  }, [selectedTable]);

  const handleFetchData = async () => {
    if (selectedTable && selectedColumns.length > 0) {
      const res = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: selectedTable,
          columns: selectedColumns,
        }),
      });
      const result = await res.json();
      setData(result.rows);

      // Auto-generate sample CSV
      if (result.rows && result.rows.length > 0) {
        const sample = result.rows.slice(0, 10);
        const headers = Object.keys(sample[0]);
        const csvRows = [
          headers.join(","),
          ...sample.map((row: Record<string, any>) =>
            headers
              .map((field) => {
                const value = row[field];
                if (typeof value === "string") {
                  return `"${value.replace(/"/g, '""')}"`;
                }
                return value;
              })
              .join(",")
          ),
        ];
        const csvContent = csvRows.join("\n");
        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);
        setSampleUrl(url);
      }
    }
  };

  return (
    <>
      <Breadcrumb
        pageName="Data Marketplace"
        description="Explore all the datasets from my various web-scraping and data mining projects. (page is only optimized for desktop)"
      />
      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          <main className="p-6 max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Data Explorer</h1>
            <TableSelect
              tables={tables}
              selectedTable={selectedTable}
              onChange={setSelectedTable}
            />
            {selectedTable && (
              <ColumnCheckboxes
                columns={columns}
                selectedColumns={selectedColumns}
                onChange={setSelectedColumns}
              />
            )}
            <button
              onClick={handleFetchData}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={!selectedTable || selectedColumns.length === 0}
            >
              Fetch Data
            </button>
            <DataTable columns={selectedColumns} data={data} />
            <div className="mt-4 flex gap-4">
              <button
                disabled={!sampleUrl}
                className={`px-4 py-2 rounded-lg shadow font-medium ${
                  sampleUrl
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
                onClick={() => {
                  const link = document.createElement("a");
                  link.setAttribute("href", sampleUrl!);
                  link.setAttribute("download", "sample_data.csv");
                  link.click();
                }}
              >
                Download Sample
              </button>

              <button
                onClick={() => {
                  // Redirect to a buy/purchase page
                  window.location.href = "/purchase/yourTable";
                }}
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg shadow"
              >
                Buy Full Data
              </button>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
