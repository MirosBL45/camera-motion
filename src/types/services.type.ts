import type { ROUTES } from "@/constants/routes";

export type ServiceIdType = "weddings" | "realEstate" | "events" | "promo" | "fpv";

export type ServiceType = {
  id: ServiceIdType;
  routeKey: Exclude<keyof typeof ROUTES, "blogPost">;
  order: number;
};
