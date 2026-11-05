# To-do za vlasnika

Sve što je ostalo da se upiše ili zameni kad stignu pravi podaci i materijal. Brojevi idu kroz ceo fajl, pa se na stavku može pozvati po broju. Kad je stavka gotova, briše se odavde, a uz nju i `TODO` komentar u kodu ako postoji.

Stanje: 05.11.2026. (kraj feature-a 21).

## Pre objave sajta

1. **DCV registracija** mora biti završena pre objave — sajt već svuda piše „registrovan pilot pri DCV" (footer, početna, usluge, O nama, uslovi korišćenja).
2. **Env varijable na Vercel-u** (Project → Settings → Environment Variables): `RESEND_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `CONTACT_EMAIL`, `CONTACT_PHONE` (telefon se prikazuje tek na klik) i `NEXT_PUBLIC_SITE_URL=https://cameramotion.net`. Postupak za naloge je u README-u, sekcija „Kontakt forma".
3. **Pravni tekstovi** su šablon, a ne pravni savet — pregledati politiku privatnosti i uslove korišćenja (`src/i18n/messages/{sr,en}/legal.json`). Ako je Camera Motion registrovan kao preduzetnik ili firma, dopisati pun naziv, adresu i matični broj / PIB u `legal.privacy.controller` (`TODO` u `src/app/[locale]/(site)/privacy/page.tsx`). Posle svake izmene teksta promeniti datum u `src/constants/legal.ts`.
4. **Instagram i YouTube adrese** — proveriti da su tačne u `SOCIAL_LINKS` (`src/constants/contact.ts`).
5. **Cene** — proveriti iznose u `PRICES` (`src/data/packages.ts`). Usluge bez paketa imaju početne vrednosti 100 / 150 / 200 / 250 (događaji / promo / FPV / FPV kao dodatak), namerno različite da se lako nađe koji ključ se menja.
6. **Brojke u herou** (40+, 120+, 4K) — `HERO_STATS` u `src/constants/hero-stats.ts`.
7. **Venčanja: rok isporuke i iznos avansa** — `services.weddings.delivery.items.timeline` u `src/i18n/messages/{sr,en}/services.json` (`TODO` u `src/app/[locale]/(site)/services/weddings/page.tsx`).
8. **Tekstovi ekipe** — uloga i opis po osobi u `about.team.{id}` (`src/i18n/messages/{sr,en}/about.json`); sastav ekipe u `TEAM` (`src/data/team.ts`).

## Video

9. **Hero video na početnoj** — uspravno 9:16, 8–12 s, bez tona, MP4 (H.264, ~2–3 MB) + WebM + poster slika (prvi kadar). Ne YouTube. Uputstvo korak po korak stoji u `src/components/sections/HeroVideo.tsx`.
10. **YouTube ID-jevi po usluzi** — `videoIds` u `src/data/services.ts`. Sada stoji prazan `PLACEHOLDER_VIDEO_ID`, pa se umesto sličice vidi opis kadra. Snimak kuće (`FPV_HOUSE_VIDEO_ID`) je već upisan i koriste ga nekretnine, FPV i blog. ID je 11 znakova posle `v=` u linku; video može biti „Unlisted".
11. **Naslovi i trajanja primera radova** po usluzi — tekstovi u `src/i18n/messages/{sr,en}/services.json`, a `TODO` komentari stoje na stranicama:
    1. `src/app/[locale]/(site)/services/weddings/page.tsx` — imena parova su privremena, iz dizajna
    2. `src/app/[locale]/(site)/services/real-estate/page.tsx`
    3. `src/app/[locale]/(site)/services/events/page.tsx`
    4. `src/app/[locale]/(site)/services/promo/page.tsx`
    5. `src/app/[locale]/(site)/services/fpv/page.tsx`

## Fotografije

12. **Fotografije ekipe** — fajlovi u `src/assets/team/` (npr. `miroslav.jpg`), pa import u `src/data/team.ts`; primer je zakomentarisan na vrhu fajla. Statički import sam daje blur placeholder.
13. **Kadrovi umesto placeholdera** (uvodi stranica usluga, kartice usluga, O nama) — svaki placeholder na sajtu nosi opis kadra koji treba snimiti (`MediaPlaceholder`, `src/components/ui/MediaPlaceholder.tsx`).
14. **Naslovne fotografije članaka** — fajl u `public/blog/`, a putanja u `cover` u frontmatteru članka. Nijedan članak je još nema. Uputstvo je u README-u, sekcija „Blog".

## Logo i ikonice (dizajner)

Fajl se zamenjuje istim imenom i dimenzijama — kod se ne menja. Spisak sa dimenzijama je i u README-u, sekcija „Slike i ikonice za zamenu".

15. `public/logo.svg` — logo u header-u i footer-u
16. `public/og.png` — 1200×630, slika pri deljenju linka (pravi kadar sa logom, bez sitnog teksta)
17. `src/app/favicon.ico` — 16, 32 i 48 px
18. `public/apple-touch-icon.png` — 180×180
19. `public/icons/icon-192.png` i `public/icons/icon-512.png` — Android / manifest; 512 je i logo u JSON-LD-u

## Email i domen

20. **Verifikovati `cameramotion.net` u Resend-u**, pa promeniti pošiljaoca u `Camera Motion <upiti@cameramotion.net>` (`TODO` u `src/app/actions/contact.ts`). Do tada `CONTACT_EMAIL` mora biti isti Gmail kojim je otvoren Resend nalog.
21. **Javni email** — kad bude `info@cameramotion.net`, menja se samo `CONTACT_DISPLAY_EMAIL` u `src/constants/contact.ts` (footer, kontakt, politika privatnosti i JSON-LD ga čitaju odatle).

## Posle objave

22. **Google Search Console** — dodati sajt i poslati `https://cameramotion.net/sitemap.xml`.
23. **Provera strukturiranih podataka** — Rich Results Test i Schema Markup Validator (linkovi u README-u, sekcija „SEO").
24. **Lighthouse na pravom domenu** (Chrome DevTools → Lighthouse → Mobile). Lokalno, na produkcijskom build-u (05.11.2026.): Performance 93–100 (kontakt je najniži zbog forme i kalendara), Accessibility 100, Best Practices 100, SEO 100, CLS 0, LCP 0,9–1,2 s.
25. **Posle zamene OG slike** — Facebook Sharing Debugger → „Scrape Again".

## Kasnije

26. **Usluga fotografije** — rečenica na pregledu usluga je napisana i prevedena, ali zakomentarisana; otkomentarisati kad usluga krene (`TODO(team)` u `src/app/[locale]/(site)/services/page.tsx`).

## TODO komentari koji ne traže akciju

27. `TODO(feature 03+)` u `src/components/ui/sheet.tsx` i `src/components/ui/dialog.tsx` — podrazumevano dugme „Close" iz shadcn-a se ne prikazuje na sajtu: mobilni meni ima svoje dugme sa prevedenim tekstom, a dialog koristi samo `/dev-ui`.
28. `TODO(feature 21)` u sekciji „Deploy" u README-u — deploy na Vercel vlasnik radi i opisuje sam.
