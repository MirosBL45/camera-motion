import { useTranslations } from "next-intl";

import { MAIN_NAV_ITEMS } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { SERVICES } from "@/data/services";
import { Link } from "@/i18n/navigation";

import { FOOTER_LINK_CLASSES, FooterColumn } from "./FooterColumn";
import { FooterContact } from "./FooterContact";
import { Logo } from "./Logo";

const LEGAL_LINKS = [
  { id: "privacy", href: ROUTES.privacy },
  { id: "terms", href: ROUTES.terms },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tServices = useTranslations("services");

  return (
    <footer className="mt-auto bg-surface-warm px-5 pt-8.5 md:px-12 lg:pt-14">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo variant="footer" />
          <p className="mt-3 max-w-72.5 text-base leading-[1.6] text-muted-foreground lg:mt-4">
            {t("description")}
          </p>
        </div>

        <FooterColumn
          title={t("headings.navigation")}
          links={MAIN_NAV_ITEMS.map((item) => ({
            key: item.id,
            href: item.href,
            label: tNav(`links.${item.id}`),
          }))}
        />

        <FooterColumn
          title={t("headings.services")}
          links={SERVICES.map((service) => ({
            key: service.id,
            href: ROUTES[service.routeKey],
            label: tServices(`${service.id}.title`),
          }))}
        />

        <FooterContact />
      </div>

      <div className="mt-12 flex flex-col items-start gap-3 border-t border-border pt-5 pb-6 text-sm text-muted-foreground lg:flex-row lg:items-center lg:justify-between lg:gap-7.5">
        <p className="lg:shrink-0">{t("copyright", { year: new Date().getFullYear() })}</p>
        <nav aria-label={t("legalLabel")} className="lg:shrink-0">
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {LEGAL_LINKS.map((link) => (
              <li key={link.id}>
                <Link href={link.href} className={FOOTER_LINK_CLASSES}>
                  {t(`legal.${link.id}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="max-w-100 lg:text-right">{t("regulationNote")}</p>
      </div>
    </footer>
  );
}
