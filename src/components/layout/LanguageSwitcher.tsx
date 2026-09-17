"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "cn";

import { LOCALE_LABELS, SUPPORTED_LOCALES } from "@/lib/types/i18n";

import { Link, usePathname } from "@/i18n/navigation";

interface ILanguageSwitcherProps {
  className?: string;
}

const PILL_CLASSES =
  "relative rounded-md border px-2 py-0.75 text-sm leading-none after:absolute after:inset-x-0 after:-inset-y-2.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none";

export function LanguageSwitcher({ className }: ILanguageSwitcherProps) {
  const t = useTranslations("nav");
  const activeLocale = useLocale();
  const pathname = usePathname();
  const params = useParams();

  return (
    <ul aria-label={t("languageLabel")} className={cn("flex items-center gap-1.5", className)}>
      {SUPPORTED_LOCALES.map((locale) => {
        if (locale === activeLocale) {
          return (
            <li key={locale}>
              <span
                aria-current="true"
                lang={locale}
                title={t(`languages.${locale}`)}
                className={cn(
                  PILL_CLASSES,
                  "inline-block border-border bg-surface-warm font-semibold text-foreground"
                )}
              >
                {LOCALE_LABELS[locale]}
              </span>
            </li>
          );
        }

        // Ista stranica na drugom jeziku — interni pathname + params, Link sam daje lokalizovan segment
        return (
          <li key={locale}>
            <Link
              // @ts-expect-error -- params trenutne rute odgovaraju pathname-u (next-intl preporučeni obrazac)
              href={{ pathname, params }}
              locale={locale}
              hrefLang={locale}
              lang={locale}
              aria-label={t(`languages.${locale}`)}
              className={cn(
                PILL_CLASSES,
                "inline-block border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {LOCALE_LABELS[locale]}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
