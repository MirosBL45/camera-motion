import { describe, expect, it } from "vitest";

import type { BlogCategoryType } from "@/types/blog.type";

import {
  getBlogListPage,
  getVisibleCount,
  parseBlogCategory,
  parseBlogPage,
  sortPostsByDate,
} from "./blog-list";

type PostStubType = { key: string; date: string; tags: BlogCategoryType[] };

// 9 članaka, kao početni sadržaj: od najnovijeg ka najstarijem
const POSTS: PostStubType[] = Array.from({ length: 9 }, (_, index) => ({
  key: `post-${index + 1}`,
  date: `2026-09-${String(20 - index).padStart(2, "0")}`,
  tags: index % 2 === 0 ? ["vencanja"] : ["nekretnine", "dron-fpv"],
}));

describe("parseBlogCategory", () => {
  it("prihvata samo poznate ključeve", () => {
    expect(parseBlogCategory("dron-fpv")).toBe("dron-fpv");
    expect(parseBlogCategory("Vencanja")).toBeUndefined();
    expect(parseBlogCategory("xyz")).toBeUndefined();
    expect(parseBlogCategory(["vencanja", "nekretnine"])).toBeUndefined();
    expect(parseBlogCategory(undefined)).toBeUndefined();
  });
});

describe("parseBlogPage", () => {
  it("vraća pozitivan ceo broj iz URL-a", () => {
    expect(parseBlogPage("2")).toBe(2);
    expect(parseBlogPage("15")).toBe(15);
  });

  it("sve ostalo pada na prvu stranu", () => {
    for (const value of ["0", "-1", "1.5", "abc", "02", "99999", undefined, ["2"]]) {
      expect(parseBlogPage(value)).toBe(1);
    }
  });
});

describe("getVisibleCount", () => {
  it("prva strana 7 (1 + 3×2), svaka sledeća +6", () => {
    expect(getVisibleCount(1)).toBe(7);
    expect(getVisibleCount(2)).toBe(13);
    expect(getVisibleCount(3)).toBe(19);
  });
});

describe("sortPostsByDate", () => {
  it("sortira od najnovijeg i ne menja ulaz", () => {
    const input = [{ date: "2026-07-03" }, { date: "2026-10-19" }, { date: "2026-08-26" }];

    expect(sortPostsByDate(input).map(({ date }) => date)).toEqual([
      "2026-10-19",
      "2026-08-26",
      "2026-07-03",
    ]);
    expect(input[0].date).toBe("2026-07-03");
  });
});

describe("getBlogListPage", () => {
  it("prva strana „Sve“: istaknut + 6 u gridu, ima još", () => {
    const { featured, rest, hasMore, nextPage } = getBlogListPage(POSTS, { page: 1 });

    expect(featured?.key).toBe("post-1");
    expect(rest.map(({ key }) => key)).toEqual([
      "post-2",
      "post-3",
      "post-4",
      "post-5",
      "post-6",
      "post-7",
    ]);
    expect(hasMore).toBe(true);
    expect(nextPage).toBe(2);
  });

  it("druga strana „Sve“ učitava preostala 2 i dugme nestaje", () => {
    const { rest, hasMore } = getBlogListPage(POSTS, { page: 2 });

    expect(rest).toHaveLength(8);
    expect(rest.slice(-2).map(({ key }) => key)).toEqual(["post-8", "post-9"]);
    expect(hasMore).toBe(false);
  });

  it("članak sa više kategorija je u svakoj od njih", () => {
    const realEstate = getBlogListPage(POSTS, { category: "nekretnine", page: 1 });
    const drone = getBlogListPage(POSTS, { category: "dron-fpv", page: 1 });

    expect(realEstate.featured?.key).toBe("post-2");
    expect(drone.featured?.key).toBe("post-2");
    expect(realEstate.rest).toHaveLength(3);
    expect(realEstate.hasMore).toBe(false);
  });

  it("kategorija bez članaka vraća praznu listu", () => {
    const { featured, rest, hasMore } = getBlogListPage(POSTS, { category: "iza-kadra", page: 1 });

    expect(featured).toBeUndefined();
    expect(rest).toEqual([]);
    expect(hasMore).toBe(false);
  });
});
