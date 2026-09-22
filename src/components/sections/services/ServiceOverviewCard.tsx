import { useLocale, useTranslations } from "next-intl";

import { cn } from "cn";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { formatPrice, getStartingPrice } from "@/lib/pricing";
import type { ServiceType } from "@/types/services.type";

import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

interface IServiceOverviewCardProps {
  service: ServiceType;
  /** Kartica preko celog reda: placeholder levo, tekst desno (po dizajnu samo FPV). */
  wide?: boolean;
  /** Zlatno istaknuta kartica sa badge-om — po dizajnu samo FPV. */
  featured?: boolean;
}

export function ServiceOverviewCard({
  service,
  wide = false,
  featured = false,
}: IServiceOverviewCardProps) {
  const locale = useLocale();
  const t = useTranslations("services");
  const tCard = useTranslations(`services.overview.items.${service.id}`);

  const startingPrice = getStartingPrice(service.id);

  return (
    <Link
      href={ROUTES[service.routeKey]}
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-xl bg-surface transition-[box-shadow,border-color] duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
        featured
          ? "border-[1.5px] border-accent-gold shadow-gold-soft hover:shadow-gold"
          : "border border-border shadow-card hover:border-accent-gold hover:shadow-card-hover",
        wide && "md:grid md:grid-cols-2 md:items-stretch"
      )}
    >
      <MediaPlaceholder
        label={tCard("placeholder")}
        variant={featured ? "gold" : "warm"}
        className={cn("aspect-video w-full", wide && "md:aspect-auto md:h-full md:min-h-70")}
      />

      <div className="flex flex-1 flex-col p-5.5 md:p-6.5">
        {featured ? (
          <Badge
            variant="gold"
            className="mb-2.5 h-auto w-fit px-2.75 py-0.75 font-heading text-[0.8125rem] font-semibold"
          >
            {t("featuredBadge")}
          </Badge>
        ) : null}

        <h3>{t(`${service.id}.title`)}</h3>
        <p className="mt-2.5 text-base leading-[1.6] text-muted-foreground">{tCard("excerpt")}</p>

        {/* „Detaljnije" je vizuelni element, ne ugnežđen link — cela kartica je link. */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <span className="font-heading text-[1.0625rem] font-medium">
            {startingPrice === undefined
              ? t("overview.priceOnRequest")
              : t("overview.priceFrom", { price: formatPrice(startingPrice, locale) })}
          </span>
          <span className="inline-flex items-center gap-1.5 font-heading text-[0.9375rem] font-medium text-primary">
            {t("overview.detailsCta")}
            <ArrowRight aria-hidden="true" className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
