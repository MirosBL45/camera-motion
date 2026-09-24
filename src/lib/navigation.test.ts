import { describe, expect, it } from "vitest";

import { getServiceContactParam, isActiveRoute } from "./navigation";

describe("isActiveRoute", () => {
  it("home je aktivan samo na tačnoj putanji", () => {
    expect(isActiveRoute("/", "/")).toBe(true);
    expect(isActiveRoute("/services", "/")).toBe(false);
  });

  it("stavka je aktivna na svojoj putanji i podstranicama", () => {
    expect(isActiveRoute("/services", "/services")).toBe(true);
    expect(isActiveRoute("/services/weddings", "/services")).toBe(true);
    expect(isActiveRoute("/blog/[slug]", "/blog")).toBe(true);
  });

  it("ne hvata putanje koje samo počinju istim slovima", () => {
    expect(isActiveRoute("/blogger", "/blog")).toBe(false);
    expect(isActiveRoute("/about", "/services")).toBe(false);
  });
});

describe("getServiceContactParam", () => {
  it("vraća parametar usluge na njenoj stranici", () => {
    expect(getServiceContactParam("/services/weddings")).toBe("vencanje");
    expect(getServiceContactParam("/services/real-estate")).toBe("nekretnine");
    expect(getServiceContactParam("/services/events")).toBe("event");
    expect(getServiceContactParam("/services/promo")).toBe("promo");
    expect(getServiceContactParam("/services/fpv")).toBe("fpv");
  });

  it("nema parametra van stranica usluga", () => {
    expect(getServiceContactParam("/")).toBeUndefined();
    expect(getServiceContactParam("/services")).toBeUndefined();
    expect(getServiceContactParam("/contact")).toBeUndefined();
    expect(getServiceContactParam("/blog/[slug]")).toBeUndefined();
  });
});
