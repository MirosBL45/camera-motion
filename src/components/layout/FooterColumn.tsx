import type { AppRoute } from "@/types/routes.type";

import { Link } from "@/i18n/navigation";

export const FOOTER_LINK_CLASSES =
  "inline-flex items-center rounded-sm text-muted-foreground transition-colors duration-150 hover:text-accent-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-warm focus-visible:outline-none pointer-coarse:min-h-11";

interface IFooterColumnProps {
  title: string;
  links: { key: string; href: Exclude<AppRoute, "/blog/[slug]">; label: string }[];
}

export function FooterColumn({ title, links }: IFooterColumnProps) {
  return (
    <nav aria-label={title}>
      <h2 className="mb-3.5 text-base leading-normal font-semibold tracking-normal text-foreground">
        {title}
      </h2>
      <ul className="flex flex-col gap-2.25 text-base">
        {links.map((link) => (
          <li key={link.key}>
            <Link href={link.href} className={FOOTER_LINK_CLASSES}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
