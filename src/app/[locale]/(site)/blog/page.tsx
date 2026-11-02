import { getLocale, getTranslations } from "next-intl/server";

import { BlogCategoryFilter } from "@/components/sections/blog/BlogCategoryFilter";
import { BlogFeaturedCard } from "@/components/sections/blog/BlogFeaturedCard";
import { BlogPostCard } from "@/components/sections/blog/BlogPostCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Button } from "@/components/ui/button";
import { getBlogPosts } from "@/lib/blog";
import { getBlogListPage, parseBlogCategory, parseBlogPage } from "@/lib/blog-list";

import { BLOG_QUERY } from "@/constants/blog";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

// Lista po dizajnu (artboard `2c`): naslov, uvod i pilule, istaknut najnoviji članak, grid,
// „Prikaži još tekstova" i zeleni CTA. Filter i strana idu kroz query parametre (deljiv URL),
// pa se lista renderuje po zahtevu; sami članci su SSG.
export default async function BlogPage({ searchParams }: PageProps<"/[locale]/blog">) {
  const locale = await getLocale();
  const t = await getTranslations("blog");
  const query = await searchParams;

  const category = parseBlogCategory(query[BLOG_QUERY.category]);
  const page = parseBlogPage(query[BLOG_QUERY.page]);
  const { featured, rest, hasMore, nextPage } = getBlogListPage(await getBlogPosts(locale), {
    category,
    page,
  });

  return (
    <>
      <section className="px-5 pt-8.5 pb-8 md:px-12 md:pt-16 md:pb-9">
        <h1 className="md:text-[3.25rem]">{t("title")}</h1>
        <p className="mt-4 leading-[1.6] text-muted-foreground md:max-w-160 md:text-xl">
          {t("list.lead")}
        </p>
        <BlogCategoryFilter active={category} className="mt-6 md:mt-7.5" />
      </section>

      {featured ? (
        <div className="px-5 pb-12 md:px-12 md:pb-21">
          <BlogFeaturedCard post={featured} />

          {rest.length > 0 ? (
            <ul className="mt-6 grid gap-6 md:mt-15 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <li key={post.key}>
                  <BlogPostCard post={post} />
                </li>
              ))}
            </ul>
          ) : null}

          {hasMore ? (
            <div className="mt-8 flex justify-center md:mt-11">
              <Button
                asChild
                variant="goldOutline"
                className="h-auto w-full px-7.5 py-3.75 font-heading text-[1.0625rem] md:w-auto"
              >
                {/* Bez skrola na vrh — novi članci se pojavljuju ispod već pročitanih. */}
                <Link
                  href={{
                    pathname: ROUTES.blog,
                    query: {
                      ...(category ? { [BLOG_QUERY.category]: category } : {}),
                      [BLOG_QUERY.page]: String(nextPage),
                    },
                  }}
                  scroll={false}
                >
                  {t("list.loadMore")}
                </Link>
              </Button>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="px-5 pb-12 text-muted-foreground md:px-12 md:pb-21">{t("list.empty")}</p>
      )}

      <CtaBand
        heading={t("cta.heading")}
        subheading={t("cta.subheading")}
        buttonLabel={t("cta.button")}
      />
    </>
  );
}
