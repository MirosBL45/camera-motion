# 16 — Kontakt stranica (UI, bez slanja)

## Pregled

Faza 3, fajl 2/4. `/kontakt` — kompletna stranica i forma sa validacijom, ALI bez slanja (backend u featureu 17; submit za sada radi lokalnu validaciju i loguje).

## Zahtevi

- Layout: desktop 2 kolone — forma (~60%) + kontakt info kartica; mobilni: forma prva
- Forma (shadcn Form + react-hook-form + zod):
  1. Ime i prezime* · 2. Email* (validacija) · 3. Telefon (opciono, placeholder "+381 6x ...") · 4. Tip usluge — Select: Venčanje / Nekretnine / Event ili proslava / Promo video / FPV / Drugo · 5. Datum događaja (opciono) · 6. Lokacija (opciono) · 7. Poruka*
  - Pre-selekcija tipa iz `?usluga=` (vrednosti iz poglavlja 7.3)
  - Honeypot skriveno polje (koristi ga feature 17)
  - Checkbox saglasnosti* sa linkom na politiku privatnosti
  - Dugme "Pošaljite upit" sa loading stanjem
- Stanja UI: uspeh ("Hvala! Odgovaramo u roku od 24h." + reset forme), greška (podaci ostaju), rate-limit poruka ("Previše pokušaja — pokušajte za nekoliko minuta.") — stanja postoje, feature 17 ih povezuje
- Kontakt info kartica: **telefon klik-za-prikaz** — dugme "Prikaži broj telefona"; broj se drži u klijentskoj komponenti i renderuje kao `tel:` link tek nakon klika; broj NE sme biti u inicijalnom HTML-u (poglavlje 12); `// TODO(vlasnik): upisati broj`. Plus Instagram/YouTube linkovi, radno područje ("Beograd i okolina · šire uz dogovor"), email (`// TODO: kasnije info@cameramotion.net`)
- Validacione poruke u `contact` namespace-u (sr + en)
- **Bez mape.** Dizajn `1c` ima zaseban blok „Područje rada" sa placeholderom `mapa: područje rada` — on se svesno preskače (odluka vlasnika). Područje rada ostaje samo kao rečenica u kontakt kartici, kako stoji gore

## Testiranje

1. Validacija radi sa porukama na oba jezika; obavezna polja i saglasnost blokiraju submit
2. `?usluga=vencanje` (i ostale vrednosti) pre-selektuju tip na obe lokalizacije
3. Telefon nevidljiv u view-source pre klika; posle klika `tel:` link radi

## Reference

- @context/project-overview.md (poglavlja 7.3, 8.2, 12)
- @context/features/17-kontakt-backend.md

## Referenca dizajna

- `context/design-reference/` — kontakt stranica (1:1)
