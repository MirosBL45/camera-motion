import { getTranslations } from "next-intl/server";

export default async function ServicesFpvPage() {
  const t = await getTranslations("services.fpv");

  return <h1>{t("title")}</h1>;
}
