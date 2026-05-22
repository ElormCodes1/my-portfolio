import DatasetCard from "./DatasetCard";

type SiteData = {
  screenshotPath: string;
  jsonData: object;
  website: string;
  totalRecords?: number;
};

type CategoryRowProps = {
  title: string;
  sites: SiteData[];
};

export default function CategoryRow({ title, sites }: CategoryRowProps) {
  return (
    <div className="mb-10">
      <h2 className="heading-display mb-4 text-2xl">{title}</h2>
      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory [scrollbar-width:thin]">
        {sites.map((site) => (
          <div key={site.website} className="snap-start">
            <DatasetCard
              website={site.website}
              jsonData={site.jsonData}
              totalRecords={site.totalRecords}
              explorerHref={`/lab/explorer?dataset=${encodeURIComponent(site.website)}`}
              lineageHref={`/lab/datasets/${encodeURIComponent(site.website)}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
