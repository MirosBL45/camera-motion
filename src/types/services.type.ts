import type { ROUTES } from "@/constants/routes";

export type ServiceIdType = "weddings" | "realEstate" | "events" | "promo" | "fpv";

// Vrednosti za `?usluga=` na kontaktu — stabilne na oba jezika (poglavlje 7.3), ne prevode se.
export type ServiceContactParamType = "vencanje" | "nekretnine" | "event" | "promo" | "fpv";

export type ServiceType = {
  id: ServiceIdType;
  routeKey: Exclude<keyof typeof ROUTES, "blogPost">;
  order: number;
  contactParam: ServiceContactParamType;
  videoIds: string[];
};
