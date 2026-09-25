import { useTranslations } from "next-intl";

import { cn } from "cn";

import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

const PARAGRAPH_CLASSES =
  "leading-[1.6] text-muted-foreground md:max-w-140 md:text-xl md:leading-[1.65]";

// Uvodni blok O nama (dizajn referenca, artboard `2b`): naslov i dva pasusa levo,
// kadar ekipe sa zlatnom bordurom desno.
export function AboutIntro() {
  const t = useTranslations("about.intro");

  return (
    // Dve kolone iz dizajna tek od `lg` — na tabletu se naslov lomi u pet redova, a kadar je previsok.
    <section className="px-5 pt-6 pb-10 md:px-12 md:pt-17.5 md:pb-19 lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
      <div>
        <h1 className="md:text-[3.5rem] md:leading-[1.07]">{t("heading")}</h1>
        <p className={cn("mt-4.5 md:mt-5.5", PARAGRAPH_CLASSES)}>{t("story")}</p>
        <p className={cn("mt-4", PARAGRAPH_CLASSES)}>{t("crew")}</p>
      </div>

      <MediaPlaceholder
        label={t("placeholder")}
        className="mt-6 aspect-4/3 rounded-xl border-[1.5px] border-accent-gold md:mt-10 lg:mt-0 lg:aspect-auto lg:h-130"
      />
    </section>
  );
}
