import { useTranslations } from "next-intl";

import { Camera, Drone, Mic, Rotate3d } from "lucide-react";

import { AboutIntro } from "@/components/sections/about/AboutIntro";
import { TeamSection } from "@/components/sections/about/TeamSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServiceFeatures } from "@/components/sections/service-page/ServiceFeatures";

// Raspored po dizajnu (artboard `2b`): priča → ekipa → kako radimo → oprema + DCV → CTA.
// Tekstovi idu kroz `about` namespace.
const PROCESS_STEPS = ["talk", "prep", "shoot", "delivery"] as const;

const EQUIPMENT_ITEMS = [
  { id: "drones", Icon: Drone },
  { id: "cameras", Icon: Camera },
  { id: "gimbals", Icon: Rotate3d },
  { id: "microphones", Icon: Mic },
] as const;

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <>
      <AboutIntro />

      <TeamSection />

      <ProcessSteps
        heading={t("process.heading")}
        intro={t("process.intro")}
        steps={PROCESS_STEPS.map((id) => ({
          id,
          title: t(`process.steps.${id}.title`),
          description: t(`process.steps.${id}.description`),
        }))}
      />

      <ServiceFeatures
        tone="background"
        heading={t("equipment.heading")}
        items={EQUIPMENT_ITEMS.map(({ id, Icon }) => ({
          id,
          Icon,
          title: t(`equipment.items.${id}.title`),
          description: t(`equipment.items.${id}.description`),
        }))}
      >
        <p className="mt-6 text-muted-foreground md:mt-6.5 md:max-w-160 md:text-lg">
          {t("equipment.editing")}
        </p>
        <p className="mt-4 rounded-xl border border-border bg-surface px-5 py-4 text-base text-muted-foreground md:px-6 md:py-4.5">
          {t("equipment.regulation")}
        </p>
      </ServiceFeatures>

      <CtaBand
        heading={t("cta.heading")}
        subheading={t("cta.subheading")}
        buttonLabel={t("cta.button")}
      />
    </>
  );
}
