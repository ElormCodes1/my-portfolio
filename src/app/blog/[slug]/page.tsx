import { getPostBySlug, getAllPosts } from "../../../lib/wordpress";
import {
  getPostAuthorName,
  getPostCategoryName,
  getPostFeaturedImage,
} from "@/lib/wordpress-embed";
import NewsLatterBox from "@/components/Contact/NewsLatterBox";
import JsonLd from "@/components/seo/JsonLd";
import Image from "next/image";
import Link from "next/link";
import {
  blogPostSchema,
  breadcrumbSchema,
  SITE_URL,
} from "@/lib/structured-data";
import type { Metadata } from "next";
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const description = post.excerpt.rendered.replace(/<[^>]*>/g, "").trim();
  return {
    title: `${post.title.rendered.replace(/<[^>]*>/g, "")} | Writing`,
    description,
    openGraph: {
      title: post.title.rendered.replace(/<[^>]*>/g, ""),
      description,
      type: "article",
      url: `https://elormdokosi.com/blog/${post.slug}`,
    },
  };
}

export default async function Page({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const featuredMedia = getPostFeaturedImage(post);
  const authorName = getPostAuthorName(post) ?? "Elorm Dokosi";
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const categoryName = getPostCategoryName(post);

  let relatedPosts: Awaited<ReturnType<typeof getAllPosts>> = [];
  try {
    const all = await getAllPosts();
    relatedPosts = all.filter((p) => p.slug !== slug).slice(0, 3);
  } catch {
    relatedPosts = [];
  }

  const plainTitle = title;
  const description = post.excerpt.rendered.replace(/<[^>]*>/g, "").trim();

  return (
    <>
      <JsonLd
        data={[
          blogPostSchema({
            title: plainTitle,
            description,
            slug,
            datePublished: post.date,
            image: featuredMedia ?? undefined,
          }),
          breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Writing", url: `${SITE_URL}/blog` },
            { name: plainTitle, url: `${SITE_URL}/blog/${slug}` },
          ]),
        ]}
      />
      <div className="pt-24 pb-20 md:pt-28 md:pb-28">
      <div className="container">
        <Link
          href="/blog"
          className="label-mono mb-6 inline-block text-radar hover:text-frost"
        >
          ← All writing
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <article className="min-w-0">
            <header className="mb-8 max-w-3xl">
              {categoryName && (
                <span className="font-mono text-xs uppercase tracking-wider text-radar">
                  {categoryName}
                </span>
              )}
              <h1 className="heading-display mt-2 text-3xl md:text-4xl lg:text-5xl">
                {title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-[var(--color-border)] pb-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[var(--color-border)]">
                    <Image
                      src="/images/me/elorm.jpg"
                      alt="Elorm Dokosi"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-frost">{authorName}</p>
                    <p className="font-mono text-xs text-steel">{date}</p>
                  </div>
                </div>
              </div>
            </header>

            {featuredMedia && (
              <div className="mb-8 overflow-hidden rounded-lg border border-[var(--color-border)]">
                <Image
                  src={featuredMedia}
                  alt=""
                  width={1200}
                  height={630}
                  className="w-full object-cover"
                  priority
                />
              </div>
            )}

            <div
              className="prose-lab max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </article>

          <aside className="space-y-6">
            {relatedPosts.length > 0 && (
              <div className="card-lab p-5">
                <h3 className="label-mono mb-4">Related</h3>
                <ul className="space-y-4">
                  {relatedPosts.map((related) => (
                    <li key={related.id}>
                      <Link
                        href={`/blog/${related.slug}`}
                        className="block text-sm text-frost transition-colors hover:text-radar"
                      >
                        {related.slug
                          .split("-")
                          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                          .join(" ")}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <NewsLatterBox />
            <div className="card-lab p-5">
              <h3 className="label-mono mb-2">Building something?</h3>
              <p className="text-sm text-steel">
                Need scraping or an API — let&apos;s talk.
              </p>
              <Link href="/contact" className="btn-primary mt-4 inline-flex">
                Contact
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
    </>
  );
}
