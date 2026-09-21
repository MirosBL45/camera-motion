"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { cn } from "cn";

import { ROUTES } from "@/constants/routes";
import { SERVICES } from "@/data/services";
import { Link, usePathname } from "@/i18n/navigation";

// Klik na "Usluge" vodi na pregled usluga; padajući meni se otvara na hover ili kad fokus uđe u grupu.
export function ServicesDropdown() {
  const tNav = useTranslations("nav");
  const tServices = useTranslations("services");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Dok je fokus na stavki menija, meni ostaje otvoren — inače bi fokusirana stavka postala nevidljiva
  function handleMouseLeave(event: React.MouseEvent<HTMLDivElement>) {
    const panel = event.currentTarget.querySelector("ul");
    if (!panel?.contains(document.activeElement)) setIsOpen(false);
  }

  function handleFocus(event: React.FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(true);
  }

  function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Escape" || !isOpen) return;
    setIsOpen(false);
    event.currentTarget.querySelector<HTMLAnchorElement>("a")?.focus();
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <Link
        href={ROUTES.services}
        aria-current={pathname === ROUTES.services ? "page" : undefined}
        className={cn(
          "inline-flex min-h-11 items-center rounded-sm text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
          isOpen && "text-primary"
        )}
      >
        <span className="flex items-center gap-1.75">
          {tNav("links.services")}
          <span
            aria-hidden="true"
            className="inline-block size-1.5 -translate-y-0.5 rotate-45 border-r-[1.5px] border-b-[1.5px] border-muted-foreground"
          />
        </span>
      </Link>

      {/* pt-1 premošćava razmak do panela da hover ne prekine pri prelasku mišem; invisible ga izbacuje iz Tab redosleda */}
      <div
        className={cn(
          "absolute top-full -left-4.5 z-50 pt-1 transition-[opacity,translate,visibility] duration-200 ease-out",
          isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        )}
      >
        <ul className="flex w-75 flex-col gap-0.5 rounded-xl border border-border bg-surface p-2.5 shadow-card-hover">
          {SERVICES.map((service) => {
            const href = ROUTES[service.routeKey];

            return (
              <li key={service.id}>
                <Link
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex flex-col gap-0.5 rounded-lg px-3 py-2.25 text-base text-foreground hover:bg-surface-warm focus-visible:bg-surface-warm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                    pathname === href && "bg-surface-warm"
                  )}
                >
                  <span>{tServices(`${service.id}.title`)}</span>
                  <span className="text-sm leading-snug text-muted-foreground">
                    {tNav(`serviceDescriptions.${service.id}`)}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
