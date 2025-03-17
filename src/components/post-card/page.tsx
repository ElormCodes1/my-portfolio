import Image from "next/image";
import Link from "next/link";

import { Post } from "../../lib/wordpress.d";
import { cn } from "@/lib/utils";

import {
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
} from "../../lib/wordpress";

export async function PostCard({ post }: { post: Post }) {
  const media = post.featured_media
    ? await getFeaturedMediaById(post.featured_media)
    : null;
  const author = post.author ? await getAuthorById(post.author) : null;
  const authorname = "Elorm Marrion Dokosi";
  const authordesignation = "Web Scraping & Python Automation";
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const category = post.categories?.[0]
    ? await getCategoryById(post.categories[0])
    : null;

  return (
    // <Link
    //   href={`/blog/${post.slug}`}
    //   className={cn(
    //     "border p-4 bg-accent/30 rounded-lg group flex justify-between flex-col not-prose gap-8",
    //     "hover:bg-accent/75 transition-all"
    //   )}
    // >
    //   <div className="flex flex-col gap-4">
    //     <div className="h-48 w-full overflow-hidden relative rounded-md border flex items-center justify-center bg-muted">
    //       {media?.source_url ? (
    //         <Image
    //           className="h-full w-full object-cover"
    //           src={media.source_url}
    //           alt={post.title?.rendered || "Post thumbnail"}
    //           width={400}
    //           height={200}
    //         />
    //       ) : (
    //         <div className="flex items-center justify-center w-full h-full text-muted-foreground">
    //           No image available
    //         </div>
    //       )}
    //     </div>
    //     <div
    //       dangerouslySetInnerHTML={{
    //         __html: post.title?.rendered || "Untitled Post",
    //       }}
    //       className="text-xl text-primary font-medium group-hover:underline decoration-muted-foreground underline-offset-4 decoration-dotted transition-all"
    //     ></div>
    //     <div
    //       className="text-sm"
    //       dangerouslySetInnerHTML={{
    //         __html: post.excerpt?.rendered
    //           ? post.excerpt.rendered.split(" ").slice(0, 12).join(" ").trim() +
    //             "..."
    //           : "No excerpt available",
    //       }}
    //     ></div>
    //   </div>

    //   <div className="flex flex-col gap-4">
    //     <hr />
    //     <div className="flex justify-between items-center text-xs">
    //       <p>{category?.name || "Uncategorized"}</p>
    //       <p>{date}</p>
    //     </div>
    //   </div>

    <div
      className="wow fadeInUp relative overflow-hidden rounded-md bg-white shadow-one dark:bg-dark"
      data-wow-delay=".1s"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="relative block h-[220px] w-full"
      >
        <span className="absolute top-6 right-6 z-20 inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-sm font-semibold capitalize text-white">
          {category?.name || "Uncategorized"}
        </span>
        {media?.source_url ? (
          <Image
            className="h-full w-full object-cover"
            src={media.source_url}
            alt={post.title?.rendered || "Post thumbnail"}
            width={400}
            height={200}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-muted-foreground">
            No image available
          </div>
        )}
      </Link>
      <div className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
        <h3>
          <Link
            href={`/blog/${post.slug}`}
            className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
          >
            {post.slug}
          </Link>
        </h3>
        <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{
              __html: post.excerpt?.rendered
                ? post.excerpt.rendered
                    .split(" ")
                    .slice(0, 12)
                    .join(" ")
                    .trim() + "..."
                : "No excerpt available",
            }}
          ></div>
        </p>
        <div className="flex items-center">
          <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
            <div className="mr-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image src={"/images/me/elorm.jpg"} alt="author" fill />
              </div>
            </div>
            <div className="w-full">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                By {authorname}
              </h4>
              <p className="text-xs text-body-color">{authordesignation}</p>
            </div>
          </div>
          <div className="inline-block">
            <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
              Date
            </h4>
            <p className="text-xs text-body-color">{date}</p>
          </div>
        </div>
      </div>
    </div>
    // </Link>
  );
}
