import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { LEGAL_RICH_VALUES } from "@/components/sections/legal/legal-rich-tags";
import { LegalPage } from "@/components/sections/legal/LegalPage";
import { getStaticPageMetadata } from "@/lib/page-metadata";

import { LEGAL_LAST_UPDATED } from "@/constants/legal";

// NAPOMENA: šablon teksta, nije pravni savet — vlasnik pregleda.

export function generateMetadata(): Promise<Metadata> {
  return getStaticPageMetadata("terms");
}

export default async function TermsPage() {
  const t = await getTranslations("legal.terms");

  return (
    <LegalPage title={t("title")} lead={t("lead")} lastUpdated={LEGAL_LAST_UPDATED.terms}>
      <h2>{t("about.heading")}</h2>
      <p>{t("about.body")}</p>

      <h2>{t("content.heading")}</h2>
      <p>{t("content.body")}</p>
      <p>{t("content.sharing")}</p>

      <h2>{t("prices.heading")}</h2>
      <p>{t("prices.body")}</p>
      <p>{t("prices.inquiry")}</p>

      <h2>{t("drone.heading")}</h2>
      <p>{t("drone.body")}</p>
      <p>{t("drone.limits")}</p>

      <h2>{t("liability.heading")}</h2>
      <p>{t("liability.body")}</p>

      <h2>{t("privacy.heading")}</h2>
      <p>{t.rich("privacy.body", LEGAL_RICH_VALUES)}</p>

      <h2>{t("law.heading")}</h2>
      <p>{t.rich("law.body", LEGAL_RICH_VALUES)}</p>
    </LegalPage>
  );
}
