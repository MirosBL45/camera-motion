import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { getBlogPostByKey } from "@/lib/blog";
import {
  buildLanguageAlternates,
  getAlternateOgLocales,
  type LocalizedUrlsType,
  OG_LOCALE_MAP,
  toAbsoluteUrl,
} from "@/lib/seo";
import { type Locale, SUPPORTED_LOCALES } from "@/lib/types/i18n";
import type { BlogPostType } from "@/types/blog.type";

import { ROUTES } from "@/constants/routes";
import { OG_IMAGE } from "@/constants/seo";
import { getPathname } from "@/i18n/navigation";

/** Stranice sa fiksnom putanjom — ključ je isti u `ROUTES` i u `metadata` namespace-u. */
export type StaticPageKeyType = Exclude<keyof typeof ROUTES, "blogPost">;

/** Apsolutni URL stranice na svakom jeziku, po lokalizovanim putanjama iz tabele 7.1. */
export function getStaticPageUrls(pageKey: StaticPageKeyType): Record<Locale, string> {
  const urlFor = (locale: Locale) => toAbsoluteUrl(getPathname({ locale, href: ROUTES[pageKey] }));

  return { sr: urlFor("sr"), en: urlFor("en") };
}

export function getBlogPostUrl(locale: Locale, slug: string): string {
  return toAbsoluteUrl(
    getPathname({ locale, href: { pathname: ROUTES.blogPost, params: { slug } } })
  );
}

/** URL članka na svakom jeziku na kom postoji — prevod se povezuje preko naziva fajla (`key`). */
export async function getBlogPostUrls(
  post: Pick<BlogPostType, "key" | "locale" | "slug">
): Promise<LocalizedUrlsType> {
  const entries = await Promise.all(
    SUPPORTED_LOCALES.map(async (locale) => {
      const translation = locale === post.locale ? post : await getBlogPostByKey(locale, post.key);

      return translation ? ([locale, getBlogPostUrl(locale, translation.slug)] as const) : null;
    })
  );

  return Object.fromEntries(entries.filter((entry) => entry !== null));
}

interface IPageMetadataInput {
  locale: Locale;
  title: string;
  description: string;
  urls: LocalizedUrlsType;
  /** Stranica se ne indeksira (npr. pravne stranice dok su skeleti). */
  noIndex?: boolean;
  /** Članak bloga: `og:type=article` sa datumom objave. */
  publishedTime?: string;
}

/** Title, description, canonical, hreflang i Open Graph za jednu stranicu (poglavlje 14). */
export async function buildPageMetadata(input: IPageMetadataInput): Promise<Metadata> {
  const { locale, title, description, urls, noIndex, publishedTime } = input;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const canonical = urls[locale];

  return {
    title,
    description,
    alternates: { canonical, languages: buildLanguageAlternates(urls) },
    // Postavljanje `openGraph` na stranici zamenjuje ceo objekat iz layout-a, pa ide kompletan.
    openGraph: {
      ...(publishedTime ? { type: "article", publishedTime } : { type: "website" }),
      siteName: t("siteName"),
      title,
      description,
      url: canonical,
      locale: OG_LOCALE_MAP[locale],
      alternateLocale: getAlternateOgLocales(locale, urls),
      images: [
        {
          url: toAbsoluteUrl(OG_IMAGE.path),
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: { card: "summary_large_image" },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Metadata stranice sa fiksnom putanjom; tekstovi iz `metadata.{pageKey}`. */
export async function getStaticPageMetadata(
  pageKey: StaticPageKeyType,
  options: { noIndex?: boolean } = {}
): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "metadata" });

  return buildPageMetadata({
    locale,
    title: t(`${pageKey}.title`),
    description: t(`${pageKey}.description`),
    urls: getStaticPageUrls(pageKey),
    noIndex: options.noIndex,
  });
}
