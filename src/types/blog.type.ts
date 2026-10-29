import type { Locale } from "@/lib/types/i18n";

import type { BLOG_CATEGORIES } from "@/constants/blog";

export type BlogCategoryType = (typeof BLOG_CATEGORIES)[number];

// Frontmatter MDX članka (poglavlje 13); vreme čitanja se ne upisuje, računa se iz teksta.
export type BlogFrontmatterType = {
  title: string;
  description: string;
  /** `YYYY-MM-DD` */
  date: string;
  slug: string;
  /** Putanja slike u `public/` (npr. `/blog/naslovna.jpg`); bez nje ide placeholder. */
  cover?: string;
  tags: BlogCategoryType[];
  draft: boolean;
};

export type BlogPostType = BlogFrontmatterType & {
  /** Naziv fajla bez `.mdx` — isti u `sr/` i `en/`, povezuje prevode istog članka. */
  key: string;
  locale: Locale;
  readingMinutes: number;
  /** MDX tekst bez frontmattera. */
  source: string;
};
