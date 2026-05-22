import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogPostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  category: string;
  relatedApi?: string;
  icon?: string;
  image?: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

const postsDir = path.join(process.cwd(), "content/blog");

function parseFile(filename: string): BlogPostMeta {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(postsDir, filename), "utf-8");
  const { data, content } = matter(raw);

  const excerpt =
    typeof data.paragraph === "string"
      ? data.paragraph
      : content
          .replace(/[#>*_`\[\]()]/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 180) + "…";

  return {
    slug,
    title: String(data.title ?? slug),
    excerpt,
    date: String(data.publishDate ?? "2020-01-01"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    category: String(data.category ?? "Writing"),
    relatedApi:
      typeof data.relatedApi === "string" ? data.relatedApi : undefined,
    icon: typeof data.icon === "string" ? data.icon : undefined,
    image: typeof data.image === "string" ? data.image : undefined,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(postsDir)) return [];

  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map(parseFile)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const meta = parseFile(`${slug}.md`);

  return { ...meta, content };
}

export function filterPosts(options?: {
  search?: string;
  tag?: string;
}): BlogPostMeta[] {
  let posts = getAllPosts();

  if (options?.tag) {
    const tag = options.tag.toLowerCase();
    posts = posts.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === tag),
    );
  }

  if (options?.search) {
    const q = options.search.toLowerCase();
    posts = posts.filter((p) => {
      const post = getPostBySlug(p.slug);
      const body = post?.content.toLowerCase() ?? "";
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        body.includes(q)
      );
    });
  }

  return posts;
}

export function getRelatedPosts(slug: string, limit = 3): BlogPostMeta[] {
  const current = getAllPosts().find((p) => p.slug === slug);
  if (!current) return [];

  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .filter(
      (p) =>
        p.category === current.category ||
        p.tags.some((t) => current.tags.includes(t)),
    )
    .slice(0, limit);
}
