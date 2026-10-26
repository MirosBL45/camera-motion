import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const files = vi.hoisted(() => new Map<string, string>());

vi.mock("node:fs/promises", () => ({
  readdir: vi.fn(async (dir: string) => {
    const prefix = `${dir}/`;
    return [...files.keys()]
      .filter((file) => file.startsWith(prefix))
      .map((file) => file.slice(prefix.length));
  }),
  readFile: vi.fn(async (file: string) => files.get(file) ?? ""),
}));

import {
  findTranslatedSlug,
  getBlogPostByKey,
  getBlogPostBySlug,
  getBlogPosts,
  isPublished,
  parseBlogPost,
} from "./blog";

const BLOG_DIR = `${process.cwd()}/src/content/blog`;

function mdx(frontmatter: Record<string, string>, body = "Tekst članka.") {
  const lines = Object.entries(frontmatter).map(([key, value]) => `${key}: ${value}`);
  return `---\n${lines.join("\n")}\n---\n\n${body}\n`;
}

const BASE = {
  title: '"Naslov"',
  description: '"Opis članka."',
  date: "2026-10-05",
  slug: "naslov",
  tags: "[vencanja]",
  draft: "false",
};

function addFile(locale: string, key: string, frontmatter: Partial<typeof BASE>) {
  files.set(`${BLOG_DIR}/${locale}/${key}.mdx`, mdx({ ...BASE, ...frontmatter }));
}

beforeEach(() => {
  files.clear();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("parseBlogPost", () => {
  it("čita frontmatter, računa vreme čitanja i skida frontmatter iz teksta", () => {
    const post = parseBlogPost("naslov", "sr", mdx(BASE, "Prva rečenica.\n\n## Podnaslov"));

    expect(post).toMatchObject({
      key: "naslov",
      locale: "sr",
      title: "Naslov",
      date: "2026-10-05",
      tags: ["vencanja"],
      draft: false,
      readingMinutes: 1,
    });
    expect(post.source).not.toContain("---");
    expect(post.source).toContain("## Podnaslov");
  });

  it("tags su opcioni", () => {
    const withoutTags = Object.fromEntries(Object.entries(BASE).filter(([key]) => key !== "tags"));

    expect(parseBlogPost("naslov", "sr", mdx(withoutTags)).tags).toEqual([]);
  });

  it.each([
    ["nepoznata kategorija", { tags: "[vencanje]" }],
    ["neispravan datum", { date: "05.10.2026." }],
    ["slug sa razmakom", { slug: '"moj clanak"' }],
    ["draft nije boolean", { draft: '"ne"' }],
    ["prazan naslov", { title: '""' }],
  ])("puca uz naziv fajla: %s", (_, override) => {
    expect(() => parseBlogPost("naslov", "en", mdx({ ...BASE, ...override }))).toThrow(
      "en/naslov.mdx"
    );
  });

  it("puca na nepoznato polje u frontmatteru", () => {
    expect(() => parseBlogPost("naslov", "sr", mdx({ ...BASE, readingTime: "5" }))).toThrow();
  });
});

describe("isPublished", () => {
  it("draft ne izlazi u produkciju, ali se vidi u developmentu", () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(isPublished({ draft: true })).toBe(false);
    expect(isPublished({ draft: false })).toBe(true);

    vi.stubEnv("NODE_ENV", "development");
    expect(isPublished({ draft: true })).toBe(true);
  });
});

describe("getBlogPosts", () => {
  it("vraća objavljene članke jednog jezika, od najnovijeg", async () => {
    vi.stubEnv("NODE_ENV", "production");
    addFile("sr", "stariji", { slug: "stariji", date: "2026-07-03" });
    addFile("sr", "noviji", { slug: "noviji", date: "2026-10-19" });
    addFile("sr", "nacrt", { slug: "nacrt", date: "2026-10-20", draft: "true" });
    addFile("en", "noviji", { slug: "newer", date: "2026-10-19" });

    expect((await getBlogPosts("sr")).map(({ key }) => key)).toEqual(["noviji", "stariji"]);
    expect((await getBlogPosts("en")).map(({ slug }) => slug)).toEqual(["newer"]);
  });

  it("puca ako se slug ponavlja u istom jeziku", async () => {
    addFile("sr", "prvi", { slug: "isti" });
    addFile("sr", "drugi", { slug: "isti" });

    await expect(getBlogPosts("sr")).rejects.toThrow("isti");
  });

  it("ignoriše fajlove koji nisu .mdx", async () => {
    addFile("sr", "clanak", {});
    files.set(`${BLOG_DIR}/sr/.gitkeep`, "");

    expect(await getBlogPosts("sr")).toHaveLength(1);
  });
});

describe("pretraga i prevodi", () => {
  beforeEach(() => {
    addFile("sr", "fpv-prolet", { slug: "fpv-prolet-nekretnine" });
    addFile("en", "fpv-prolet", { slug: "fpv-flythrough-real-estate" });
    addFile("sr", "samo-sr", { slug: "samo-srpski" });
  });

  it("nalazi članak po slugu i po nazivu fajla", async () => {
    expect((await getBlogPostBySlug("en", "fpv-flythrough-real-estate"))?.key).toBe("fpv-prolet");
    expect((await getBlogPostByKey("sr", "fpv-prolet"))?.slug).toBe("fpv-prolet-nekretnine");
    expect(await getBlogPostBySlug("en", "fpv-prolet-nekretnine")).toBeUndefined();
  });

  it("slug drugog jezika vodi na slug prevoda istog članka", async () => {
    expect(await findTranslatedSlug("en", "fpv-prolet-nekretnine")).toBe(
      "fpv-flythrough-real-estate"
    );
    expect(await findTranslatedSlug("sr", "fpv-flythrough-real-estate")).toBe(
      "fpv-prolet-nekretnine"
    );
  });

  it("članak bez prevoda → null, nepostojeći slug → undefined", async () => {
    expect(await findTranslatedSlug("en", "samo-srpski")).toBeNull();
    expect(await findTranslatedSlug("en", "ne-postoji")).toBeUndefined();
  });
});
