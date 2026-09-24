import type { ServiceIdType } from "./services.type";

export type PackageType = {
  /** Stabilan ključ; koristi se i za i18n (`services.<usluga>.packages.<id>`). */
  id: string;
  /** Gola brojka, bez valute i bez formatiranja (poglavlje 9.1). */
  priceFrom: number;
  /** Zlatna bordura + badge „najpopularniji". */
  featured?: boolean;
  /** i18n ključevi stavki u listi paketa. */
  features: string[];
};

// Usluga bez paketa se izostavlja — komponenta paketa se tada ne renderuje (poglavlje 9.1).
export type PackagesType = Partial<Record<ServiceIdType, PackageType[]>>;
