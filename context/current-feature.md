# Current Feature: 07 — Početna stranica (ispod heroa)

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

- Sekcije ispod heroa na početnoj (faza 1, fajl 4/4, kraj faze). Redosled po artboardu `1a`: hero (gotov) → **Šta snimamo** → **Radimo drugačije** → **traka poverenja** → **završni CTA band** → footer (gotov). Sekcija „Šta kažu mladenci" se svesno preskače, bez placeholdera i bez ostavljenog mesta
- **Šta snimamo** (pregled usluga): pozadina `surface`, `border-top`/`border-bottom`, padding `84px 48px`; zaglavlje h2 42px i pasus 18px (`max-width:430px`) poravnati po dnu, razmaknuti; grid `repeat(6,1fr)` gap 24px, `margin-top:44px`
  - Tri kartice `span 2` (uspravne: placeholder 186px, pa naslov h3 23px i rečenica 16px, padding `22px 24px 26px`)
  - Dve kartice `span 3` (vodoravne: grid `1fr 1fr`, placeholder `min-height:190px` levo, tekst desno padding 26px)
  - FPV kartica istaknuta: bordura `1.5px accent-gold`, zlatna varijanta placeholdera, senka `0 10px 28px rgba(169,135,63,.14)` → hover `shadow-gold`, badge „naša specijalnost"
  - Ostale kartice hover: `shadow-card-hover` + zlatna bordura, 200ms
  - Mobilni (`1d`): h2 30px, kartice jedna ispod druge gap 16px, sve uspravne, placeholder 150px
- **Radimo drugačije**: pozadina `surface-warm`, padding `88px 48px`, grid `1fr 1fr` gap 60px, vertikalno centrirano
  - Levo: h2 42px, lead pasus 19px (`foreground`, opacity .86), pa tri stavke gap 22px — krug 38px (`surface`, zlatna bordura) sa zlatnom ikonicom, naslov 19px i opis 16px
  - Desno: placeholder visine 520px u svetloj varijanti pruge (`#FFFFFF` / `#F6F1E7`)
  - Mobilni (`1d`): h2 30px, jedan sažet pasus, placeholder 220px
- **Traka poverenja**: jedan red, pozadina `surface`, `border-top`/`border-bottom`, padding `20px 48px`, tekst 15px `muted-foreground`, tri stavke razdvojene zlatnim tačkama: „Snimanje u skladu sa regulativom DCV · DJI dronovi · Montaža u Adobe Premiere Pro". Mobilni: centriran red 14px, `line-height:1.7`
- **Završni CTA band**: pozadina `primary`, padding `84px 48px`, levo h2 40px (`primary-foreground`, `max-width:640px`) i pasus 19px (`accent-gold-soft`), desno dugme (`background` pozadina, `primary` tekst, bordura `accent-gold-soft`, hover `accent-gold-soft`) ka `ROUTES.contact`. Mobilni: padding `40px 20px`, h2 28px, dugme pune širine
- Kartice usluga čitaju `SERVICES` iz `src/data/services.ts` (redosled po `order`) i linkuju na rutu iz `routeKey`; nema dupliranja liste usluga
- Svi tekstovi kroz `home` namespace (sr + en); bez ijedne scroll animacije, fade-in efekta i parallaxa — samo hover/focus tranzicije 200ms
- Brojke stoje samo u traci unutar heroa — ispod heroa nema zasebne sekcije sa statistikama

## Notes

<!-- Any extra notes -->

- Referenca dizajna: `context/design-reference/Camera Motion Sajt.dc.html` — artboard `1a` (sekcije od linije 646 do 757) i `1d` (od linije 848). Inline stilovi su izvor istine za izgled
- Element u dizajnu koji spec ne opisuje → pitati pre implementacije
- Odluke vlasnika pri učitavanju (dopune i odstupanja od speca/dizajna):
  - Nazivi na karticama „Šta snimamo": skraćeni iz dizajna („Venčanja", „Nekretnine", „Promo video", „FPV snimci"), ne puni naslovi stranica usluga. Izuzetak: „Eventi i proslave" iz dizajna → „Događaji i proslave" (overview 8.3)
  - Rečenice na karticama: novi ključevi u `home` namespace-u sa tekstovima iz dizajna; `nav.serviceDescriptions` se ne koristi (ostaje samo za padajući meni)
  - Dva i18n ključa po tekstu tamo gde dizajn ima kraću mobilnu varijantu: rečenice kartica i pasus u „Radimo drugačije" (duži tekst od `md` naviše, kraći ispod)
  - „Radimo drugačije" na mobilnom prikazuje i tri stavke sa ikonicama — odstupanje od artboarda `1d`, koji ima samo pasus
  - Uvodni pasus uz naslov „Šta snimamo" prikazuje se na svim širinama (mobilni ga po dizajnu nema)
  - Podnaslov završnog CTA banda prikazuje se na svim širinama (mobilni ga po dizajnu nema)
- Pretpostavke za implementaciju (ako nešto ne odgovara, reci pre starta):
  - Placeholder pruge se izdvajaju u jednu komponentu sa tri varijante (topla, zlatna, svetla); zlatna i svetla traže dva nova tokena uz postojeći `--placeholder-stripe`
  - Ikonice u sekciji „Radimo drugačije" iz `lucide-react` umesto CSS oblika iz dizajna (isti obrazac kao `Play` u herou)
  - CTA band se pravi kao zasebna komponenta jer po dizajnu stoji na dnu svakog artboarda i ponavlja se u kasnijim featurima
  - Svaka kartica u „Šta snimamo" je u celini link ka stranici usluge; te stranice dolaze u featurima 09–13, do tada vode na 404
  - Badge „naša specijalnost" kao shadcn `badge` primitiv (isti izgled traži i „najpopularniji" u featureu paketa)

### Testiranje

<!-- If any testing, write here -->

1. Početna kompletna na oba jezika; svi linkovi vode na tačne lokalizovane rute
2. Responzivno na 360px, 390px, 768px, 1024px, 1440px; nema horizontalnog skrola
3. Hover i fokus stanja kartica i dugmadi rade; nema nijedne animacije pri učitavanju ili skrolu
4. Placeholderi jasno obeleženi `// TODO: prava slika` sa opisom željenog kadra
5. DoD faze 1: header i footer na svim stranicama, prekidač jezika zadržava kontekst, početna 1:1 sa dizajnom, build zelen, nema hardkodovanih tekstova

### Reference

- @context/project-overview.md (poglavlja 2, 5, 9, 10)
- @context/features/07-pocetna-stranica-done.md
- @context/features/06-hero-done.md

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
