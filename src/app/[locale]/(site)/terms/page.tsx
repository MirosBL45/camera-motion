import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getStaticPageMetadata } from "@/lib/page-metadata";

// Skelet do feature-a 20 — `noindex` (odluka vlasnika, 02.11.2026.).
// TODO(feature 20): skinuti `noIndex` i vratiti stranicu u sitemap.
export function generateMetadata(): Promise<Metadata> {
  return getStaticPageMetadata("terms", { noIndex: true });
}

export default async function TermsPage() {
  const t = await getTranslations("legal.terms");

  return <h1>{t("title")}</h1>;
}
