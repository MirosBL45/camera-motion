import { cache } from "react";
import { getFrontmatter } from "next-mdx-remote-client/utils";

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

import { sortPostsByDate } from "@/lib/blog-list";
import { getReadingMinutes } from "@/lib/reading-time";
import { type Locale, SUPPORTED_LOCALES } from "@/lib/types/i18n";
import type { BlogPostType } from "@/types/blog.type";

import { BLOG_CATEGORIES } from "@/constants/blog";

// Članci žive u repou: `src/content/blog/{sr,en}/*.mdx` (poglavlje 13). Isti naziv fajla
// u oba foldera = isti članak na dva jezika; en verzija je opciona.
const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

const frontmatterSchema = z
  .object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    date: z.iso.date(),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    cover: z.string().startsWith("/").optional(),
    tags: z.array(z.enum(BLOG_CATEGORIES)).default([]),
    draft: z.boolean(),
  })
  .strict();

/** Frontmatter + tekst jednog fajla; pogrešan frontmatter ruši build sa nazivom fajla. */
export function parseBlogPost(key: string, locale: Locale, raw: string): BlogPostType {
  const { frontmatter, strippedSource } = getFrontmatter(raw);
  const result = frontmatterSchema.safeParse(frontmatter);

  if (!result.success) {
    throw new Error(
      `[blog] Neispravan frontmatter u ${locale}/${key}.mdx: ${z.prettifyError(result.error)}`
    );
  }

  return {
    ...result.data,
    key,
    locale,
    readingMinutes: getReadingMinutes(strippedSource),
    source: strippedSource,
  };
}

/** `draft: true` se vidi samo u developmentu — ne izlazi u produkciju. */
export function isPublished(post: Pick<BlogPostType, "draft">): boolean {
  return !post.draft || process.env.NODE_ENV === "development";
}

async function readLocalePosts(locale: Locale): Promise<BlogPostType[]> {
  const dir = path.join(BLOG_DIR, locale);
  const files = (await readdir(dir)).filter((file) => file.endsWith(".mdx"));

  const posts = await Promise.all(
    files.map(async (file) =>
      parseBlogPost(
        file.replace(/\.mdx$/, ""),
        locale,
        await readFile(path.join(dir, file), "utf8")
      )
    )
  );

  const slugs = new Set<string>();
  for (const post of posts) {
    if (slugs.has(post.slug)) {
      throw new Error(`[blog] Slug „${post.slug}" se ponavlja u ${locale}/ člancima`);
    }
    slugs.add(post.slug);
  }

  return posts;
}

/** Objavljeni članci jednog jezika, od najnovijeg. */
export const getBlogPosts = cache(async (locale: Locale): Promise<BlogPostType[]> => {
  const posts = await readLocalePosts(locale);

  return sortPostsByDate(posts.filter(isPublished));
});

export async function getBlogPostBySlug(
  locale: Locale,
  slug: string
): Promise<BlogPostType | undefined> {
  return (await getBlogPosts(locale)).find((post) => post.slug === slug);
}

export async function getBlogPostByKey(
  locale: Locale,
  key: string
): Promise<BlogPostType | undefined> {
  return (await getBlogPosts(locale)).find((post) => post.key === key);
}

/**
 * Slug koji pripada drugom jeziku (npr. SR/EN prekidač na članku zadrži slug) → slug
 * prevoda istog članka na `locale`. `null` znači da članak postoji, ali bez prevoda;
 * `undefined` da takav slug ne postoji nigde.
 */
export async function findTranslatedSlug(
  locale: Locale,
  slug: string
): Promise<string | null | undefined> {
  for (const otherLocale of SUPPORTED_LOCALES) {
    if (otherLocale === locale) continue;

    const original = await getBlogPostBySlug(otherLocale, slug);
    if (original) {
      return (await getBlogPostByKey(locale, original.key))?.slug ?? null;
    }
  }

  return undefined;
}
