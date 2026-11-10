// Jedan schema.org čvor za `<script type="application/ld+json">` (poglavlje 14).
export type JsonLdType = {
  "@context": "https://schema.org";
  "@type": string;
  [key: string]: unknown;
};

export type BreadcrumbItemType = {
  name: string;
  url: string;
};
