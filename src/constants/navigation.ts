import { ROUTES } from "@/constants/routes";

// Glavni meni (redosled po dizajnu); "services" se renderuje kao dropdown / razgranata lista.
export const MAIN_NAV_ITEMS = [
  { id: "home", href: ROUTES.home },
  { id: "services", href: ROUTES.services },
  { id: "blog", href: ROUTES.blog },
  { id: "about", href: ROUTES.about },
  { id: "contact", href: ROUTES.contact },
] as const;
