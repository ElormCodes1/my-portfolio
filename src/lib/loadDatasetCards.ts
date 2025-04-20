import fs from "fs";
import path from "path";

export function loadDatasetCards() {
  // const datasetsDir = path.join(process.cwd(), "data", "datasets");
  const datasetsDir = path.join(process.cwd(), "/public/data_snippets");
  const files = fs.readdirSync(datasetsDir);

  const categorized: Record<string, any[]> = {};

  for (const file of files) {
    const [tableName, categoryWithExt] = file.split("|");
    const category = categoryWithExt.replace(".json", "");
    const jsonPath = path.join(datasetsDir, file);
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    const card = {
      screenshotPath: `/data_screenshots/${tableName}.png`,
      jsonData,
      website: tableName,
    };

    if (!categorized[category]) categorized[category] = [];
    categorized[category].push(card);
  }

  return categorized;
}
