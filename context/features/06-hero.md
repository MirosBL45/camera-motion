# 06 — Split hero (početna)

## Pregled

Faza 1, fajl 3/4. Prvi utisak: levo poruka i CTA, desno uspravni video 9:16. Bez animacija.

## Zahtevi

- Layout tačno po dizajn referenci: desktop dve kolone (~55/45), leva vertikalno centrirana (h1, podnaslov, dva CTA), desna uspravni video okvir 9:16 (zaobljen, tanka zlatna bordura, max ~80vh)
- Tablet: iste kolone, video manji; mobilni: naslagano — tekst pa video (max-width ~320px, centriran)
- Tekstovi iz `home` namespace-a; polazni sadržaj: h1 "Vaši trenuci, snimljeni iz vazduha i iz srca.", podnaslov o snimanju venčanja, nekretnina i događaja dronom i kamerom (Beograd i okolina); CTA "Zatražite ponudu" → /kontakt, "Pogledajte usluge" → /usluge
- Video: za sada statična placeholder slika 9:16 sa play ikonicom bez funkcije; komponenta strukturirana da primi `<video>` zamenom jednog bloka, sa komentarom:

```
// TODO(video): Zameniti placeholder pravim showreel snimkom.
// Izvoz iz Premiere Pro: uspravno 9:16, 8-12s, bez tona, H.264 MP4
// (~2-3 MB, 1080x1920, ~3-4 Mbps) + WebM varijanta.
// Umetnuti kao <video autoPlay muted loop playsInline poster={poster}>
// sa <source> webm pa mp4. NE YouTube embed u hero sekciji.
// Poster slika obavezna (prvi kadar) — bez bljeska pri učitavanju.
```

## Napomene

- Nikakav fade-in, nikakav parallax (poglavlje 10.4); video bez zvuka i bez kontrola

## Testiranje

1. Hero uravnotežen na 360px, 390px, 768px, 1024px, 1440px; 9:16 očuvan svuda
2. Oba CTA vode na lokalizovane rute; tekstovi na oba jezika
3. Placeholder jasno obeležen TODO komentarom

## Reference

- @context/project-overview.md (poglavlja 5, 10.4)
- @context/features/02-dizajn-sistem.md

## Referenca dizajna

- `context/design-reference/` — hero sekcija (1:1)
