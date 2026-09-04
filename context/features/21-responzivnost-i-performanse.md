# 21 — Responzivnost, performanse i završna provera

## Pregled

Faza 4, fajl 3/3 (kraj projekta). Završni prolaz kroz ceo sajt + čišćenje + dokumentacija.

## Zahtevi

### Responzivnost
- Sve stranice na: 360, 390, 768, 1024, 1280, 1536 px; bez horizontalnog skrola; embed-ovi u overflow-bezbednim kontejnerima
- Hero 9:16 očuvan; paketi u kolonu na mobilnom bez gubitka čitljivosti; touch mete ≥ 44px

### Performanse
- YouTube svuda lite (iframe tek na klik); slike `next/image` sa `sizes` i blur placeholderom za veće
- Fontovi self-hosted kroz next/font, samo potrebni weights
- Lighthouse mobilni ciljevi: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95; CLS ~0, LCP < 2.5s
- Bundle provera (`@next/bundle-analyzer` po potrebi) — bez teških klijentskih biblioteka

### Pristupačnost
- Tastatura kroz ceo sajt (meni, dropdown, forma, sheet); vidljiv fokus svuda
- `prefers-reduced-motion` gasi i dozvoljene tranzicije; kontrast provera cele palete

### Čišćenje i dokumentacija
- Obrisati `/dev-ui`
- 404 stranica: lokalizovana, sa linkom na početnu
- README dopuniti: pregled projekta, instalacija, env varijable, komande, ručni deploy na Vercel, gde se menjaju cene (`PRICES` blok u packages.ts), ekipa (team.ts), video ID-jevi (services.ts), hero brojke, hero video (uputstvo iz feature-a 06), troubleshooting — dovoljno da se vlasnik posle pauze od par meseci brzo snađe

## Testiranje

1. Cela kontrolna lista iznad prošla; `npm run build` bez upozorenja
2. Popis svih preostalih TODO komentara u kodu predati vlasniku kao spisak (video, slike, telefon, cene, YouTube ID-jevi, OG slika, domen za Resend)

## DoD Faze 4 / projekta

- [ ] SEO kompletno; pravne stranice povezane
- [ ] Lighthouse ciljevi ispunjeni; dev-ui obrisan
- [ ] README kompletan; spisak TODO stavki za vlasnika predat

## Reference

- @context/project-overview.md (poglavlja 5, 10.4, 14)
- @context/features/06-hero.md, @context/features/19-seo.md
