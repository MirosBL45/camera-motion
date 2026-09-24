import type { ServiceIdType, ServiceType } from "@/types/services.type";

// TODO(vlasnik): zameniti pravim YouTube ID-jevima sa kanala Camera Motion.
// Dok su ID-jevi placeholder, `YouTubeLite` prikazuje opis kadra umesto thumbnail-a.
export const PLACEHOLDER_VIDEO_ID = "";

// Nazivi i opisi usluga idu kroz i18n po `id` (poglavlje 9); ovde samo struktura.
// Mapa po `id` da stranica usluge uzme svoj zapis bez pretrage po listi.
export const SERVICES_BY_ID = {
  weddings: {
    id: "weddings",
    routeKey: "servicesWeddings",
    order: 1,
    contactParam: "vencanje",
    videoIds: [PLACEHOLDER_VIDEO_ID, PLACEHOLDER_VIDEO_ID],
  },
  realEstate: {
    id: "realEstate",
    routeKey: "servicesRealEstate",
    order: 2,
    contactParam: "nekretnine",
    videoIds: [PLACEHOLDER_VIDEO_ID, PLACEHOLDER_VIDEO_ID],
  },
  events: {
    id: "events",
    routeKey: "servicesEvents",
    order: 3,
    contactParam: "event",
    videoIds: [PLACEHOLDER_VIDEO_ID, PLACEHOLDER_VIDEO_ID],
  },
  promo: {
    id: "promo",
    routeKey: "servicesPromo",
    order: 4,
    contactParam: "promo",
    videoIds: [PLACEHOLDER_VIDEO_ID, PLACEHOLDER_VIDEO_ID],
  },
  fpv: {
    id: "fpv",
    routeKey: "servicesFpv",
    order: 5,
    contactParam: "fpv",
    videoIds: [PLACEHOLDER_VIDEO_ID],
  },
} satisfies Record<ServiceIdType, ServiceType>;

export const SERVICES: ServiceType[] = Object.values(SERVICES_BY_ID).sort(
  (a, b) => a.order - b.order
);
