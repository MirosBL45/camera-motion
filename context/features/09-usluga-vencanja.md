# 09 — Usluga: Snimanje venčanja

## Pregled

Faza 2, fajl 2/6. Najvažnija prodajna stranica: `/usluge/snimanje-vencanja`. Emotivan ton + jasni paketi.

## Zahtevi

- Uvod: emotivan pasus — naš posao je da zauvek zabeležimo vaše emocije; venčanje kao na filmu (ideja, NE kopija bilo čijeg teksta)
- Blokovi "kako snimamo" (kroz deljeni šablon iz 08): filmski kvalitet (MILC kamera i u slabom osvetljenju), glatki kadrovi (gimbal, spontani momenti), iz vazduha (dron; FPV prolet kao opcija), čist zvuk (ton iz miksete benda + ambijentalni, miks u postprodukciji; napomena da se bend obavesti unapred)
- **Paketi** iz `packages.ts` — 3 kartice:
  - Osnovni: kamera sa zemlje + kompletna montaža, ceo snimak — od X €
  - Standard: kamera + dron, ceo snimak + best moments spot — od X € (`featured: true` → zlatna bordura, "najpopularniji")
  - Premium: kamera + dron + FPV prolet + statična kamera u crkvi (emocije gostiju), ceo snimak + spot — od X €
  - Ispod: "Sve cene zavise od dogovora, lokacije i trajanja — javite se za posebnu ponudu." + "Cene se odnose na Beograd i okolinu."
- Dodatne opcije (lista): prewedding snimanje (preporuka kad na sam dan nema vremena; zavisi od vremenskih uslova), dodatna statična kamera, produženo čuvanje materijala
- Isporuka: montirani snimak digitalno (link za preuzimanje); preporuka čuvanja na eksternom disku; rok isporuke i avans — placeholder rečenica + `// TODO(vlasnik): upisati rok i avans`
- Radovi: 1-2 `YouTubeLite` embeda (placeholder ID + TODO)
- CTA: "Proverite da li je vaš termin slobodan" → `/kontakt?usluga=vencanje`

## Napomene

- SEO fraze za tekstove: snimanje venčanja, snimanje svadbe dronom, snimatelj za svadbu Beograd

## Testiranje

1. Paketi se renderuju iz packages.ts; promena cene na jednom mestu menja prikaz
2. CTA pre-selektuje "Venčanje" u formi (kad forma bude postojala — za sada query param ispravan)
3. Kompletno na oba jezika; responzivno (paketi u kolonu na mobilnom)

## Reference

- @context/project-overview.md (poglavlja 2, 9, 12, 14)
- @context/features/08-usluge-pregled.md

## Referenca dizajna

- `context/design-reference/` — stranica venčanja / paketi ako postoje u dizajnu; inače obrasci dizajn sistema + pitati kod nedoumica
