import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";

import { ArrowLeft } from "lucide-react";

import { MdxContent } from "@/components/mdx/MdxContent";
import { BlogCover } from "@/components/sections/blog/BlogCover";
import { BlogPostMeta } from "@/components/sections/blog/BlogPostMeta";
import { CtaBand } from "@/components/sections/CtaBand";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { findTranslatedSlug, getBlogPostBySlug, getBlogPosts } from "@/lib/blog";

import { ROUTES } from "@/constants/routes";
import { Link, redirect } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!hasLocale(routing.locales, params.locale)) return [];

  return (await getBlogPosts(params.locale)).map(({ slug }) => ({ slug }));
}

// Title i description iz frontmattera; canonical, hreflang i JSON-LD su feature 19.
export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = hasLocale(routing.locales, locale) ? await getBlogPostBySlug(locale, slug) : null;

  return post ? { title: post.title, description: post.description } : {};
}

// Dizajn nema ekran članka — sklopljen iz postojećih obrazaca (odluka vlasnika): putanja
// i naslov kao na stranicama usluga, kadar sa zlatnom bordurom, tekst 75ch, CTA iz liste.
export default async function BlogPostPage({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const { slug } = await params;
  const locale = await getLocale();
  const post = await getBlogPostBySlug(locale, slug);

  if (!post) {
    // SR/EN prekidač zadržava slug — vodi na prevod istog članka, ili na listu ako ga nema.
    const translatedSlug = await findTranslatedSlug(locale, slug);

    if (translatedSlug) {
      redirect({ href: { pathname: ROUTES.blogPost, params: { slug: translatedSlug } }, locale });
    }
    if (translatedSlug === null) {
      redirect({ href: ROUTES.blog, locale });
    }
    notFound();
  }

  const t = await getTranslations("blog");
  const tNav = await getTranslations("nav");

  return (
    <>
      {/* Centrirana kolona (~880px) za putanju, naslov i kadar; tekst u užoj koloni od 75ch.
          `box-content` da padding ne sužava kolonu. */}
      <article className="mx-auto box-content max-w-220 px-5 pt-6 pb-12 md:px-12 md:pt-12 md:pb-21">
        <header>
          <Breadcrumb
            parent={{ label: tNav("links.blog"), href: ROUTES.blog }}
            current={post.title}
          />
          <BlogPostMeta post={post} showReadingTime className="mt-5 text-[0.9375rem] md:mt-6" />
          <h1 className="mt-3 md:mt-3.5 md:text-[3.25rem]">{post.title}</h1>
          <p className="mt-4.5 leading-[1.6] text-muted-foreground md:mt-5 md:max-w-160 md:text-xl">
            {post.description}
          </p>
        </header>

        <BlogCover
          cover={post.cover}
          placeholderLabel={t("placeholders.cover")}
          sizes="(max-width: 768px) 100vw, 880px"
          className="mt-8 aspect-video w-full rounded-xl border-[1.5px] border-accent-gold md:mt-10"
        />

        {/* Footer je u istoj koloni kao tekst (ista leva ivica); `not-prose` skida stilove teksta. */}
        <div className="prose mx-auto mt-8 max-w-[75ch] text-pretty prose-brand md:mt-10 md:prose-lg">
          <MdxContent source={post.source} />

          <footer className="not-prose mt-10 md:mt-12">
            <Link
              href={ROUTES.blog}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-sm font-heading text-[1.0625rem] font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              {t("post.backToBlog")}
            </Link>
          </footer>
        </div>
      </article>

      <CtaBand
        heading={t("cta.heading")}
        subheading={t("cta.subheading")}
        buttonLabel={t("cta.button")}
      />
    </>
  );
}
