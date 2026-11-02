import type { BlogCategoryType, BlogPostType } from "@/types/blog.type";

import { BLOG_CATEGORIES, BLOG_FIRST_PAGE_SIZE, BLOG_PAGE_STEP } from "@/constants/blog";

export function isBlogCategory(value: unknown): value is BlogCategoryType {
  return typeof value === "string" && (BLOG_CATEGORIES as readonly string[]).includes(value);
}

/** `?kategorija=` — nepoznata ili višestruka vrednost znači „Sve". */
export function parseBlogCategory(value: unknown): BlogCategoryType | undefined {
  return isBlogCategory(value) ? value : undefined;
}

/** `?strana=` — ceo broj od 1 do 9999; sve ostalo je prva strana. */
export function parseBlogPage(value: unknown): number {
  return typeof value === "string" && /^[1-9]\d{0,3}$/.test(value) ? Number(value) : 1;
}

/** Koliko članaka (uključujući istaknut) lista prikazuje na datoj strani. */
export function getVisibleCount(page: number): number {
  return BLOG_FIRST_PAGE_SIZE + (page - 1) * BLOG_PAGE_STEP;
}

/** Od najnovijeg ka najstarijem; datumi su `YYYY-MM-DD`, pa je poređenje stringova tačno. */
export function sortPostsByDate<T extends Pick<BlogPostType, "date">>(posts: T[]): T[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

type BlogListPageType<T> = {
  featured?: T;
  rest: T[];
  hasMore: boolean;
  nextPage: number;
};

/**
 * Lista za `/blog`: filtrira po kategoriji (članak sa više `tags` je u svakoj), izdvaja
 * najnoviji kao istaknut i seče ostatak po strani. Očekuje članke već sortirane po datumu.
 */
export function getBlogListPage<T extends Pick<BlogPostType, "tags">>(
  posts: T[],
  { category, page }: { category?: BlogCategoryType; page: number }
): BlogListPageType<T> {
  const filtered = category ? posts.filter((post) => post.tags.includes(category)) : posts;
  const visibleCount = getVisibleCount(page);
  const [featured, ...rest] = filtered.slice(0, visibleCount);

  return {
    featured,
    rest,
    hasMore: filtered.length > visibleCount,
    nextPage: page + 1,
  };
}
