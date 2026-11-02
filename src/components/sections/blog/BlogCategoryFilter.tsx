import { useTranslations } from "next-intl";

import { cn } from "cn";

import type { BlogCategoryType } from "@/types/blog.type";

import { BLOG_CATEGORIES, BLOG_QUERY } from "@/constants/blog";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

interface IBlogCategoryFilterProps {
  active?: BlogCategoryType;
  className?: string;
}

// `after:` proširuje površinu za dodir na ≥ 44px bez menjanja izgleda pilule iz dizajna.
const PILL_CLASSES =
  "relative inline-flex items-center rounded-full border px-4 py-2 text-[0.9375rem] leading-tight transition-colors duration-150 after:absolute after:inset-x-0 after:-inset-y-1.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none";

// Pilule kategorija (artboard `2c`) — filter ide kroz `?kategorija=`, pa je URL deljiv.
// Izbor kategorije vraća listu na prvu stranu; na telefonu se pilule prelamaju u redove.
export function BlogCategoryFilter({ active, className }: IBlogCategoryFilterProps) {
  const t = useTranslations("blog");

  const items = [
    { id: "all", label: t("list.all"), category: undefined },
    ...BLOG_CATEGORIES.map((category) => ({
      id: category,
      label: t(`categories.${category}`),
      category,
    })),
  ];

  return (
    <nav aria-label={t("list.filtersLabel")} className={className}>
      <ul className="flex flex-wrap gap-x-2.5 gap-y-3">
        {items.map(({ id, label, category }) => {
          const isActive = category === active;

          return (
            <li key={id}>
              <Link
                href={
                  category
                    ? { pathname: ROUTES.blog, query: { [BLOG_QUERY.category]: category } }
                    : ROUTES.blog
                }
                scroll={false}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  PILL_CLASSES,
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-surface text-foreground hover:border-accent-gold hover:text-primary"
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
