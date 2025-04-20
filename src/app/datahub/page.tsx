import Breadcrumb from "@/components/Common/Breadcrumb";
import JsonScreenshotViewer from "@/components/data-card/page";
import CategoryRow from "@/components/category-row/page";
import { loadDatasetCards } from "@/lib/loadDatasetCards";

export const dynamic = "auto";
export const revalidate = 600;

// const sampleJson = {
//   search_metadata: {
//     id: "6165916694c6c7025deef5ab",
//     status: "Success",
//     total_time_taken: 1.85,
//   },
//   search_parameters: {
//     engine: "google",
//     q: "Coffee",
//     location_requested: "Austin, Texas, United States",
//   },
//   search_information: {
//     query_displayed: "Coffee",
//     total_results: 2520000000,
//   },
//   recipes_results: [
//     {
//       title: "20 Great Coffee Drinks",
//       link: "https://www.acouplecooks.com/coffee-drinks/",
//       source: "A Couple Cooks",
//       ingredients: ["Moka pot", "dairy free"],
//     },
//     {
//       title: "How to Make Iced Coffee",
//       link: "https://www.recipegirl.com/how-to-make-iced-coffee/",
//       source: "Recipe Girl",
//       ingredients: ["Simple syrup", "cream"],
//     },
//   ],
// };

// const coffeeSites = [
//   {
//     screenshotPath: "/data_screenshots/deloitte_profiles.png",
//     jsonData: sampleJson,
//     website: "deloitte_profiles",
//   },
//   {
//     screenshotPath: "/images/googless.png",
//     jsonData: sampleJson,
//     website: "w2",
//   },
// ];

// const teaSites = [
//   {
//     screenshotPath: "/images/googless.png",
//     jsonData: sampleJson,
//     website: "w3",
//   },
// ];

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
