import { defineRouting } from "next-intl/routing";

import { SUPPORTED_LOCALES } from "@/lib/types/i18n";

import { ROUTES } from "@/constants/routes";

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES,
  defaultLocale: "sr",
  localePrefix: "as-needed",
  // Sajt se uvek otvara na srpskom, bez obzira na jezik browsera; na engleski se prelazi ručno
  localeDetection: false,
  pathnames: {
    [ROUTES.home]: "/",
    [ROUTES.services]: {
      sr: "/usluge",
      en: "/services",
    },
    [ROUTES.servicesWeddings]: {
      sr: "/usluge/snimanje-vencanja",
      en: "/services/wedding-videography",
    },
    [ROUTES.servicesRealEstate]: {
      sr: "/usluge/snimanje-nekretnina",
      en: "/services/real-estate-videography",
    },
    [ROUTES.servicesEvents]: {
      sr: "/usluge/dogadjaji-i-proslave",
      en: "/services/events",
    },
    [ROUTES.servicesPromo]: {
      sr: "/usluge/promo-video",
      en: "/services/promo-video",
    },
    [ROUTES.servicesFpv]: {
      sr: "/usluge/fpv-snimci",
      en: "/services/fpv",
    },
    [ROUTES.blog]: "/blog",
    [ROUTES.blogPost]: "/blog/[slug]",
    [ROUTES.about]: {
      sr: "/o-nama",
      en: "/about",
    },
    [ROUTES.contact]: {
      sr: "/kontakt",
      en: "/contact",
    },
    [ROUTES.privacy]: {
      sr: "/politika-privatnosti",
      en: "/privacy-policy",
    },
    [ROUTES.terms]: {
      sr: "/uslovi-koriscenja",
      en: "/terms",
    },
  },
});
