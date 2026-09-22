import { useTranslations } from "next-intl";

import { CtaBand } from "@/components/sections/CtaBand";
import { ServicesGrid } from "@/components/sections/services/ServicesGrid";

export default function ServicesPage() {
  const t = useTranslations("services");

  return (
    <>
      <section className="px-5 pt-8.5 pb-10 md:px-12 md:pt-16 md:pb-16">
        <h1 className="md:max-w-220 md:text-[3.25rem]">{t("overview.heading")}</h1>
        <p className="mt-4.5 leading-[1.65] text-muted-foreground md:mt-6 md:max-w-160 md:text-xl">
          {t("overview.lead")}
        </p>
      </section>

      <section className="border-t border-border bg-surface px-5 py-10 md:px-12 md:py-16">
        <ServicesGrid />

        <p className="mt-8 text-base leading-[1.65] text-muted-foreground md:mt-11 md:max-w-175">
          {t("overview.editingNote")}
        </p>

        {/* TODO(team): otkomentarisati kad usluga fotografije krene */}
        {/* <p className="mt-3 text-base leading-[1.65] text-muted-foreground md:max-w-175">
          {t("overview.photographyNote")}
        </p> */}
      </section>

      <CtaBand
        heading={t("cta.heading")}
        subheading={t("cta.subheading")}
        buttonLabel={t("cta.button")}
      />
    </>
  );
}
