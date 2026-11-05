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
          // Separator je zalepljen za poslednju reč stavke (bez razmaka između), pa pri prelomu na
          // telefonu nikad ne počinje novi red i ne ostaje sam na kraju reda.
          <li key={item}>
            {t(`items.${item}`)}
            {index < TRUST_ITEMS.length - 1 ? (
              <span aria-hidden="true" className="ml-4 text-accent-gold">
                ·
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
