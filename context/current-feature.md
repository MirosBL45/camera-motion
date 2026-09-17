# Current Feature: 04 — Header i navigacija

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

- Sticky header (faza 1, fajl 1/4): logo, glavni meni sa padajućim menijem usluga, SR/EN prekidač i CTA dugme
- Desktop: logo levo (placeholder `public/logo.svg` u duhu opisa iz poglavlja 2 + TODO za pravi fajl); meni Početna · Usluge · Blog · O nama · Kontakt; desno SR/EN prekidač + dugme "Zatražite ponudu" → `/kontakt`
- „Usluge" je link ka `/usluge`; na desktopu hover (ili fokus tastature) otvara padajući meni, klik vodi na stranicu Usluge
- Padajući meni: 5 stavki iz `services.ts` — naziv iz `services` namespace-a (isti kao naslov stranice usluge) + kratak opis u drugom redu iz `nav` namespace-a; pojavljivanje sa blagom animacijom (opacity + blagi pomak) od 200ms
- Language switcher: prebacuje jezik i ZADRŽAVA trenutnu stranicu (getPathname iz feature-a 03)
- Sajt se uvek otvara na srpskom, bez obzira na jezik browsera (`localeDetection: false`); na engleski se prelazi isključivo preko prekidača ili `/en` URL-a
- Aktivna stavka glavnog menija NEMA zlatnu liniju (odluka vlasnika, odstupanje od dizajna); trenutna stranica je označena bež pozadinom samo u padajućem i mobilnom meniju
- Usluga `events` na srpskom: „Događaji i proslave", URL `/usluge/dogadjaji-i-proslave` (ne „Eventi" / `eventi-i-proslave`)
- Mobilni/tablet (< lg): logo + hamburger; hamburger otvara Sheet sa punom navigacijom („Usluge" link + usluge kao razgranata lista, ne ugnježden dropdown), SR/EN i CTA na dnu
- Sticky ponašanje bez animacija pojavljivanja; touch mete ≥ 44px; tastaturna navigacija kroz padajući meni (Tab ulazi u stavke, Escape zatvara)

## Notes

<!-- Any extra notes -->

- Stavke menija i linkovi usluga se izvode iz `routes` konstanti i `services.ts` — bez dupliranja putanja
- Referenca dizajna: `context/design-reference/` — header sekcija (1:1); element u dizajnu koji ovde nije opisan → pitati pre implementacije
- Odluke vlasnika tokom implementacije (odstupanja od dizajna i prvobitnog speca):
  - Opis usluge u drugom redu padajućeg menija ostaje po specu, iako ga dizajn nema
  - Nazivi usluga u meniju iz `services.json`, ne posebni nazivi iz dizajna
  - „Usluge" je link sa hover menijem umesto dugmeta koje samo otvara meni — inače stranica Usluge nije dostupna iz navigacije
  - Zlatna linija ispod aktivne stavke uklonjena
  - Animacija padajućeg menija 200ms (u granicama overview 10.4)
  - Automatsko prepoznavanje jezika browsera isključeno — upisano u overview 7.3 i 8.1
  - „Eventi i proslave" → „Događaji i proslave", slug `dogadjaji-i-proslave` — upisano u overview 7.1 i 8.3
- Na tabletu ≥ lg bez miša padajući meni se ne otvara na dodir; dodir na „Usluge" vodi na stranicu Usluge

### Testiranje

<!-- If any testing, write here -->

1. Sve stavke rade na oba jezika sa lokalizovanim putanjama; switcher zadržava kontekst na svakoj stranici
2. Dropdown i Sheet pristupačni tastaturom; aktivno stanje tačno
3. Header ispravan na 360px, 768px, 1024px, 1440px

### Reference

- @context/project-overview.md (poglavlja 5, 7, 8.2, 9)
- @context/features/03-i18n-i-tipizirane-rute.md
- @context/features/04-header-navigacija-done.md

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
