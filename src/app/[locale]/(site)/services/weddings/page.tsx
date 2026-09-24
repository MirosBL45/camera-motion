import { useTranslations } from "next-intl";

import { CalendarCheck, Camera, Drone, HardDrive, Mic, Orbit, Video } from "lucide-react";

import { CtaBand } from "@/components/sections/CtaBand";
import { ServiceDelivery } from "@/components/sections/service-page/ServiceDelivery";
import { ServiceFeatures } from "@/components/sections/service-page/ServiceFeatures";
import { ServiceIntro } from "@/components/sections/service-page/ServiceIntro";
import { ServicePackages } from "@/components/sections/service-page/ServicePackages";
import { ServiceWorks } from "@/components/sections/service-page/ServiceWorks";

import { SERVICES_BY_ID } from "@/data/services";

// Sidro za sekundarno dugme iz uvodnog bloka; kao i query parametri, ne prevodi se (poglavlje 7.3).
const PACKAGES_SECTION_ID = "paketi";

// Ikonice iz lucide-react umesto CSS krugova iz dizajna; tekstovi idu kroz `services.weddings`.
const HOW_ITEMS = [
  { id: "camera", Icon: Camera },
  { id: "gimbal", Icon: Orbit },
  { id: "drone", Icon: Drone },
  { id: "sound", Icon: Mic },
] as const;

const OPTION_ITEMS = [
  { id: "prewedding", Icon: CalendarCheck },
  { id: "staticCamera", Icon: Video },
  { id: "storage", Icon: HardDrive },
] as const;

const WORK_ITEMS = ["first", "second"] as const;

const DELIVERY_ITEMS = ["digital", "backup", "timeline"] as const;

export default function ServicesWeddingsPage() {
  const t = useTranslations("services.weddings");
  const service = SERVICES_BY_ID.weddings;

  return (
    <>
      <ServiceIntro
        service={service}
        heading={t("heading")}
        lead={t("lead")}
        placeholderLabel={t("placeholder")}
        primaryCtaLabel={t("ctaPrimary")}
        secondaryCta={{ label: t("ctaSecondary"), targetId: PACKAGES_SECTION_ID }}
      />

      <ServiceFeatures
        heading={t("how.heading")}
        items={HOW_ITEMS.map(({ id, Icon }) => ({
          id,
          Icon,
          title: t(`how.items.${id}.title`),
          description: t(`how.items.${id}.description`),
        }))}
      />

      {/* Cene, redosled i istaknuti paket dolaze iz `packages.ts`; ovde su samo prevodi.
          Ključevi stavki prate `features` u `PACKAGES.weddings` i stoje ispisani jer
          tipizirane poruke ne prihvataju ključ sastavljen od `string` vrednosti. */}
      <ServicePackages
        id={PACKAGES_SECTION_ID}
        service={service}
        heading={t("packages.heading")}
        intro={t("packages.intro")}
        note={t("packages.note")}
        packages={[
          {
            id: "osnovni",
            name: t("packages.osnovni.name"),
            features: [
              t("packages.osnovni.features.camera"),
              t("packages.osnovni.features.microphone"),
              t("packages.osnovni.features.fullEdit"),
              t("packages.osnovni.features.delivery"),
            ],
          },
          {
            id: "standard",
            name: t("packages.standard.name"),
            features: [
              t("packages.standard.features.fromPrevious"),
              t("packages.standard.features.drone"),
              t("packages.standard.features.highlights"),
              t("packages.standard.features.reel"),
            ],
          },
          {
            id: "premium",
            name: t("packages.premium.name"),
            features: [
              t("packages.premium.features.fromPrevious"),
              t("packages.premium.features.fpv"),
              t("packages.premium.features.staticCamera"),
              t("packages.premium.features.twoOperators"),
            ],
          },
        ]}
      />

      <ServiceFeatures
        tone="warm"
        heading={t("options.heading")}
        intro={t("options.intro")}
        items={OPTION_ITEMS.map(({ id, Icon }) => ({
          id,
          Icon,
          title: t(`options.items.${id}.title`),
          description: t(`options.items.${id}.description`),
        }))}
      />

      {/* TODO(vlasnik): upisati tačan rok isporuke i iznos avansa u `delivery.items.timeline`
          (sr + en) — do tada stoji opšta rečenica da se oboje dogovara pre snimanja. */}
      <ServiceDelivery
        heading={t("delivery.heading")}
        intro={t("delivery.intro")}
        items={DELIVERY_ITEMS.map((id) => ({ id, text: t(`delivery.items.${id}`) }))}
      />

      {/* TODO(vlasnik): zameniti pravim parovima i trajanjima kad stignu snimci sa kanala;
          YouTube ID-jevi dolaze iz `services.ts` (do tada placeholder sa opisom kadra). */}
      <ServiceWorks
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
