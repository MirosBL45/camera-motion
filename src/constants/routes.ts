// Interne rute (leva kolona tabele 7.1) — jedini izvor istine za putanje kroz app.
export const ROUTES = {
  home: "/",
  services: "/services",
  servicesWeddings: "/services/weddings",
  servicesRealEstate: "/services/real-estate",
  servicesEvents: "/services/events",
  servicesPromo: "/services/promo",
  servicesFpv: "/services/fpv",
  blog: "/blog",
  blogPost: "/blog/[slug]",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
} as const;
