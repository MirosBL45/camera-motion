import { useLocale, useTranslations } from "next-intl";

import { cn } from "cn";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/pricing";
import type { ServiceType } from "@/types/services.type";

import { ROUTES } from "@/constants/routes";
import { PACKAGES } from "@/data/packages";
import { Link } from "@/i18n/navigation";

export type ServicePackageContentType = {
  /** Mora da odgovara `id`-u paketa u `packages.ts` (npr. „osnovni"). */
  id: string;
  name: string;
  /** Prevedene stavke, redosledom iz `features` u `packages.ts`. */
  features: string[];
};

interface IServicePackagesProps {
  /** Meta sekcije za sidro iz uvodnog bloka („Pogledajte pakete"). */
  id?: string;
  service: ServiceType;
  heading: string;
  intro?: string;
  /** Prevedeni nazivi i stavke paketa — stižu iz feature-a 09 i 10, bez iznosa. */
  packages: ServicePackageContentType[];
  /** Napomena ispod paketa (npr. da cene zavise od lokacije i trajanja). */
  note?: string;
}

// Cene, redosled i istaknuti paket dolaze iz `packages.ts` (poglavlje 9.1) — iznos postoji samo
// tamo i ovde se samo formatira. Tekstovi stižu kroz props, da šablon ne zavisi od naziva ključeva.
export function ServicePackages({
  id,
  service,
  heading,
  intro,
  packages,
  note,
}: IServicePackagesProps) {
  const locale = useLocale();
  const t = useTranslations("services.packages");

  const servicePackages = PACKAGES[service.id];

  if (!servicePackages?.length) return null;

  return (
    // `scroll-mt-*` drži naslov ispod sticky header-a kad se dođe preko sidra.
    <section id={id} className="scroll-mt-20 px-5 py-10 md:scroll-mt-24 md:px-12 md:py-20">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-10">
        <h2>{heading}</h2>
        {intro ? <p className="text-muted-foreground md:max-w-107.5 md:text-lg">{intro}</p> : null}
      </div>

      <ul className="mt-5.5 grid gap-4 md:mt-11 md:gap-6 lg:grid-cols-3">
        {servicePackages.map(({ id, priceFrom, featured }) => {
          const content = packages.find((item) => item.id === id);

          if (!content) return null;

          return (
            <li
              key={id}
              className={cn(
                "flex flex-col rounded-xl bg-surface p-7 md:p-8",
                featured
                  ? "border-[1.5px] border-accent-gold shadow-gold"
                  : "border border-border shadow-card"
              )}
            >
              {featured ? (
                <Badge
                  variant="gold"
                  className="mb-3 h-auto w-fit px-3 py-1 font-heading text-[0.8125rem] font-semibold"
                >
                  {t("featuredBadge")}
                </Badge>
              ) : null}

              <h3>{content.name}</h3>
              <p className="mt-2 font-heading text-[1.75rem] font-semibold">
                {t("priceFrom", { price: formatPrice(priceFrom, locale) })}
              </p>

              <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                {content.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-base leading-[1.55]">
                    <span aria-hidden="true" className="text-accent-gold">
                      —
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className="mt-6 h-auto w-full justify-center py-3.5 font-heading text-base"
              >
                <Link href={{ pathname: ROUTES.contact, query: { usluga: service.contactParam } }}>
                  {t("cta")}
                </Link>
              </Button>
            </li>
          );
        })}
      </ul>

      {note ? (
        <p className="mt-6 text-base leading-[1.65] text-muted-foreground md:mt-8 md:max-w-175">
          {note}
        </p>
      ) : null}
    </section>
  );
}
