# 07 — Početna stranica (ispod heroa)

## Pregled

Faza 1, fajl 4/4 (kraj faze). Sekcije koje vode posetioca od prvog utiska do kontakta.

## Zahtevi

Redosled sekcija (uskladiti sa dizajn referencom; ako dizajn ima drugačiji redosled — dizajn pobeđuje):
1. Hero (feature 06)
2. **Pregled usluga** — 5 kartica iz `services.ts` (kadar placeholder, naziv, rečenica, link); FPV kartica istaknuta (zlatna bordura) kao diferencijator
3. **"Radimo drugačije"** — na `surface-warm` pozadini: čuvanje emocija, filmski izgled, glatki gimbal kadrovi, čist zvuk; tekst + fotka placeholder
4. **Traka poverenja** — jedan red sitno: "Snimanje u skladu sa regulativom DCV · DJI dronovi · Montaža u Adobe Premiere Pro"
5. **Završni CTA** — `primary` zelena pozadina, svetli tekst, dugme ka /kontakt

**Recenzije se NE prave** (feature 14 otkazan). Dizajn između „Radimo drugačije" i trake poverenja ima sekciju „Šta kažu mladenci" — ona se preskače, bez placeholdera i bez ostavljenog mesta. Sekcije se spajaju kao da je nikad nije ni bilo.

## Napomene

- Brojke stoje samo u traci unutar heroa (feature 06, po dizajnu) — ispod heroa nema zasebne sekcije sa statistikama
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
- @context/features/06-hero.md

## Referenca dizajna

- `context/design-reference/` — sekcije početne (1:1); element u dizajnu koji nije opisan ni u jednom featureu → pitati
