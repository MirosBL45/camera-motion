# Dizajn referenca — NOTES

Brza orijentacija u uvezenom Claude Design projektu. **Izvor istine za IZGLED je `Camera Motion Sajt.dc.html` (1:1)** — ovaj fajl je samo indeks i sažetak, ne zamena za čitanje originala.

| | |
|---|---|
| Projekat | Camera Motion prezentacioni sajt |
| Project ID | `fa0f21f0-d9c4-45d5-8cb2-28cc57d1db28` |
| Uvezeno | 04.09.2026. preko `DesignSync` (claude_design MCP) |
| Fajlovi | `Camera Motion Sajt.dc.html` (126 KB, 1280 linija), `support.js` (69 KB) |

`support.js` je generisani **dc-runtime** (Claude Design canvas runtime, `// GENERATED from dc-runtime/src/*.ts — do not edit`). Nema sadržaja dizajna, ne implementira se i ne prenosi u projekat — čuva se samo da bi se `.dc.html` mogao otvoriti lokalno.

Stilovi u `.dc.html` su **inline `style=""` atributi**, plus nestandardni atribut `style-hover=""` koji canvas runtime koristi za hover stanja. Hover vrednosti se čitaju odatle.

---

## 1. Artboardi (7)

Numeracija u dizajnu nije linearna po redosledu u fajlu — koristi `id`.

| id | Ekran | Širina | Linija u `.dc.html` |
|---|---|---|---|
| `1a` | Početna — desktop | 1440px | 570 |
| `1b` | Usluga: Snimanje venčanja | 1440px | 923 |
| `1c` | Kontakt | 1440px | 1112 |
| `1d` | Početna — mobilna | 390px | 814 |
| `2a` | Usluga: Nekretnine i apartmani | 1440px | 25 |
| `2b` | O nama | 1440px | 218 |
| `2c` | Blog (lista) | 1440px | 395 |

Interne veze između artboarda idu preko `href="#1a"` itd. Gde ekran ne postoji, link pokazuje na `#1a` kao placeholder — **to nije namera dizajna, nego posledica nepostojanja artboarda**.

### Šta dizajn NE pokriva

Nema artboarda za: `/usluge` (pregled), usluge **Eventi**, **Promo**, **FPV**, **blog članak (detalj)**, **pravne stranice**, **404**, mobilne verzije bilo čega osim početne. Za te stranice se izgled izvodi iz postojećih obrazaca (poglavlje 11 overview-a: element koji nijedan feature ne opisuje → pitati).

---

## 2. Paleta

Poklapa se sa overview 10.1 — **svih 9 tokena je potvrđeno u dizajnu**, nema odstupanja u nijansama.

| Token | Hex | Pojava | Upotreba u dizajnu |
|---|---|---|---|
| `background` | `#FAF8F4` | 68× | pozadina stranice, svetle kartice |
| `surface` | `#FFFFFF` | 91× | kartice paketa, recenzije, forma |
| `surface-warm` | `#F1EBDF` | 54× | naizmenične sekcije, footer, secondary hover |
| `foreground` | `#26241F` | 233× | glavni tekst, naslovi |
| `muted-foreground` | `#6E685C` | 241× | opisi, meta, labele |
| `accent-gold` | `#A9873F` | 165× | ikonice, crtice u listama, hover bordure, zvezdice |
| `accent-gold-soft` | `#E5D9BC` | 31× | badge pozadine, dugme na zelenom CTA |
| `primary` | `#1E3B2A` | 68× | primarna dugmad, tamnozeleni CTA band |
| `border` | `#E6E0D3` | 132× | bordure kartica, separatori |

### Dodatne vrednosti koje overview 10.1 ne navodi

| Hex | Pojava | Uloga |
|---|---|---|
| `#16301F` | 13× | **hover primarnog dugmeta** (tamnija zelena) — nedostaje kao token, treba `primary-hover` |
| `#EAE1CF` | 26× | druga traka u dijagonalnom placeholder patternu |
| `#EFE6D2` | 3× | svetlija traka u zlatnoj varijanti placeholdera |
| `#F6F1E7` | 2× | vrlo svetla topla pozadina (traka poverenja) |
| `#EFEBE3` | 1× | **pozadina canvasa**, ne stranice — ne prenositi u tokene |

rgba vrednosti: senke `rgba(38,36,31, .05/.10/.12)`, zlatne senke `rgba(169,135,63, .14–.22)`, sticky header `rgba(250,248,244,0.96)` i `rgba(255,255,255,0.92)`.

---

## 3. Tipografija

Fontovi učitani u dizajnu: `Outfit:wght@400;500;600;700` + `Source+Sans+3:wght@400;600`, `display=swap`.

**Bitno:** `Source Sans 3` je deklarisan **samo jednom** — na `body`. Sve ostalo (197 deklaracija) eksplicitno traži `Outfit`. Praktično: Outfit nosi naslove, dugmad, badge-ove, nazive kartica, cene, pa čak i tekst recenzija; Source Sans 3 ostaje za `<p>` i sitni tekst koji nasleđuje body.

### Skala (desktop 1440px)

| Element | Veličina | Weight | line-height | letter-spacing |
|---|---|---|---|---|
| h1 hero (početna) | 62px | 600 | 1.06 | -0.025em |
| h1 usluga | 56px | 600 | 1.07 | -0.025em |
| h1 blog / kontakt | 52px | 600 | — | -0.025em |
| h1 mobilna (390px) | 36px | 600 | 1.08 | -0.02em |
| h2 sekcija | 40–42px | 600 | 1.12–1.14 | -0.02em |
| h2 na CTA bandu | 38px | 600 | 1.14 | -0.02em (boja `#FAF8F4`) |
| h2 mobilna | 30px | 600 | — | -0.02em |
| h3 kartica | 21–26px | **500** | — | — |
| body / opisi | 16–17px | 400 | 1.6–1.65 | — |
| lead pasus | 20px | 400 | 1.65 | — |
| meta / labele | 12–14px | 400 | — | — |

Naslovi koriste `text-wrap:pretty`. Pasusi imaju `max-width` 290–640px (najčešće 400px i 560px), ne ~70ch.

Overview 10.2 traži h1 `clamp(2.4rem, 5vw, 3.75rem)` = 38.4–60px; dizajn ide do **62px** na hero-u. Uskladiti pri implementaciji dizajn sistema (feature 02) — dizajn pobeđuje.

Nema ALL-CAPS eyebrow labela ✓. Nema bojenja jedne reči naslova ✓. `letter-spacing:3px` se koristi **samo za `★★★★★`**, ne za tekst.

---

## 4. Radijusi, senke, spacing

**Radius:** `12px` kartice/placeholderi/media (65×), `8px` dugmad i inputi (54×), `999px` pilule i badge-ovi (50×), `2–6px` sitni detalji.

Overview 10.3 kaže 0.75rem/0.5rem = 12px/8px ✓ poklapa se.

**Senke:**
- kartica hover: `0 16px 34px rgba(38,36,31,0.10)` (10×)
- artboard/veliki blok: `0 24px 60px rgba(38,36,31,0.10)` (7×)
- mirna kartica: `0 6px 18px rgba(38,36,31,0.05)`
- zlatni akcenat (FPV kartica, istaknut paket): `0 16px 38px rgba(169,135,63,0.18)`, `0 18px 40px rgba(169,135,63,0.22)`

Overview 10.3 navodi `0 1px 3px rgba(38,36,31,.08)` — dizajn koristi znatno mekše i veće senke. **Dizajn pobeđuje**, tokene senki uskladiti po gornjoj listi.

**Sekcijski spacing:** horizontalni padding je konstantno `48px` na 1440px, `20px` na 390px. Vertikalno: `80px 48px` (9×), `76px`, `70px 48px 76px` (hero), `64px 48px` (header stranica), `56px 48px 0` (footer).

**Grid:** hero `1.05fr 1fr` gap 56px · footer `1.4fr 1fr 1fr 1.2fr` gap 40px · paketi `repeat(3,1fr)` gap 24px · benefiti `repeat(4,1fr)` gap 24px · primeri/ekipa/blog `1fr 1fr` gap 24px.

**Header:** `padding:18px 48px`, pozadina `rgba(250,248,244,0.96)`, `border-bottom:1px solid #E6E0D3`.

---

## 5. Konvencija placeholdera (važno)

Dizajn ima **dosledan obrazac za sve slike i video** — dijagonalne pruge + monospace opis kadra. Ovo se prenosi 1:1 kao placeholder komponenta (overview princip 5.6).

```css
background: repeating-linear-gradient(135deg, #F1EBDF 0 12px, #EAE1CF 12px 24px);
font-family: ui-monospace, Menlo, monospace;
font-size: 11–12px;
color: #6E685C;
border: 1px solid #E6E0D3;      /* 1.5px solid #A9873F za hero/velike */
border-radius: 12px;
```

Zlatna varijanta (naslovna blog fotografija): `repeating-linear-gradient(135deg, #EFE6D2 0 12px, #E5D9BC 12px 24px)`.

Tekst unutar placeholdera opisuje **željeni kadar**, npr. `kadar: prolet dronom / iznad vile sa bazenom`, `fotografija: ekipa sa opremom`, `vertikalni reel 9:16`, `mapa: područje rada`. Te opise zadržati kao `// TODO: prava slika` napomene.

**Aspect ratio:** `16/9` za video primere (4×), `9/16` za hero reel i mobilni reel (2×). Portreti ekipe: fiksno `150×180px`.

Monospace **nije font sajta** — koristi se isključivo unutar placeholdera.

---

## 6. Komponente koje se ponavljaju

- **Header** — logo (crni krug `CM` + „Camera motion") · nav: Početna / Usluge (dropdown sa 5 usluga) / Blog / O nama / Kontakt · SR|EN prekidač (aktivan jezik = pilula `border:1px solid #E6E0D3`, `border-radius:6px`, `padding:3px 8px`) · primarno dugme „Zatražite ponudu".
- **Footer** — 4 kolone (`1.4fr 1fr 1fr 1.2fr`) na `#F1EBDF`: brend + opis, Navigacija, Usluge, Kontakt · donja traka: copyright, Politika privatnosti / Uslovi korišćenja, napomena o DCV.
- **Primarno dugme** — `background:#1E3B2A`, `color:#FAF8F4`, Outfit 500, `border-radius:8px`; padding `11px 20px` (header), `15px 26px` (hero), `14px` (u kartici, `display:block`). Hover → `#16301f`.
- **Sekundarno dugme** — transparentno, `border:1px solid #E6E0D3`; hover → `background:#F1EBDF`.
- **Dugme na zelenom CTA bandu** — `background:#FAF8F4`, `color:#1E3B2A`, `border:1px solid #E5D9BC`; hover → `background:#E5D9BC`.
- **CTA band** — puna širina, `padding:76px 48px`, `background:#1E3B2A`, naslov + podnaslov levo, dugme desno. Postoji na dnu svakog artboarda pre footera.
- **Kartica paketa** — `#FFFFFF`, radius 12px, padding `34px 32px`; istaknuti paket ima badge „najpopularniji" (pilula 999px), zlatnu borduru i zlatnu senku; feature lista koristi zlatnu crticu `—` kao marker.
- **Badge** — pilula `border-radius:999px`, `padding:4px 12px`, Outfit 600, `background:#E5D9BC`, `border:1px solid #A9873F` (npr. „najpopularniji", „naša specijalnost").
- ~~**Kartica recenzije**~~ — postoji u dizajnu (`#FFFFFF`, radius 12px, `padding:34px 36px`, zvezdice `#A9873F` 22px, citat u Outfit 400 / 22px, potpis „Ime i ime · tip, godina"), ali se **ne implementira** — vidi sekciju 9a.
- **Traka poverenja** — jedan red, `#F6F1E7`: „Snimanje u skladu sa regulativom DCV · DJI dronovi · Montaža u Adobe Premiere Pro".
- **Breadcrumb** na stranicama usluga: `Usluge / <naziv usluge>`, 16px `#6E685C`.

---

## 7. Motion — dizajn je usklađen sa 10.4 ✓

U celom fajlu **nema** `@keyframes`, `animation:`, parallaxa ni scroll-triggered efekata. Jedine tranzicije su hover, sve `0.2s ease`:

```
transition: box-shadow 0.2s ease, border-color 0.2s ease   (10×)
transition: border-color 0.2s ease                          (6×)
transition: background 0.2s ease                            (5×)
```

Ostaje samo da se doda `prefers-reduced-motion` gašenje (overview 10.4) — dizajn ga nema jer canvas to ne podržava.

---

## 8. Interaktivnost definisana u dizajnu

Na dnu `.dc.html` stoji `<script type="text/x-dc" data-dc-script>` sa jednom `DCLogic` komponentom:

```js
state = { phoneShown: false };
togglePhone → setState(phoneShown = !phoneShown)
phoneLabel  → phoneShown ? phone : "Prikaži broj telefona"
```

Broj je `data-props` sa `default: "+381 63 214 780"`. Ovo je **klik-za-broj** obrazac iz overview 12 i potvrđuje ga na kontakt stranici (`1c`). Ostatak dizajna je statičan; dropdown „Usluge" je u dizajnu prikazan otvoren na `1a`, a zatvoren (samo strelica) na ostalim artboardima.

---

## 9. Rešena pitanja — odluke vlasnika (04.09.2026.)

Sve ispod je odlučeno i **već upisano** u `project-overview.md` i odgovarajuće feature fajlove. Ovde stoji radi traga zašto je tako.

| # | Pitanje | Odluka | Upisano u |
|---|---|---|---|
| 1 | Cene: konkretne iz dizajna ili `"X"` placeholder | **Konkretne** (venčanja 450/750/1150 €, nekretnine 120/250/450 €). Drže se u jednom `PRICES` bloku na vrhu `packages.ts` da ih vlasnik lako nađe i menja | overview 9.1, feature 09, 10 |
| 2 | Telefon vidljiv u footeru | **Svuda na klik**, uključujući footer. Mesto po dizajnu ostaje, ali sadrži dugme „Prikaži broj telefona"; ista komponenta se deli sa kontakt stranicom | overview 12, feature 05 |
| 3 | Paketi za nekretnine | **Proširiti model** — paketi grupisani po usluzi, `Partial<Record<ServiceIdType, PackageType[]>>`; dodavanje Eventi/Promo/FPV je dodavanje ključa, bez izmena komponenti | overview 9.1, feature 10 |
| 4 | Brojke u hero traci (40+, 120+, 4K) | **Zadržati vrednosti iz dizajna**, kao konstante sa TODO — vlasnik ih ažurira kako brend raste. Mobilna verzija ih nema | feature 06, 07 |
| 5 | Blog filteri + „Prikaži još tekstova" | **Zadržati oboje.** Filter ide kroz query param da URL bude deljiv; kategorije iz `tags`, ključevi se ne prevode | overview 13, feature 18 |
| 6 | Sastav ekipe | **6 osoba, samo imena:** Miroslav, Bojan, Nikola, Marko, Petar, Nina. Niz objekata u `src/data/team.ts` koji se mapira u kartice; generički tekstovi iz dizajna + TODO; zakomentarisan primer importa slike za jednog člana | overview 9.2, feature 15 |
| 7 | `primary-hover` `#16301F` nedostaje | **Dodat kao token** | overview 10.1, feature 02 |
| 8 | Senke i h1 skala odstupaju od overview 10.2/10.3 | **Dizajn pobeđuje** (overview 11) — obe tabele usklađene sa dizajnom | overview 10.2, 10.3 |

Posledica odluke 6: uvodni tekst na `2b` („Nas je dvojica na snimanju") više ne važi i mora se prepisati u featureu 15.

---

## 9a. Drugi krug odluka (04.09.2026.)

Nađeno pri unakrsnoj proveri dizajna i feature fajlova; sve je odlučeno i upisano.

| # | Pitanje | Odluka | Upisano u |
|---|---|---|---|
| 1, 5 | Recenzije — zvezdice i naslov sekcije | **Recenzija nema uopšte.** Ni na početnoj, ni igde. Feature 14 je otkazan, `testimonials.ts` se ne pravi, sekcija se preskače bez placeholdera | feature 14, 07, overview 6, 9, 16 |
| 2 | Sekcija „Kako radimo" na O nama | **Ide, tačno po dizajnu** — 4 numerisana koraka (01 Razgovor · 02 Priprema · 03 Snimanje · 04 Montaža i isporuka), koraci kao podaci na jednom mestu | feature 15 |
| 3 | Blok „Područje rada" sa mapom na kontaktu | **Bez mape** — ostaje samo rečenica o području u kontakt kartici, kako kaže feature 16 | feature 16 |
| 4 | Vreme čitanja članka | **Računa se iz dužine teksta** (~200 reči/min, zaokruženo naviše, min 1), ne upisuje se u frontmatter; prikaz kroz ICU plural | overview 13, feature 18 |

### ⚠ Jedini izuzetak od pravila „dizajn pobeđuje"

Sekcija **„Šta kažu mladenci"** na artboardima `1a` i `1d` se **svesno ne implementira**. Ovo je jedino mesto gde odluka vlasnika nadjačava dizajn referencu — svuda drugde važi overview 11. Ako u kasnijoj sesiji naiđeš na tu sekciju u dizajnu: preskoči je, nije previd.

---

## 10. Kako koristiti ovu referencu

U svakoj sledećoj feature sesiji: otvoriti `Camera Motion Sajt.dc.html` na liniji odgovarajućeg artboarda (tabela u sekciji 1) i čitati inline stilove kao izvor istine. Ovaj NOTES.md služi za brzo lociranje i za pregled tokena — **ne prepisivati vrednosti odavde ako se razlikuju od originala**.
