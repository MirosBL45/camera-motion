import { toAbsoluteUrl } from "@/lib/seo";
import type { BreadcrumbItemType, JsonLdType } from "@/types/seo.type";

import {
  BUSINESS_ADDRESS,
  BUSINESS_AREA_SERVED,
  LOGO_IMAGE_PATH,
  OG_IMAGE,
  PRICE_CURRENCY,
} from "@/constants/seo";

// JSON-LD po poglavlju 14: LocalBusiness (layout), Service (usluge), BlogPosting (članci),
// BreadcrumbList (usluge + blog). Telefon se nigde ne upisuje.
const SCHEMA_CONTEXT = "https://schema.org";

/** Isti `@id` na svim stranicama i jezicima — Service i BlogPosting se pozivaju na njega. */
export function getBusinessId(siteUrl: string): string {
  return `${siteUrl}/#business`;
}

/** `JSON.stringify` ne čisti HTML — `<` se escape-uje da tekst ne zatvori `<script>` tag. */
export function serializeJsonLd(data: JsonLdType): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

interface ILocalBusinessInput {
  siteUrl: string;
  name: string;
  description: string;
  /** Početna na aktivnom jeziku. */
  url: string;
  email: string;
}

export function buildLocalBusinessJsonLd(input: ILocalBusinessInput): JsonLdType {
  const { siteUrl, name, description, url, email } = input;

  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "LocalBusiness",
    "@id": getBusinessId(siteUrl),
    name,
    description,
    url,
    logo: toAbsoluteUrl(LOGO_IMAGE_PATH, siteUrl),
    image: toAbsoluteUrl(OG_IMAGE.path, siteUrl),
    email,
    address: { "@type": "PostalAddress", ...BUSINESS_ADDRESS },
    areaServed: BUSINESS_AREA_SERVED,
  };
}

interface IServiceInput {
  siteUrl: string;
  name: string;
  description: string;
  url: string;
  priceFrom: number;
}

export function buildServiceJsonLd(input: IServiceInput): JsonLdType {
  const { siteUrl, name, description, url, priceFrom } = input;

  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Service",
    name,
    serviceType: name,
    description,
    url,
    provider: { "@id": getBusinessId(siteUrl) },
    areaServed: BUSINESS_AREA_SERVED,
    offers: {
      "@type": "Offer",
      url,
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: priceFrom,
        priceCurrency: PRICE_CURRENCY,
      },
    },
  };
}

interface IBlogPostingInput {
  siteUrl: string;
  url: string;
  headline: string;
  description: string;
  /** `YYYY-MM-DD` iz frontmattera. */
  datePublished: string;
  /** BCP-47 tag (`sr-Latn-RS`, `en-GB`). */
  inLanguage: string;
  /** Putanja naslovne fotografije; bez nje ide podrazumevana OG slika. */
  cover?: string;
  authorName: string;
  /** Početna na jeziku članka. */
  authorUrl: string;
}

export function buildBlogPostingJsonLd(input: IBlogPostingInput): JsonLdType {
  const { siteUrl, url, headline, description, datePublished, inLanguage, cover } = input;
  const { authorName, authorUrl } = input;

  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "BlogPosting",
    headline,
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished,
    // Frontmatter nema datum izmene — članak se vodi kao neizmenjen od objave.
    dateModified: datePublished,
    inLanguage,
    image: toAbsoluteUrl(cover ?? OG_IMAGE.path, siteUrl),
    author: { "@type": "Organization", name: authorName, url: authorUrl },
    publisher: { "@id": getBusinessId(siteUrl) },
  };
}

/** Prati vidljivu putanju iznad naslova (`Breadcrumb`): roditelj › trenutna stranica. */
export function buildBreadcrumbJsonLd(items: BreadcrumbItemType[]): JsonLdType {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, url }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: url,
    })),
  };
}
