import { useTranslations } from "next-intl";

import { cn } from "cn";

import { Badge } from "@/components/ui/badge";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { ServiceType } from "@/types/services.type";

import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

interface IServiceCardProps {
  service: ServiceType;
  /** „wide" kartica na md+ deli red na placeholder levo i tekst desno (dizajn: `span 3`). */
  wide?: boolean;
  /** Zlatno istaknuta kartica sa badge-om — po dizajnu samo FPV. */
  featured?: boolean;
}

export function ServiceCard({ service, wide = false, featured = false }: IServiceCardProps) {
  const t = useTranslations(`home.services.items.${service.id}`);
  const tSection = useTranslations("home.services");

  return (
    <Link
      href={ROUTES[service.routeKey]}
      className={cn(
        "block h-full overflow-hidden rounded-xl bg-surface transition-[box-shadow,border-color] duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none",
        featured
          ? "border-[1.5px] border-accent-gold shadow-gold-soft hover:shadow-gold"
          : "border border-border hover:border-accent-gold hover:shadow-card-hover",
        wide && "md:grid md:grid-cols-2 md:items-stretch"
      )}
    >
      <MediaPlaceholder
        label={t("placeholder")}
        variant={featured ? "gold" : "warm"}
        className={cn("h-37.5", wide ? "md:h-full md:min-h-47.5" : "md:h-46.5")}
      />

      <div className={cn("px-5 pt-4.5 pb-5.5", wide ? "md:p-6.5" : "md:px-6 md:pt-5.5 md:pb-6.5")}>
        {featured ? (
          <Badge
            variant="gold"
            className="mb-2 h-auto px-2.5 py-0.75 font-heading text-xs font-semibold md:mb-2.5 md:px-2.75 md:text-[0.8125rem]"
          >
            {tSection("featuredBadge")}
          </Badge>
        ) : null}

        <h3 className="text-[1.3125rem] md:text-[1.4375rem]">{t("title")}</h3>
        <p className="mt-1.5 text-base leading-[1.55] text-muted-foreground md:mt-2">
          <span className="md:hidden">{t("excerptShort")}</span>
          <span className="hidden md:inline">{t("excerpt")}</span>
        </p>
      </div>
    </Link>
  );
}
