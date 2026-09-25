import type { TeamMemberType } from "@/types/team.type";

// Kada bude prave slike — ubaciti je u src/assets/team/ i otkomentarisati:
// import miroslavImg from "@/assets/team/miroslav.jpg";
// ...pa u objektu člana: image: miroslavImg
// Statički import daje dimenzije i automatski placeholder="blur".

// Ekipa na stranici O nama (poglavlje 9.2) — jedino mesto u projektu gde stoje imena.
// Vlasnik dodaje/uklanja članove samo u ovom nizu; uloga i opis idu kroz
// `about.team.{id}` u i18n porukama (sr + en), redosled u nizu je redosled kartica.
export const TEAM: TeamMemberType[] = [
  // TODO(vlasnik): tekst po osobi
  { id: "miroslav", name: "Miroslav" },
  // TODO(vlasnik): tekst po osobi
  { id: "bojan", name: "Bojan" },
  // TODO(vlasnik): tekst po osobi
  { id: "nikola", name: "Nikola" },
  // TODO(vlasnik): tekst po osobi
  { id: "marko", name: "Marko" },
  // TODO(vlasnik): tekst po osobi
  { id: "petar", name: "Petar" },
  // TODO(vlasnik): tekst po osobi
  { id: "nina", name: "Nina" },
];
