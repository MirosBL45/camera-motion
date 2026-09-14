import { getTranslations } from "next-intl/server";

export default async function PrivacyPage() {
  const t = await getTranslations("legal.privacy");

  return <h1>{t("title")}</h1>;
}
