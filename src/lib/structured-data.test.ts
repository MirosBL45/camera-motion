import { describe, expect, it } from "vitest";

import {
  buildBlogPostingJsonLd,
  buildBreadcrumbJsonLd,
  buildLocalBusinessJsonLd,
  buildServiceJsonLd,
  getBusinessId,
  serializeJsonLd,
} from "./structured-data";

const SITE = "https://cameramotion.net";

describe("buildLocalBusinessJsonLd", () => {
  const business = buildLocalBusinessJsonLd({
    siteUrl: SITE,
    name: "Camera Motion",
    description: "Opis",
    url: `${SITE}/`,
    email: "kontakt@example.com",
  });

  it("nosi naziv, url, logo, email, adresu i područje rada", () => {
    expect(business).toMatchObject({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": getBusinessId(SITE),
      name: "Camera Motion",
      url: `${SITE}/`,
      logo: `${SITE}/icons/icon-512.png`,
      email: "kontakt@example.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Novi Beograd",
        addressRegion: "Beograd",
        addressCountry: "RS",
      },
    });
    expect(business.areaServed).toBeDefined();
  });

  it("nikad ne sadrži telefon (poglavlje 12)", () => {
    expect(business).not.toHaveProperty("telephone");
    expect(JSON.stringify(business)).not.toMatch(/telephone|\+381/);
  });
});

describe("buildServiceJsonLd", () => {
  it("poziva se na isti LocalBusiness i nosi polaznu cenu u evrima", () => {
    const service = buildServiceJsonLd({
      siteUrl: SITE,
      name: "FPV snimci",
      description: "Opis",
      url: `${SITE}/usluge/fpv-snimci`,
      priceFrom: 200,
    });

    expect(service).toMatchObject({
      "@type": "Service",
      name: "FPV snimci",
      provider: { "@id": getBusinessId(SITE) },
      offers: { priceSpecification: { minPrice: 200, priceCurrency: "EUR" } },
    });
  });
});

describe("buildBlogPostingJsonLd", () => {
  const base = {
    siteUrl: SITE,
    url: `${SITE}/blog/tekst`,
    headline: "Naslov",
    description: "Opis",
    datePublished: "2026-10-19",
    inLanguage: "sr-Latn-RS",
    authorName: "Camera Motion",
    authorUrl: `${SITE}/`,
  };

  it("bez naslovne fotografije koristi podrazumevanu OG sliku", () => {
    expect(buildBlogPostingJsonLd(base)).toMatchObject({
      "@type": "BlogPosting",
      headline: "Naslov",
      datePublished: "2026-10-19",
      dateModified: "2026-10-19",
      image: `${SITE}/og.png`,
      mainEntityOfPage: { "@id": `${SITE}/blog/tekst` },
      publisher: { "@id": getBusinessId(SITE) },
    });
  });

  it("sa naslovnom fotografijom koristi nju", () => {
    expect(buildBlogPostingJsonLd({ ...base, cover: "/blog/naslovna.jpg" }).image).toBe(
      `${SITE}/blog/naslovna.jpg`
    );
  });
});

describe("buildBreadcrumbJsonLd", () => {
  it("numeriše stavke od 1, redom kao vidljiva putanja", () => {
    expect(
      buildBreadcrumbJsonLd([
        { name: "Usluge", url: `${SITE}/usluge` },
        { name: "FPV snimci", url: `${SITE}/usluge/fpv-snimci` },
      ]).itemListElement
    ).toEqual([
      { "@type": "ListItem", position: 1, name: "Usluge", item: `${SITE}/usluge` },
      { "@type": "ListItem", position: 2, name: "FPV snimci", item: `${SITE}/usluge/fpv-snimci` },
    ]);
  });
});

describe("serializeJsonLd", () => {
  it("escape-uje `<` da tekst ne može da zatvori script tag", () => {
    const json = serializeJsonLd(
      buildBreadcrumbJsonLd([{ name: "</script><script>alert(1)</script>", url: SITE }])
    );

    expect(json).not.toContain("</script>");
    expect(JSON.parse(json).itemListElement[0].name).toBe("</script><script>alert(1)</script>");
  });
});
