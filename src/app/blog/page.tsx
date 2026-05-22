import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/pagination/page";
import { PostCard } from "@/components/post-card/page";
import { SearchInput } from "@/components/search-input/page";
import { filterPosts, getAllPosts } from "@/lib/posts";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing — Blog | Elorm Dokosi",
  description:
    "Guides on data extraction APIs, web scraping, and automation.",
  alternates: { canonical: "https://elormdokosi.com/blog" },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    tag?: string;
    page?: string;
    search?: string;
  }>;
}) {
  const params = await searchParams;
  const { tag, page: pageParam, search } = params;

  const posts = filterPosts({ search, tag });
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const postsPerPage = 9;
  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage));
  const paginatedPosts = posts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage,
  );

  const apiPosts = getAllPosts().filter((p) => p.category === "APIs");
  const tags = Array.from(
    new Set(getAllPosts().flatMap((p) => p.tags)),
  ).sort();

  const createPaginationUrl = (newPage: number) => {
    const urlParams = new URLSearchParams();
    if (newPage > 1) urlParams.set("page", newPage.toString());
    if (tag) urlParams.set("tag", tag);
    if (search) urlParams.set("search", search);
    return `/blog${urlParams.toString() ? `?${urlParams.toString()}` : ""}`;
  };

  return (
    <div className="pt-24 pb-20 md:pt-28 md:pb-28">
      <div className="container">
        <header className="mb-10 max-w-3xl">
          <p className="label-mono mb-3 text-radar">Writing</p>
          <h1 className="heading-display text-4xl md:text-5xl">Writing</h1>
          <p className="mt-4 text-lg text-steel">
            How each extraction API works, when to use it, and what to expect
            from the Lab playground.
          </p>
        </header>

        <div className="mb-6 flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={`rounded border px-3 py-1 font-mono text-xs uppercase tracking-wider transition-colors ${
              !tag
                ? "border-radar/50 text-radar"
                : "border-[var(--color-border)] text-steel hover:text-radar"
            }`}
          >
            All ({getAllPosts().length})
          </Link>
          <Link
            href="/blog?tag=api"
            className={`rounded border px-3 py-1 font-mono text-xs uppercase tracking-wider transition-colors ${
              tag === "api"
                ? "border-radar/50 text-radar"
                : "border-[var(--color-border)] text-steel hover:text-radar"
            }`}
          >
            APIs ({apiPosts.length})
          </Link>
        </div>

        <div className="mb-8 max-w-md">
          <SearchInput defaultValue={search} />
        </div>

        {tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {tags.slice(0, 12).map((t) => (
              <Link
                key={t}
                href={`/blog?tag=${encodeURIComponent(t)}`}
                className="rounded border border-[var(--color-border)] px-2 py-0.5 font-mono text-[0.6rem] uppercase text-steel hover:border-radar/40 hover:text-radar"
              >
                {t}
              </Link>
            ))}
          </div>
        )}

        <p className="mb-8 font-mono text-xs text-steel">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
          {search ? " matching your search" : ""}
          {tag ? ` · tag: ${tag}` : ""}
        </p>

        {paginatedPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="card-lab flex h-32 items-center justify-center">
            <p className="text-steel">No posts found</p>
          </div>
        )}

        {totalPages > 1 && (
          <Pagination className="mt-12">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={
                    page <= 1 ? "pointer-events-none opacity-50" : ""
                  }
                  href={createPaginationUrl(page - 1)}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={createPaginationUrl(page)} isActive>
                  {page}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className={
                    page >= totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                  href={createPaginationUrl(page + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
