"use client";

import type { AppRoute } from "@/types/routes.type";

import { Link, usePathname } from "@/i18n/navigation";

interface INavLinkProps {
  href: Exclude<AppRoute, "/blog/[slug]">;
  children: React.ReactNode;
}

export function NavLink({ href, children }: INavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      aria-current={pathname === href ? "page" : undefined}
      className="inline-flex min-h-11 items-center rounded-sm text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
    >
      {children}
    </Link>
  );
}
