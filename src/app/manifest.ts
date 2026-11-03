import type { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";

// Boja teme = token `background` (#FAF8F4, poglavlje 10.1); manifest prima samo hex vrednost.
const THEME_COLOR = "#FAF8F4";

// Manifest je jedan za ceo sajt, pa nosi tekstove podrazumevanog jezika (srpski).
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({ locale: routing.defaultLocale, namespace: "metadata" });

  return {
    name: t("siteName"),
    short_name: t("siteName"),
    description: t("default.description"),
    lang: routing.defaultLocale,
    start_url: "/",
    display: "standalone",
    background_color: THEME_COLOR,
    theme_color: THEME_COLOR,
    // TODO(vlasnik): zameniti pravim ikonicama iz loga (public/icons/icon-192.png i icon-512.png)
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
