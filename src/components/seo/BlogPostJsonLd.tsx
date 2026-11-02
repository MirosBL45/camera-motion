import { getTranslations } from "next-intl/server";

import { JsonLd } from "@/components/seo/JsonLd";
import { getBlogPostUrl, getStaticPageUrls } from "@/lib/page-metadata";
import { getSiteUrl } from "@/lib/seo";
import { buildBlogPostingJsonLd, buildBreadcrumbJsonLd } from "@/lib/structured-data";
import { INTL_LOCALE_MAP } from "@/lib/types/i18n";
import type { BlogPostType } from "@/types/blog.type";

interface IBlogPostJsonLdProps {
  post: BlogPostType;
}

// BlogPosting + BreadcrumbList za članak; putanja prati vidljivi `Breadcrumb` (Blog › naslov).
export async function BlogPostJsonLd({ post }: IBlogPostJsonLdProps) {
  const { locale } = post;
  const [tMetadata, tNav] = await Promise.all([
    getTranslations({ locale, namespace: "metadata" }),
    getTranslations({ locale, namespace: "nav" }),
  ]);

  const url = getBlogPostUrl(locale, post.slug);

  return (
    <>
      <JsonLd
        data={buildBlogPostingJsonLd({
          siteUrl: getSiteUrl(),
          url,
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          inLanguage: INTL_LOCALE_MAP[locale],
          cover: post.cover,
          authorName: tMetadata("siteName"),
          authorUrl: getStaticPageUrls("home")[locale],
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: tNav("links.blog"), url: getStaticPageUrls("blog")[locale] },
          { name: post.title, url },
        ])}
      />
    </>
  );
}
