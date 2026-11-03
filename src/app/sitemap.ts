import type { MetadataRoute } from "next";

import { getBlogPosts } from "@/lib/blog";
import {
  getBlogPostUrl,
  getBlogPostUrls,
  getStaticPageUrls,
  type StaticPageKeyType,
} from "@/lib/page-metadata";
import { buildLanguageAlternates } from "@/lib/seo";
import { SUPPORTED_LOCALES } from "@/lib/types/i18n";

// Pravne stranice su `noindex` dok su skeleti (odluka vlasnika, 02.11.2026.), pa nisu ni ovde.
// TODO(feature 20): dodati "privacy" i "terms" kad stranice budu gotove.
const INDEXED_PAGES = [
  "home",
  "services",
  "servicesWeddings",
  "servicesRealEstate",
  "servicesEvents",
  "servicesPromo",
  "servicesFpv",
  "blog",
  "about",
  "contact",
] as const satisfies readonly StaticPageKeyType[];

// Sve stranice na oba jezika + objavljeni članci (`draft` ne ulazi u produkciju); svaki
// URL nosi hreflang ka prevodu. Blog lista je samo `/blog`, bez `?kategorija=` / `?strana=`.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = INDEXED_PAGES.flatMap((pageKey) => {
    const urls = getStaticPageUrls(pageKey);
    const languages = buildLanguageAlternates(urls);

    return SUPPORTED_LOCALES.map((locale) => ({ url: urls[locale], alternates: { languages } }));
  });

  const posts = (await Promise.all(SUPPORTED_LOCALES.map((locale) => getBlogPosts(locale)))).flat();
  const articles = await Promise.all(
    posts.map(async (post) => {
      const urls = await getBlogPostUrls(post);

      return {
        url: getBlogPostUrl(post.locale, post.slug),
        lastModified: post.date,
        alternates: { languages: buildLanguageAlternates(urls) },
      };
    })
  );

  return [...pages, ...articles];
}
