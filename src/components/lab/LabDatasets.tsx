import CategoryRow from "./CategoryRow";

type DatasetData = Record<
  string,
  Array<{
    screenshotPath: string;
    jsonData: object;
    website: string;
    totalRecords?: number;
  }>
>;

export default function LabDatasets({ data }: { data: DatasetData }) {
  const total = Object.values(data).reduce((n, sites) => n + sites.length, 0);

  if (total === 0) {
    return (
      <div className="card-lab py-16 text-center">
        <p className="text-steel">No datasets available at the moment.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-8 max-w-2xl text-steel">
        Sample records from scraping projects. Swipe on mobile, scroll on desktop.
        Open any card to explore columns and export data.
      </p>
      {Object.entries(data).map(([category, sites]) => (
        <CategoryRow
          key={category}
          title={category.replace(/_/g, " ")}
          sites={sites}
        />
      ))}
    </div>
  );
}
