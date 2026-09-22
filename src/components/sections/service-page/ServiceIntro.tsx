import { useTranslations } from "next-intl";

import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { AppRoute } from "@/types/routes.type";
import type { ServiceType } from "@/types/services.type";

import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

interface IServiceIntroProps {
  service: ServiceType;
  heading: string;
  lead: string;
  placeholderLabel: string;
  /** Vodi na kontakt sa `?usluga=` pre-selekcijom iz `service.contactParam`. */
  primaryCtaLabel: string;
  secondaryCta?: { label: string; href: Exclude<AppRoute, "/blog/[slug]"> };
}

const CTA_CLASSES =
  "h-auto w-full justify-center px-6.5 py-4 font-heading text-[1.0625rem] md:w-auto md:py-3.75";

// Uvodni blok stranice usluge (dizajn referenca, artboardi `1b` i `2a`): breadcrumb, naslov,
// lead pasus i dugmad levo, kadar desno. Sadržaj stiže kroz props iz feature-a 09-13.
export function ServiceIntro({
  service,
  heading,
  lead,
  placeholderLabel,
  primaryCtaLabel,
  secondaryCta,
}: IServiceIntroProps) {
  const t = useTranslations("services");
  const tNav = useTranslations("nav");

  return (
    <section className="px-5 pt-6 pb-10 md:grid md:grid-cols-[55fr_45fr] md:items-center md:gap-14 md:px-12 md:pt-12 md:pb-16">
      <div>
        <nav aria-label={tNav("breadcrumbLabel")}>
          <ol className="flex flex-wrap items-center gap-1 text-base text-muted-foreground">
            <li>
              <Link
                href={ROUTES.services}
                className="rounded-sm hover:text-accent-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                {tNav("links.services")}
              </Link>
            </li>
            <li aria-hidden="true" className="flex items-center">
              <ChevronRight className="size-4" />
            </li>
            <li aria-current="page" className="text-foreground">
              {t(`${service.id}.title`)}
            </li>
          </ol>
        </nav>

        <h1 className="mt-3.5 md:mt-4.5 md:text-[3.5rem]">{heading}</h1>
        <p className="mt-4.5 leading-[1.6] text-muted-foreground md:mt-6 md:max-w-140 md:text-xl">
          {lead}
        </p>

        <div className="mt-6.5 flex flex-col gap-2.5 md:mt-9 md:flex-row md:flex-wrap md:gap-3.5">
          <Button asChild className={CTA_CLASSES}>
            <Link href={{ pathname: ROUTES.contact, query: { usluga: service.contactParam } }}>
              {primaryCtaLabel}
            </Link>
          </Button>

          {secondaryCta ? (
            <Button asChild variant="goldOutline" className={CTA_CLASSES}>
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          ) : null}
        </div>
      </div>

      <MediaPlaceholder
        label={placeholderLabel}
        className="mt-6 aspect-video rounded-xl border-[1.5px] border-accent-gold md:mt-0 md:aspect-auto md:h-95"
      />
    </section>
  );
}
