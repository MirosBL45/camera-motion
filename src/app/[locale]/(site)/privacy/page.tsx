import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { LEGAL_RICH_VALUES } from "@/components/sections/legal/legal-rich-tags";
import { LegalPage } from "@/components/sections/legal/LegalPage";
import { getStaticPageMetadata } from "@/lib/page-metadata";

import { LEGAL_LAST_UPDATED } from "@/constants/legal";

// NAPOMENA: šablon teksta, nije pravni savet — vlasnik pregleda.
// TODO(vlasnik): ako je Camera Motion registrovan (preduzetnik/firma), dopisati u
// `legal.privacy.controller` pun naziv, adresu i matični broj / PIB.

const DATA_ITEMS = ["name", "email", "phone", "details", "message"] as const;
const PROCESSOR_ITEMS = ["resend", "gmail", "upstash", "vercel"] as const;
const RETENTION_ITEMS = ["ip", "inquiries", "cooperation", "logs"] as const;
const RIGHTS_ITEMS = [
  "access",
  "rectification",
  "erasure",
  "restriction",
  "portability",
  "objection",
  "withdraw",
] as const;

export function generateMetadata(): Promise<Metadata> {
  return getStaticPageMetadata("privacy");
}

export default async function PrivacyPage() {
  const t = await getTranslations("legal.privacy");

  return (
    <LegalPage title={t("title")} lead={t("lead")} lastUpdated={LEGAL_LAST_UPDATED.privacy}>
      <h2>{t("controller.heading")}</h2>
      <p>{t.rich("controller.body", LEGAL_RICH_VALUES)}</p>

      <h2>{t("data.heading")}</h2>
      <p>{t("data.intro")}</p>
      <ul>
        {DATA_ITEMS.map((id) => (
          <li key={id}>{t(`data.items.${id}`)}</li>
        ))}
      </ul>
      <p>{t("data.technical")}</p>

      <h2>{t("purpose.heading")}</h2>
      <p>{t("purpose.body")}</p>
      <p>{t("purpose.technical")}</p>
      <p>{t("purpose.noMarketing")}</p>

      <h2>{t("processors.heading")}</h2>
      <p>{t("processors.intro")}</p>
      <ul>
        {PROCESSOR_ITEMS.map((id) => (
          <li key={id}>{t.rich(`processors.items.${id}`, LEGAL_RICH_VALUES)}</li>
        ))}
      </ul>
      <p>{t("processors.transfer")}</p>
      <p>{t("processors.authorities")}</p>

      <h2>{t("retention.heading")}</h2>
      <ul>
        {RETENTION_ITEMS.map((id) => (
          <li key={id}>{t(`retention.items.${id}`)}</li>
        ))}
      </ul>

      <h2>{t("cookies.heading")}</h2>
      <p>{t("cookies.body")}</p>
      <p>{t.rich("cookies.youtube", LEGAL_RICH_VALUES)}</p>

      <h2>{t("rights.heading")}</h2>
      <p>{t("rights.intro")}</p>
      <ul>
        {RIGHTS_ITEMS.map((id) => (
          <li key={id}>{t(`rights.items.${id}`)}</li>
        ))}
      </ul>
      <p>{t.rich("rights.request", LEGAL_RICH_VALUES)}</p>
      <p>{t.rich("rights.complaint", LEGAL_RICH_VALUES)}</p>

      <h2>{t("changes.heading")}</h2>
      <p>{t("changes.body")}</p>
    </LegalPage>
  );
}
