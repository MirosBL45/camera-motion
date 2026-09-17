import { getTranslations } from "next-intl/server";

// Placeholder do MDX blog featurea (18) — slug se ne koristi dok ne postoje pravi članci.
export default async function BlogPostPage() {
  const t = await getTranslations("blog.post");

  return <h1>{t("title")}</h1>;
}
