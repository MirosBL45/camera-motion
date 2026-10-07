import { describe, expect, it } from "vitest";

import { formatShortDate, fromIsoDate, toIsoDate } from "./date";

describe("fromIsoDate", () => {
  it("vraća lokalni datum, bez UTC pomeranja", () => {
    const date = fromIsoDate("2026-06-04");

    expect([date.getFullYear(), date.getMonth(), date.getDate()]).toEqual([2026, 5, 4]);
  });

  it("je obrnuto od toIsoDate", () => {
    expect(toIsoDate(fromIsoDate("2027-01-01"))).toBe("2027-01-01");
  });
});

describe("toIsoDate", () => {
  it("vraća lokalni datum sa nulama ispred", () => {
    expect(toIsoDate(new Date(2026, 5, 4))).toBe("2026-06-04");
  });

  it("ne pomera dan oko ponoći", () => {
    expect(toIsoDate(new Date(2026, 11, 31, 23, 59))).toBe("2026-12-31");
    expect(toIsoDate(new Date(2027, 0, 1, 0, 1))).toBe("2027-01-01");
  });
});

describe("formatShortDate", () => {
  const date = new Date(2026, 5, 14);

  it("formatira po jeziku", () => {
    expect(formatShortDate(date, "sr")).toBe("14.06.2026.");
    expect(formatShortDate(date, "en")).toBe("14/06/2026");
  });
});
