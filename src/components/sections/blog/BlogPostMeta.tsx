import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "cn";

import { formatLongDate, fromIsoDate } from "@/lib/date";
import type { BlogPostType } from "@/types/blog.type";

interface IBlogPostMetaProps {
  post: Pick<BlogPostType, "tags" | "date" | "readingMinutes">;
  /** Vreme čitanja — po dizajnu na istaknutoj kartici i na stranici članka. */
  showReadingTime?: boolean;
  className?: string;
}

// Meta red: kategorija · datum · vreme čitanja. Kategorija je zelena, ne zlatna kao u
// dizajnu — zlatna na beloj nema dovoljan kontrast za sitan tekst (odluka vlasnika).
export function BlogPostMeta({ post, showReadingTime = false, className }: IBlogPostMetaProps) {
  const locale = useLocale();
  const t = useTranslations("blog");
  const [category] = post.tags;

  const items: { id: string; content: ReactNode }[] = [];

  if (category) {
    items.push({
      id: "category",
      content: <span className="text-primary">{t(`categories.${category}`)}</span>,
    });
  }

  items.push({
    id: "date",
    content: <time dateTime={post.date}>{formatLongDate(fromIsoDate(post.date), locale)}</time>,
  });

  if (showReadingTime) {
    items.push({
      id: "readingTime",
      content: <span>{t("meta.readingTime", { minutes: post.readingMinutes })}</span>,
    });
  }

  return (
    <p className={cn("flex flex-wrap gap-x-3 gap-y-1 text-muted-foreground", className)}>
      {items.map(({ id, content }, index) => (
        // Separator ide uz prethodnu stavku, pa pri prelomu nikad ne počinje novi red.
        <span key={id} className="inline-flex gap-x-3">
          {content}
          {index < items.length - 1 ? <span aria-hidden="true">·</span> : null}
        </span>
      ))}
    </p>
  );
}
