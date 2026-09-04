# 18 — Blog (MDX)

## Pregled

Faza 3, fajl 4/4 (kraj faze). Blog iz MDX fajlova + 3 početna članka.

## Zahtevi

- Infrastruktura po poglavlju 13: `src/content/blog/sr|en/*.mdx`, frontmatter, SSG, draft mehanizam; tehnika po izboru (`next-mdx-remote` ili `@next/mdx` — proveriti aktuelne preporuke za App Router)
- en verzija članka opciona — bez en fajla članak ne postoji na `/en/blog` (nikad sr tekst na en listi)
- `/blog` lista po dizajn referenci (artboard `2c`): prvi članak istaknut u širokoj kartici sa naslovnom fotografijom, ostali u gridu 3×2 (naslov, kategorija, datum po locale formatu, opis, cover ako postoji), od najnovijeg
- **Filteri po kategorijama** — pilule iznad liste: Sve / Venčanja / Nekretnine / Dron i FPV / Iza kadra. Kategorije izviru iz `tags` u frontmatteru; vrednosti u `tags` su stabilni ključevi koji se NE prevode (princip 5), a nazivi se prikazuju kroz `blog` namespace. Filter kroz query param (`?kategorija=`), ne kroz stanje u komponenti — da URL bude deljiv
- **„Prikaži još tekstova"** — dugme ispod grida; sa 3 početna članka nema šta da učita, pa se sakriva kad nema više stavki (struktura ostaje spremna za rast)
- **Vreme čitanja** („6 min čitanja" na istaknutoj kartici, po dizajnu) — **računa se iz dužine teksta**, ne upisuje se u frontmatter (poglavlje 13). Utility u `src/lib/`, ~200 reči u minuti, zaokruženo naviše, minimum 1; prikaz kroz ICU plural u `blog` namespace-u (`{minutes, plural, one {# min čitanja} few {# min čitanja} other {# min čitanja}}`), nikad konkatenacija
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

- [ ] O nama kompletna, uključujući ekipu iz `team.ts` i sekciju „Kako radimo"
- [ ] Kontakt: forma šalje na Gmail, rate limit i honeypot rade, telefon skriven do klika
- [ ] Blog sa 3 članka; build zelen

## Reference

- @context/project-overview.md (poglavlja 8, 13)
- @context/features/03-i18n-i-tipizirane-rute.md
- https://nextjs.org/docs (MDX u App Routeru — proveriti najnoviju verziju)
