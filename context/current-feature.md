# Current Feature: 08 — Stranica /usluge (pregled)

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

- Faza 2, fajl 1/6. Pregledna stranica svih usluga (`/usluge`, `/en/services`) sa putevima ka pojedinačnim stranicama, plus deljeni šablon stranice usluge koji pune feature-i 09–13
- **Raspored stranice** (dizajn nema artboard za `/usluge` — izvodi se iz postojećih obrazaca): tekstualni header (h1 + lead pasus, bez slike) → grid kartica `1fr 1fr` gap 24px → rečenica o montaži → zeleni CTA band → footer
  - Header po obrascu zaglavlja stranica iz dizajna (`64px 48px`): h1 52px, lead pasus 20px `max-width:560px`. Uvod kaže šta Camera Motion radi, za koga i gde (overview 3: Beograd i okolina, šire uz dogovor)
  - Kartice: placeholder kadar 16:9, naziv (h3), 2–3 rečenice, „od X €", „Detaljnije →". Cela kartica je jedan link ka ruti iz `routeKey`; „Detaljnije →" je vizuelni element, ne ugnežđen link
  - FPV kartica zauzima pun red i ostaje zlatno istaknuta (bordura `1.5px accent-gold`, zlatni placeholder, `shadow-gold-soft` → hover `shadow-gold`, badge „naša specijalnost"), kao na početnoj
  - Ostale kartice hover: `shadow-card-hover` + zlatna bordura, 200ms. Mobilni: jedna kolona, gap 16px
- **Cene** — u ovom featureu nastaje `src/data/packages.ts` po overview 9.1: `PRICES` blok na vrhu sa komentarom da je to jedino mesto koje vlasnik menja, paketi grupisani po usluzi (`weddings`: osnovni 450, standard 750 `featured`, premium 1150; `realEstate`: oglas 120, apartman 250 `featured`, vila 450)
  - Kartica na pregledu prikazuje najnižu cenu te usluge; usluge bez paketa (`events`, `promo`, `fpv`) prikazuju „cena po dogovoru"
  - Formatiranje kroz `Intl.NumberFormat` po locale-u (`sr-Latn-RS` → `1.150`, `en-GB` → `1,150`), valuta iz i18n poruke — utility u `src/lib/` + Vitest test. Nikad konkatenacija stringova ni hardkodovan iznos
  - `features` u paketima su i18n ključevi; tekstovi paketa stižu u feature-ima 09 i 10 — ovde se koristi samo `priceFrom`
- **Rečenica o montaži** (usputno, bez posebne stranice): svaka usluga uključuje kompletnu montažu u Premiere Pro; po dogovoru i montaža tuđeg materijala
- **Rečenica o budućoj fotografiji** — implementirana ali ZAKOMENTARISANA u JSX-u, sa `// TODO(team): otkomentarisati kad usluga krene`; i18n ključevi (sr + en) postoje odmah jer JSON ne trpi komentare
- Mini CTA ka `/kontakt` na dnu — postojeći `CtaBand` sa tekstovima iz `services` namespace-a
- **Deljeni šablon stranice usluge** (`src/components/sections/service-page/`) — pravi se ceo sada, sa props API-jem, i ostaje neiskorišćen do feature-a 09:
  - Uvodni blok: breadcrumb „Usluge / <naziv>", h1 56px, lead pasus, jedno ili dva dugmeta, placeholder kadar desno (obrazac sa artboarda `1b` i `2a`)
  - Blokovi „kako snimamo": h2 + uvodni pasus, grid `repeat(4,1fr)` gap 24px, svaka stavka krug sa zlatnom ikonicom, h3 i opis
  - Paketi: h2 + uvodni pasus, tri kartice iz `packages.ts`, istaknuta kartica sa zlatnom bordurom, zlatnom senkom i badge-om „najpopularniji", zlatna crtica `—` kao marker u listi, dugme u kartici
  - Radovi: h2 + grid `1fr 1fr` gap 24px sa `YouTubeLite` embedom, naslovom rada i meta redom
  - CTA ka kontaktu sa `?usluga=` pre-selekcijom (stabilne vrednosti `vencanje | nekretnine | event | promo | fpv`, iste na oba jezika)
- **`YouTubeLite`** (facade): thumbnail + play dugme, `iframe` se ubacuje tek na klik. Nastaje ovde, koristi se i u blogu (feature 18)
- Sve iz `services.ts` / `packages.ts` — bez dupliranja podataka po stranicama. Svi tekstovi kroz `services` namespace (sr + en); bez ijedne scroll animacije, fade-in efekta i parallaxa — samo hover/focus tranzicije 200ms

## Notes

<!-- Any extra notes -->

- Referenca dizajna: `context/design-reference/Camera Motion Sajt.dc.html` — artboardi `1b` (venčanja, linija 923) i `2a` (nekretnine, linija 25) su izvor istine za šablon stranice usluge. Za `/usluge` **nema artboarda** (NOTES 1) — izgled se izvodi iz zaglavlja stranica, obrasca kartica sa početne i dizajn sistema
- Element u dizajnu koji spec ne opisuje → pitati pre implementacije
- Odluke vlasnika pri učitavanju:
  - Raspored `/usluge`: tekstualni header + grid 2 kolone sa 5 velikih kartica; FPV u punom redu
  - Cene: `packages.ts` se pravi u ovom featureu, kartice čitaju najnižu cenu; usluge bez paketa nose „cena po dogovoru"
  - Deljeni šablon stranice usluge se pravi ceo sada, prazan (bez sadržaja), do feature-a 09
  - Cela kartica je link, „Detaljnije →" je vizuelni element
- Pretpostavke za implementaciju (ako nešto ne odgovara, reci pre starta):
  - `ServiceType` se dopunjuje sa `videoIds: string[]` (placeholder ID + TODO) i stabilnom vrednošću za `?usluga=` query param, da se mapiranje ne ponavlja po stranicama
  - `CtaBand` se proširuje opcionim query parametrom u `href`-u (next-intl `Link` prima objekat) da bi šablon mogao da vodi na `/kontakt?usluga=...`; postojeća upotreba na početnoj ostaje nepromenjena
  - Dok je YouTube ID placeholder, `YouTubeLite` prikazuje `MediaPlaceholder` sa opisom kadra umesto thumbnail-a sa `i.ytimg.com` — inače bi svaka slika vraćala 404. Kad stignu pravi ID-jevi, thumbnail traži `remotePatterns` u `next.config.ts`
  - Kartice na pregledu koriste novu komponentu (veća kartica sa cenom i 16:9 kadrom), a ne postojeću `ServiceCard` sa početne — obrasci se razlikuju dovoljno da bi zajednička komponenta postala grana na granu
  - Opisi usluga na pregledu su novi ključevi u `services` namespace-u (2–3 rečenice); `home.services.items.*` ostaje za početnu
  - Breadcrumb „Usluge / <naziv>" je deo šablona stranice usluge; sama stranica `/usluge` nema breadcrumb. `BreadcrumbList` JSON-LD dolazi u featureu 19
- Odstupanja uočena tokom implementacije:
  - `ServicePackages` prima prevedene nazive i stavke paketa kroz props, a ne preko konvencije ključeva `services.<usluga>.packages.*` — tipizirane poruke prijavljuju nepostojeće ključeve kao grešku tipa, a ti tekstovi dolaze tek u feature-ima 09 i 10. Cena, redosled i istaknuti paket i dalje dolaze iz `packages.ts`
  - FPV kartica prelazi u vodoravni raspored već od `md`, ne od `lg` — na tabletu je uspravna varijanta davala previsok prazan placeholder
  - `vitest.config.mts` je dobio `@/*` alias (isti kao u `tsconfig.json`) da bi testovi mogli da uvezu module iz `src/`
  - `next.config.ts` je dobio `remotePatterns` za `i.ytimg.com` (YouTube thumbnail u `YouTubeLite`)

### Testiranje

<!-- If any testing, write here -->

1. Stranica čita podatke iz `services.ts` i `packages.ts`; lokalizovana; kartice vode na ispravne rute na oba jezika
2. `YouTubeLite` ne učitava `iframe` pre klika (proveriti u network tabu)
3. Promena iznosa u `PRICES` bloku menja prikaz na kartici; format broja tačan na oba jezika (Vitest za utility)
4. Responzivno na 360px, 390px, 768px, 1024px, 1440px; nema horizontalnog skrola
5. Hover i fokus stanja kartica i dugmadi rade; nema nijedne animacije pri učitavanju ili skrolu
6. Placeholderi jasno obeleženi `// TODO: prava slika` sa opisom željenog kadra
7. `npm run lint`, `npm run test` i `npm run build` prolaze

### Reference

- @context/project-overview.md (poglavlja 3, 5, 7, 9, 14)
- @context/features/08-usluge-pregled-done.md
- @context/features/07-pocetna-stranica-done.md
- @context/design-reference/NOTES.md (sekcije 1, 5, 6)

## History

<!-- Keep this updated. Earliest to latest -->

### Friday, 04.09.2026. | 15:43 — 00 Dizajn referenca i radna pravila

Uvezen Claude Design projekat preko claude_design MCP-a i sačuvana lokalna kopija dizajna i pratećeg canvas runtime-a. Napisan sažetak dizajna: 7 artboarda sa lokacijama, potvrđena paleta od 9 tokena, dodatne boje van overview-a, tipografska skala, radijusi i senke, konvencija placeholdera za slike, ponovljive komponente i lista otvorenih pitanja. Ništa nije implementirano.

### Friday, 04.09.2026. | 16:41 — Odluke po otvorenim pitanjima iz dizajna

Vlasnik odlučio po svih osam otvorenih pitanja i odluke su prenete u overview i feature fajlove. Model paketa proširen sa svadbenih na pakete po usluzi, sa cenama u jednom bloku radi lakše izmene. Pravilo za telefon prošireno na footer. Dodat nedostajući token za hover primarnog dugmeta, a tabele tipografije i senki usklađene sa dizajnom. Uveden model podataka za ekipu od šest članova sa pripremom za slike. Zadržani hero brojevi, blog filteri i dugme za učitavanje još tekstova. Popravljen sukob gde je jedan feature zabranjivao brojke koje dizajn ima. Unakrsnom proverom nađeno pet novih neusklađenosti između dizajna i feature fajlova — zabeležene kao otvorena pitanja, bez implementacije.

### Friday, 04.09.2026. | 16:53 — Odluke po drugom krugu pitanja

Recenzije uklonjene iz celog opsega projekta: feature otkazan uz očuvan sadržaj, model podataka izbačen, sekcija skinuta sa početne, faza 3 prebrojana na četiri fajla, a README podsetnik za vlasnika ažuriran. Zabeleženo da je to jedini svesni otklon od dizajn reference. Sekcija sa četiri koraka procesa dodata na stranicu o nama po dizajnu. Mapa na kontaktu odbačena, uz izričitu napomenu da se ne dodaje iz dizajna u kasnijim sesijama. Vreme čitanja članka definisano kao izračunato iz teksta, sa prikazom kroz ICU plural.

### Monday, 14.09.2026. | 11:59 — 01 Inicijalizacija projekta

Proverena postojeća inicijalizacija projekta i utvrđeno šta fali; posle odobrenja dorađeno na feature grani. Povezani fontovi za naslove i tekst preko next/font/google i CSS varijabli, uz privremeno fiksiran jezik dokumenta do prave i18n logike. Napravljena folder struktura iz project overview-a, uz dogovor da delovi vezani za lokalizovano rutiranje sačekaju svoj feature. Dodat helper za spajanje Tailwind klasa, primer environment fajla sa svim potrebnim varijablama i uvod ključnih zavisnosti. Napisan README skelet za pokretanje projekta i environment varijable. Tokom review-a pronađen i ispravljen inline style koji je kršio coding standarde. Build, lint, Prettier i dev server provereni i prolaze.

### Monday, 14.09.2026. | 13:17 — 02 Dizajn sistem i UI primitivi

Uvedeni tokeni dizajn sistema (paleta, tipografija, radijusi, senke, motion pravila) u skladu sa dizajn referencom, uz shadcn inicijalizaciju na Radix bazi (odluka vlasnika) i instalaciju osnovnih UI primitiva. Form komponenta svesno preskočena jer nova shadcn arhitektura više ne isporučuje gotov fajl baziran na react-hook-form, a projekat trenutno ne predviđa tu biblioteku — odluka ostaje za feature kontakt forme. Fokus prsten usklađen na zelenu boju umesto zlatne zbog nedovoljnog kontrasta na toploj pozadini, a senke floating komponenti (dropdown, dialog, sheet, select) mapirane na tokene iz dizajna umesto generičkih Tailwind vrednosti. Napravljena privremena /dev-ui stranica dostupna samo u razvoju za pregled celog sistema. Tokom review-a pronađen i ispravljen propust gde primarno dugme nije koristilo obavezan hover token, kao i nekoliko manjih neusklađenosti sa preporučenim kanonskim Tailwind klasama. Build, lint i Prettier prolaze; vizuelno provereno u browseru uključujući fokus stanja i otvorene overlay komponente.

### Monday, 14.09.2026. | 14:01 — 03 i18n i tipizirane rute

Postavljena kompletna next-intl infrastruktura sa svih 13 prevedenih ruta iz tabele 7.1, uz otkriveno da Next.js 16 preimenuje middleware.ts u proxy.ts i dozvoljava više nezavisnih root layout-a — iskorišćeno da /dev-ui (van [locale] stabla) ostane sopstveni root layout dok [locale]/layout.tsx konačno prati aktivni jezik umesto fiksnog "sr" iz feature-a 01. Dodati tipizirani ROUTES/AppRoute, routing/navigation/request moduli, i 11 message namespace-ova po jeziku sa minimalnim skeletom (bar naslov po stranici). Napisan validator koji upoređuje sr/en ključeve i puca već pri učitavanju next.config.ts, testirano namernim brisanjem ključa. Usput otkriveno da Vitest nije bio postavljen u projektu iako ga standardi zahtevaju za utilities — dodat kao dev-dependency uz podizanje @types/node na verziju koja odgovara stvarnom Node runtime-u, i napisani testovi za validator. Tokom review-a pronađen i ispravljen bug gde je proxy hvatao /dev-ui u i18n rewrite logiku i vraćao 404. Build, lint i testovi prolaze; svih 13 ruta provereno uživo na oba jezika uključujući redirekte i html lang.

### Thursday, 17.09.2026. | 10:27 — 04 Header i navigacija

Napravljen sticky header po dizajnu sa logom (privremeni placeholder), glavnim menijem, prekidačem jezika koji zadržava trenutnu stranicu i dugmetom za ponudu, uz mobilni meni u bočnom panelu sa razgranatom listom usluga. Uveden minimalni model podataka za usluge koji meni čita, bez dupliranja putanja. Tokom rada vlasnik je doneo više odluka koje odstupaju od dizajna: „Usluge" je postao link ka pregledu usluga sa padajućim menijem na hover i blagom animacijom od 200ms, stavke menija imaju kratak opis u drugom redu, a zlatna linija ispod aktivne stavke je uklonjena. Isključeno automatsko prepoznavanje jezika browsera, pa se sajt uvek otvara na srpskom. Usluga „Eventi i proslave" preimenovana u „Događaji i proslave", zajedno sa adresom. Sve odluke upisane u overview, uključujući novi spisak svesnih odstupanja od dizajna, i u belešku dizajn reference. Tokom review-a ispravljeni gubitak fokusa tastature kada miš napusti otvoren meni, netačno označavanje trenutne stranice za čitače ekrana i neiskorišćen kod. Lint, testovi i build prolaze; provereno u browseru na četiri širine, tastaturom i sa browserom podešenim na engleski.

### Thursday, 17.09.2026. | 13:58 — 05 Footer

Napravljen footer po dizajnu sa brendom, navigacijom, svim uslugama, kontaktom i donjom trakom sa pravnim linkovima i napomenom o regulativi DCV. Vlasnik je pre implementacije odlučio o više odstupanja od dizajna: ikonice društvenih mreža kao sopstvene SVG komponente jer biblioteka ikonica više nema brendove, prikazana Gmail adresa umesto adrese sa domena, dugmići mreža povećani na veličinu pogodnu za dodir, a na mobilnom se prikazuju sve kolone umesto skraćene verzije iz dizajna. Broj telefona čuva se isključivo u environment varijabli i do stranice stiže tek na klik preko Server Action-a, pa ga nema ni u HTML-u ni u JavaScript kodu koji se šalje browseru — odluka upisana u overview, primer environment fajla i README. Dugme za prikaz broja izdvojeno kao zajednička komponenta za kasniju kontakt stranicu, a logo dobio varijantu za footer. Tokom review-a ispravljeni pad stranice pri mrežnoj grešci na klik, gubitak fokusa tastature tokom učitavanja broja i fokus prsten loga koji se nije uklapao u pozadinu footera. Lint, testovi, provera tipova i build prolaze; provereno u browseru na četiri širine i oba jezika, uključujući prikaz broja tastaturom.

### Monday, 21.09.2026. | 14:23 — 06 Split hero (početna)

Napravljen hero na početnoj stranici po dizajnu: levo naslov, podnaslov i dva dugmeta sa trakom od tri brojke ispod, desno uspravni okvir za video u odnosu 9:16 sa zlatnom bordurom i privremenim ispunom. Na mobilnom se sve slaže jedno ispod drugog, a traka sa brojkama se skriva, kako i dizajn predviđa. Vlasnik je pre implementacije odlučio o četiri stvari: mobilni okvir za video ostaje uži i centriran po specu umesto pune širine iz dizajna, podnaslov ima jedan tekst na svim širinama, sekundarno dugme dobija novu varijantu sa belom pozadinom i zlatnom bordurom umesto ponavljanja stilova na svakom mestu, a opis budućeg kadra u okviru ide kroz prevode. Brojke stoje na jednom mestu uz napomenu da ih vlasnik menja kako brend raste, a okvir za video nosi detaljno uputstvo za izvoz pravog snimka — ceo blok koji se tada briše je jasno označen. Uz hero je dodat i glavni landmark stranice, koji do sada nije postojao. Tokom rada ispravljeno je to što dizajn okviru zadaje i širinu i visinu koje se međusobno isključuju, pa je širina izvedena iz visine da bi odnos 9:16 ostao tačan, kao i to što Tailwind ne prima proizvoljne decimale u razmacima. Tokom review-a nađeno je i rešeno izlaženje dugmadi i trake sa brojkama izvan kolone na tablet širinama. Lint, provera tipova, testovi i build prolaze; klik na mobilni meni dodatno proveren automatski na tri scenarija jer je prijavljen kao sumnjiv, i radi i na dev i na produkcijskom buildu.

### Monday, 21.09.2026. | 16:40 — 07 Početna stranica (ispod heroa)

Završena početna stranica i time cela faza layout-a: ispod heroa su dodate četiri sekcije po dizajnu — pregled onoga što se snima sa pet kartica usluga, blok o tome kako ekipa radi sa tri istaknute prednosti, tanka traka sa napomenama o regulativi i opremi, i zeleni poziv na kontakt pre footera. Sekcija sa recenzijama je preskočena, kako je vlasnik ranije odlučio, i sekcije se spajaju kao da je nikad nije ni bilo. Kartica FPV snimaka je izdvojena zlatnom bordurom, mekšom zlatnom senkom i oznakom da je to specijalnost ekipe. Kartice ne ponavljaju spisak usluga nego ga čitaju sa jednog mesta i same vode na svoju stranicu, pa dodavanje usluge kasnije ne traži izmenu sekcije. Vlasnik je pre implementacije odlučio o šest stvari: kartice nose skraćene nazive iz dizajna, rečenice uz njih su novi tekstovi umesto onih iz menija, kraće mobilne varijante rečenica dobijaju svoj prevod, a tri prednosti, uvodni pasus i podnaslov poziva na kontakt vide se i na telefonu iako ih mobilni dizajn nema. Tokom rada uvedena je zajednička komponenta za privremene ispune slika sa tri varijante pruga, oznaka kao novi primitiv i nova varijanta dugmeta za svetlo dugme na zelenoj podlozi, jer se sve to ponavlja i na kasnijim stranicama. Poziv na kontakt je napravljen tako da mu tekstovi stižu spolja, pa se ista sekcija koristi i drugde. Raspored iz dizajna sa šest kolona pomeren je na široke ekrane jer su na tabletu kolone bile preuske da tekst stane, a isto važi i za blok o načinu rada. Opis željenog kadra u privremenoj ispuni je sakriven od čitača ekrana jer je to napomena za snimanje, a ne sadržaj stranice. Lint, provera tipova, testovi i build prolaze; početna je automatski proverena na pet širina i oba jezika — nema horizontalnog skrola, svi linkovi vode na tačne adrese, hover i fokus rade, a na stranici nema nijedne animacije pri učitavanju ni pri skrolu.

### Tuesday, 22.09.2026. | 14:29 — 08 Stranica /usluge (pregled)

Započeta faza usluga: napravljena pregledna stranica usluga i deljeni šablon po kom će se praviti svih pet pojedinačnih stranica. Dizajn nema ekran za pregled usluga, pa je izgled izveden iz zaglavlja ostalih stranica i obrasca kartica sa početne, uz odluku vlasnika: naslov i uvodni pasus na vrhu, pa pet velikih kartica u dve kolone, rečenica o montaži i zeleni poziv na kontakt. Svaka kartica nosi privremenu ispunu u odnosu 16:9, naziv, tri rečenice, polaznu cenu i oznaku „Detaljnije"; cela je link ka svojoj stranici, a FPV ide preko celog reda i ostaje zlatno istaknut. Cene su prvi put ušle u projekat: napravljen je spisak paketa sa jednim označenim blokom na vrhu u kom vlasnik menja iznose, i to je jedino mesto u projektu gde iznos sme da stoji. Kartica sama uzima najnižu cenu svoje usluge, a usluge koje još nemaju pakete pišu „cena po dogovoru" umesto izmišljene brojke. Iznos se ispisuje po jeziku, sa tačkom kao separatorom hiljada na srpskom i zarezom na engleskom, i to je pokriveno testovima. Rečenica o budućoj usluzi fotografije je napisana i prevedena, ali stoji zakomentarisana uz jasnu napomenu kada se pali. Uz stranicu je napravljen i ceo šablon stranice usluge — uvodni blok sa putanjom i kadrom, blok sa četiri prednosti, paketi i sekcija radova — koji čeka sadržaj iz narednih feature-a, kako je vlasnik tražio. Za video je napravljena komponenta koja do klika prikazuje samo sličicu, pa YouTube ne učitava ništa niti postavlja kolačiće dok posetilac sam ne pokrene snimak; provereno je da se plejer pojavljuje tek posle klika. Tekstovi paketa se šablonu prosleđuju spolja umesto da se traže po dogovorenom imenu ključa, jer projekat proverava postojanje svakog prevoda, a ti tekstovi stižu tek sa stranicama venčanja i nekretnina. Tokom review-a uklonjena su dva nepotrebna nasilna tipiziranja, natpis na dugmetu za video prebačen je u zajedničke prevode jer istu komponentu koristi i blog, a putanja na vrhu stranice usluge dobila je sopstveni naziv za čitače ekrana umesto da ponavlja naziv linka u sebi. U README je dodata tabela sa mestima koja vlasnik menja: cene, brojke u herou, video ID-jevi i tekstovi. Lint, provera tipova, testovi i build prolaze; stranica je automatski proverena na pet širina i oba jezika — nema horizontalnog skrola, svi linkovi vode na tačne lokalizovane adrese, cene se ispisuju po jeziku, a hover i fokus rade i tastaturom.
