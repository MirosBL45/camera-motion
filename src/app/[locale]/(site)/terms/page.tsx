import { getTranslations } from "next-intl/server";

export default async function TermsPage() {
  const t = await getTranslations("legal.terms");

  return <h1>{t("title")}</h1>;
}
