import { DEFAULT_LOCALE, type Locale, SUPPORTED_LOCALES } from "@/lib/types/i18n";

// Rezervna vrednost ako `NEXT_PUBLIC_SITE_URL` nije postavljen — canonical i OG URL-ovi
// nikad ne smeju da odu na localhost u produkciji.
const FALLBACK_SITE_URL = "https://cameramotion.net";

/** Osnovni URL sajta, bez kose crte na kraju. */
export function getSiteUrl(value: string | undefined = process.env.NEXT_PUBLIC_SITE_URL): string {
  return (value?.trim() || FALLBACK_SITE_URL).replace(/\/+$/, "");
}

/**
 * Lokalizovana putanja (`/usluge`, `/en/services`) → apsolutni URL. Početna je goli domen,
 * bez kose crte — isto kao canonical koji Next.js ispisuje, pa se sitemap i `<head>` poklapaju.
 */
export function toAbsoluteUrl(pathname: string, siteUrl: string = getSiteUrl()): string {
  return pathname === "/" ? siteUrl : new URL(pathname, `${siteUrl}/`).toString();
}

// Open Graph traži `jezik_REGION` (poglavlje 8.3: sr-Latn-RS / en-GB).
export const OG_LOCALE_MAP: Record<Locale, string> = {
  sr: "sr_RS",
  en: "en_GB",
};

export type LocalizedUrlsType = Partial<Record<Locale, string>>;

/**
 * hreflang mapa: svaki jezik koji stranica ima + `x-default` → srpski (poglavlje 14).
 * Članak bez prevoda dobija samo svoj jezik.
 */
export function buildLanguageAlternates(urls: LocalizedUrlsType): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of SUPPORTED_LOCALES) {
    const url = urls[locale];
    if (url) languages[locale] = url;
  }

  const defaultUrl = urls[DEFAULT_LOCALE];
  if (defaultUrl) languages["x-default"] = defaultUrl;

  return languages;
}

/** Ostali jezici na kojima stranica postoji — za `og:locale:alternate`. */
export function getAlternateOgLocales(locale: Locale, urls: LocalizedUrlsType): string[] {
  return SUPPORTED_LOCALES.filter((other) => other !== locale && urls[other]).map(
    (other) => OG_LOCALE_MAP[other]
  );
}
