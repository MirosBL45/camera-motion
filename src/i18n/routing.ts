import { defineRouting } from "next-intl/routing";

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/lib/types/i18n";

import { ROUTES } from "@/constants/routes";

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "as-needed",
  // Sajt se uvek otvara na srpskom, bez obzira na jezik browsera; na engleski se prelazi ručno
  localeDetection: false,
  // Bez `NEXT_LOCALE` kolačića — jezik je samo u URL-u, pa sajt ne postavlja nijedan kolačić
  // (politika privatnosti; odluka vlasnika, 04.11.2026.)
  localeCookie: false,
  // Bez hreflang `Link` header-a iz proxy-ja — hreflang već stoji u HTML-u kroz metapodatke
  // (feature 19), a header je za članke bloga davao pogrešnu adresu prevoda (slug se razlikuje
  // po jeziku) i adresu sa hosta zahteva umesto `NEXT_PUBLIC_SITE_URL`
  alternateLinks: false,
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
