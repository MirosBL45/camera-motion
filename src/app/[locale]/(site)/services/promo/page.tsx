import { useLocale, useTranslations } from "next-intl";

import { Drone, Hammer, RectangleVertical, Rocket } from "lucide-react";

import { CtaBand } from "@/components/sections/CtaBand";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServiceDelivery } from "@/components/sections/service-page/ServiceDelivery";
import { ServiceFeatures } from "@/components/sections/service-page/ServiceFeatures";
import { ServiceIntro } from "@/components/sections/service-page/ServiceIntro";
import { ServiceWorks } from "@/components/sections/service-page/ServiceWorks";
import { formatPrice, getStartingPrice } from "@/lib/pricing";

import { SERVICES_BY_ID } from "@/data/services";

// Sidro za sekundarno dugme iz uvodnog bloka; kao i query parametri, ne prevodi se (poglavlje 7.3).
const WORKS_SECTION_ID = "primeri";

// Dizajn nema ekran za promo — stranica se sklapa iz sekcija šablona (`1b`, `2a`) i koraka
// saradnje sa O nama; tekstovi idu kroz `services.promo`.
const WHAT_WE_DO_ITEMS = [
  { id: "space", Icon: Drone },
  { id: "fpv", Icon: Rocket },
  { id: "work", Icon: Hammer },
  { id: "formats", Icon: RectangleVertical },
] as const;

const PROCESS_STEPS = ["brief", "shoot", "edit", "delivery"] as const;

// Paketa nema, pa polazna cena (`PRICES.promo` u `packages.ts`) stoji kao poslednja stavka isporuke.
const DELIVERY_ITEMS = ["ready", "revisions"] as const;

const WORK_ITEMS = ["first", "second"] as const;

export default function ServicesPromoPage() {
  const locale = useLocale();
  const t = useTranslations("services.promo");
  const service = SERVICES_BY_ID.promo;

  return (
    <>
      <ServiceIntro
        service={service}
        heading={t("heading")}
        lead={t("lead")}
        placeholderLabel={t("placeholder")}
        primaryCtaLabel={t("ctaPrimary")}
        secondaryCta={{ label: t("ctaSecondary"), targetId: WORKS_SECTION_ID }}
      />

      <ServiceFeatures
        heading={t("whatWeDo.heading")}
        intro={t("whatWeDo.intro")}
        items={WHAT_WE_DO_ITEMS.map(({ id, Icon }) => ({
          id,
          Icon,
          title: t(`whatWeDo.items.${id}.title`),
          description: t(`whatWeDo.items.${id}.description`),
        }))}
      />

      <ProcessSteps
        heading={t("process.heading")}
        intro={t("process.intro")}
        steps={PROCESS_STEPS.map((id) => ({
          id,
          title: t(`process.steps.${id}.title`),
          description: t(`process.steps.${id}.description`),
        }))}
      />

      <ServiceDelivery
        heading={t("delivery.heading")}
        intro={t("delivery.intro")}
        items={[
          ...DELIVERY_ITEMS.map((id) => ({ id, text: t(`delivery.items.${id}`) })),
          {
            id: "price",
            text: t("delivery.items.price", {
              price: formatPrice(getStartingPrice(service.id), locale),
            }),
          },
        ]}
      />

      {/* TODO(vlasnik): upisati prave naslove, opis i trajanje kad stignu promo snimci;
          YouTube ID-jevi dolaze iz `services.ts` (do tada placeholder sa opisom kadra). */}
      <ServiceWorks
        id={WORKS_SECTION_ID}
        heading={t("works.heading")}
        items={WORK_ITEMS.map((id, index) => ({
          id,
          videoId: service.videoIds[index],
          title: t(`works.items.${id}.title`),
          meta: t(`works.items.${id}.meta`),
          placeholderLabel: t(`works.items.${id}.placeholder`),
        }))}
      />

      <CtaBand
        heading={t("cta.heading")}
        subheading={t("cta.subheading")}
        buttonLabel={t("cta.button")}
        query={{ usluga: service.contactParam }}
      />
    </>
  );
}
