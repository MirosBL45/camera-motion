import { describe, expect, it } from "vitest";

import { PACKAGES, SERVICE_PRICES } from "@/data/packages";
import { SERVICES } from "@/data/services";

import { formatPrice, getStartingPrice } from "./pricing";

describe("formatPrice", () => {
  it("koristi tačku kao separator hiljada na srpskom", () => {
    expect(formatPrice(1150, "sr")).toBe("1.150");
  });

  it("koristi zarez kao separator hiljada na engleskom", () => {
    expect(formatPrice(1150, "en")).toBe("1,150");
  });

  it("ne dodaje decimale ni valutu", () => {
    expect(formatPrice(450, "sr")).toBe("450");
    expect(formatPrice(450, "en")).toBe("450");
  });
});

describe("getStartingPrice", () => {
  it("vraća najnižu cenu paketa usluge", () => {
    expect(getStartingPrice("weddings")).toBe(450);
    expect(getStartingPrice("realEstate")).toBe(120);
  });

  it("vraća polaznu cenu za usluge bez paketa", () => {
    expect(getStartingPrice("events")).toBe(SERVICE_PRICES.events);
    expect(getStartingPrice("promo")).toBe(SERVICE_PRICES.promo);
    expect(getStartingPrice("fpv")).toBe(SERVICE_PRICES.fpv);
  });

  it("svaka usluga ima pozitivnu polaznu cenu", () => {
    for (const { id } of SERVICES) {
      expect(getStartingPrice(id)).toBeGreaterThan(0);
    }
  });

  it("prati izmenu iznosa u podacima, ne fiksiranu vrednost", () => {
    const lowest = Math.min(...(PACKAGES.weddings ?? []).map(({ priceFrom }) => priceFrom));

    expect(getStartingPrice("weddings")).toBe(lowest);
  });
});
