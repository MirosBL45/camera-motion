import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

import { HeroStats } from "./HeroStats";
import { HeroVideo } from "./HeroVideo";

const CTA_CLASSES =
  "h-auto w-full justify-center px-6.5 py-4 font-heading text-[1.0625rem] md:w-auto md:py-3.75";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="px-5 pt-8.5 pb-10 md:grid md:grid-cols-[55fr_45fr] md:items-center md:gap-14 md:px-12 md:pt-19 md:pb-21">
      <div>
        <h1>{t("heading")}</h1>
        <p className="mt-4.5 leading-[1.6] text-muted-foreground md:mt-6.5 md:max-w-140 md:text-xl">
          {t("subheading")}
        </p>

        {/* flex-wrap na md+: dugmad su `shrink-0` i `whitespace-nowrap`, pa bi na užoj koloni
            (768–900px) izašla iz nje umesto da se prelome u dva reda. */}
        <div className="mt-6.5 flex flex-col gap-2.5 md:mt-9 md:flex-row md:flex-wrap md:gap-3.5">
          <Button asChild className={CTA_CLASSES}>
            <Link href={ROUTES.contact}>{t("ctaPrimary")}</Link>
          </Button>
          <Button asChild variant="goldOutline" className={CTA_CLASSES}>
            <Link href={ROUTES.services}>{t("ctaSecondary")}</Link>
          </Button>
        </div>

        <HeroStats />
      </div>

      <HeroVideo />
    </section>
  );
}
