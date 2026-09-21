import { useTranslations } from "next-intl";

import { HERO_STATS } from "@/constants/hero-stats";

export function HeroStats() {
  const t = useTranslations("home.hero.stats");

  return (
    <ul className="mt-13 hidden flex-wrap gap-x-6 gap-y-4 border-t border-border pt-6.5 md:flex lg:gap-x-8.5">
      {HERO_STATS.map((stat) => (
        <li key={stat.id}>
          <p className="font-heading text-[1.625rem] leading-tight font-semibold text-primary">
            {stat.value}
          </p>
          <p className="text-[0.9375rem] leading-normal text-muted-foreground">{t(stat.id)}</p>
        </li>
      ))}
    </ul>
  );
}
