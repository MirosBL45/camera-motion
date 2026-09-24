import type { ServiceIdType } from "@/types/services.type";

import { PACKAGES, SERVICE_PRICES } from "@/data/packages";

import { INTL_LOCALE_MAP, type Locale } from "./types/i18n";

// Iznos se formatira po jeziku (`sr-Latn-RS` → 1.150, `en-GB` → 1,150); valuta dolazi iz i18n
// poruke, pa se ovde formatira samo broj — nikad konkatenacija stringova (poglavlje 9.1).
export function formatPrice(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(INTL_LOCALE_MAP[locale], {
    maximumFractionDigits: 0,
  }).format(amount);
}

// Najniža polazna cena usluge; usluga bez paketa uzima svoju cenu iz `SERVICE_PRICES`.
// Svaka usluga mora da ima cenu — ako je nema, build puca umesto da se prikaže prazno.
export function getStartingPrice(serviceId: ServiceIdType): number {
  const servicePackages = PACKAGES[serviceId];

  if (servicePackages?.length) {
    return Math.min(...servicePackages.map(({ priceFrom }) => priceFrom));
  }

  const servicePrice = SERVICE_PRICES[serviceId];

  if (servicePrice === undefined) {
    throw new Error(`Usluga "${serviceId}" nema ni pakete ni polaznu cenu u packages.ts.`);
  }

  return servicePrice;
}
