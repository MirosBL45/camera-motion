import { useTranslations } from "next-intl";

const TRUST_ITEMS = ["regulation", "drones", "editing"] as const;

export function TrustBar() {
  const t = useTranslations("home.trust");

  return (
    <section
      aria-label={t("label")}
      className="border-y border-border bg-surface px-5 py-4 md:px-12 md:py-5"
    >
      <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-sm leading-[1.7] text-muted-foreground md:text-[0.9375rem]">
        {TRUST_ITEMS.map((item, index) => (
          <li key={item} className="flex items-center gap-x-4">
            {index > 0 ? (
              <span aria-hidden="true" className="text-accent-gold">
                ·
              </span>
            ) : null}
            {t(`items.${item}`)}
          </li>
        ))}
      </ul>
    </section>
  );
}
