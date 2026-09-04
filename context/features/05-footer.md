# 05 — Footer

## Pregled

Faza 1, fajl 2/4. Footer sa navigacijom, kontaktima i suptilnom napomenom o regulativi.

## Zahtevi

- 4 kolone na desktopu (naslagano na mobilnom): brend (logo + rečenica-dve), navigacija, usluge (svih 5 iz `services.ts`), kontakt (email, Instagram i YouTube ikonice — lucide-react)
- Telefon se NE prikazuje u footeru (poglavlje 12) — link vodi na /kontakt
- Donja traka: `© {tekuća godina} Camera Motion. Sva prava zadržana.` + linkovi Politika privatnosti · Uslovi korišćenja + sitna napomena: "Snimanje dronom u skladu sa regulativom Direktorata civilnog vazduhoplovstva."
- Pozadina `surface-warm` sa gornjom bordurom (ili tačno po dizajnu); hover na linkovima zlatna
- Bez newslettera i formi

## Napomene

- Instagram/YouTube URL-ovi kao konstante u `src/constants/` sa TODO da vlasnik upiše tačne profile

## Testiranje

1. Svi linkovi lokalizovani i ispravni na oba jezika (uklj. pravne stranice — postoje kao prazne rute iz feature-a 03)
2. Responzivan raspored na svim širinama

## Reference

- @context/project-overview.md (poglavlja 2, 7, 12)
- @context/features/04-header-navigacija.md

## Referenca dizajna

- `context/design-reference/` — footer sekcija (1:1)
