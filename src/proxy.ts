import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // dev-ui živi van [locale] stabla (feature 02) — mora ostati izuzet iz i18n rewrite-a
  matcher: ["/((?!api|_next|_vercel|dev-ui|.*\\..*).*)"],
};
