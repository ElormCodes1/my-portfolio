import { MetadataRoute } from "next";
import { apiProducts } from "@/lib/apis-data";
import { caseStudies } from "@/lib/work-data";
import { SITE_URL } from "@/lib/structured-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/lab`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/lab/explorer`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];

  const workPages = caseStudies.map((study) => ({
    url: `${SITE_URL}/work/${study.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const apiPages = apiProducts.map((api) => ({
    url: `${SITE_URL}/apis/${api.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const { getAllPosts } = await import("@/lib/wordpress");
    const posts = await getAllPosts();
    blogPages = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.modified || post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    blogPages = [];
  }

  return [...staticPages, ...workPages, ...apiPages, ...blogPages];
}
