# Camera Motion — prezentacioni sajt (cameramotion.net)

Ovaj dokument je centralni izvor istine za arhitekturu, konvencije i sadržaj. Feature fajlovi u `context/features/` referišu poglavlja odavde umesto da ih ponavljaju. Za IZGLED je izvor istine uvezeni Claude Design projekat (poglavlje 11).

## 1. O projektu i cilj

Prezentacioni sajt za brend **Camera Motion** — video produkciju iz Beograda fokusiranu na snimanje dronom i kamerom. Cilj sajta: dovođenje klijenata (svadbe, nekretnine, eventi, promo snimci za firme). Utisak: **premium, topao i pouzdan** — "sa ovim ljudima nema brige, ispašće odlično, čak i ako je skuplje znam da će biti vrhunski."

Bez logina, bez baze podataka — sav sadržaj živi u repou. Domen: cameramotion.net.

## 2. Brend, oprema i kontekst

- Dronovi: DJI Mini 3 Pro (klasični kadrovi) i DJI Avata 2 (FPV — proleti kroz objekte; može i klasično letenje)
- Kamera: MILC klase Sony A7 sa gimbalom (za sada pozajmljena; usluge uključuju i snimanje kamerom sa zemlje, ne samo dron)
- Montaža: Adobe Premiere Pro
- Postojeći sadržaj: 6-7 videa na YouTube kanalu, 16 objava na Instagramu
- Reference snimanja: FPV prolet kroz kuću koja se izdaje preko Booking-a, jahta kod Zadra, BeoSand odbojka na pesku, nekretnina u Sutomoru
- Vlasnik planira prijavu u Direktorat civilnog vazduhoplovstva (DCV) — na sajtu suptilna napomena "snimanje u skladu sa regulativom DCV"
- Logo: crn krug sa belim slovima "CM", natpis "Camera motion", zlatna linija okolo
- Ton na sajtu: profesionalan; NE pominjati da je snimanje hobi ili sporedni posao

## 3. Publika i geografsko ciljanje

Publika: mladenci, vlasnici nekretnina i apartmana (Booking/Airbnb), organizatori događaja, mali biznisi. Baza: **Beograd i okolina**; šire (Srbija, region) uz dogovor. Ovo se komunicira na sajtu i u SEO tekstovima.

## 4. Tehnologije

| Sloj | Izbor |
|---|---|
| Framework | Next.js (App Router, najnovija stabilna) |
| Jezik | TypeScript (strict) |
| Stilovi | Tailwind CSS + shadcn/ui |
| i18n | next-intl (poglavlja 7 i 8) |
| Blog | MDX fajlovi u repou |
| Forma | Server Action + Resend + Upstash Redis rate limit |
| Fontovi | next/font/google — Outfit (naslovi) + Source Sans 3 (tekst) |
| Video | YouTube lite embed; hero video self-hosted MP4/WebM |
| Deploy | Vercel, ručni deploy (bez CI/CD) |
| Package manager | npm |
| Analitika | nema |

Pre implementacije svakog sloja proveriti aktuelnu dokumentaciju (verzije se menjaju).

## 5. Principi implementacije

1. **Feature po feature** — ne gradi se ništa što nije eksplicitno traženo u toj sesiji
2. Sav vidljivi tekst kroz next-intl poruke (sr + en) — nikad hardkodovan u komponentama
3. Server komponente po defaultu; `"use client"` samo gde je neophodno (forma, dropdown, klik-za-broj, modal, galerije)
4. Nikad `next/link` direktno — samo `Link` iz `@/i18n/navigation`, href iz konstanti ruta (poglavlje 7.2)
5. Query parametri se NE prevode (stabilni ključevi na oba jezika)
6. Slike koje ne postoje: placeholder (div sa aspect-ratio i neutralnom pozadinom iz palete, ili `next/image` placeholder) + `// TODO: prava slika`. Ne izmišljati i ne preuzimati slike sa interneta
7. Sve slike kroz `next/image` sa `sizes`; video placeholderi sa TODO uputstvom
8. Boje/radijusi/fontovi NIKAD kao sirove vrednosti u klasama — samo tokeni iz dizajn sistema (poglavlje 10)
9. Ne dirati postojeće komentare u kodu
10. Env kredencijali samo server-side; nikakvi hardkodovani ključevi
11. Pristupačnost: vidljiv fokus, alt tekstovi, semantika (jedan h1 po stranici), touch mete ≥ 44px, `prefers-reduced-motion`
12. Posle svakog feature-a `npm run build` mora proći bez grešaka

## 6. Struktura foldera

```
src/
  app/
    [locale]/
      (site)/                # stranice sajta
    actions/                 # server actions (contact.ts)
  components/
    ui/                      # shadcn komponente
    layout/                  # header, footer, nav
    sections/                # hero, CTA, service-cards, paketi...
    mdx/                     # custom MDX komponente (YouTube embed...)
  content/
    blog/
      sr/  en/               # MDX članci
  data/
    services.ts  packages.ts  team.ts
  i18n/
    routing.ts  navigation.ts  request.ts
    messages/
      sr/  en/               # JSON po namespace-u + index
  lib/
  constants/
    routes.ts
  types/
context/
  project-overview.md        # ovaj fajl
  features/                  # feature fajlovi
  design-reference/          # uvezeni Claude Design (poglavlje 11)
```

## 7. Rute i navigacija

### 7.1 Tabela ruta (pathnames)

| Interna ruta | sr (default, BEZ prefiksa) | en (prefiks /en) |
|---|---|---|
| `/` | `/` | `/en` |
| `/services` | `/usluge` | `/en/services` |
| `/services/weddings` | `/usluge/snimanje-vencanja` | `/en/services/wedding-videography` |
| `/services/real-estate` | `/usluge/snimanje-nekretnina` | `/en/services/real-estate-videography` |
| `/services/events` | `/usluge/eventi-i-proslave` | `/en/services/events` |
| `/services/promo` | `/usluge/promo-video` | `/en/services/promo-video` |
| `/services/fpv` | `/usluge/fpv-snimci` | `/en/services/fpv` |
| `/blog` | `/blog` | `/en/blog` |
| `/blog/[slug]` | `/blog/[slug]` | `/en/blog/[slug]` |
| `/about` | `/o-nama` | `/en/about` |
| `/contact` | `/kontakt` | `/en/contact` |
| `/privacy` | `/politika-privatnosti` | `/en/privacy-policy` |
| `/terms` | `/uslovi-koriscenja` | `/en/terms` |

Blog slugovi se ne prevode automatski — svaki MDX članak nosi svoj slug po jeziku (poglavlje 13).

### 7.2 Tipizirane rute

- `src/constants/routes.ts` — objekat sa svim internim rutama (leva kolona tabele 7.1), `as const`
- `src/types/routes.type.ts` — `AppRoute` tip izveden iz konstanti (ExtractRoutes obrazac)
- Sve `Link` komponente i redirecti koriste vrednosti iz `routes` — tipska greška ako ruta ne postoji

### 7.3 Navigacija i middleware

- `src/i18n/routing.ts` — `defineRouting` sa `localePrefix: "as-needed"` i `pathnames` iz tabele 7.1
- `src/i18n/navigation.ts` — `createNavigation` → `Link`, `redirect`, `usePathname`, `useRouter`, `getPathname`
- Middleware: next-intl `createMiddleware`; `/sr/...` mora da redirektuje na verziju bez prefiksa
- Query param za pre-selekciju usluge na kontaktu: `?usluga=` sa stabilnim vrednostima `vencanje | nekretnine | event | promo | fpv | drugo` (iste vrednosti na en — princip 5)

## 8. i18n

### 8.1 Jezici

| Locale | Naziv | Uloga | Pismo |
|---|---|---|---|
| `sr` | Srpski | default, bez URL prefiksa | latinica |
| `en` | English | `/en` prefiks | — |

`SUPPORTED_LOCALES = ["sr", "en"]`, `defaultLocale = "sr"`, `LOCALE_LABELS = { sr: "SR", en: "EN" }`. `<html lang>` po aktivnom jeziku.

### 8.2 Namespace-ovi poruka

`common` (dugmad, opšte fraze), `nav`, `footer`, `home`, `services` (zajedničko + po usluzi: `services.weddings`, `services.realEstate`, `services.events`, `services.promo`, `services.fpv`), `about`, `contact` (uklj. validacione poruke forme), `blog`, `legal`, `notFound`, `metadata` (title/description po stranici).

Organizacija: `src/i18n/messages/sr/*.json` (fajl po namespace-u) + `index.ts` koji ih spaja; isto za `en/`. `request.ts` učitava po locale-u.

### 8.3 Pravila prevoda

- Srpski: latinica, topao i direktan ton, obraćanje sa "vi"; bez agencijskog žargona
- Engleski: prirodan prevod, ne bukvalan; nazivi usluga prilagođeni (wedding videography, real estate videography...)
- Validator (`src/i18n/validator.ts` ili build skripta): puca ako `en` nema ključ koji `sr` ima (i obrnuto) — pokreće se u build-u
- Datumi: `Intl.DateTimeFormat` po locale-u (`sr-Latn-RS` / `en-GB` format mapa)
- Tekstovi sa promenljivama kroz next-intl ICU sintaksu, ne konkatenacija

## 9. Podaci u repou

Jedan izvor istine za sadržaj koji se ponavlja; komponente ga čitaju, i18n tekstovi po `id`-u.

- `src/data/services.ts`: `{ id, routeKey (iz 7.2), icon, order, priceFrom?: number }` — nazivi/opisi u `services` namespace-u po `id`
- `src/data/packages.ts`: paketi grupisani **po usluzi**, model proširiv na nove usluge bez menjanja komponenti (vidi 9.1)
- `src/data/team.ts`: članovi ekipe, niz objekata koji se mapira u kartice (vidi 9.2)
- YouTube ID-jevi po usluzi: u `services.ts` polje `videoIds: string[]` (placeholder ID + TODO)

**Recenzija nema** — nikakav `testimonials.ts` se ne pravi (odluka vlasnika, feature 14 je otkazan). Dizajn ima sekciju „Šta kažu mladenci"; ona se svesno preskače i to je jedini izuzetak od pravila da dizajn pobeđuje za izgled.

### 9.1 Paketi

```ts
type PackageType = {
  id: string;              // stabilan ključ, koristi se i za i18n
  priceFrom: number;       // gola brojka, bez valute i bez formatiranja
  featured?: boolean;      // zlatna bordura + badge "najpopularniji"
  features: string[];      // i18n ključevi
};

// packages: Partial<Record<ServiceIdType, PackageType[]>>
```

Pravila:

- **Cene se drže u jednom označenom bloku na vrhu `packages.ts`** (`const PRICES = { ... }`), sa komentarom da je to jedino mesto koje vlasnik menja. Nigde drugde u projektu ne sme da stoji iznos.
- `priceFrom` je `number`; formatiranje ide kroz `Intl.NumberFormat` po locale-u (`sr-Latn-RS` → `1.150`, `en-GB` → `1,150`), valuta iz i18n poruke. Nikad konkatenacija stringova.
- Ključ usluge koja nema pakete se izostavlja — komponenta paketa se tada ne renderuje. Dodavanje paketa za Eventi/Promo/FPV je dodavanje ključa, bez izmena komponenti.

Početne vrednosti (iz dizajn reference, vlasnik ih menja u `PRICES`):

| Usluga | `id` paketa | `priceFrom` | featured |
|---|---|---|---|
| `weddings` | `osnovni` | 450 | |
| `weddings` | `standard` | 750 | ✓ |
| `weddings` | `premium` | 1150 | |
| `realEstate` | `oglas` | 120 | |
| `realEstate` | `apartman` | 250 | ✓ |
| `realEstate` | `vila` | 450 | |

### 9.2 Ekipa

```ts
type TeamMemberType = {
  id: string;              // stabilan ključ, koristi se za i18n (uloga i bio)
  name: string;            // samo ime, bez prezimena — vlastito ime, ne prevodi se
  image?: StaticImageData; // dok ne postoji → placeholder iz dizajna
};
```

- Niz `team` se mapira u kartice; vlasnik dodaje/uklanja članove isključivo u tom nizu.
- Početni sastav: Miroslav, Bojan, Nikola, Marko, Petar, Nina.
- Uloga i opis idu kroz `about` namespace po `id` (`about.team.{id}.role` / `about.team.{id}.bio`) — polazni tekstovi su generički iz dizajn reference + `// TODO(vlasnik): tekst po osobi`.
- Slike: `src/assets/team/*.jpg` sa statičkim importom (daje dimenzije i automatski `placeholder="blur"`). U `team.ts` stoji zakomentarisan primer importa za jednog člana kao šablon; dok slike ne postoje, kartica koristi placeholder iz dizajna.

## 10. Dizajn sistem

### 10.1 Paleta (svetla tema; tamna NE postoji)

| Token | Hex | Upotreba |
|---|---|---|
| `background` | `#FAF8F4` | topla off-white pozadina |
| `surface` | `#FFFFFF` | kartice, forma |
| `surface-warm` | `#F1EBDF` | šampanj-krem naizmenične sekcije, footer |
| `foreground` | `#26241F` | glavni tekst |
| `muted-foreground` | `#6E685C` | sekundarni tekst |
| `accent-gold` | `#A9873F` | zlatni detalji, ikonice, hover, istaknute bordure |
| `accent-gold-soft` | `#E5D9BC` | zlatna u pozadinskim tonovima |
| `primary` | `#1E3B2A` | tamnozelena dugmad, jaki akcenti |
| `primary-hover` | `#16301F` | hover primarnog dugmeta |
| `primary-foreground` | `#FAF8F4` | tekst na zelenom |
| `border` | `#E6E0D3` | bordure, separatori |

Paleta je **potvrđena 1:1 sa dizajn referencom** — nema odstupanja u nijansama. Ako se dizajn (poglavlje 11) ipak negde razlikuje, **vrednosti iz dizajna pobeđuju**; tokene uskladiti sa dizajnom pri implementaciji dizajn sistema.

Pomoćne vrednosti iz dizajna koje nisu tokeni palete, nego deo placeholder obrasca za slike: `#EAE1CF`, `#EFE6D2` (pruge), `#F6F1E7` (traka poverenja). Detalji u `context/design-reference/NOTES.md`. Zlatna se ne koristi za duže tekstove na svetlom (kontrast); sav tekst min WCAG AA.

### 10.2 Tipografija

- Naslovi: Outfit (400-700); h1/h2 weight 600, h3 weight 500. Tekst: Source Sans 3 (400/600)
- Subsets `["latin", "latin-ext"]` (š đ č ć ž), `display: "swap"`, CSS varijable `--font-heading` / `--font-body`
- letter-spacing: h1 `-0.025em`, h2 `-0.02em`, h3 bez
- h1 `clamp(2.25rem, 5vw, 3.875rem)` (36px mobilni → 62px hero), h2 40-42px desktop / 30px mobilni, h3 21-26px
- body 1.0625rem / line-height 1.65; širina pasusa po dizajnu (`max-width` 400-560px), ne ~70ch
- Naslovi koriste `text-wrap: pretty`
- Bez ALL-CAPS eyebrow labela; bez bojenja jedne reči naslova u drugu boju

Outfit se u dizajnu koristi šire nego samo za naslove — nosi i dugmad, badge-ove, cene i tekst recenzija. Source Sans 3 ostaje za `<p>` i sitni tekst. Tačna raspodela po sekcijama je u `context/design-reference/NOTES.md`.

### 10.3 Radijusi i senke

Radius: 0.75rem (12px) kartice i media, 0.5rem (8px) dugmad/inputi, `999px` pilule i badge-ovi.

Senke po dizajn referenci — mekše i veće nego što je ranije stajalo u ovom poglavlju:

| Token | Vrednost | Upotreba |
|---|---|---|
| `shadow-card` | `0 6px 18px rgba(38,36,31,.05)` | mirna kartica |
| `shadow-card-hover` | `0 16px 34px rgba(38,36,31,.10)` | hover kartice |
| `shadow-raised` | `0 24px 60px rgba(38,36,31,.10)` | veliki izdignuti blok |
| `shadow-gold` | `0 16px 38px rgba(169,135,63,.18)` | istaknut paket, FPV kartica |

### 10.4 Motion pravila (STRIKTNO)

- **Zabranjeno:** scroll-triggered animacije, fade-in/slide-up pri učitavanju ili ulasku u viewport, parallax
- **Dozvoljeno:** hover/focus tranzicije (150-200ms), otvaranje menija/dropdowna/modala, stanja forme
- `prefers-reduced-motion` gasi i dozvoljene tranzicije

## 11. Dizajn referenca (izvor istine za izgled)

Dizajn je urađen u Claude Design i vlasnik ga **zadržava takav kakav je (1:1)**. Uvozi se preko `claude_design` MCP-a i čuva lokalna kopija u `context/design-reference/` (postupak u featureu 00).

**Pravila prioriteta:**
- Izgled (layout, boje, spacing, tipografski odnosi) → dizajn referenca pobeđuje
- Funkcionalnost, sadržaj, arhitektura, i18n → feature fajlovi + ovaj overview pobeđuju
- Element postoji u dizajnu, a nijedan feature ga ne opisuje → NE implementirati dok se ne pita vlasnik
- Nedoumica ili sukob → PRVO PITATI sa objašnjenjem problematike, ne odlučivati samostalno

## 12. Kontakt i integracije

- Server Action `submitContact` (bez javne API rute); Zod validacija na serveru identična klijentskoj
- Resend: slanje na `CONTACT_EMAIL` (Gmail); From za start `onboarding@resend.dev` (TODO: verifikovati domen → `upiti@cameramotion.net`); Reply-To = email klijenta
- Upstash `@upstash/ratelimit`: sliding window 3 zahteva / 10 min po IP + 10/dan po IP; specifičan error kod → UI poruka
- Honeypot polje; popunjeno → tihi "uspeh" bez slanja
- Telefon vlasnika NIKAD u inicijalnom HTML-u ni u JSON-LD — prikazuje se tek na klik (klijentska komponenta)
- Pravilo važi **svuda gde se broj pojavljuje, uključujući footer**: mesto za broj postoji po dizajnu, ali sadrži dugme „Prikaži broj telefona"; sam broj ulazi u DOM tek posle klika. Ista komponenta se koristi na kontakt stranici i u footeru

## 13. Blog (MDX)

- `src/content/blog/sr/*.mdx` i `en/*.mdx`; en verzija opciona — ako ne postoji, članak se ne prikazuje na `/en/blog` (nikad sr tekst na en listi)
- Frontmatter: `title, description, date, slug, cover?, tags?, draft`
- **Vreme čitanja se ne upisuje u frontmatter** — računa se iz dužine teksta pri build-u (utility u `src/lib/`, ~200 reči u minuti, zaokruženo naviše, min 1); prikazuje se kroz i18n sa ICU pluralom, ne konkatenacijom
- SSG; `draft: true` ne izlazi u produkciju
- Custom MDX komponente: YouTube lite embed, slika sa potpisom
- 3 početna članka na srpskom (teme u featureu 18)
- Lista `/blog` po dizajn referenci ima **filtere po kategorijama** (pilule: Sve / Venčanja / Nekretnine / Dron i FPV / Iza kadra) i dugme **„Prikaži još tekstova"**. Kategorije izviru iz `tags` u frontmatteru; nazivi kategorija idu kroz `blog` namespace, a vrednosti u `tags` su stabilni ključevi koji se NE prevode (princip 5)
- Prvi članak na listi je istaknut (široka kartica sa naslovnom fotografijom), ostali u gridu 3×2

## 14. SEO

- `generateMetadata` po stranici: title šablon `%s | Camera Motion`, description sr+en, canonical, hreflang alternates (sr ↔ en, x-default → sr)
- OG default `public/og.png` 1200×630 (placeholder sa TODO)
- `sitemap.ts` (obe lokalizacije + blog), `robots.ts`
- JSON-LD: `LocalBusiness` (layout), `Service` (stranice usluga), `BlogPosting` (članci), `BreadcrumbList` (usluge + blog); bez telefona u JSON-LD
- Ključne fraze po usluzi navedene u feature fajlovima 09-13

## 15. Env varijable

```
RESEND_API_KEY=            # server
UPSTASH_REDIS_REST_URL=    # server
UPSTASH_REDIS_REST_TOKEN=  # server
CONTACT_EMAIL=             # server — Gmail vlasnika
NEXT_PUBLIC_SITE_URL=https://cameramotion.net
```
`.env.example` sa praznim vrednostima i komentarima; `.env*` u `.gitignore`. Ništa osetljivo pod `NEXT_PUBLIC_`.

## 16. Faze i redosled

| Faza | Feature fajlovi | Sadržaj |
|---|---|---|
| 0 — Temelj | 00, 01, 02, 03 | dizajn import + pravila, init, dizajn sistem, i18n |
| 1 — Layout i početna | 04, 05, 06, 07 | header, footer, hero, početna |
| 2 — Usluge | 08–13 | pregled + 5 pojedinačnih stranica |
| 3 — Sadržaj i kontakt | 15–18 | o nama, kontakt UI, kontakt backend, blog (feature 14 otkazan) |
| 4 — Završnica | 19, 20, 21 | SEO, pravne stranice, responzivnost i performanse |

DoD svake faze naveden je u poslednjem feature fajlu te faze. Redosled unutar faze je obavezan (feature-i se naslanjaju jedni na druge).
