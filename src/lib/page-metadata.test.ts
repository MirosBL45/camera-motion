import { describe, expect, it } from "vitest";

import { getBlogPostUrl, getStaticPageUrls } from "./page-metadata";
import { getSiteUrl } from "./seo";

// Lokalizovane putanje iz tabele 7.1: sr bez prefiksa, en sa `/en`.
const SITE = getSiteUrl();

describe("getStaticPageUrls", () => {
  it("početna: koren za sr, /en za en", () => {
    expect(getStaticPageUrls("home")).toEqual({ sr: SITE, en: `${SITE}/en` });
  });

  it("prevedene putanje po jeziku", () => {
    expect(getStaticPageUrls("servicesWeddings")).toEqual({
      sr: `${SITE}/usluge/snimanje-vencanja`,
      en: `${SITE}/en/services/wedding-videography`,
    });
    expect(getStaticPageUrls("servicesEvents")).toEqual({
      sr: `${SITE}/usluge/dogadjaji-i-proslave`,
      en: `${SITE}/en/services/events`,
    });
    expect(getStaticPageUrls("about")).toEqual({
      sr: `${SITE}/o-nama`,
      en: `${SITE}/en/about`,
    });
  });
});

describe("getBlogPostUrl", () => {
  it("slug članka ide u lokalizovanu putanju bloga", () => {
    expect(getBlogPostUrl("sr", "pitanja-za-snimatelja")).toBe(
      `${SITE}/blog/pitanja-za-snimatelja`
    );
    expect(getBlogPostUrl("en", "questions-for-videographer")).toBe(
      `${SITE}/en/blog/questions-for-videographer`
    );
  });
});
