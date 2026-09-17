"use client";

import { useTranslations } from "next-intl";

import { cn } from "cn";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { isActiveRoute } from "@/lib/navigation";

import { MAIN_NAV_ITEMS } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { SERVICES } from "@/data/services";
import { Link, usePathname } from "@/i18n/navigation";

import { LanguageSwitcher } from "./LanguageSwitcher";

const ITEM_CLASSES =
  "flex min-h-11 items-center rounded-lg px-3 font-heading text-lg text-foreground hover:bg-surface-warm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

export function MobileNav() {
  const tNav = useTranslations("nav");
  const tServices = useTranslations("services");
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger
        aria-label={tNav("openMenu")}
        className="-mr-2.5 flex size-11 items-center justify-center rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <span aria-hidden="true" className="flex w-6.5 flex-col gap-1.25">
          <span className="h-0.5 rounded-xs bg-foreground" />
          <span className="h-0.5 rounded-xs bg-foreground" />
          <span className="h-0.5 rounded-xs bg-foreground" />
        </span>
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        aria-describedby={undefined}
        className="gap-0 bg-background sm:max-w-sm"
      >
        <div className="flex items-center justify-between border-b border-border px-4.5 py-3.5">
          <SheetTitle className="font-heading text-lg font-medium">{tNav("menuTitle")}</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="-mr-2.5 size-11">
              <XIcon className="size-5" />
              <span className="sr-only">{tNav("closeMenu")}</span>
            </Button>
          </SheetClose>
        </div>

        <nav aria-label={tNav("mainLabel")} className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="flex flex-col gap-1">
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = isActiveRoute(pathname, item.href);

              if (item.id === "services") {
                return (
                  <li key={item.id}>
                    <SheetClose asChild>
                      <Link
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className={cn(ITEM_CLASSES, isActive && "text-primary")}
                      >
                        {tNav("links.services")}
                      </Link>
                    </SheetClose>
                    <ul className="ml-3 flex flex-col gap-0.5 border-l border-border pl-2">
                      {SERVICES.map((service) => {
                        const href = ROUTES[service.routeKey];

                        return (
                          <li key={service.id}>
                            <SheetClose asChild>
                              <Link
                                href={href}
                                aria-current={pathname === href ? "page" : undefined}
                                className={cn(
                                  "flex min-h-11 flex-col justify-center rounded-lg px-3 py-2 text-base text-foreground hover:bg-surface-warm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                                  pathname === href && "bg-surface-warm"
                                )}
                              >
                                <span>{tServices(`${service.id}.title`)}</span>
                                <span className="text-sm leading-snug text-muted-foreground">
                                  {tNav(`serviceDescriptions.${service.id}`)}
                                </span>
                              </Link>
                            </SheetClose>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={cn(ITEM_CLASSES, isActive && "bg-surface-warm")}
                    >
                      {tNav(`links.${item.id}`)}
                    </Link>
                  </SheetClose>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-col gap-4 border-t border-border px-4.5 py-5">
          <LanguageSwitcher />
          <SheetClose asChild>
            <Button asChild className="h-auto py-4 font-heading text-[1.0625rem]">
              <Link href={ROUTES.contact}>{tNav("cta")}</Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
