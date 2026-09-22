# 08 — Stranica /usluge (pregled)

## Pregled

Faza 2, fajl 1/6. Pregledna stranica svih usluga sa putevima ka pojedinačnim stranicama. Ovde se postavlja i deljeni šablon za stranice usluga (koriste ga feature-i 09-13).

## Zahtevi

- Uvod: šta Camera Motion radi, za koga, gde (poglavlje 3)
- Grid većih kartica za 5 usluga iz `services.ts`: placeholder kadar 16:9, naziv, 2-3 rečenice, "od X €" (iz `priceFrom`), dugme "Detaljnije"
- Rečenica o montaži (usputno, bez posebne stranice): svaka usluga uključuje kompletnu montažu u Premiere Pro; po dogovoru i montaža tuđeg materijala
- Rečenica o budućoj fotografiji — implementirana ali ZAKOMENTARISANA sa `// TODO(team): otkomentarisati kad usluga krene`
- Mini CTA ka /kontakt na dnu
- **Deljeni šablon stranice usluge** (`components/sections/service-page/...`): uvodni blok, blokovi "kako snimamo", sekcija radova (YouTube lite embed iz `videoIds`), cena, CTA ka kontaktu sa `?usluga=` pre-selekcijom — feature-i 09-13 ga pune sadržajem

## Napomene

- YouTube embed: facade pristup (thumbnail + play, iframe tek na klik) — komponenta `YouTubeLite` nastaje ovde, koristi se svuda
- Sve iz `services.ts` — bez dupliranja podataka po stranicama

## Testiranje

1. Stranica čita podatke iz services.ts; lokalizovana; kartice vode na ispravne rute
2. `YouTubeLite` ne učitava iframe pre klika (proveriti u network tabu)

## Reference

- @context/project-overview.md (poglavlja 3, 5, 7, 9)
- @context/features/03-i18n-i-tipizirane-rute.md

## Referenca dizajna

- `context/design-reference/` — usluge sekcija/stranica ako postoji u dizajnu; u suprotnom slediti dizajn sistem i obrasce sa početne, uz pitanje ako je nešto nejasno
