import { describe, expect, it } from "vitest";

import { findMissingMessageKeys, validateMessages } from "./validator";

describe("findMissingMessageKeys", () => {
  it("prijavljuje ključeve koji nedostaju u en", () => {
    const sr = { home: { title: "Početna" } };
    const en = { home: {} };

    expect(findMissingMessageKeys(sr, en)).toEqual({
      missingInEn: ["home.title"],
      missingInSr: [],
    });
  });

  it("prijavljuje ključeve koji nedostaju u sr", () => {
    const sr = { home: {} };
    const en = { home: { title: "Home" } };

    expect(findMissingMessageKeys(sr, en)).toEqual({
      missingInEn: [],
      missingInSr: ["home.title"],
    });
  });

  it("ne prijavljuje ništa kada su ključevi identični", () => {
    const sr = { home: { title: "Početna" }, about: { title: "O nama" } };
    const en = { home: { title: "Home" }, about: { title: "About us" } };

    expect(findMissingMessageKeys(sr, en)).toEqual({
      missingInEn: [],
      missingInSr: [],
    });
  });
});

describe("validateMessages", () => {
  it("ne baca grešku kada su ključevi usklađeni", () => {
    const sr = { home: { title: "Početna" } };
    const en = { home: { title: "Home" } };

    expect(() => validateMessages(sr, en)).not.toThrow();
  });

  it("baca grešku sa listom ključeva kada nešto nedostaje", () => {
    const sr = { home: { title: "Početna" } };
    const en = { home: {} };

    expect(() => validateMessages(sr, en)).toThrow(/home\.title/);
  });
});
