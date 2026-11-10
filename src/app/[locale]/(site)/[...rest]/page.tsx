import { notFound } from "next/navigation";

// Svaka adresa koja ne odgovara nijednoj ruti završava ovde, pa se prikazuje lokalizovana
// 404 stranica (`not-found.tsx`) sa headerom i footerom sajta.
export default function CatchAllPage() {
  notFound();
}
