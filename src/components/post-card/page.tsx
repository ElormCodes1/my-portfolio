import Image from "next/image";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/posts";

export function PostCard({ post }: { readonly post: BlogPostMeta }) {
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="card-lab flex h-full flex-col overflow-hidden">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-ink-muted"
      >
        {post.image ? (
          <Image
            className="h-full w-full object-cover"
            src={post.image}
            alt=""
            width={400}
            height={250}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-6">
            {post.icon && (
              <span className="text-4xl" aria-hidden="true">
                {post.icon}
              </span>
            )}
            <span className="font-mono text-[0.65rem] uppercase tracking-wider text-steel">
              {post.category}
            </span>
          </div>
        )}
        <span className="absolute right-3 top-3 rounded border border-[var(--color-border)] bg-ink/90 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-radar backdrop-blur-sm">
          {post.category}
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
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm text-steel line-clamp-3">{post.excerpt}</p>
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
