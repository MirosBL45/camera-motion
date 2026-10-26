import { describe, expect, it } from "vitest";

import { countWords, getReadingMinutes } from "./reading-time";

const words = (count: number) => Array.from({ length: count }, () => "reč").join(" ");

describe("countWords", () => {
  it("broji reči, a ne markdown oznake i crtice", () => {
    expect(countWords("## Naslov\n\n- prva stavka — **važno**")).toBe(4);
  });

  it("ne broji JSX komponente, a od linka broji samo tekst", () => {
    const mdx =
      '<YouTube video="fpvHouse" title="Prolet kroz kuću" />\n\nPogledajte [stranicu usluge](route:servicesFpv).';

    expect(countWords(mdx)).toBe(3);
  });

  it("broji reči sa dijakriticima i brojeve", () => {
    expect(countWords("Đurđevdan, 5 kadrova iz vazduha")).toBe(5);
  });
});

describe("getReadingMinutes", () => {
  it("zaokružuje naviše na ~200 reči u minuti", () => {
    expect(getReadingMinutes(words(200))).toBe(1);
    expect(getReadingMinutes(words(201))).toBe(2);
    expect(getReadingMinutes(words(1000))).toBe(5);
  });

  it("vraća najmanje 1 minut", () => {
    expect(getReadingMinutes("")).toBe(1);
  });
});
