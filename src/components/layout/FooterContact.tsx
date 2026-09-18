import { useTranslations } from "next-intl";

import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { YouTubeIcon } from "@/components/icons/YouTubeIcon";
import { PhoneReveal } from "@/components/shared/PhoneReveal";

import { CONTACT_DISPLAY_EMAIL, SOCIAL_LINKS } from "@/constants/contact";

import { FOOTER_LINK_CLASSES } from "./FooterColumn";

const SOCIAL_ITEMS = [
  { id: "instagram", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { id: "youtube", href: SOCIAL_LINKS.youtube, Icon: YouTubeIcon },
] as const;

export function FooterContact() {
  const t = useTranslations("footer");

  return (
    <div>
      <h2 className="mb-3.5 text-base leading-normal font-semibold tracking-normal text-foreground">
        {t("headings.contact")}
      </h2>
      <address className="flex flex-col items-start gap-2.25 text-base text-muted-foreground not-italic">
        <span>{t("location")}</span>
        <a href={`mailto:${CONTACT_DISPLAY_EMAIL}`} className={FOOTER_LINK_CLASSES}>
          {CONTACT_DISPLAY_EMAIL}
        </a>
        <PhoneReveal className={FOOTER_LINK_CLASSES} />
        <ul aria-label={t("social.label")} className="mt-2 flex gap-2.5">
          {SOCIAL_ITEMS.map(({ id, href, Icon }) => (
            <li key={id}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(`social.${id}`)}
                className="flex size-11 items-center justify-center rounded-lg border border-border bg-surface text-accent-gold transition-colors duration-150 hover:border-accent-gold hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-warm focus-visible:outline-none"
              >
                <Icon className="size-5" />
              </a>
            </li>
          ))}
        </ul>
      </address>
    </div>
  );
}
