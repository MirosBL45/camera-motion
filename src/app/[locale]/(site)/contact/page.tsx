import { getTranslations } from "next-intl/server";

import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactInfoCard } from "@/components/sections/contact/ContactInfoCard";
import { isContactService } from "@/lib/contact-form";

// Raspored po dizajnu (artboard `1c`): naslov i uvod, pa forma levo i kartica desno;
// na telefonu forma ide prva. Bez slanja — backend je feature 17.
export default async function ContactPage({ searchParams }: PageProps<"/[locale]/contact">) {
  const t = await getTranslations("contact.intro");
  const { usluga } = await searchParams;
  // Nepoznata ili višestruka vrednost `?usluga=` se ignoriše — forma kreće bez izbora
  const defaultService = isContactService(usluga) ? usluga : undefined;

  return (
    <>
      <section className="px-5 pt-6 pb-2 md:px-12 md:pt-16 md:pb-6">
        <h1 className="md:text-[3.25rem]">{t("heading")}</h1>
        <p className="mt-4 leading-[1.6] text-muted-foreground md:max-w-155 md:text-xl">
          {t("lead")}
        </p>
      </section>

      <div className="grid items-start gap-6 px-5 pt-6 pb-12 md:gap-8 md:px-12 md:pt-8 md:pb-21 lg:grid-cols-[1.25fr_1fr]">
        <ContactForm key={defaultService} defaultService={defaultService} />
        <ContactInfoCard />
      </div>
    </>
  );
}
