import { describe, expect, it } from "vitest";

import { isActiveRoute } from "./navigation";

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
