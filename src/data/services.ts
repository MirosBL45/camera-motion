import type { ServiceType } from "@/types/services.type";

// TODO(vlasnik): zameniti pravim YouTube ID-jevima sa kanala Camera Motion.
// Dok su ID-jevi placeholder, `YouTubeLite` prikazuje opis kadra umesto thumbnail-a.
export const PLACEHOLDER_VIDEO_ID = "";

// Nazivi i opisi usluga idu kroz i18n po `id` (poglavlje 9); ovde samo struktura.
const SERVICE_LIST: ServiceType[] = [
  {
    id: "weddings",
    routeKey: "servicesWeddings",
    order: 1,
    contactParam: "vencanje",
    videoIds: [PLACEHOLDER_VIDEO_ID, PLACEHOLDER_VIDEO_ID],
  },
  {
    id: "realEstate",
    routeKey: "servicesRealEstate",
    order: 2,
    contactParam: "nekretnine",
    videoIds: [PLACEHOLDER_VIDEO_ID, PLACEHOLDER_VIDEO_ID],
  },
  {
    id: "events",
    routeKey: "servicesEvents",
    order: 3,
    contactParam: "event",
    videoIds: [PLACEHOLDER_VIDEO_ID],
  },
  {
    id: "promo",
    routeKey: "servicesPromo",
    order: 4,
    contactParam: "promo",
    videoIds: [PLACEHOLDER_VIDEO_ID],
  },
  {
    id: "fpv",
    routeKey: "servicesFpv",
    order: 5,
    contactParam: "fpv",
    videoIds: [PLACEHOLDER_VIDEO_ID],
  },
];

export const SERVICES = [...SERVICE_LIST].sort((a, b) => a.order - b.order);
