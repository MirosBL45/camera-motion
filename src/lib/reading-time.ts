const WORDS_PER_MINUTE = 200;

/** Broj reči u MDX tekstu: JSX tagovi i slike se ne broje, od linka se broji samo tekst. */
export function countWords(mdx: string): number {
  const text = mdx
    .replace(/<[^>]*>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");

  // Reč je svaki niz bez razmaka koji ima bar jedno slovo ili cifru (`##`, `—`, `-` se ne broje).
  return text.split(/\s+/).filter((word) => /[\p{L}\p{N}]/u.test(word)).length;
}

/** Minuti čitanja (~200 reči u minuti), zaokruženo naviše, najmanje 1 (poglavlje 13). */
export function getReadingMinutes(mdx: string): number {
  return Math.max(1, Math.ceil(countWords(mdx) / WORDS_PER_MINUTE));
}
