import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";

import { JsonLd } from "@/components/seo/JsonLd";
import { outfit, sourceSans3 } from "@/lib/fonts";
import { getStaticPageUrls } from "@/lib/page-metadata";
import { getSiteUrl, OG_LOCALE_MAP, toAbsoluteUrl } from "@/lib/seo";
import { buildLocalBusinessJsonLd } from "@/lib/structured-data";

import { CONTACT_DISPLAY_EMAIL } from "@/constants/contact";
import { APPLE_TOUCH_ICON, OG_IMAGE } from "@/constants/seo";
import { routing } from "@/i18n/routing";

import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Podrazumevani metapodaci; stranice ih dopunjuju kroz `getStaticPageMetadata` (poglavlje 14).
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteName = t("siteName");

  return {
    metadataBase: new URL(getSiteUrl()),
    title: { template: `%s | ${siteName}`, default: t("default.title") },
    description: t("default.description"),
    applicationName: siteName,
    icons: { apple: { url: APPLE_TOUCH_ICON.path, sizes: APPLE_TOUCH_ICON.sizes } },
    openGraph: {
      type: "website",
      siteName,
      title: t("default.title"),
      description: t("default.description"),
      locale: OG_LOCALE_MAP[locale],
      images: [
        {
          url: toAbsoluteUrl(OG_IMAGE.path),
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  // Isti izvor kao `request.ts` (root param `locale`), već proveren i tipiziran.
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "metadata" });

  return (
    <html lang={locale} className={`${outfit.variable} ${sourceSans3.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* LocalBusiness na svakoj stranici — bez telefona (poglavlje 12) */}
        <JsonLd
          data={buildLocalBusinessJsonLd({
            siteUrl: getSiteUrl(),
            name: t("siteName"),
            description: t("default.description"),
            url: getStaticPageUrls("home")[locale],
            email: CONTACT_DISPLAY_EMAIL,
          })}
        />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
