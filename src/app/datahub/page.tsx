import Breadcrumb from "@/components/Common/Breadcrumb";
import { loadDatasetCards } from "@/lib/loadDatasetCards";
import type { Metadata } from "next";
import * as NextJS from "next/dynamic";

// Lazy load heavy components
const CategoryRow = NextJS.default(() => import("@/components/category-row/page"), {
  loading: () => (
    <div className="mb-12 animate-pulse">
      <div className="h-8 bg-gray-200 rounded mb-4 w-48"></div>
      <div className="flex space-x-6">
        <div className="min-w-[90vw] lg:min-w-[70vw] h-96 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  ),
  ssr: false,
});

export const metadata: Metadata = {
  title: "Datahub - Dataset Explorer | Elorm Dokosi",
  description: "Explore datasets from web-scraping and data mining projects. Interactive data visualization and JSON preview.",
  keywords: ["datasets", "web scraping", "data mining", "JSON", "data visualization"],
};

export const dynamic = "auto";
export const revalidate = 600;

export default async function Page() {
  const data = loadDatasetCards();
  
  // Get total number of datasets
  const totalDatasets = Object.values(data).reduce((total, sites) => total + sites.length, 0);

  return (
    <>
      <Breadcrumb
        pageName="Datahub"
        description={`Explore ${totalDatasets} datasets from my various web-scraping and data mining projects. (page is only optimized for desktop)`}
      />
      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          {/* <CategoryRow title="Real Estate Datasets" sites={coffeeSites} />
          <CategoryRow title="Social Media Datasets" sites={teaSites} /> */}
          {Object.entries(data).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No datasets available at the moment.</p>
            </div>
          ) : (
            Object.entries(data).map(([category, sites]) => (
              <CategoryRow
                key={category}
                title={category.replace("_", " ").toUpperCase()}
                sites={sites}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
}
