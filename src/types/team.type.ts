import type { StaticImageData } from "next/image";

import type messages from "@/i18n/messages/sr";

// `id` mora da postoji u `about.team` — član bez uloge i opisa je tipska greška.
export type TeamMemberIdType = keyof (typeof messages)["about"]["team"];

export type TeamMemberType = {
  id: TeamMemberIdType;
  /** Samo ime, bez prezimena — vlastito ime, ne prevodi se. */
  name: string;
  /** Dok ne postoji → portret placeholder iz dizajna. */
  image?: StaticImageData;
};
