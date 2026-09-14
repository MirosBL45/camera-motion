import { getTranslations } from "next-intl/server";

export default async function ServicesPromoPage() {
  const t = await getTranslations("services.promo");

  return <h1>{t("title")}</h1>;
}
