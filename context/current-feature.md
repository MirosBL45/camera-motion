# Current Feature: 03 — i18n i tipizirane rute

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

- `src/lib/types/i18n.ts` — SUPPORTED_LOCALES, Locale, LOCALE_LABELS, format mapa — tačno iz poglavlja 8.1
- `src/constants/routes.ts` + `src/types/routes.type.ts` (AppRoute) — obrazac iz poglavlja 7.2
- `src/i18n/routing.ts` — `defineRouting` sa `localePrefix: "as-needed"` i `pathnames` za SVE rute iz tabele 7.1
- Middleware (next-intl `createMiddleware`); `/sr/...` redirektuje na verziju bez prefiksa
- `src/i18n/navigation.ts` — `createNavigation` → Link, redirect, usePathname, useRouter, getPathname
- `src/i18n/request.ts`; skelet JSON fajlova za SVE namespace-ove iz poglavlja 8.2 u `sr/` i `en/` (minimalni ključevi — bar naslov svake stranice), `index.ts` po jezičkom folderu
- Validator prevoda (poglavlje 8.3): puca u build-u ako sr/en nemaju iste ključeve
- `src/types/i18n.d.ts` za autocomplete ključeva poruka
- `app/[locale]/layout.tsx` (fontovi, html lang, provider po potrebi) + prazne `page.tsx` za sve rute iz 7.1 — svaka renderuje H1 iz messages
- Language switcher još NE — dolazi sa headerom (feature 04); ali `getPathname` logika za prebacivanje mora raditi

## Notes

<!-- Any extra notes -->

- Query parametri se ne prevode (princip 5; `?usluga=` vrednosti iz poglavlja 7.3)
- Nikad `next/link` direktno — samo `Link` iz `@/i18n/navigation` (princip 4)
- Proveriti aktuelnu next-intl dokumentaciju (pathnames, createNavigation API se menjao između verzija)
- Ovo je poslednji fajl faze 0 — nakon ovog featurea ide zbirna provera DoD faze 0

### Testiranje

<!-- If any testing, write here -->

1. `/usluge` i `/en/services` (i sve ostale rute iz 7.1) renderuju istu stranicu na oba jezika sa ispravnim segmentima
2. `/sr/usluge` → redirect na `/usluge`; `/` renderuje srpsku početnu bez prefiksa
3. `getPathname` daje ispravne URL-ove za obe varijante svake rute
4. Build prolazi; validator puca ako en nema ključ koji sr ima (namerno probati pa vratiti)

### DoD Faze 0 (zbirna provera)

- [ ] Dizajn referenca lokalno + CLAUDE.md postoje (00)
- [ ] Sve rute renderuju prazne stranice na 2 jezika sa ispravnim segmentima; sr bez prefiksa, `/sr/...` redirektuje
- [ ] Tokeni i primitivi na `/dev-ui` odgovaraju dizajnu
- [ ] Build zelen, validator prevoda aktivan

### Reference

- @context/project-overview.md (poglavlja 5, 6, 7, 8)
- @context/features/01-inicijalizacija-projekta.md
- https://next-intl.dev/docs (routing, pathnames — proveriti najnoviju verziju)

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
