# 01 — Inicijalizacija projekta

## Pregled

Faza 0, fajl 2/4. Postavljanje Next.js projekta sa TypeScript-om i fontovima. Temelj bez ijedne stranice; dizajn sistem i i18n dolaze u sledećim feature-ima.

## Zahtevi

- projekat je inicijalizovan ali proveriti da li nešto treba da se doradi, pa obavesti šta fali i čekaj moje odobrenje za bilo kakav rad
- `npx create-next-app@latest` — TypeScript, App Router, Tailwind, ESLint, `src/`, alias `@/*`, **npm**; dodati Prettier
- Folder struktura iz poglavlja 6 (napraviti foldere; prazni placeholder fajlovi gde ima smisla)
- Fontovi kroz `next/font/google`: Outfit (400, 500, 600, 700) + Source Sans 3 (400, 600), subsets `["latin", "latin-ext"]`, `display: "swap"`, vezani na `--font-heading` / `--font-body` (poglavlje 10.2)
- `src/lib/utils.ts` sa `cn()` helperom
- `.env.example` sa svim varijablama iz poglavlja 15 (prazne vrednosti + komentari); `.env*` u `.gitignore`
- Zavisnosti instalirati odmah: `next-intl`, `zod`, `lucide-react` (ostale — resend, upstash, MDX — u svojim feature-ima)
- README skelet: pokretanje, env, deploy (dopunjava se u featureu 21)

## Napomene

- shadcn se NE inicijalizuje ovde (feature 02)
- `<html lang>` privremeno "sr" — pravu logiku donosi feature 03
- Proveriti aktuelnu Next.js dokumentaciju (App Router konvencije) pre pisanja

## Testiranje

1. `npm run build` prolazi bez grešaka; dev server se diže
2. Test element renderuje oba fonta (uklj. š đ č ć ž)
3. ESLint i Prettier rade

## Reference

- @context/project-overview.md (poglavlja 4, 5, 6, 10.2, 15)
- https://nextjs.org/docs (proveriti najnoviju verziju)
