import { getTranslations } from "next-intl/server";

export default async function ServicesPage() {
  const t = await getTranslations("services");

  return <h1>{t("title")}</h1>;
}
