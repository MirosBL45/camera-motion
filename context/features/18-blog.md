# 18 — Blog (MDX)

## Pregled

Faza 3, fajl 5/5 (kraj faze). Blog iz MDX fajlova + 3 početna članka.

## Zahtevi

- Infrastruktura po poglavlju 13: `src/content/blog/sr|en/*.mdx`, frontmatter, SSG, draft mehanizam; tehnika po izboru (`next-mdx-remote` ili `@next/mdx` — proveriti aktuelne preporuke za App Router)
- en verzija članka opciona — bez en fajla članak ne postoji na `/en/blog` (nikad sr tekst na en listi)
- `/blog` lista: kartica po članku (naslov, datum po locale formatu, opis, cover ako postoji), od najnovijeg; bez paginacije (< 10 članaka)
- `/blog/[slug]`: tekst max ~70ch, tipografija kroz typography plugin usklađen sa paletom; custom MDX komponente iz poglavlja 13 (YouTubeLite, slika sa potpisom)
- Metadata iz frontmattera
- **3 početna članka na srpskom** (~500-800 reči, prirodan ton, vlasnik dorađuje):
  1. "Kako izgleda snimanje svadbe dronom — šta treba da znate" (priprema, dozvole lokacije, vremenski uslovi, uklapanje sa klasičnim snimanjem)
  2. "Zašto FPV prolet prodaje nekretninu bolje od fotografija" (osećaj prostora, primer kuće za Booking)
  3. "5 pitanja koja treba da postavite snimatelju pre venčanja" (oprema, backup, rok isporuke, šta je u ceni, zvuk)

## Testiranje

1. Lista i članci rade na obe lokalizacije; članak bez en verzije ne postoji na /en/blog
2. `draft: true` ne izlazi u build; datumi formatirani po locale-u
3. YouTubeLite radi unutar MDX-a

## DoD Faze 3 (zbirna provera)

- [ ] Recenzije na početnoj; O nama kompletna
- [ ] Kontakt: forma šalje na Gmail, rate limit i honeypot rade, telefon skriven do klika
- [ ] Blog sa 3 članka; build zelen

## Reference

- @context/project-overview.md (poglavlja 8, 13)
- @context/features/03-i18n-i-tipizirane-rute.md
- https://nextjs.org/docs (MDX u App Routeru — proveriti najnoviju verziju)
