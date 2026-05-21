import DataExplorer from "@/components/lab/DataExplorer";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dataset Explorer | The Lab",
  description: "Interactive exploration of scraped datasets — select columns and preview data.",
};

export default function ExplorerPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center pt-24">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-radar border-t-transparent" />
        </div>
      }
    >
      <DataExplorer />
    </Suspense>
  );
}
