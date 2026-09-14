import { getTranslations } from "next-intl/server";

export default async function ServicesRealEstatePage() {
  const t = await getTranslations("services.realEstate");

  return <h1>{t("title")}</h1>;
}
