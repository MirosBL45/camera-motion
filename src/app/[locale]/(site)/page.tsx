import { useTranslations } from "next-intl";

import { CtaBand } from "@/components/sections/CtaBand";
import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyUs } from "@/components/sections/WhyUs";

export default function HomePage() {
  const t = useTranslations("home.cta");

  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyUs />
      <TrustBar />
      <CtaBand heading={t("heading")} subheading={t("subheading")} buttonLabel={t("button")} />
    </>
  );
}
