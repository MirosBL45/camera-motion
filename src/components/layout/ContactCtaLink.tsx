"use client";

import type { ComponentProps } from "react";

import { getServiceContactParam } from "@/lib/navigation";

import { ROUTES } from "@/constants/routes";
import { Link, usePathname } from "@/i18n/navigation";

// „Zatražite ponudu" u header-u i mobilnom meniju: na stranici usluge vodi na kontakt sa
// `?usluga=` te usluge, na ostalim stranicama na čist kontakt. Ostali props (klase, onClick
// iz `Button`/`SheetClose` sa `asChild`) prosleđuju se na `Link`.
export function ContactCtaLink(props: Omit<ComponentProps<typeof Link>, "href">) {
  const usluga = getServiceContactParam(usePathname());

  return (
    <Link
      {...props}
      href={usluga ? { pathname: ROUTES.contact, query: { usluga } } : ROUTES.contact}
    />
  );
}
