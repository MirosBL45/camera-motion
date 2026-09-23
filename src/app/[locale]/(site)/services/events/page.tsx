import { useTranslations } from "next-intl";

import { Camera, Drone, EyeOff, Mic, PartyPopper, Presentation, Trophy } from "lucide-react";

import { CtaBand } from "@/components/sections/CtaBand";
import { ServiceDelivery } from "@/components/sections/service-page/ServiceDelivery";
import { ServiceFeatures } from "@/components/sections/service-page/ServiceFeatures";
import { ServiceIntro } from "@/components/sections/service-page/ServiceIntro";
import { ServiceWorks } from "@/components/sections/service-page/ServiceWorks";

import { SERVICES_BY_ID } from "@/data/services";

// Sidro za sekundarno dugme iz uvodnog bloka; kao i query parametri, ne prevodi se (poglavlje 7.3).
const WORKS_SECTION_ID = "primeri";

// Dizajn nema ekran za događaje — stranica se sklapa iz sekcija šablona (`1b`, `2a`);
// tekstovi idu kroz `services.events`.
const COVERAGE_ITEMS = [
  { id: "private", Icon: PartyPopper },
  { id: "sports", Icon: Trophy },
  { id: "corporate", Icon: Presentation },
  { id: "performances", Icon: Mic },
] as const;

const HOW_ITEMS = [
  { id: "camera", Icon: Camera },
  { id: "drone", Icon: Drone },
  { id: "discreet", Icon: EyeOff },
] as const;

// Paketa nema (`events` nije u `packages.ts`), pa cena stoji kao „po dogovoru" u isporuci.
const DELIVERY_ITEMS = ["highlight", "longer", "price"] as const;

const WORK_ITEMS = ["first", "second"] as const;

export default function ServicesEventsPage() {
  const t = useTranslations("services.events");
  const service = SERVICES_BY_ID.events;

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
        tone="warm"
        heading={t("coverage.heading")}
        intro={t("coverage.intro")}
        items={COVERAGE_ITEMS.map(({ id, Icon }) => ({
          id,
          Icon,
          title: t(`coverage.items.${id}.title`),
          description: t(`coverage.items.${id}.description`),
        }))}
      />

      <ServiceFeatures
        heading={t("how.heading")}
        intro={t("how.intro")}
        items={HOW_ITEMS.map(({ id, Icon }) => ({
          id,
          Icon,
          title: t(`how.items.${id}.title`),
          description: t(`how.items.${id}.description`),
        }))}
      />

      <ServiceDelivery
        heading={t("delivery.heading")}
        intro={t("delivery.intro")}
        items={DELIVERY_ITEMS.map((id) => ({ id, text: t(`delivery.items.${id}`) }))}
      />

      {/* TODO(vlasnik): upisati konačne naslove i trajanja kad stignu snimci sa kanala
          (BeoSand odbojka na pesku, jahta kod Zadra); YouTube ID-jevi dolaze iz
          `services.ts` (do tada placeholder sa opisom kadra). */}
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
