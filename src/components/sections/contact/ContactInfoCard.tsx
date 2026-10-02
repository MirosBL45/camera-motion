import { useTranslations } from "next-intl";

import { cn } from "cn";

import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { YouTubeIcon } from "@/components/icons/YouTubeIcon";
import { PhoneReveal } from "@/components/shared/PhoneReveal";

import { CONTACT_DISPLAY_EMAIL, SOCIAL_LINKS } from "@/constants/contact";

const SOCIAL_ITEMS = [
  { id: "instagram", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { id: "youtube", href: SOCIAL_LINKS.youtube, Icon: YouTubeIcon },
] as const;

const FOCUS_CLASSES =
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-warm focus-visible:outline-none";

const LABEL_CLASSES = "text-[0.9375rem] font-semibold text-foreground";

// Kartica „Radije telefonom?" (artboard `1c`). Broj ulazi u DOM tek na klik (poglavlje 12).
// Blok „Područje rada" sa mapom iz dizajna se svesno ne pravi — područje je rečenica ovde.
export function ContactInfoCard() {
  const t = useTranslations("contact.info");

  return (
    <section
      aria-labelledby="contact-info-heading"
      className="rounded-xl border border-border bg-surface-warm p-6 md:p-8.5"
    >
      <h2
        id="contact-info-heading"
        className="text-2xl leading-tight font-medium tracking-normal md:text-[1.625rem]"
      >
        {t("heading")}
      </h2>
      <p className="mt-2.5 text-base leading-[1.6] text-muted-foreground">{t("hours")}</p>

      <div className="mt-5.5">
        <PhoneReveal
          className={cn(
            "inline-flex min-h-11 items-center rounded-lg border border-accent-gold bg-surface px-6 py-3.5 font-heading text-[1.0625rem] font-medium text-foreground transition-colors duration-200 hover:bg-accent-gold-soft",
            FOCUS_CLASSES
          )}
        />
      </div>

      <div className="mt-6.5 border-t border-border pt-5.5">
        <h3 className={LABEL_CLASSES}>{t("email")}</h3>
        {/* TODO: kasnije info@cameramotion.net — menja se u CONTACT_DISPLAY_EMAIL */}
        <a
          href={`mailto:${CONTACT_DISPLAY_EMAIL}`}
          className={cn(
            "mt-1.5 inline-flex min-h-11 items-center rounded-sm text-[1.0625rem] break-all text-primary underline-offset-4 hover:underline",
            FOCUS_CLASSES
          )}
        >
          {CONTACT_DISPLAY_EMAIL}
        </a>
      </div>

      <div className="mt-4">
        <h3 className={LABEL_CLASSES}>{t("area.heading")}</h3>
        <p className="mt-1.5 text-base text-muted-foreground">{t("area.text")}</p>
      </div>

      <div className="mt-5.5">
        <h3 className={LABEL_CLASSES}>{t("social.heading")}</h3>
        <ul className="mt-2.5 flex flex-wrap gap-2.5">
          {SOCIAL_ITEMS.map(({ id, href, Icon }) => (
            <li key={id}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex min-h-11 items-center gap-2.25 rounded-lg border border-border bg-surface px-4 py-2.75 text-base text-foreground transition-colors duration-150 hover:border-accent-gold hover:text-primary",
                  FOCUS_CLASSES
                )}
              >
                <Icon className="size-5.5 text-accent-gold" />
                {t(`social.${id}`)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
