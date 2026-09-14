# Current Feature: 01 — Inicijalizacija projekta

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

- Projekat je već inicijalizovan — proveriti da li nešto treba da se doradi, obavestiti šta fali i sačekati odobrenje pre bilo kakvog rada
- `npx create-next-app@latest` — TypeScript, App Router, Tailwind, ESLint, `src/`, alias `@/*`, **npm**; dodati Prettier
- Folder struktura iz poglavlja 6 (napraviti foldere; prazni placeholder fajlovi gde ima smisla)
- Fontovi kroz `next/font/google`: Outfit (400, 500, 600, 700) + Source Sans 3 (400, 600), subsets `["latin", "latin-ext"]`, `display: "swap"`, vezani na `--font-heading` / `--font-body` (poglavlje 10.2)
- `src/lib/utils.ts` sa `cn()` helperom
- `.env.example` sa svim varijablama iz poglavlja 15 (prazne vrednosti + komentari); `.env*` u `.gitignore`
- Zavisnosti instalirati odmah: `next-intl`, `zod`, `lucide-react` (ostale — resend, upstash, MDX — u svojim feature-ima)
- README skelet: pokretanje, env, deploy (dopunjava se u featureu 21)

## Notes

<!-- Any extra notes -->

- shadcn se NE inicijalizuje ovde (feature 02)
- `<html lang>` privremeno "sr" — pravu logiku donosi feature 03
- Proveriti aktuelnu Next.js dokumentaciju (App Router konvencije) pre pisanja

### Testiranje

<!-- If any testing, write here -->

1. `npm run build` prolazi bez grešaka; dev server se diže
2. Test element renderuje oba fonta (uklj. š đ č ć ž)
3. ESLint i Prettier rade

### Reference

- @context/project-overview.md (poglavlja 4, 5, 6, 10.2, 15)
- https://nextjs.org/docs (proveriti najnoviju verziju)

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
