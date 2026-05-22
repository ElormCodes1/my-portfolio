import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ChangelogEntry = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
};

const changelogDir = path.join(process.cwd(), "content/changelog");

export function getChangelogEntries(): ChangelogEntry[] {
  if (!fs.existsSync(changelogDir)) return [];

  return fs
    .readdirSync(changelogDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(changelogDir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title ?? file),
        date: String(data.date ?? "2026-01-01"),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        content: content.trim(),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
