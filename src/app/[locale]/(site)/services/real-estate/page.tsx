import { useTranslations } from "next-intl";

import {
  Drone,
  Footprints,
  Handshake,
  House,
  Images,
  KeyRound,
  LandPlot,
  Smartphone,
} from "lucide-react";

import { CtaBand } from "@/components/sections/CtaBand";
import { ServiceFeatures } from "@/components/sections/service-page/ServiceFeatures";
import { ServiceIntro } from "@/components/sections/service-page/ServiceIntro";
import { ServicePackages } from "@/components/sections/service-page/ServicePackages";
import { ServiceWorks } from "@/components/sections/service-page/ServiceWorks";

import { SERVICES_BY_ID } from "@/data/services";

// Sidro za sekundarno dugme iz uvodnog bloka; kao i query parametri, ne prevodi se (poglavlje 7.3).
const WORKS_SECTION_ID = "primeri";

// Sekcija „Za koga" nije u dizajnu (odluka vlasnika) — prati obrazac blokova „Šta dobijate".
const AUDIENCE_ITEMS = [
  { id: "sale", Icon: House },
  { id: "rental", Icon: KeyRound },
  { id: "agencies", Icon: Handshake },
  { id: "plots", Icon: LandPlot },
] as const;

// Ikonice iz lucide-react umesto CSS oblika iz dizajna; tekstovi idu kroz `services.realEstate`.
const FEATURE_ITEMS = [
  { id: "droneFlight", Icon: Drone },
  { id: "interior", Icon: Footprints },
  { id: "photos", Icon: Images },
  { id: "social", Icon: Smartphone },
] as const;

const WORK_ITEMS = ["first", "second"] as const;

export default function ServicesRealEstatePage() {
  const t = useTranslations("services.realEstate");
  const service = SERVICES_BY_ID.realEstate;

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
        heading={t("audience.heading")}
        intro={t("audience.intro")}
        items={AUDIENCE_ITEMS.map(({ id, Icon }) => ({
          id,
          Icon,
          title: t(`audience.items.${id}.title`),
          description: t(`audience.items.${id}.description`),
        }))}
      />

      <ServiceFeatures
        heading={t("features.heading")}
        intro={t("features.intro")}
        items={FEATURE_ITEMS.map(({ id, Icon }) => ({
          id,
          Icon,
          title: t(`features.items.${id}.title`),
          description: t(`features.items.${id}.description`),
        }))}
      />

      {/* Cene, redosled i istaknuti paket dolaze iz `packages.ts`; ovde su samo prevodi.
          Ključevi stavki prate `features` u `PACKAGES.realEstate` i stoje ispisani jer
          tipizirane poruke ne prihvataju ključ sastavljen od `string` vrednosti. */}
      <ServicePackages
        tone="warm"
        service={service}
        heading={t("packages.heading")}
        intro={t("packages.intro")}
        packages={[
          {
            id: "oglas",
            name: t("packages.oglas.name"),
            features: [
              t("packages.oglas.features.droneFlight"),
              t("packages.oglas.features.shortSpot"),
              t("packages.oglas.features.aerialPhotos"),
              t("packages.oglas.features.delivery"),
            ],
          },
          {
            id: "apartman",
            name: t("packages.apartman.name"),
            features: [
              t("packages.apartman.features.droneAndInterior"),
              t("packages.apartman.features.spotAndVertical"),
              t("packages.apartman.features.photos"),
              t("packages.apartman.features.subtitles"),
            ],
          },
          {
            id: "vila",
            name: t("packages.vila.name"),
            features: [
              t("packages.vila.features.fromPrevious"),
              t("packages.vila.features.fpv"),
              t("packages.vila.features.goldenHour"),
              t("packages.vila.features.twoDays"),
            ],
          },
        ]}
      />

      {/* TODO(vlasnik): upisati konačne naslove i trajanja kad stignu snimci sa kanala
          (FPV prolet kroz kuću sa Bookinga, nekretnina u Sutomoru); YouTube ID-jevi
          dolaze iz `services.ts` (do tada placeholder sa opisom kadra). */}
      <ServiceWorks
        id={WORKS_SECTION_ID}
        tone="background"
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
