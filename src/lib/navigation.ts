import type { AppRoute } from "@/types/routes.type";

// Aktivna stavka menija: početna samo tačno, ostale i za podstranice (npr. /services/weddings → /services).
export function isActiveRoute(pathname: string, href: AppRoute): boolean {
  if (href === "/") return pathname === "/";

  return pathname === href || pathname.startsWith(`${href}/`);
}
