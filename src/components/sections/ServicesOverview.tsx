import { useTranslations } from "next-intl";

import { cn } from "cn";

import type { ServiceIdType } from "@/types/services.type";

import { SERVICES } from "@/data/services";

import { ServiceCard } from "./ServiceCard";

// Po dizajnu poslednje dve kartice zauzimaju po pola reda (`span 3`), a FPV je istaknut.
const WIDE_SERVICES: ServiceIdType[] = ["promo", "fpv"];
const FEATURED_SERVICE: ServiceIdType = "fpv";

export function ServicesOverview() {
  const t = useTranslations("home.services");

  return (
    <section className="border-y border-border bg-surface px-5 py-10 md:px-12 md:py-21">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-10">
        <h2>{t("heading")}</h2>
        <p className="text-muted-foreground md:max-w-107.5 md:text-lg">{t("intro")}</p>
      </div>

      {/* Grid od šest kolona iz dizajna (tri + dve kartice u dva reda) tek od `lg`; na tabletu
          bi kolone bile preuske za tekst, pa tamo stoje dve kolone. */}
      <ul className="mt-5.5 grid gap-4 md:mt-11 md:grid-cols-2 md:gap-6 lg:grid-cols-6">
        {SERVICES.map((service) => {
          const wide = WIDE_SERVICES.includes(service.id);

          return (
            <li
              key={service.id}
              className={cn(wide ? "md:col-span-2 lg:col-span-3" : "lg:col-span-2")}
            >
              <ServiceCard
                service={service}
                wide={wide}
                featured={service.id === FEATURED_SERVICE}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
