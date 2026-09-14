# Current Feature: 02 — Dizajn sistem i UI primitivi

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

- Tokene definisati u `globals.css` (CSS varijable) + Tailwind konfiguraciji prema poglavlju 10.1 — ali **prvo uporediti sa vrednostima iz `context/design-reference/`**: ako se dizajn u nijansama razlikuje od tabele, dizajn pobeđuje (uskladiti tabelu vrednostima iz dizajna i zabeležiti u NOTES.md šta je promenjeno)
- shadcn init, prilagođen našim tokenima; instalirati odmah: Button, Input, Textarea, Select, Card, DropdownMenu (ili NavigationMenu), Sheet, Dialog, Checkbox, Label, Form
- Tipografska skala i pravila iz poglavlja 10.2; radijusi i senke iz 10.3 (obe tabele su već usklađene sa dizajn referencom — h1 ide do 62px, senke su mekše nego u prvoj verziji overview-a)
- Token `primary-hover` (`#16301F`) je obavezan — koristi ga svako primarno dugme u dizajnu
- Vidljiv fokus na svemu interaktivnom: 2px ring (zlatna ili zelena — uskladiti sa dizajnom) + offset
- Motion pravila iz 10.4 primenjena globalno (`prefers-reduced-motion` media query u globals.css)
- Privremena stranica `/dev-ui` (van [locale] zahteva, samo development) koja prikazuje: paletu, naslove h1-h4, body tekst, sve komponente u svim stanjima (default/hover/focus/disabled) — briše se u featureu 21

## Notes

<!-- Any extra notes -->

- Zlatna NIKAD kao boja dužeg teksta na svetloj podlozi (kontrast, poglavlje 10.1)
- Sve labele primitiva parametrizovane — ništa hardkodovano
- Proveriti aktuelnu shadcn dokumentaciju (setup se menja između verzija)
- Referenca dizajna: `context/design-reference/` — tokeni, tipografija i komponente se čitaju direktno iz dizajna (1:1)

### Testiranje

<!-- If any testing, write here -->

1. `/dev-ui` prikazuje sve tokene i komponente; vizuelno poklapanje sa dizajn referencom
2. Tab navigacija kroz sve — fokus prsten vidljiv
3. Kontrast: tekst na dugmadima i sve kombinacije iz palete prolaze AA

### Reference

- @context/project-overview.md (poglavlja 5, 10, 11)
- @context/features/00-dizajn-referenca-i-pravila.md
- https://ui.shadcn.com/docs (proveriti najnoviju verziju)

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
