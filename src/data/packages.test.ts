import { describe, expect, it } from "vitest";

import en from "@/i18n/messages/en/services.json";
import sr from "@/i18n/messages/sr/services.json";

import { PACKAGES } from "./packages";

// Pomoćna funkcija čita poruku po putanji, bez pretpostavke o obliku JSON-a.
function getMessage(tree: unknown, path: string[]): unknown {
  let node = tree;

  for (const key of path) {
    if (typeof node !== "object" || node === null) return undefined;
    node = Object.getOwnPropertyDescriptor(node, key)?.value;
  }

  return node;
}

// Stranica usluge prosleđuje prevedene stavke kroz props (feature 08), pa svaki ključ iz
// `features` mora da ima poruku na oba jezika — inače bi stavka nestala sa kartice.
describe("PACKAGES weddings", () => {
  const messages = { sr: sr.weddings, en: en.weddings };

  it("ima redosled i cene iz dizajn reference", () => {
    expect(PACKAGES.weddings?.map(({ id, priceFrom }) => [id, priceFrom])).toEqual([
      ["osnovni", 450],
      ["standard", 750],
      ["premium", 1150],
    ]);
  });

  it("ima tačno jedan istaknut paket", () => {
    expect(PACKAGES.weddings?.filter(({ featured }) => featured)).toHaveLength(1);
  });

  it.each(["sr", "en"] as const)("ima naziv i sve stavke paketa na %s", (locale) => {
    for (const { id, features } of PACKAGES.weddings ?? []) {
      expect(getMessage(messages[locale], ["packages", id, "name"])).toEqual(expect.any(String));

      for (const feature of features) {
        expect(getMessage(messages[locale], ["packages", id, "features", feature])).toEqual(
          expect.any(String)
        );
      }
    }
  });
});
