# 15 — Stranica O nama

## Pregled

Faza 3, fajl 1/4. `/o-nama` — lična priča koja gradi poverenje.

## Zahtevi

- Priča (tekst + portret placeholder, 2 kolone na desktopu): ljubav prema snimanju i tehnologiji, letenje DJI dronovima, montaža u Premiere Pro, pristup "svaki snimak je priča". Ton profesionalan — NE pominjati hobi/sporedni posao (poglavlje 2). Tekst napisati kao polazni, vlasnik dorađuje
- Oprema (lista sa ikonicama): DJI Mini 3 Pro, DJI Avata 2 (FPV), MILC kamera sa gimbalom, montaža u Adobe Premiere Pro
- Rečenica o regulativi DCV
- **Ekipa** — sekcija sa karticama članova, renderuje se mapiranjem niza `team` iz `src/data/team.ts` (poglavlje 9.2). Početni sastav, samo imena bez prezimena: **Miroslav, Bojan, Nikola, Marko, Petar, Nina**
  - Vlasnik dodaje/uklanja članove isključivo u tom nizu — nigde drugde u projektu ne sme da stoji ime člana ekipe
  - Uloga i opis po članu idu kroz `about` namespace (`about.team.{id}.role` / `about.team.{id}.bio`); polazni tekstovi su generički iz dizajn reference (naizmenično dve varijante: „Pilot drona i FPV" i „Kamera i montaža"), svaki sa `// TODO(vlasnik): tekst po osobi`
  - Kartica je spremna za sliku: dok slika ne postoji koristi se portret placeholder iz dizajna (dijagonalne pruge, 150×180px). U `team.ts` ostaviti **zakomentarisan primer statičkog importa za jednog člana** kao šablon za ostale:

```ts
// Kada bude prave slike — ubaciti je u src/assets/team/ i otkomentarisati:
// import miroslavImg from "@/assets/team/miroslav.jpg";
// ...pa u objektu člana: image: miroslavImg
// Statički import daje dimenzije i automatski placeholder="blur".
```

- Uvodni tekst uskladiti sa brojem članova — dizajn kaže „Nas je dvojica na snimanju", što više ne važi
- **„Kako radimo"** — sekcija sa 4 numerisana koraka, tačno po dizajnu (artboard `2b`): `01` Razgovor · `02` Priprema · `03` Snimanje · `04` Montaža i isporuka. Uvodni tekst: „Bez iznenađenja u ceni i bez „videćemo na dan snimanja". Sve što ćemo snimiti i kada ćete to dobiti stoji u ponudi." Koraci kao podaci na jednom mestu (niz sa i18n ključevima), ne šest puta prekucan markup
- CTA → /kontakt

## Testiranje

1. Kompletno na oba jezika; portret placeholder sa TODO; responzivno

## Reference

- @context/project-overview.md (poglavlja 2, 5)
- @context/features/08-usluge-pregled.md

## Referenca dizajna

- `context/design-reference/` — o nama stranica ako postoji; inače obrasci dizajn sistema + pitati
