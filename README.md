# Camera Motion

Prezentacioni sajt za Camera Motion — video produkciju iz Beograda fokusiranu na snimanje dronom i kamerom (cameramotion.net).

## Pokretanje

```bash
npm install
npm run dev
```

Sajt je dostupan na [http://localhost:3000](http://localhost:3000).

Ostale komande:

```bash
npm run build   # produkcioni build
npm run start   # produkcioni server (posle build-a)
npm run lint    # ESLint
npm run test    # Vitest (jedan prolaz)
```

## Sadržaj koji se menja u kodu

Sajt nema bazu ni CMS — ovo su mesta gde se menjaju vrednosti:

| Šta                       | Gde                                                                                    |
| ------------------------- | -------------------------------------------------------------------------------------- |
| Cene paketa               | `PRICES` blok na vrhu `src/data/packages.ts` — jedino mesto u projektu gde stoji iznos |
| Brojke u hero traci       | `src/constants/hero-stats.ts`                                                          |
| YouTube ID-jevi po usluzi | `videoIds` u `src/data/services.ts`                                                    |
| Tekstovi                  | `src/i18n/messages/sr/` i `src/i18n/messages/en/` (isti ključevi na oba jezika)        |

## Environment varijable

Kopirati `.env.example` u `.env.local` i popuniti vrednosti:

```bash
cp .env.example .env.local
```

| Varijabla                  | Opis                                                                 |
| -------------------------- | -------------------------------------------------------------------- |
| `RESEND_API_KEY`           | Resend API ključ za slanje kontakt forme                             |
| `UPSTASH_REDIS_REST_URL`   | Upstash Redis URL za rate limit kontakt forme                        |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis token                                                  |
| `CONTACT_EMAIL`            | Gmail adresa vlasnika, primalac poruka sa kontakt forme              |
| `CONTACT_PHONE`            | Telefon vlasnika, prikazuje se tek na klik (npr. `+381 60 123 4567`) |
| `NEXT_PUBLIC_SITE_URL`     | Javni URL sajta, koristi se za canonical/OG                          |

## Deploy

<!-- TODO(feature 21): dopuniti kada se definiše deploy proces na Vercel -->

Deploy je ručan, na Vercel (bez CI/CD).
