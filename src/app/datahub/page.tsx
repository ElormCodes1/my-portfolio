import Breadcrumb from "@/components/Common/Breadcrumb";
import JsonScreenshotViewer from "@/components/data-card/page";
import CategoryRow from "@/components/category-row/page";
import { loadDatasetCards } from "@/lib/loadDatasetCards";

export const dynamic = "auto";
export const revalidate = 600;

export default async function Page() {
  const data = loadDatasetCards();
  return (
    <>
      <Breadcrumb
        pageName="Datahub"
        description="Explore all the datasets from my various web-scraping and data mining projects. (page is only optimized for desktop)"
      />
      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          {/* <CategoryRow title="Real Estate Datasets" sites={coffeeSites} />
          <CategoryRow title="Social Media Datasets" sites={teaSites} /> */}
          {Object.entries(data).map(([category, sites]) => (
            <CategoryRow
              key={category}
              title={category.replace("_", " ").toUpperCase()}
              sites={sites}
            />
          ))}
        </div>
      </section>
    </>
  );
}
