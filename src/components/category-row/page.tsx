import JsonScreenshotViewer from "../data-card/page";

type SiteData = {
  screenshotPath: string;
  jsonData: object;
  website: string;
};

type CategoryRowProps = {
  title: string;
  sites: SiteData[];
};

export default function CategoryRow({ title, sites }: CategoryRowProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex overflow-x-auto space-x-6 pb-4">
        {sites.map((site, index) => (
          <div
            key={index}
            className="min-w-[90vw] lg:min-w-[70vw] rounded-xl shadow-md"
          >
            <JsonScreenshotViewer
              jsonData={site.jsonData}
              screenshotPath={site.screenshotPath}
              website={site.website}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
