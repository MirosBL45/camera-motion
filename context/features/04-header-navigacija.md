# 04 — Header i navigacija

## Pregled

Faza 1, fajl 1/4. Sticky header sa logoom, glavnim menijem, dropdown-om za usluge, SR/EN prekidačem i CTA dugmetom.

## Zahtevi

- Desktop: logo levo (placeholder `public/logo.svg` u duhu opisa iz poglavlja 2 + TODO za pravi fajl); meni Početna · Usluge (dropdown) · Blog · O nama · Kontakt; desno SR/EN prekidač + dugme "Zatražite ponudu" → `/kontakt`
- Dropdown "Usluge": 5 stavki iz `services.ts` sa kratkim opisom u drugom redu (tekstovi iz `nav` namespace-a)
- Language switcher: prebacuje jezik i ZADRŽAVA trenutnu stranicu (getPathname iz feature-a 03)
- Aktivna stavka menija označena (u skladu sa dizajnom — zlatna linija ili boja)
- Mobilni/tablet (< lg): logo + hamburger; hamburger otvara Sheet sa punom navigacijom (usluge kao razgranata lista, ne ugnježden dropdown), SR/EN i CTA na dnu
- Sticky ponašanje bez animacija pojavljivanja; touch mete ≥ 44px; tastaturna navigacija kroz dropdown

## Napomene

- Stavke menija i linkovi usluga se izvode iz `routes` konstanti i `services.ts` — bez dupliranja putanja

## Testiranje

1. Sve stavke rade na oba jezika sa lokalizovanim putanjama; switcher zadržava kontekst na svakoj stranici
2. Dropdown i Sheet pristupačni tastaturom; aktivno stanje tačno
3. Header ispravan na 360px, 768px, 1024px, 1440px

## Reference

- @context/project-overview.md (poglavlja 5, 7, 8.2, 9)
- @context/features/03-i18n-i-tipizirane-rute.md

## Referenca dizajna

- `context/design-reference/` — header sekcija (1:1); element u dizajnu koji ovde nije opisan → pitati pre implementacije
