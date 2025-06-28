import fs from "fs";
import path from "path";

// Add memoization to cache results
let cachedData: Record<string, any[]> | null = null;
let lastModified: number = 0;

export function loadDatasetCards() {
  const datasetsDir = path.join(process.cwd(), "/public/data_snippets");
  
  // Check if directory exists
  if (!fs.existsSync(datasetsDir)) {
    console.warn(`Datasets directory not found: ${datasetsDir}`);
    return {};
  }

  // Get directory modification time for cache invalidation
  const dirStats = fs.statSync(datasetsDir);
  const currentModified = dirStats.mtimeMs;

  // Return cached data if it exists and directory hasn't changed
  if (cachedData && lastModified === currentModified) {
    return cachedData;
  }

  const files = fs.readdirSync(datasetsDir);
  const categorized: Record<string, any[]> = {};

  for (const file of files) {
    try {
      // Skip non-JSON files
      if (!file.endsWith('.json')) {
        continue;
      }

      const [tableName, categoryWithExt] = file.split("|");
      
      // Skip malformed filenames
      if (!tableName || !categoryWithExt) {
        console.warn(`Skipping malformed filename: ${file}`);
        continue;
      }

      const category = categoryWithExt.replace(".json", "");
      const jsonPath = path.join(datasetsDir, file);
      
      // Check if file exists before reading
      if (!fs.existsSync(jsonPath)) {
        console.warn(`File not found: ${jsonPath}`);
        continue;
      }

      const fileContent = fs.readFileSync(jsonPath, "utf-8");
      
      // Validate JSON before parsing
      let jsonData;
      try {
        jsonData = JSON.parse(fileContent);
      } catch (parseError) {
        console.error(`Failed to parse JSON in file ${file}:`, parseError);
        continue;
      }

      // Limit the data size to prevent memory issues
      // Only keep first 10 items for preview
      const limitedData = Array.isArray(jsonData) ? jsonData.slice(0, 10) : jsonData;

      const card = {
        screenshotPath: `/data_screenshots/${tableName}.png`,
        jsonData: limitedData,
        website: tableName,
        totalRecords: Array.isArray(jsonData) ? jsonData.length : 1,
      };

      if (!categorized[category]) categorized[category] = [];
      categorized[category].push(card);
    } catch (error) {
      console.error(`Error processing file ${file}:`, error);
      continue;
    }
  }

  // Cache the results
  cachedData = categorized;
  lastModified = currentModified;

  return categorized;
}

// Function to clear cache (useful for development)
export function clearDatasetCache() {
  cachedData = null;
  lastModified = 0;
}
