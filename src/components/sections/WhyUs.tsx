import { useTranslations } from "next-intl";

import { Film, Mic, Orbit } from "lucide-react";

import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

// Ikonice iz lucide-react umesto CSS oblika iz dizajna; tekstovi idu kroz `home.whyUs.items`.
const WHY_US_ITEMS = [
  { id: "cinematic", Icon: Film },
  { id: "gimbal", Icon: Orbit },
  { id: "sound", Icon: Mic },
] as const;

export function WhyUs() {
  const t = useTranslations("home.whyUs");

  return (
    <section className="bg-surface-warm px-5 py-10 md:px-12 md:py-22">
      {/* Dve kolone iz dizajna tek od `lg` — na tabletu bi tekstualna kolona bila preuska. */}
      <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-15">
        <div>
          <h2>{t("heading")}</h2>
          <p className="mt-3.5 leading-[1.6] text-foreground/86 md:mt-5 md:text-[1.1875rem] md:leading-[1.65]">
            <span className="md:hidden">{t("leadShort")}</span>
            <span className="hidden md:inline">{t("lead")}</span>
          </p>

          <ul className="mt-5.5 flex flex-col gap-4.5 md:mt-8.5 md:gap-5.5">
            {WHY_US_ITEMS.map(({ id, Icon }) => (
              <li key={id} className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-9.5 flex-none items-center justify-center rounded-full border border-accent-gold bg-surface"
                >
                  <Icon className="size-4.5 text-accent-gold" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="text-[1.0625rem] md:text-[1.1875rem]">{t(`items.${id}.title`)}</h3>
                  <p className="text-base leading-[1.55] text-muted-foreground">
                    {t(`items.${id}.description`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <MediaPlaceholder
          label={t("placeholder")}
          variant="light"
          className="mt-5.5 h-55 rounded-xl border border-border md:mt-8 md:h-75 lg:mt-0 lg:h-130"
        />
      </div>
    </section>
  );
}
