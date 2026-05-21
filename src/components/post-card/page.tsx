import Image from "next/image";
import Link from "next/link";
import { Post } from "../../lib/wordpress.d";
import {
  getPostCategoryName,
  getPostFeaturedImage,
} from "@/lib/wordpress-embed";

export function PostCard({ post }: { readonly post: Post }) {
  const imageUrl = getPostFeaturedImage(post);
  const categoryName = getPostCategoryName(post);
  const title = post.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const excerptHtml = post.excerpt?.rendered
    ? post.excerpt.rendered.split(" ").slice(0, 18).join(" ").trim() + "…"
    : "No excerpt available";

  return (
    <article className="card-lab flex h-full flex-col overflow-hidden">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-ink-muted"
      >
        {imageUrl ? (
          <Image
            className="h-full w-full object-cover"
            src={imageUrl}
            alt={post.title?.rendered?.replace(/<[^>]*>/g, "") || "Post thumbnail"}
            width={400}
            height={250}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-xs text-steel">
            No image
          </div>
        )}
        <span className="absolute right-3 top-3 rounded border border-[var(--color-border)] bg-ink/90 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-radar backdrop-blur-sm">
          {categoryName || "Writing"}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <time className="font-mono text-[0.65rem] uppercase tracking-wider text-steel">
          {date}
        </time>
        <h3 className="heading-display mt-2 text-lg leading-snug">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-radar"
          >
            {title}
          </Link>
        </h3>
        <div
          className="mt-3 flex-1 text-sm text-steel line-clamp-3"
          dangerouslySetInnerHTML={{ __html: excerptHtml }}
        />
        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 font-mono text-xs uppercase tracking-wider text-radar hover:text-frost"
        >
          Read →
        </Link>
      </div>
    </article>
  );
}
