import type { Metadata } from "next";
import { useTranslations } from "next-intl";

import { CtaBand } from "@/components/sections/CtaBand";
import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyUs } from "@/components/sections/WhyUs";
import { getStaticPageMetadata } from "@/lib/page-metadata";

export function generateMetadata(): Promise<Metadata> {
  return getStaticPageMetadata("home");
}

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
