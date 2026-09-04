# 10 — Usluga: Snimanje nekretnina

## Pregled

Faza 2, fajl 3/6. `/usluge/snimanje-nekretnina` — za vlasnike, agencije i izdavaoce (Booking/Airbnb).

## Zahtevi

Kroz deljeni šablon iz 08:
- Uvod: video prodaje nekretninu bolje od fotografija — kadrovi iz vazduha (lokacija, okruženje, prilaz) + FPV prolet kroz objekat daje osećaj prostora
- Za koga: prodaja stanova/kuća, izdavanje (Booking/Airbnb), agencije, placevi
- Šta dobijate: kratak video 30-90s za oglase i mreže; uspravna 9:16 verzija za Instagram/TikTok kao opcija; vazduh + unutrašnjost (gimbal ili FPV)
- Referentni primer: FPV prolet kroz kuću sa Booking-a — `YouTubeLite` (placeholder ID + TODO)
- **Paketi** iz `packages.ts`, ključ `realEstate` (poglavlje 9.1) — 3 kartice, ista komponenta kao na venčanjima:
  - **Oglas — od 120 €**: prolet dronom oko objekta · spot 30-45 s za oglas · 10 fotografija iz vazduha · isporuka u 4 dana
  - **Apartman — od 250 €** (`featured: true`): dron i snimanje unutrašnjosti · spot 60-90 s + vertikalni rez · 20 obrađenih fotografija · titlovi na srpskom i engleskom
  - **Vila i poslovni prostor — od 450 €**: sve iz paketa Apartman · FPV prolet kroz objekat · snimanje u zlatnom satu i noću · snimanje u dva dana ako treba
  - Ispod: "Cene su početne, za objekte u Beogradu i okolini. Za više objekata na istoj adresi pravimo popust."
- CTA → `/kontakt?usluga=nekretnine`

## Napomene

- SEO fraze: snimanje nekretnina dronom, video za prodaju stana, snimanje apartmana za Booking

## Testiranje

1. Kompletno na oba jezika; embed lite; CTA sa ispravnim query paramom

## Reference

- @context/project-overview.md (poglavlja 3, 9, 14)
- @context/features/08-usluge-pregled.md
