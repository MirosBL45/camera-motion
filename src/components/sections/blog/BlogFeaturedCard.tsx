import { useTranslations } from "next-intl";

import { ArrowRight } from "lucide-react";

import type { BlogPostType } from "@/types/blog.type";

import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

import { BlogCover } from "./BlogCover";
import { BlogPostMeta } from "./BlogPostMeta";

interface IBlogFeaturedCardProps {
  post: BlogPostType;
}

// Istaknut (najnoviji) članak na vrhu liste (artboard `2c`): naslovna fotografija levo,
// tekst desno, zlatna bordura. Cela kartica je link.
export function BlogFeaturedCard({ post }: IBlogFeaturedCardProps) {
  const t = useTranslations("blog");

  return (
    <Link
      href={{ pathname: ROUTES.blogPost, params: { slug: post.slug } }}
      className="grid overflow-hidden rounded-xl border-[1.5px] border-accent-gold bg-surface shadow-gold-soft transition-shadow duration-200 hover:shadow-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none lg:grid-cols-[1.15fr_1fr] lg:gap-9"
    >
      <BlogCover
        cover={post.cover}
        placeholderLabel={t("placeholders.featured")}
        placeholderVariant="gold"
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="aspect-video w-full lg:aspect-auto lg:h-full lg:min-h-95"
      />

      <div className="flex flex-col justify-center p-5.5 md:p-8 lg:py-11 lg:pr-11 lg:pl-2">
        <BlogPostMeta post={post} showReadingTime className="gap-x-3.5 text-[0.9375rem]" />
        <h2 className="mt-3.5 text-[1.75rem] leading-[1.14] md:text-[2.25rem]">{post.title}</h2>
        <p className="mt-3.5 leading-[1.6] text-muted-foreground md:text-lg">{post.description}</p>

        {/* Vizuelni element, ne ugnežđen link — cela kartica je link. */}
        <span className="mt-6 inline-flex items-center gap-1.5 font-heading text-[1.0625rem] font-medium text-primary">
          {t("list.readMore")}
          <ArrowRight aria-hidden="true" className="size-4" />
        </span>
      </div>
    </Link>
  );
}
