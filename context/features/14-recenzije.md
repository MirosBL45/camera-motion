# 14 — Recenzije (društveni dokaz)

## Pregled

Faza 3, fajl 1/5. Tekstualne recenzije kao ponovo upotrebljiva komponenta; uključivanje na početnu (mesto ostavljeno u featureu 07).

## Zahtevi

- Podaci u `src/data/testimonials.ts` po strukturi iz poglavlja 9; ubaciti 2 placeholder recenzije sa `// TODO(vlasnik): zameniti pravim utiscima`
- Komponenta "Šta kažu klijenti": kartice na `surface` sa tankom bordurom — tekst + ime + tip događaja i godina ("Milica i Nikola · venčanje, 2026.")
- Bez zvezdica; bez karusela dok nema 4+ recenzija — običan grid koji radi sa 1, 2 ili više stavki
- Opciono filtriranje po `serviceId` (za kasnije prikazivanje na stranicama usluga — samo podržati parametar, ne uključivati još)
- Uključiti komponentu na početnu na mesto iz feature-a 07

## Testiranje

1. Grid ispravan sa 1, 2 i 3+ recenzija; lokalizovano
2. Početna prikazuje sekciju bez layout pomaka

## Reference

- @context/project-overview.md (poglavlje 9)
- @context/features/07-pocetna-stranica.md

## Referenca dizajna

- `context/design-reference/` — sekcija recenzija (1:1)
