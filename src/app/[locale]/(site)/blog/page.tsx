import { getTranslations } from "next-intl/server";

export default async function BlogPage() {
  const t = await getTranslations("blog");

  return <h1>{t("title")}</h1>;
}
