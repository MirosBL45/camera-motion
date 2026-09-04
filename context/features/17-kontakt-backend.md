# 17 — Kontakt forma — backend

## Pregled

Faza 3, fajl 4/5. Server Action + Resend + Upstash rate limit; povezivanje na formu iz feature-a 16.

## Zahtevi

- `src/app/actions/contact.ts` — `submitContact` po poglavlju 12:
  - Zod šema na serveru identična klijentskoj
  - Honeypot popunjen → tihi "uspeh" bez slanja
  - Upstash `@upstash/ratelimit`: sliding window 3/10min po IP (iz `x-forwarded-for`) + 10/dan; prekoračenje vraća error kod koji UI mapira u rate-limit poruku
- Resend: na `CONTACT_EMAIL`; From `onboarding@resend.dev` + `// TODO: verifikovati cameramotion.net → upiti@cameramotion.net`; Reply-To = email klijenta; Subject `[cameramotion.net] Upit — {tip} — {ime}`; telo uredan HTML (jednostavan šablon, escape unosa) + plain-text fallback
- Greške: Resend pad → error stanje u UI + server log; nikad gutati grešku kao uspeh
- Instalirati `resend`, `@upstash/redis`, `@upstash/ratelimit`; env iz poglavlja 15

## Napomene

- Vlasnik ručno pravi Upstash bazu i Resend nalog — eksplicitno mu reći šta tačno da napravi i koje vrednosti da upiše u `.env.local` (kao i za Vercel env)
- Proveriti aktuelnu Resend i Upstash dokumentaciju

## Testiranje

1. Upit stiže na Gmail sa svim poljima; Reply-To ispravan
2. 4. zahtev u 10 min → rate-limit poruka; honeypot filtrira
3. Nevalidan payload direktno na action → server validacija odbija

## Reference

- @context/project-overview.md (poglavlja 12, 15)
- @context/features/16-kontakt-stranica.md
- https://resend.com/docs · https://upstash.com/docs (proveriti najnovije verzije)
