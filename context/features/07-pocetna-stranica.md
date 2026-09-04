# 07 — Početna stranica (ispod heroa)

## Pregled

Faza 1, fajl 4/4 (kraj faze). Sekcije koje vode posetioca od prvog utiska do kontakta.

## Zahtevi

Redosled sekcija (uskladiti sa dizajn referencom; ako dizajn ima drugačiji redosled — dizajn pobeđuje):
1. Hero (feature 06)
2. **Pregled usluga** — 5 kartica iz `services.ts` (kadar placeholder, naziv, rečenica, link); FPV kartica istaknuta (zlatna bordura) kao diferencijator
3. **"Radimo drugačije"** — na `surface-warm` pozadini: čuvanje emocija, filmski izgled, glatki gimbal kadrovi, čist zvuk; tekst + fotka placeholder
4. **Recenzije** — placeholder sekcija sa TODO komentarom; prava komponenta dolazi u featureu 14 i ovde se samo uključuje (ostaviti jasno mesto)
5. **Traka poverenja** — jedan red sitno: "Snimanje u skladu sa regulativom DCV · DJI dronovi · Montaža u Adobe Premiere Pro"
6. **Završni CTA** — `primary` zelena pozadina, svetli tekst, dugme ka /kontakt

## Napomene

- Bez sekcije sa brojkama/statistikama (mlad brend — ne isticati male brojke)
- Svi tekstovi u `home` namespace-u; bez scroll animacija

## Testiranje

1. Početna kompletna na oba jezika; svi linkovi rade
2. Responzivno na svim kontrolnim širinama; nema horizontalnog skrola

## DoD Faze 1 (zbirna provera)

- [ ] Header + footer na svim stranicama, switcher zadržava kontekst
- [ ] Početna vizuelno odgovara dizajn referenci (1:1)
- [ ] Build zelen; nema hardkodovanih tekstova

## Reference

- @context/project-overview.md (poglavlja 2, 5, 9, 10)
- @context/features/06-hero.md, @context/features/14-recenzije.md

## Referenca dizajna

- `context/design-reference/` — sekcije početne (1:1); element u dizajnu koji nije opisan ni u jednom featureu → pitati
