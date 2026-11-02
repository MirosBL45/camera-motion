import { useTranslations } from "next-intl";

import type { BlogPostType } from "@/types/blog.type";

import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

import { BlogCover } from "./BlogCover";
import { BlogPostMeta } from "./BlogPostMeta";

interface IBlogPostCardProps {
  post: BlogPostType;
}

// Kartica u gridu liste (artboard `2c`). Naslov je `h2` sa veličinom `h3` iz dizajna —
// kartice nisu podsekcije istaknutog članka, pa ne idu ispod njegovog `h2`.
export function BlogPostCard({ post }: IBlogPostCardProps) {
  const t = useTranslations("blog.placeholders");

  return (
    <Link
      href={{ pathname: ROUTES.blogPost, params: { slug: post.slug } }}
      className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-[box-shadow,border-color] duration-200 hover:border-accent-gold hover:shadow-card-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
    >
      <BlogCover
        cover={post.cover}
        placeholderLabel={t("card")}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="h-50 w-full"
      />

      <div className="p-5.5 md:p-6.5">
        <BlogPostMeta post={post} className="text-sm" />
        <h2 className="mt-2.5 text-[1.3125rem] leading-[1.24] font-medium tracking-normal md:text-[1.4375rem]">
          {post.title}
        </h2>
        <p className="mt-2.5 text-base leading-[1.55] text-muted-foreground">{post.description}</p>
      </div>
    </Link>
  );
}
