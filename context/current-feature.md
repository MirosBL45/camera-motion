# Current Feature: 06 — Split hero (početna)

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

- Split hero na početnoj (faza 1, fajl 3/4): levo poruka i CTA, desno uspravni video 9:16. Bez ijedne animacije pri učitavanju
- Desktop: dve kolone `55fr 45fr`, gap 56px, padding `76px 48px 84px`, leva kolona vertikalno centrirana (h1 62px, podnaslov 20px `max-width:560px`, dva CTA dugmeta)
- Tablet: iste dve kolone, video manji; mobilni: naslagano — h1, podnaslov, CTA dugmad (puna širina, jedno ispod drugog), pa video
- Desni okvir: 9:16, radius 12px, bordura `1.5px accent-gold`, `max-width:400px` i `max-height:660px` na desktopu, poravnat desno; unutra play ikonica (krug 74px, `rgba(255,255,255,0.92)`, zlatna bordura) i monospace opis kadra
- Tekstovi iz `home` namespace-a (sr + en); h1 „Vaši trenuci, snimljeni iz vazduha i iz srca.", CTA „Zatražite ponudu" → `ROUTES.contact`, „Pogledajte usluge" → `ROUTES.services`
- **Traka sa brojkama** ispod CTA dugmadi (`margin-top:52px`, `padding-top:26px`, `border-top`, gap 34px): `40+` snimljenih venčanja · `120+` objekata iz vazduha · `4K` isporuka svakog kadra. Vrednosti kao konstante na jednom mestu uz `// TODO(vlasnik): ažurirati brojke`; labele kroz i18n. Na mobilnom se traka ne prikazuje (artboard `1d` je nema)
- Video: za sada statičan placeholder sa play ikonicom bez funkcije; komponenta strukturirana tako da pravi `<video>` zamenjuje jedan blok, sa TODO komentarom iz feature fajla (izvoz 9:16, 8–12s, bez tona, H.264 MP4 + WebM, obavezan poster, NE YouTube embed)

## Notes

<!-- Any extra notes -->

- Referenca dizajna: `context/design-reference/Camera Motion Sajt.dc.html` — artboard `1a` (linija 570, hero od linije ~607) i `1d` (linija 814). Inline stilovi su izvor istine za izgled
- Element u dizajnu koji spec ne opisuje → pitati pre implementacije
- Odluke vlasnika pri učitavanju (dopune i odstupanja od speca/dizajna):
  - Mobilni video okvir: `max-width` 320px i centriran (po specu), ne puna širina iz artboarda `1d`
  - Podnaslov: jedan i18n ključ za sve širine — duža, desktop verzija (dve rečenice); kraća mobilna varijanta iz `1d` se ne pravi
  - Sekundarno CTA dugme dobija novu varijantu u `button.tsx` (bela pozadina, zlatna bordura, hover `surface-warm`) umesto override klasa nad `outline` varijantom — biće ponovo upotrebljena tamo gde dizajn traži isti izgled
  - Monospace opis kadra u placeholderu ide kroz `home` namespace (sr + en), ne hardkodovan; ključevi se brišu kad stigne pravi video
- Pretpostavke za implementaciju (ako nešto ne odgovara, reci pre starta):
  - Traka sa brojkama skrivena ispod `md` (768px), jer od tog breakpointa hero prelazi u dve kolone
  - Play ikonica: `Play` iz `lucide-react` (već u projektu), umesto CSS trougla iz dizajna
  - Senka okvira videa: postojeći token `shadow-raised` umesto uvođenja novog tokena za `0 20px 44px rgba(38,36,31,0.12)` iz dizajna
  - Sekcija „Šta snimamo" i sve ispod hero-a na artboardu `1a` pripadaju featureu 07 — ne diraju se u ovoj sesiji

### Testiranje

<!-- If any testing, write here -->

1. Hero uravnotežen na 360px, 390px, 768px, 1024px, 1440px; odnos 9:16 očuvan na svim širinama
2. Oba CTA vode na lokalizovane rute; tekstovi provereni na oba jezika
3. Traka sa brojkama vidljiva od 768px naviše, skrivena ispod
4. Placeholder jasno obeležen TODO komentarom sa uputstvom za izvoz videa

### Reference

- @context/project-overview.md (poglavlja 5, 10.2, 10.4)
- @context/features/06-hero-done.md
- @context/features/02-dizajn-sistem.md

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
