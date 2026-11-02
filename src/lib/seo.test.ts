import { describe, expect, it } from "vitest";

import {
  buildLanguageAlternates,
  getAlternateOgLocales,
  getSiteUrl,
  OG_LOCALE_MAP,
  toAbsoluteUrl,
} from "./seo";

describe("getSiteUrl", () => {
  it("skida kosu crtu na kraju", () => {
    expect(getSiteUrl("https://cameramotion.net/")).toBe("https://cameramotion.net");
    expect(getSiteUrl("  https://preview.example.com// ")).toBe("https://preview.example.com");
  });

  it("bez env vrednosti pada na domen sajta, nikad na localhost", () => {
    expect(getSiteUrl(undefined)).toBe("https://cameramotion.net");
    expect(getSiteUrl("")).toBe("https://cameramotion.net");
  });
});

describe("toAbsoluteUrl", () => {
  const site = "https://cameramotion.net";

  it("spaja lokalizovanu putanju sa domenom", () => {
    expect(toAbsoluteUrl("/usluge/fpv-snimci", site)).toBe(
      "https://cameramotion.net/usluge/fpv-snimci"
    );
    expect(toAbsoluteUrl("/en/services", site)).toBe("https://cameramotion.net/en/services");
  });

  it("početna je goli domen, kao canonical iz Next.js-a", () => {
    expect(toAbsoluteUrl("/", site)).toBe("https://cameramotion.net");
  });
});

describe("buildLanguageAlternates", () => {
  it("svaki jezik + x-default ka srpskom", () => {
    expect(
      buildLanguageAlternates({
        sr: "https://cameramotion.net/o-nama",
        en: "https://cameramotion.net/en/about",
      })
    ).toEqual({
      sr: "https://cameramotion.net/o-nama",
      en: "https://cameramotion.net/en/about",
      "x-default": "https://cameramotion.net/o-nama",
    });
  });

  it("članak bez prevoda dobija samo svoj jezik", () => {
    expect(buildLanguageAlternates({ sr: "https://cameramotion.net/blog/tekst" })).toEqual({
      sr: "https://cameramotion.net/blog/tekst",
      "x-default": "https://cameramotion.net/blog/tekst",
    });
  });

  it("bez srpske verzije nema x-default", () => {
    expect(buildLanguageAlternates({ en: "https://cameramotion.net/en/blog/post" })).toEqual({
      en: "https://cameramotion.net/en/blog/post",
    });
  });
});

describe("getAlternateOgLocales", () => {
  it("vraća samo druge jezike na kojima stranica postoji", () => {
    expect(getAlternateOgLocales("sr", { sr: "a", en: "b" })).toEqual([OG_LOCALE_MAP.en]);
    expect(getAlternateOgLocales("en", { sr: "a", en: "b" })).toEqual([OG_LOCALE_MAP.sr]);
    expect(getAlternateOgLocales("sr", { sr: "a" })).toEqual([]);
  });
});
