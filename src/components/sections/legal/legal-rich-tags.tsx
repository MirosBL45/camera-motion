import type { ReactNode } from "react";

import { CONTACT_DISPLAY_EMAIL } from "@/constants/contact";
import { LEGAL_EXTERNAL_LINKS } from "@/constants/legal";
import { INLINE_LINK_FOCUS_CLASSES } from "@/constants/link-styles";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

function externalLink(href: string) {
  return function ExternalLink(chunks: ReactNode) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={INLINE_LINK_FOCUS_CLASSES}
      >
        {chunks}
      </a>
    );
  };
}

// Tagovi i vrednosti za `t.rich` u tekstovima pravnih stranica (`legal` namespace).
// Email se čita sa jednog mesta (`CONTACT_DISPLAY_EMAIL`), ne upisuje se u prevode.
export const LEGAL_RICH_VALUES = {
  email: CONTACT_DISPLAY_EMAIL,
  b: (chunks: ReactNode) => <strong>{chunks}</strong>,
  mail: (chunks: ReactNode) => (
    <a href={`mailto:${CONTACT_DISPLAY_EMAIL}`} className={INLINE_LINK_FOCUS_CLASSES}>
      {chunks}
    </a>
  ),
  privacy: (chunks: ReactNode) => (
    <Link href={ROUTES.privacy} className={INLINE_LINK_FOCUS_CLASSES}>
      {chunks}
    </Link>
  ),
  google: externalLink(LEGAL_EXTERNAL_LINKS.googlePrivacy),
  poverenik: externalLink(LEGAL_EXTERNAL_LINKS.poverenik),
};
