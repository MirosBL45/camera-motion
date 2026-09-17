# 03 — i18n i tipizirane rute

## Pregled

Faza 0, fajl 4/4 (kraj faze). Kompletna next-intl infrastruktura sa prevedenim segmentima ruta i `as-needed` prefiksom, plus sistem tipiziranih ruta. Najvažniji infrastrukturni feature — svaki kasniji ga koristi.

## Zahtevi

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

## Napomene

- Query parametri se ne prevode (princip 5; `?usluga=` vrednosti iz poglavlja 7.3)
- Nikad `next/link` direktno — samo `Link` iz `@/i18n/navigation` (princip 4)
- Proveriti aktuelnu next-intl dokumentaciju (pathnames, createNavigation API se menjao između verzija)

## Testiranje

1. `/usluge` i `/en/services` (i sve ostale rute iz 7.1) renderuju istu stranicu na oba jezika sa ispravnim segmentima
2. `/sr/usluge` → redirect na `/usluge`; `/` renderuje srpsku početnu bez prefiksa
3. `getPathname` daje ispravne URL-ove za obe varijante svake rute
4. Build prolazi; validator puca ako en nema ključ koji sr ima (namerno probati pa vratiti)

## DoD Faze 0 (zbirna provera)

- [ ] Dizajn referenca lokalno + CLAUDE.md postoje (00)
- [ ] Sve rute renderuju prazne stranice na 2 jezika sa ispravnim segmentima; sr bez prefiksa, `/sr/...` redirektuje
- [ ] Tokeni i primitivi na `/dev-ui` odgovaraju dizajnu
- [ ] Build zelen, validator prevoda aktivan

## Reference

- @context/project-overview.md (poglavlja 5, 6, 7, 8)
- @context/features/01-inicijalizacija-projekta.md
- https://next-intl.dev/docs (routing, pathnames — proveriti najnoviju verziju)
