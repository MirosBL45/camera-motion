import { INTL_LOCALE_MAP, type Locale } from "@/lib/types/i18n";

const pad = (value: number) => String(value).padStart(2, "0");

/** Lokalni datum kao `YYYY-MM-DD` (bez UTC pomeranja — `toISOString` bi oko ponoći dao prethodni dan). */
export function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** `YYYY-MM-DD` nazad u lokalni datum (obrnuto od `toIsoDate`; `new Date("YYYY-MM-DD")` bi bio UTC). */
export function fromIsoDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/** Kratak prikaz datuma po jeziku: sr `14.06.2026.`, en `14/06/2026` (poglavlje 8.3). */
export function formatShortDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(INTL_LOCALE_MAP[locale], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}
