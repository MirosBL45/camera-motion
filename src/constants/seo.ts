// Slike za deljenje i strukturirane podatke (poglavlje 14). Svi fajlovi su generisani
// placeholderi iz palete — spisak za zamenu je u README-u („Slike i ikonice za zamenu").

// TODO(vlasnik): zameniti pravim kadrom (1200×630, bez sitnog teksta) — public/og.png
export const OG_IMAGE = {
  path: "/og.png",
  width: 1200,
  height: 630,
} as const;

// TODO(vlasnik): zameniti pravim logom kad ga dizajner napravi — public/icons/icon-512.png
export const LOGO_IMAGE_PATH = "/icons/icon-512.png";

// TODO(vlasnik): zameniti pravom ikonicom (180×180) — public/apple-touch-icon.png.
// Ne sme u `src/app/` kao `apple-icon.png`: bez jednog root layout-a Turbopack u dev-u pada.
export const APPLE_TOUCH_ICON = {
  path: "/apple-touch-icon.png",
  sizes: "180x180",
} as const;

// Adresa i područje rada za LocalBusiness JSON-LD (odluka vlasnika, 02.11.2026.): bez ulice,
// zvanični nazivi na oba jezika. Telefon NIKAD ne ide u JSON-LD (poglavlje 12).
export const BUSINESS_ADDRESS = {
  addressLocality: "Novi Beograd",
  addressRegion: "Beograd",
  addressCountry: "RS",
} as const;

// Baza je Beograd i okolina; šire (Srbija) uz dogovor (poglavlje 3).
export const BUSINESS_AREA_SERVED = [
  { "@type": "City", name: "Beograd" },
  { "@type": "Country", name: "Srbija" },
] as const;

// Valuta polaznih cena u `Service` JSON-LD-u (ISO 4217); iznosi dolaze iz `packages.ts`.
export const PRICE_CURRENCY = "EUR";
