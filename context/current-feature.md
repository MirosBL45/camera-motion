# Current Feature: 09 — Usluga: Snimanje venčanja

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

- Faza 2, fajl 2/6. Najvažnija prodajna stranica: `/usluge/snimanje-vencanja` (`/en/services/wedding-videography`). Gradi se kroz deljeni šablon iz feature-a 08, po artboardu `1b`. Emotivan ton + jasni paketi
- **Raspored stranice** (artboard `1b`): uvodni blok → „Kako snimamo" (4 bloka) → Paketi (3 kartice) → Dodatne opcije → Isporuka → Naši radovi (2 embeda) → zeleni CTA band → footer. „Dodatne opcije" i „Isporuka" su dve nove sekcije kojih dizajn nema (odluka vlasnika)
  - **Uvodni blok** (`ServiceIntro`): breadcrumb „Usluge / Snimanje venčanja", h1 56px, lead pasus, **dva dugmeta** — primarno „Proverite da li je vaš termin slobodan" → `/kontakt?usluga=vencanje`, sekundarno „Pogledajte pakete" → skok na sekciju paketa na istoj stranici; placeholder kadar desno („fotografija: mladenci u zlatnom satu")
  - **„Kako snimamo"** (`ServiceFeatures`): 4 bloka iz dizajna — Filmska kamera, Gimbal, Dron, Čist zvuk — sa dopunama iz spec-a: MILC kamera drži kvalitet i u slabom osvetljenju, gimbal i spontani momenti, dron uz FPV prolet kao opciju i napomenu o DCV, zvuk iz miksete benda + ambijentalni mikrofoni i miks u postprodukciji (uz napomenu da se bend obavesti unapred)
  - **Paketi** (`ServicePackages`) iz `packages.ts`, ključ `weddings` — Osnovni 450, Standard 750 (`featured` → zlatna bordura, badge „najpopularniji"), Premium 1150; stavke tačno po dizajnu (npr. Standard: sve iz Osnovnog · snimanje dronom · „best moments" spot 4–6 min · vertikalni reel)
    - Uvodni pasus pored h2 iz dizajna („Sve cene su početne i zavise od lokacije i trajanja dana…") **i** napomena ispod kartica („…javite se za posebnu ponudu" + „Cene se odnose na Beograd i okolinu") — bez ponavljanja iste rečenice
    - Iznosi isključivo iz `PRICES` bloka u `packages.ts`, formatiranje kroz `formatPrice` (`Intl.NumberFormat`) — nijedan iznos u prevodima ni u JSX-u
  - **Dodatne opcije**: prewedding snimanje (preporuka kad na sam dan nema vremena; zavisi od vremenskih uslova), dodatna statična kamera, produženo čuvanje materijala
  - **Isporuka**: montirani snimak digitalno (link za preuzimanje), preporuka čuvanja na eksternom disku, rok isporuke i avans kao placeholder rečenica + `// TODO(vlasnik): upisati rok i avans`
  - **Naši radovi** (`ServiceWorks`): 2 `YouTubeLite` embeda; naslovi i meta iz dizajna 1:1 („Jovana i Miloš — Zemun · Best moments spot · 5:20", „Ana i Nemanja — Avala · FPV prolet i prvi ples · 1:40") uz `TODO(vlasnik)` da se zamene pravim parovima. YouTube ID-jevi ostaju placeholder iz `services.ts`
  - **CTA band**: „Proverite da li je vaš termin slobodan" + „Subote u sezoni se popune rano — pišite nam i pre nego što je sve dogovoreno." → `/kontakt?usluga=vencanje`
- Svi tekstovi kroz `services.weddings` namespace (sr + en); engleski je prirodan prevod, ne bukvalan. Bez ijedne scroll animacije, fade-in efekta i parallaxa — samo hover/focus tranzicije 200ms

## Notes

<!-- Any extra notes -->

- Referenca dizajna: `context/design-reference/Camera Motion Sajt.dc.html`, artboard `1b` (linija 923) je izvor istine za izgled ove stranice
- Element u dizajnu koji spec ne opisuje → pitati pre implementacije
- Odluke vlasnika pri učitavanju:
  - **Tekstovi**: dizajn 1:1 (h1, lead, nazivi i opisi blokova, stavke paketa, naslovi sekcija, CTA), a detalji iz spec-a 09 koje dizajn nema ulaze u opise blokova
  - **Dodatne opcije i Isporuka**: dve odvojene sekcije — „Dodatne opcije" kao grid kartica po obrascu blokova „Kako snimamo", pa zasebna sekcija „Isporuka" ispod
  - **Uvodni blok**: dva dugmeta; sekundarno je „Pogledajte pakete" i vodi na sekciju paketa na istoj stranici
  - **Naši radovi**: imena parova iz dizajna ostaju 1:1 kao privremeni tekst, sa `TODO(vlasnik)`
  - **Napomena o cenama**: i uvodni pasus pored h2 (dizajn) i napomena ispod kartica (spec)
- Pretpostavke za implementaciju (ako nešto ne odgovara, reci pre starta):
  - `ServiceIntro.secondaryCta` trenutno prima samo `AppRoute` — proširuje se da primi i skok na sekciju iste stranice (`#paketi`), a sekcija paketa dobija odgovarajući `id`. Skok je običan, bez smooth-scroll animacije (overview 10.4)
  - Sekcije „Dodatne opcije" i „Isporuka" nastaju kao nove komponente u `src/components/sections/service-page/` sa props API-jem, da ih kasnije mogu koristiti i ostale usluge; sada ih koristi samo venčanje
  - Stavke paketa (`camera`, `microphone`, `fullEdit`… iz `packages.ts`) dobijaju prevode u `services.weddings.packages.*`, a stranica ih sklapa u `ServicePackageContentType[]` i prosleđuje šablonu — props API iz feature-a 08 ostaje nepromenjen
  - Ikonice blokova iz `lucide-react`; za dron ne postoji namenska ikonica, pa se bira najbliža i potvrđuje u browseru
  - `generateMetadata` i JSON-LD `Service` ostaju za feature 19 — ovde se pišu samo vidljivi tekstovi
  - SEO fraze se utkivaju prirodno u tekst: snimanje venčanja, snimanje svadbe dronom, snimatelj za svadbu Beograd
  - Naizmenične pozadine sekcija prate obrazac sa `/usluge` i početne (`background` / `surface` / `surface-warm`), kako je već rešeno u šablonu
- Odstupanja uočena tokom implementacije:
  - „Dodatne opcije" ne dobijaju svoju komponentu — koriste `ServiceFeatures` sa novim `tone="warm"`, jer je obrazac (kartica sa zlatnom ikonicom, naslovom i opisom) identičan blokovima „Kako snimamo". Nova komponenta bi bila kopija sa drugom pozadinom
  - `ServiceFeatures` ide u pun red tek od `lg` (i za tri i za četiri stavke) — na 768px su tri kolone bile preuske za tekst, isto kao ranije u `WhyUs`
  - `ServiceIntro.secondaryCta` je sada unija: ili ruta, ili `targetId` za sidro na istoj stranici. `ServicePackages` je dobio `id` i `scroll-mt`, da naslov ne završi ispod sticky header-a
  - `services.ts` je prešao na mapu `SERVICES_BY_ID` (lista se izvodi iz nje), pa stranica usluge uzima svoj zapis bez pretrage po listi i bez nasilnog tipiziranja — isti obrazac koriste i feature-i 10-13
  - Prevodi stavki paketa stoje ispisani u stranici jer tipizirane poruke ne prihvataju ključ sastavljen od `string` vrednosti iz `packages.ts`; poklapanje ključeva čuva novi Vitest test (`src/data/packages.test.ts`), provereno namernim menjanjem ključa
  - Sidro `#paketi` se ne prevodi — isto pravilo kao za query parametre (princip 5)

### Testiranje

<!-- If any testing, write here -->

1. Paketi se renderuju iz `packages.ts`; promena iznosa u `PRICES` bloku menja prikaz na stranici
2. Format cene tačan na oba jezika (`sr-Latn-RS` → `1.150`, `en-GB` → `1,150`)
3. CTA i dugmad u karticama paketa vode na `/kontakt?usluga=vencanje` (`/en/contact?usluga=vencanje`) — query param isti na oba jezika
4. Sekundarno dugme „Pogledajte pakete" skače na sekciju paketa, bez animacije skrola
5. `YouTubeLite` ne učitava `iframe` pre klika (proveriti u network tabu)
6. Kompletno na oba jezika; responzivno na 360px, 390px, 768px, 1024px, 1440px — paketi u jednu kolonu na mobilnom, nema horizontalnog skrola
7. Hover i fokus stanja rade i tastaturom; nema nijedne animacije pri učitavanju ili skrolu
8. Placeholderi obeleženi `// TODO: prava slika` sa opisom željenog kadra; `TODO(vlasnik)` za rok isporuke, avans i naslove radova
9. `npm run lint`, `npm run test` i `npm run build` prolaze

### Reference

- @context/project-overview.md (poglavlja 2, 9, 12, 14)
- @context/features/09-usluga-vencanja-done.md
- @context/features/08-usluge-pregled-done.md
- @context/design-reference/NOTES.md (sekcije 1, 3, 4, 5, 6)

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

### Tuesday, 22.09.2026. | 17:05 — 09 Usluga: Snimanje venčanja

Napravljena stranica za snimanje venčanja, najvažnija prodajna stranica sajta, po ekranu iz dizajna i kroz šablon napravljen u prethodnoj sesiji. Redosled je isti kao u dizajnu: uvod sa naslovom, pasusom i kadrom, pa četiri bloka o tome kako se snima, paketi, dodatne opcije, isporuka, radovi i zeleni poziv na kontakt. Tekstovi su preuzeti iz dizajna doslovno, kako je vlasnik odlučio, a detalji koje dizajn nema ušli su u opise blokova — da kamera drži kvalitet i kad svetla u sali oslabe, da gimbal hvata i spontane momente, da se uz dron može dodati i prolet kroz salu, i da se ton uzima i sa miksete benda, uz napomenu da se bend obavesti unapred. Vlasnik je pre implementacije odlučio o šest stvari: tekstovi idu iz dizajna 1:1, dodatne opcije i isporuka su dve odvojene sekcije kojih dizajn nema, uvod ima dva dugmeta pri čemu drugo skače na pakete niže na stranici, imena parova u sekciji radova ostaju privremeno onakva kakva su u dizajnu, a napomena o cenama stoji i pored naslova paketa i ispod kartica. Tri paketa se ispisuju iz spiska cena napravljenog ranije, sa oznakom najpopularnijeg na srednjem, pa promena iznosa na jednom mestu menja i ovu stranicu; iznos se ispisuje po jeziku, sa tačkom kao separatorom hiljada na srpskom i zarezom na engleskom. Sekcija dodatnih opcija koristi isti obrazac kartica kao blokovi o načinu snimanja, jer bi zasebna komponenta bila kopija sa drugom pozadinom, a kartice prelaze u pun red tek na širokim ekranima pošto su na tabletu bile preuske da tekst stane. Uvodno dugme koje vodi na pakete napravljeno je kao obično sidro, bez animacije skrola, a sekcija paketa je dobila razmak odozgo da joj naslov ne završi ispod zalepljenog zaglavlja. Spisak usluga je prešao na oblik gde svaka usluga ima svoje mesto po imenu, pa stranica uzima svoj zapis bez pretrage kroz listu — isti obrazac koristiće i preostale četiri stranice usluga. Tekstovi stavki paketa stoje ispisani u stranici jer provera prevoda ne prihvata ključ sastavljen u hodu, pa je dodat i test koji puca ako se spisak stavki i prevodi raziđu; provereno je namernim kvarenjem jednog ključa. Rok isporuke i iznos avansa su ostavljeni kao opšta rečenica sa jasnom napomenom gde se upisuju kad ih vlasnik odredi, a isto važi i za imena parova i trajanja u sekciji radova. Tokom review-a ispravljeni su navodnici u srpskom tekstu da prate stil ostatka sajta i naziv Direktorata civilnog vazduhoplovstva na engleskom, koji je bio skraćen drugačije nego u footeru i na početnoj. Lint, provera tipova, testovi i build prolaze; stranica je automatski proverena na pet širina i oba jezika — nema horizontalnog skrola, jedan je glavni naslov, nijedan video se ne učitava dok posetilac sam ne klikne, skok na pakete radi, a sve dugmad vode na kontakt sa unapred izabranom uslugom.
