import { getAllPosts, WordPressAPIError } from "../../lib/wordpress";
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
import type { Post } from "../../lib/wordpress.d";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing — Blog | Elorm Dokosi",
  description:
    "Notes on web scraping, data acquisition, automation, and building in public.",
  alternates: { canonical: "https://elormdokosi.com/blog" },
};

export const dynamic = "auto";
export const revalidate = 600;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    author?: string;
    tag?: string;
    category?: string;
    page?: string;
    search?: string;
  }>;
}) {
  const params = await searchParams;
  const { author, tag, category, page: pageParam, search } = params;

  let posts: Post[] = [];
  let fetchError: string | null = null;

  try {
    posts = await getAllPosts({ author, tag, category, search });
  } catch (error) {
    if (error instanceof WordPressAPIError) {
      fetchError =
        error.status === 503
          ? "The blog is temporarily unavailable. Please try again in a few minutes."
          : "Could not load posts right now. Please try again later.";
    } else {
      fetchError = "Could not load posts right now. Please try again later.";
    }
  }

  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const postsPerPage = 9;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const paginatedPosts = posts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage,
  );

  const createPaginationUrl = (newPage: number) => {
    const urlParams = new URLSearchParams();
    if (newPage > 1) urlParams.set("page", newPage.toString());
    if (category) urlParams.set("category", category);
    if (author) urlParams.set("author", author);
    if (tag) urlParams.set("tag", tag);
    if (search) urlParams.set("search", search);
    return `/blog${urlParams.toString() ? `?${urlParams.toString()}` : ""}`;
  };

  return (
    <div className="pt-24 pb-20 md:pt-28 md:pb-28">
      <div className="container">
        <header className="mb-10 max-w-3xl">
          <p className="label-mono mb-3 text-radar">Writing</p>
          <h1 className="heading-display text-4xl md:text-5xl">Blog</h1>
          <p className="mt-4 text-lg text-steel">
            What I&apos;m learning, building, and shipping — scraping, data, and
            tools for engineers.
          </p>
        </header>

        <div className="mb-8 max-w-md">
          <SearchInput defaultValue={search} />
        </div>

        {fetchError ? (
          <div className="card-lab flex min-h-32 flex-col items-center justify-center gap-2 p-8 text-center">
            <p className="text-frost">{fetchError}</p>
            <p className="font-mono text-xs text-steel">
              WordPress API unreachable
            </p>
          </div>
        ) : (
          <>
            <p className="mb-8 font-mono text-xs text-steel">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
              {search ? " matching your search" : ""}
            </p>

            {paginatedPosts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
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
          </>
        )}
      </div>
    </div>
  );
}
