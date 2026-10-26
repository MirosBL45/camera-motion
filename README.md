# Camera Motion

Prezentacioni sajt za Camera Motion — video produkciju iz Beograda fokusiranu na snimanje dronom i kamerom (cameramotion.net).

## Pokretanje

```bash
npm install
npm run dev
```

Sajt je dostupan na [http://localhost:3000](http://localhost:3000).

Ostale komande:

```bash
npm run build   # produkcioni build
npm run start   # produkcioni server (posle build-a)
npm run lint    # ESLint
npm run test    # Vitest (jedan prolaz)
```

## Sadržaj koji se menja u kodu

Sajt nema bazu ni CMS — ovo su mesta gde se menjaju vrednosti:

| Šta                       | Gde                                                                                    |
| ------------------------- | -------------------------------------------------------------------------------------- |
| Cene paketa i usluga      | `PRICES` blok na vrhu `src/data/packages.ts` — jedino mesto u projektu gde stoji iznos |
| Brojke u hero traci       | `src/constants/hero-stats.ts`                                                          |
| YouTube ID-jevi po usluzi | `videoIds` u `src/data/services.ts`                                                    |
| Email i društvene mreže   | `src/constants/contact.ts` — isti podaci za footer i kontakt stranicu                  |
| Tekstovi                  | `src/i18n/messages/sr/` i `src/i18n/messages/en/` (isti ključevi na oba jezika)        |
| Blog članci               | `src/content/blog/sr/` i `src/content/blog/en/` — vidi [Blog](#blog)                   |

## Blog

Članci su MDX fajlovi u repou, jedan fajl po članku i jeziku:

```
src/content/blog/
  sr/koliko-kosta-snimanje-vencanja.mdx
  en/koliko-kosta-snimanje-vencanja.mdx
```

- **Isti naziv fajla u `sr/` i `en/` = isti članak na dva jezika.** Po tome SR/EN prekidač na članku vodi na prevod.
- **en verzija nije obavezna.** Članak bez en fajla ne postoji na `/en/blog`, a SR/EN prekidač na njemu vodi na listu tekstova.
- Lista je od najnovijeg ka najstarijem (po `date`). Najnoviji članak je istaknut na vrhu.
- Vreme čitanja se ne upisuje — računa se iz teksta.

### Nov članak

Na vrhu fajla ide frontmatter:

```mdx
---
title: "Naslov članka"
description: "Jedna do dve rečenice — ispod naslova, na kartici i u Google rezultatu."
date: 2026-10-26
slug: naslov-clanka
cover: /blog/naslov-clanka.jpg
tags: [vencanja, dron-fpv]
draft: false
---

Prvi pasus teksta…

## Podnaslov
```

| Polje         | Pravilo                                                                                                   |
| ------------- | --------------------------------------------------------------------------------------------------------- |
| `title`       | obavezno                                                                                                  |
| `description` | obavezno                                                                                                  |
| `date`        | obavezno, format `GGGG-MM-DD`                                                                             |
| `slug`        | obavezno, adresa članka: mala slova, cifre i crtice (`/blog/naslov-clanka`); na en piše se engleski slug  |
| `cover`       | opciono, naslovna fotografija u `public/` (npr. `public/blog/naslov-clanka.jpg`); bez nje ide placeholder |
| `tags`        | kategorije: `vencanja`, `nekretnine`, `dron-fpv`, `iza-kadra`, `dogadjaji-firme` — iste vrednosti i na en |
| `draft`       | obavezno; `true` = članak se vidi samo u `npm run dev`, ne izlazi na sajt                                 |

Članak sa više vrednosti u `tags` pojavljuje se u svakoj od tih kategorija, a na kartici piše prva.
Neispravan ili nepoznat podatak u frontmatteru ruši build, uz naziv fajla u poruci.

### Linkovi u tekstu

Linkovi se ne pišu kao adrese, nego preko ključeva — isti zapis radi u sr i en tekstu:

```mdx
[stranica venčanja](route:servicesWeddings)
[pišite nam](route:contact?usluga=vencanje)
[drugi članak](blog:snimanje-svadbe-dronom)
[spoljni sajt](https://primer.com)
```

- `route:` — ključ iz `src/constants/routes.ts` (`servicesWeddings`, `servicesRealEstate`, `servicesEvents`, `servicesPromo`, `servicesFpv`, `contact`, `about`…), po želji uz query (`?usluga=`).
- `blog:` — naziv MDX fajla drugog članka (bez `.mdx`); slug se sam uzima po jeziku. Ako taj članak ne postoji na tom jeziku, build puca.
- `https://` — otvara se u novom tabu.

Nepoznat ključ ili link u drugom obliku ruši build, da na sajtu ne ostane pokvaren link.

### Video i slika u tekstu

YouTube snimak (učitava se tek na klik):

```mdx
<YouTube video="fpvHouse" title="Naslov snimka" />
<YouTube id="ZvHHT27JMvc" title="Naslov snimka" />
```

- `video="fpvHouse"` — snimak koji je i na stranicama usluga; ID se menja samo u `src/data/services.ts`.
- `id` — YouTube ID (deo adrese posle `watch?v=`) za snimak koji je samo u članku.

Slika sa potpisom — fajl ide u `public/blog/`, a `width` i `height` su stvarne dimenzije fajla u pikselima:

```mdx
<Figure
  src="/blog/crkva-jutro.jpg"
  alt="Crkva iz vazduha u jutarnjem svetlu, pre dolaska gostiju"
  caption="Crkva snimljena dronom pre dolaska gostiju."
  width={1920}
  height={1080}
/>
```

`import` i `export` u MDX fajlovima nisu dozvoljeni — koriste se samo `<YouTube>` i `<Figure>`.

## Environment varijable

Kopirati `.env.example` u `.env.local` i popuniti vrednosti:

```bash
cp .env.example .env.local
```

| Varijabla                  | Opis                                                                 |
| -------------------------- | -------------------------------------------------------------------- |
| `RESEND_API_KEY`           | Resend API ključ za slanje kontakt forme                             |
| `UPSTASH_REDIS_REST_URL`   | Upstash Redis URL za rate limit kontakt forme                        |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis token                                                  |
| `CONTACT_EMAIL`            | Gmail adresa vlasnika, primalac poruka sa kontakt forme              |
| `CONTACT_PHONE`            | Telefon vlasnika, prikazuje se tek na klik (npr. `+381 60 123 4567`) |
| `NEXT_PUBLIC_SITE_URL`     | Javni URL sajta, koristi se za canonical/OG                          |

Iste vrednosti se upisuju i na Vercel-u: Project → Settings → Environment Variables (posle izmene je potreban novi deploy).

### Kontakt forma (Resend + Upstash)

1. **Resend** ([resend.com](https://resend.com)): napraviti nalog, pa u **API Keys** napraviti ključ sa dozvolom _Sending access_ → `RESEND_API_KEY`. Ključ se prikazuje samo jednom.
2. **`CONTACT_EMAIL`** mora biti isti email kojim je otvoren Resend nalog — dok se domen `cameramotion.net` ne verifikuje u Resend-u, pošiljalac `onboarding@resend.dev` šalje samo na tu adresu.
3. **Upstash** ([console.upstash.com](https://console.upstash.com)): **Redis → Create Database**, region Frankfurt (`eu-central-1`), besplatni plan. Na stranici baze, u sekciji **REST API**, kopirati `UPSTASH_REDIS_REST_URL` i `UPSTASH_REDIS_REST_TOKEN`.

Ponašanje bez ključeva:

- **Development** bez Resend-a: upit se ne šalje, nego se ispisuje u terminal gde radi `npm run dev`.
- **Production** bez Resend-a: forma prikazuje grešku, a razlog ide u log (Vercel → Logs).
- Bez Upstash-a ili kad Upstash ne radi: upit se šalje bez rate limita. Kvar Upstash-a se uvek loguje, a nedostajući ključevi samo u produkciji.

- Neuspelo slanje se ne računa u rate limit — posetilac može odmah ponovo da pokuša.
- Popunjeno skriveno polje za botove (honeypot): upit se ne šalje, a u logu ostaje upozorenje.

Sve poruke u logu počinju sa `[contact]`.

## Deploy

<!-- TODO(feature 21): dopuniti kada se definiše deploy proces na Vercel -->

Deploy je ručan, na Vercel (bez CI/CD).
