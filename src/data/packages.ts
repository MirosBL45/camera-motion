import type { PackagesType } from "@/types/packages.type";

/* ------------------------------------------------------------------ *
 * CENE — JEDINO MESTO U PROJEKTU GDE STOJI IZNOS (poglavlje 9.1).
 * Vlasnik menja samo brojke ovde; nigde drugde u kodu ni u prevodima
 * ne sme da stoji cena. Iznosi su u evrima, bez valute i formatiranja —
 * formatira se kroz `formatPrice` po jeziku.
 * ------------------------------------------------------------------ */
const PRICES = {
  weddings: {
    osnovni: 450,
    standard: 750,
    premium: 1150,
  },
  realEstate: {
    oglas: 120,
    apartman: 250,
    vila: 450,
  },
} as const;

// Nazivi paketa i stavke iz `features` idu kroz i18n po `id` (poglavlje 9.1).
// Usluge bez paketa (`events`, `promo`, `fpv`) se izostavljaju — dodavanje je dodavanje ključa.
export const PACKAGES: PackagesType = {
  weddings: [
    {
      id: "osnovni",
      priceFrom: PRICES.weddings.osnovni,
      features: ["camera", "microphone", "fullEdit", "delivery"],
    },
    {
      id: "standard",
      priceFrom: PRICES.weddings.standard,
      featured: true,
      features: ["fromPrevious", "drone", "highlights", "reel"],
    },
    {
      id: "premium",
      priceFrom: PRICES.weddings.premium,
      features: ["fromPrevious", "fpv", "staticCamera", "twoOperators"],
    },
  ],
  realEstate: [
    {
      id: "oglas",
      priceFrom: PRICES.realEstate.oglas,
      features: ["droneFlight", "shortSpot", "aerialPhotos", "delivery"],
    },
    {
      id: "apartman",
      priceFrom: PRICES.realEstate.apartman,
      featured: true,
      features: ["droneAndInterior", "spotAndVertical", "photos", "subtitles"],
    },
    {
      id: "vila",
      priceFrom: PRICES.realEstate.vila,
      features: ["fromPrevious", "fpv", "goldenHour", "twoDays"],
    },
  ],
};
