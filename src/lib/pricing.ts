import type { ServiceIdType } from "@/types/services.type";

import { PACKAGES } from "@/data/packages";

import { INTL_LOCALE_MAP, type Locale } from "./types/i18n";

// Iznos se formatira po jeziku (`sr-Latn-RS` → 1.150, `en-GB` → 1,150); valuta dolazi iz i18n
// poruke, pa se ovde formatira samo broj — nikad konkatenacija stringova (poglavlje 9.1).
export function formatPrice(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(INTL_LOCALE_MAP[locale], {
    maximumFractionDigits: 0,
  }).format(amount);
}

// Najniža polazna cena usluge; usluga bez paketa je nema (tada ide „cena po dogovoru").
export function getStartingPrice(serviceId: ServiceIdType): number | undefined {
  const servicePackages = PACKAGES[serviceId];

  if (!servicePackages?.length) return undefined;

  return Math.min(...servicePackages.map(({ priceFrom }) => priceFrom));
}
