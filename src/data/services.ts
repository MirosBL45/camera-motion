import type { ServiceType } from "@/types/services.type";

// Nazivi i opisi usluga idu kroz i18n po `id` (poglavlje 9); ovde samo struktura.
const SERVICE_LIST: ServiceType[] = [
  { id: "weddings", routeKey: "servicesWeddings", order: 1 },
  { id: "realEstate", routeKey: "servicesRealEstate", order: 2 },
  { id: "events", routeKey: "servicesEvents", order: 3 },
  { id: "promo", routeKey: "servicesPromo", order: 4 },
  { id: "fpv", routeKey: "servicesFpv", order: 5 },
];

export const SERVICES = [...SERVICE_LIST].sort((a, b) => a.order - b.order);
