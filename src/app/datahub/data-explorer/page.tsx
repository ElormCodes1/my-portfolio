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
  const [loading, setLoading] = useState(false);
  const [loadingTables, setLoadingTables] = useState(true);
  const [loadingColumns, setLoadingColumns] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoadingTables(true);
    fetch("/api/tables")
      .then((res) => res.json())
      .then((data) => {
        setTables(data.tables);
        const tableFromUrl = searchParams.get("dataset");
        if (tableFromUrl && data.tables.includes(tableFromUrl)) {
          setSelectedTable(tableFromUrl);
        }
        setError(null);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch tables", err);
        setError("Failed to load datasets. Please try again.");
      })
      .finally(() => setLoadingTables(false));
  }, [searchParams]);

  useEffect(() => {
    if (selectedTable) {
      setLoadingColumns(true);
      fetch(`/api/columns?table=${selectedTable}`)
        .then((res) => res.json())
        .then((data) => {
          setColumns(data.columns);
          setSelectedColumns([]);
          setError(null);
        })
        .catch((err) => {
          console.error("❌ Failed to fetch columns", err);
          setError("Failed to load columns. Please try again.");
        })
        .finally(() => setLoadingColumns(false));
    }
  }, [selectedTable]);

  const handleFetchData = async () => {
    if (selectedTable && selectedColumns.length > 0) {
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
        
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        
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
      } catch (err) {
        console.error("❌ Failed to fetch data", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const currentStep = selectedTable ? (selectedColumns.length > 0 ? 3 : 2) : 1;
  const totalSteps = 3;

  return (
    <>
      <Breadcrumb
        pageName="Data Explorer"
        description="Interactive data exploration and visualization tool for web-scraped datasets"
      />
      
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-[120px] pb-[120px]">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Data Explorer
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore and analyze datasets from various web-scraping projects. Select a dataset, 
              choose your columns, and get instant insights.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                      step <= currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step}
                  </div>
                  <div className="ml-3">
                    <div
                      className={`text-sm font-medium ${
                        step <= currentStep
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-500"
                      }`}
                    >
                      {step === 1 && "Select Dataset"}
                      {step === 2 && "Choose Columns"}
                      {step === 3 && "Explore Data"}
                    </div>
                  </div>
                  {step < totalSteps && (
                    <div
                      className={`flex-1 h-1 mx-4 ${
                        step < currentStep ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="max-w-4xl mx-auto mb-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Control Panel */}
            <div className="lg:col-span-1 space-y-6">
              {/* Dataset Selection Card */}
              <div className="dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V7c0-2.21-1.79-4-4-4H8c-2.21 0-4 1.79-4 4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Step 1: Select Dataset
                  </h3>
                </div>
                
                {loadingTables ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <TableSelect
                    tables={tables}
                    selectedTable={selectedTable}
                    onChange={setSelectedTable}
                  />
                )}
              </div>

              {/* Column Selection Card */}
              {selectedTable && (
                <div className="dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Step 2: Choose Columns
                    </h3>
                  </div>
                  
                  {loadingColumns ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                    </div>
                  ) : (
                    <ColumnCheckboxes
                      columns={columns}
                      selectedColumns={selectedColumns}
                      onChange={setSelectedColumns}
                    />
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {selectedTable && selectedColumns.length > 0 && (
                <div className="dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleFetchData}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Loading...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Explore Data
                      </>
                    )}
                  </button>

                  {/* Download Actions */}
                  {data.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <button
                        disabled={!sampleUrl}
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center"
                        onClick={() => {
                          if (sampleUrl) {
                            const link = document.createElement("a");
                            link.setAttribute("href", sampleUrl);
                            link.setAttribute("download", `${selectedTable}_sample.csv`);
                            link.click();
                          }
                        }}
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Sample CSV
                      </button>

                      <button
                        onClick={() => {
                          window.location.href = "/contact";
                        }}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 3H4a1 1 0 00-1 1v1m3 9a2 2 0 002 2h10a2 2 0 002-2M9 19a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Get Full Dataset
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Data Visualization Area */}
            <div className="lg:col-span-3">
              {data.length > 0 ? (
                <div className="dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 00-2 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Data Preview
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Showing {data.length} rows from {selectedTable}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedColumns.length} columns selected
                    </div>
                  </div>
                  <DataTable columns={selectedColumns} data={data} />
                </div>
              ) : selectedTable ? (
                <div className="dark:bg-gray-800 rounded-xl shadow-lg p-12 border border-gray-200 dark:border-gray-700 text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 00-2 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Ready to Explore
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Select columns and click &quot;Explore Data&quot; to view your dataset
                  </p>
                </div>
              ) : (
                <div className="dark:bg-gray-800 rounded-xl shadow-lg p-12 border border-gray-200 dark:border-gray-700 text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V7c0-2.21-1.79-4-4-4H8c-2.21 0-4 1.79-4 4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Welcome to Data Explorer
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Start by selecting a dataset from the panel on the left
                  </p>
                  <div className="text-sm text-gray-400 dark:text-gray-500">
                    Available datasets: {tables.length}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
