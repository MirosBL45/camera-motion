import type { AppRoute } from "@/types/routes.type";
import type { ServiceContactParamType } from "@/types/services.type";

import { ROUTES } from "@/constants/routes";
import { SERVICES } from "@/data/services";

// Aktivna stavka menija: početna samo tačno, ostale i za podstranice (npr. /services/weddings → /services).
export function isActiveRoute(pathname: string, href: AppRoute): boolean {
  if (href === "/") return pathname === "/";

  return pathname === href || pathname.startsWith(`${href}/`);
}

// `?usluga=` za kontakt kad je posetilac na stranici usluge; na ostalim stranicama nema ga.
export function getServiceContactParam(pathname: string): ServiceContactParamType | undefined {
  return SERVICES.find(({ routeKey }) => ROUTES[routeKey] === pathname)?.contactParam;
}
