import { getTranslations } from "next-intl/server";

export default async function ServicesEventsPage() {
  const t = await getTranslations("services.events");

  return <h1>{t("title")}</h1>;
}
