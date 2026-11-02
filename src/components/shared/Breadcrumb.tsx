import { useTranslations } from "next-intl";

import { ChevronRight } from "lucide-react";

import type { AppRoute } from "@/types/routes.type";

import { Link } from "@/i18n/navigation";

interface IBreadcrumbProps {
  parent: { label: string; href: Exclude<AppRoute, "/blog/[slug]"> };
  /** Naziv trenutne stranice — poslednja stavka, bez linka. */
  current: string;
}

// Putanja iznad naslova (dizajn referenca, artboardi `1b` i `2a`): stranice usluga i članci bloga.
export function Breadcrumb({ parent, current }: IBreadcrumbProps) {
  const t = useTranslations("nav");

  return (
    <nav aria-label={t("breadcrumbLabel")}>
      <ol className="flex flex-wrap items-center gap-1 text-base text-muted-foreground">
        <li>
          <Link
            href={parent.href}
            className="rounded-sm hover:text-accent-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            {parent.label}
          </Link>
        </li>
        <li aria-hidden="true" className="flex items-center">
          <ChevronRight className="size-4" />
        </li>
        <li aria-current="page" className="text-foreground">
          {current}
        </li>
      </ol>
    </nav>
  );
}
