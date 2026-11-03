export const SUPPORTED_LOCALES = ["sr", "en"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

// Srpski je bez URL prefiksa i `x-default` u hreflang-u (poglavlja 8.1 i 14).
export const DEFAULT_LOCALE: Locale = "sr";

export const LOCALE_LABELS: Record<Locale, string> = {
  sr: "SR",
  en: "EN",
};

// Mapa ka BCP-47 tagovima za Intl.DateTimeFormat / Intl.NumberFormat (poglavlje 8.3, 9.1)
export const INTL_LOCALE_MAP: Record<Locale, string> = {
  sr: "sr-Latn-RS",
  en: "en-GB",
};
