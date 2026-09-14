import { getTranslations } from "next-intl/server";

export default async function ServicesWeddingsPage() {
  const t = await getTranslations("services.weddings");

  return <h1>{t("title")}</h1>;
}
