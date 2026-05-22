import MarkdownContent from "@/components/Blog/MarkdownContent";
import NewsLatterBox from "@/components/Contact/NewsLatterBox";
import JsonLd from "@/components/seo/JsonLd";
import {
  getPostBySlug,
  getPostSlugs,
  getRelatedPosts,
} from "@/lib/posts";
import { getApiById } from "@/lib/apis-data";
import {
  blogPostSchema,
  breadcrumbSchema,
  SITE_URL,
} from "@/lib/structured-data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Writing`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
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
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const related = getRelatedPosts(slug);
  const api = post.relatedApi ? getApiById(post.relatedApi) : undefined;

  return (
    <>
      <JsonLd
        data={[
          blogPostSchema({
            title: post.title,
            description: post.excerpt,
            slug,
            datePublished: post.date,
            image: post.image,
          }),
          breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Writing", url: `${SITE_URL}/blog` },
            { name: post.title, url: `${SITE_URL}/blog/${slug}` },
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
                <span className="font-mono text-xs uppercase tracking-wider text-radar">
                  {post.category}
                </span>
                <h1 className="heading-display mt-2 text-3xl md:text-4xl lg:text-5xl">
                  {post.title}
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
                      <p className="text-sm font-medium text-frost">
                        Elorm Marrion Dokosi
                      </p>
                      <p className="font-mono text-xs text-steel">{date}</p>
                    </div>
                  </div>
                  {post.icon && (
                    <span className="text-2xl" aria-hidden="true">
                      {post.icon}
                    </span>
                  )}
                </div>
                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-[var(--color-border)] px-2 py-0.5 font-mono text-[0.6rem] uppercase text-steel"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {post.image && (
                <div className="mb-8 overflow-hidden rounded-lg border border-[var(--color-border)]">
                  <Image
                    src={post.image}
                    alt=""
                    width={1200}
                    height={630}
                    className="w-full object-cover"
                    priority
                  />
                </div>
              )}

              <MarkdownContent content={post.content} />
            </article>

            <aside className="space-y-6">
              {api && (
                <div className="card-lab p-5">
                  <h3 className="label-mono mb-3">Try this API</h3>
                  <p className="text-sm text-steel">{api.description}</p>
                  <div className="mt-4 space-y-2">
                    <Link
                      href={`/apis/${api.id}`}
                      className="btn-primary block text-center"
                    >
                      API reference
                    </Link>
                    <Link
                      href={`/lab#playground`}
                      className="btn-ghost block text-center text-[0.65rem]"
                    >
                      Open playground
                    </Link>
                  </div>
                </div>
              )}

              {related.length > 0 && (
                <div className="card-lab p-5">
                  <h3 className="label-mono mb-4">Related</h3>
                  <ul className="space-y-4">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={`/blog/${r.slug}`}
                          className="block text-sm text-frost transition-colors hover:text-radar"
                        >
                          {r.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <NewsLatterBox />
              <div className="card-lab p-5">
                <h3 className="label-mono mb-2">Need a custom pipeline?</h3>
                <p className="text-sm text-steel">
                  I build datasets and APIs for teams that outgrow one-off scripts.
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
