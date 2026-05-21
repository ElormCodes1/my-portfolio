import type { Post } from "./wordpress.d";

type EmbeddedTerm = {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
};

type PostWithEmbed = Post & {
  _embedded?: {
    author?: Array<{ name?: string }>;
    "wp:featuredmedia"?: Array<{ source_url?: string }>;
    "wp:term"?: EmbeddedTerm[][];
  };
};

export function getPostFeaturedImage(post: Post): string | null {
  const embedded = (post as PostWithEmbed)._embedded?.["wp:featuredmedia"]?.[0];
  return embedded?.source_url ?? null;
}

export function getPostCategoryName(post: Post): string | null {
  const terms = (post as PostWithEmbed)._embedded?.["wp:term"]?.[0];
  const category = terms?.find((term) => term.taxonomy === "category");
  return category?.name ?? null;
}

export function getPostAuthorName(post: Post): string | null {
  const author = (post as PostWithEmbed)._embedded?.author?.[0];
  return author?.name ?? null;
}
