// import SingleBlog from "@/components/Blog/SingleBlog";
// import blogData from "@/components/Blog/blogData";
// import Breadcrumb from "@/components/Common/Breadcrumb";
// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";
// import { Blog } from "@/types/blog";

// const getPostMetaData = () => {
//   const testf = "posts";
//   const dir = path.resolve("./public", testf);
//   const files = fs.readdirSync(dir);
//   const posts = files.map((filename) => {
//     const slug = filename.replace(".md", "");
//     const readFile = fs.readFileSync(`${dir}/${filename}`, "utf-8");
//     const { data: frontmatter } = matter(readFile);
//     return {
//       slug,
//       frontmatter: frontmatter as Blog,
//     };
//   });
//   return posts;
// };

// export default async function BlogPost() {
//   const data = getPostMetaData();
//   return (
//     <>
//       <Breadcrumb
//         pageName="Blog"
//         description="This is where I convey my thougts on what I'm learning, what I'm working on, how-to tutorials and new software and hardware technologies."
//       />

// <section className="pt-[120px] pb-[120px]">
//   <div className="container">
//     <div className="-mx-4 flex flex-wrap justify-center">
//       {data.map((blogpost) => (
//         <div
//           key={blogpost.slug}
//           className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
//         >
//           <SingleBlog blog={blogpost.frontmatter} />
//         </div>
//       ))}
//     </div>
//     <div
//       className="wow fadeInUp -mx-4 flex flex-wrap"
//       data-wow-delay=".15s"
//     >
//       <div className="w-full px-4">
//         <ul className="flex items-center justify-center pt-8">
//           <li className="mx-1">
//             <a
//               href="#0"
//               className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
//             >
//               Prev
//             </a>
//           </li>
//           <li className="mx-1">
//             <a
//               href="#0"
//               className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
//             >
//               1
//             </a>
//           </li>
//           <li className="mx-1">
//             <a
//               href="#0"
//               className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
//             >
//               2
//             </a>
//           </li>
//           <li className="mx-1">
//             <a
//               href="#0"
//               className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
//             >
//               3
//             </a>
//           </li>
//           <li className="mx-1">
//             <a className="flex h-9 min-w-[36px] cursor-not-allowed items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color">
//               ...
//             </a>
//           </li>
//           <li className="mx-1">
//             <a
//               href="#0"
//               className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
//             >
//               12
//             </a>
//           </li>
//           <li className="mx-1">
//             <a
//               href="#0"
//               className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
//             >
//               Next
//             </a>
//           </li>
//         </ul>
//       </div>
//     </div>
//   </div>
// </section>
//     </>
//   );
// }

import {
  getAllPosts,
  getAllAuthors,
  getAllTags,
  getAllCategories,
  searchAuthors,
  searchTags,
  searchCategories,
} from "@/lib/wordpress";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/pagination/page";

import { Section, Container, Prose } from "@/components/craft/page";
import { PostCard } from "@/components/post-card/page";
import { SearchInput } from "@/components/search-input/page";
import Breadcrumb from "@/components/Common/Breadcrumb";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Posts",
  description: "Browse all our blog posts",
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

  // Fetch data based on search parameters
  const [posts, authors, tags, categories] = await Promise.all([
    getAllPosts({ author, tag, category, search }),
    search ? searchAuthors(search) : getAllAuthors(),
    search ? searchTags(search) : getAllTags(),
    search ? searchCategories(search) : getAllCategories(),
  ]);

  // Handle pagination
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const postsPerPage = 9;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const paginatedPosts = posts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  // Create pagination URL helper
  const createPaginationUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (newPage > 1) params.set("page", newPage.toString());
    if (category) params.set("category", category);
    if (author) params.set("author", author);
    if (tag) params.set("tag", tag);
    if (search) params.set("search", search);
    return `/blog${params.toString() ? `?${params.toString()}` : ""}`;
  };

  return (
    <>
      <Breadcrumb
        pageName="Blog"
        description="This is where I convey my thougts on what I'm learning, what I'm working on, how-to tutorials and new software and hardware technologies."
      />
      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          <Prose>
            <p className="text-muted-foreground">
              {posts.length} {posts.length === 1 ? "post" : "posts"} found
              {search && " matching your search"}
            </p>
          </Prose>
          <div className="space-y-4">
            <SearchInput defaultValue={search} />
          </div>
          <br></br>
          <div className="-mx-4 flex flex-wrap justify-center">
            {paginatedPosts.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-4">
                {paginatedPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
                <p>No posts found</p>
              </div>
            )}

            {totalPages > 1 && (
              <Pagination>
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
                    <PaginationLink href={createPaginationUrl(page)}>
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
      </section>

      {/* <Section>
      <Container>
        <div className="space-y-8">
          <Prose>
            <p className="text-muted-foreground">
              {posts.length} {posts.length === 1 ? "post" : "posts"} found
              {search && " matching your search"}
            </p>
          </Prose>

          <div className="space-y-4">
            <SearchInput defaultValue={search} />
          </div>

          {paginatedPosts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-4">
              {paginatedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
              <p>No posts found</p>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination>
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
                  <PaginationLink href={createPaginationUrl(page)}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    className={
                      page >= totalPages ? "pointer-events-none opacity-50" : ""
                    }
                    href={createPaginationUrl(page + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </Container>
    </Section> */}
    </>
  );
}
