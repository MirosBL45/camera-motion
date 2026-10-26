// Stabilni ključevi kategorija iz `tags` u frontmatteru — ne prevode se (poglavlje 7.3, 13);
// nazivi idu kroz `blog.categories`. Redosled je redosled pilula na listi.
export const BLOG_CATEGORIES = [
  "vencanja",
  "nekretnine",
  "dron-fpv",
  "iza-kadra",
  "dogadjaji-firme",
] as const;

// Query parametri liste — isti na oba jezika, URL je deljiv.
export const BLOG_QUERY = {
  category: "kategorija",
  page: "strana",
} as const;

// Prva strana: 1 istaknut + grid 3×2; svaka sledeća („Prikaži još tekstova") dodaje 6.
export const BLOG_FIRST_PAGE_SIZE = 7;
export const BLOG_PAGE_STEP = 6;
