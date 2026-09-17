import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

import { MAIN_NAV_ITEMS } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";
import { ServicesDropdown } from "./ServicesDropdown";

export function Header() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/96">
      <div className="flex items-center justify-between px-4.5 py-3.5 md:px-12 lg:py-4.5">
        <Logo />

        <div className="hidden items-center gap-5 text-base lg:flex xl:gap-7.5">
          <nav aria-label={t("mainLabel")}>
            <ul className="flex items-center gap-5 xl:gap-7.5">
              {MAIN_NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  {item.id === "services" ? (
                    <ServicesDropdown />
                  ) : (
                    <NavLink href={item.href}>{t(`links.${item.id}`)}</NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <LanguageSwitcher className="ml-0.5 border-l border-border pl-1.5" />
          <Button asChild className="h-auto px-5 py-2.75 font-heading text-base">
            <Link href={ROUTES.contact}>{t("cta")}</Link>
          </Button>
        </div>

        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
