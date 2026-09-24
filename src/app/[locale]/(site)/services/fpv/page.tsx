import { useLocale, useTranslations } from "next-intl";

import {
  Clapperboard,
  CloudSun,
  Drone,
  Glasses,
  House,
  MapPinned,
  PartyPopper,
  ShieldCheck,
  Store,
  Trophy,
} from "lucide-react";

import { CtaBand } from "@/components/sections/CtaBand";
import { ServiceDelivery } from "@/components/sections/service-page/ServiceDelivery";
import { ServiceFeatures } from "@/components/sections/service-page/ServiceFeatures";
import { ServiceIntro } from "@/components/sections/service-page/ServiceIntro";
import { ServiceWorks } from "@/components/sections/service-page/ServiceWorks";
import { formatPrice, getStartingPrice } from "@/lib/pricing";

import { FPV_ADDON_PRICE } from "@/data/packages";
import { SERVICES_BY_ID } from "@/data/services";

// Sidro za sekundarno dugme iz uvodnog bloka; kao i query parametri, ne prevodi se (poglavlje 7.3).
const WORKS_SECTION_ID = "primeri";

// Dizajn nema ekran za FPV — stranica se sklapa iz sekcija šablona (`1b`, `2a`);
// tekstovi idu kroz `services.fpv`. Više teksta nego na ostalim uslugama (SEO).
const ABOUT_ITEMS = [
  { id: "firstPerson", Icon: Glasses },
  { id: "avata", Icon: Drone },
  { id: "oneTake", Icon: Clapperboard },
] as const;

const USE_ITEMS = [
  { id: "realEstate", Icon: House },
  { id: "celebrations", Icon: PartyPopper },
  { id: "venues", Icon: Store },
  { id: "sports", Icon: Trophy },
] as const;

const SAFETY_ITEMS = [
  { id: "dcv", Icon: ShieldCheck },
  { id: "location", Icon: MapPinned },
  { id: "weather", Icon: CloudSun },
] as const;

const WORK_ITEMS = ["first", "second"] as const;

export default function ServicesFpvPage() {
  const locale = useLocale();
  const t = useTranslations("services.fpv");
  const service = SERVICES_BY_ID.fpv;

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
        heading={t("about.heading")}
        intro={t("about.intro")}
        items={ABOUT_ITEMS.map(({ id, Icon }) => ({
          id,
          Icon,
          title: t(`about.items.${id}.title`),
          description: t(`about.items.${id}.description`),
        }))}
      />

      <ServiceFeatures
        heading={t("uses.heading")}
        intro={t("uses.intro")}
        items={USE_ITEMS.map(({ id, Icon }) => ({
          id,
          Icon,
          title: t(`uses.items.${id}.title`),
          description: t(`uses.items.${id}.description`),
        }))}
      />

      {/* TODO(vlasnik): upisati konačne naslove i trajanja kad stignu snimci; prvi primer je
          isti snimak kao na nekretninama (FPV prolet kroz kuću), pa mu se ID upisuje na jednom
          mestu u `services.ts`. Drugi je placeholder dok ne stigne novi FPV snimak. */}
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

      <ServiceFeatures
        tone="warm"
        heading={t("safety.heading")}
        intro={t("safety.intro")}
        items={SAFETY_ITEMS.map(({ id, Icon }) => ({
          id,
          Icon,
          title: t(`safety.items.${id}.title`),
          description: t(`safety.items.${id}.description`),
        }))}
      />

      {/* Iznosi dolaze iz `PRICES` u `packages.ts`: `fpv` za samostalno snimanje, `fpvAddon` za dodatak. */}
      <ServiceDelivery
        heading={t("price.heading")}
        intro={t("price.intro")}
        items={[
          {
            id: "standalone",
            text: t("price.items.standalone", {
              price: formatPrice(getStartingPrice(service.id), locale),
            }),
          },
          {
            id: "addon",
            text: t("price.items.addon", { price: formatPrice(FPV_ADDON_PRICE, locale) }),
          },
          { id: "factors", text: t("price.items.factors") },
        ]}
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
