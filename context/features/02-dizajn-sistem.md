# 02 — Dizajn sistem i UI primitivi

## Pregled

Faza 0, fajl 3/4. Tokeni iz dizajn reference u Tailwind/shadcn konfiguraciji + osnovne komponente. Sve kasnije stranice se sklapaju od ovih delova.

## Zahtevi

- Tokene definisati u `globals.css` (CSS varijable) + Tailwind konfiguraciji prema poglavlju 10.1 — ali **prvo uporediti sa vrednostima iz `context/design-reference/`**: ako se dizajn u nijansama razlikuje od tabele, dizajn pobeđuje (uskladiti tabelu vrednostima iz dizajna i zabeležiti u NOTES.md šta je promenjeno)
- shadcn init, prilagođen našim tokenima; instalirati odmah: Button, Input, Textarea, Select, Card, DropdownMenu (ili NavigationMenu), Sheet, Dialog, Checkbox, Label, Form
- Tipografska skala i pravila iz poglavlja 10.2; radijusi i senke iz 10.3
- Vidljiv fokus na svemu interaktivnom: 2px ring (zlatna ili zelena — uskladiti sa dizajnom) + offset
- Motion pravila iz 10.4 primenjena globalno (`prefers-reduced-motion` media query u globals.css)
- Privremena stranica `/dev-ui` (van [locale] zahteva, samo development) koja prikazuje: paletu, naslove h1-h4, body tekst, sve komponente u svim stanjima (default/hover/focus/disabled) — briše se u featureu 21

## Napomene

- Zlatna NIKAD kao boja dužeg teksta na svetloj podlozi (kontrast, poglavlje 10.1)
- Sve labele primitiva parametrizovane — ništa hardkodovano
- Proveriti aktuelnu shadcn dokumentaciju (setup se menja između verzija)

## Testiranje

1. `/dev-ui` prikazuje sve tokene i komponente; vizuelno poklapanje sa dizajn referencom
2. Tab navigacija kroz sve — fokus prsten vidljiv
3. Kontrast: tekst na dugmadima i sve kombinacije iz palete prolaze AA

## Reference

- @context/project-overview.md (poglavlja 5, 10, 11)
- @context/features/00-dizajn-referenca-i-pravila.md
- https://ui.shadcn.com/docs (proveriti najnoviju verziju)

## Referenca dizajna

- `context/design-reference/` — tokeni, tipografija i komponente se čitaju direktno iz dizajna (1:1)
