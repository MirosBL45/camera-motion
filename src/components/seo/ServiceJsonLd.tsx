import { getLocale, getTranslations } from "next-intl/server";

import { JsonLd } from "@/components/seo/JsonLd";
import { getStaticPageUrls } from "@/lib/page-metadata";
import { getStartingPrice } from "@/lib/pricing";
import { getSiteUrl } from "@/lib/seo";
import { buildBreadcrumbJsonLd, buildServiceJsonLd } from "@/lib/structured-data";
import type { ServiceType } from "@/types/services.type";

interface IServiceJsonLdProps {
  service: ServiceType;
}

// Service + BreadcrumbList za stranicu usluge; putanja prati vidljivi `Breadcrumb` (Usluge › naziv).
export async function ServiceJsonLd({ service }: IServiceJsonLdProps) {
  const locale = await getLocale();
  const [tMetadata, tServices, tNav] = await Promise.all([
    getTranslations({ locale, namespace: "metadata" }),
    getTranslations({ locale, namespace: "services" }),
    getTranslations({ locale, namespace: "nav" }),
  ]);

  const name = tServices(`${service.id}.title`);
  const url = getStaticPageUrls(service.routeKey)[locale];

  return (
    <>
      <JsonLd
        data={buildServiceJsonLd({
          siteUrl: getSiteUrl(),
          name,
          description: tMetadata(`${service.routeKey}.description`),
          url,
          priceFrom: getStartingPrice(service.id),
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: tNav("links.services"), url: getStaticPageUrls("services")[locale] },
          { name, url },
        ])}
      />
    </>
  );
}
