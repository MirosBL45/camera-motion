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
| Cene paketa i usluga      | `PRICES` blok na vrhu `src/data/packages.ts` — jedino mesto u projektu gde stoji iznos |
| Brojke u hero traci       | `src/constants/hero-stats.ts`                                                          |
| YouTube ID-jevi po usluzi | `videoIds` u `src/data/services.ts`                                                    |
| Email i društvene mreže   | `src/constants/contact.ts` — isti podaci za footer i kontakt stranicu                  |
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

Iste vrednosti se upisuju i na Vercel-u: Project → Settings → Environment Variables (posle izmene je potreban novi deploy).

### Kontakt forma (Resend + Upstash)

1. **Resend** ([resend.com](https://resend.com)): napraviti nalog, pa u **API Keys** napraviti ključ sa dozvolom _Sending access_ → `RESEND_API_KEY`. Ključ se prikazuje samo jednom.
2. **`CONTACT_EMAIL`** mora biti isti email kojim je otvoren Resend nalog — dok se domen `cameramotion.net` ne verifikuje u Resend-u, pošiljalac `onboarding@resend.dev` šalje samo na tu adresu.
3. **Upstash** ([console.upstash.com](https://console.upstash.com)): **Redis → Create Database**, region Frankfurt (`eu-central-1`), besplatni plan. Na stranici baze, u sekciji **REST API**, kopirati `UPSTASH_REDIS_REST_URL` i `UPSTASH_REDIS_REST_TOKEN`.

Ponašanje bez ključeva:

- **Development** bez Resend-a: upit se ne šalje, nego se ispisuje u terminal gde radi `npm run dev`.
- **Production** bez Resend-a: forma prikazuje grešku, a razlog ide u log (Vercel → Logs).
- Bez Upstash-a ili kad Upstash ne radi: upit se šalje bez rate limita. Kvar Upstash-a se uvek loguje, a nedostajući ključevi samo u produkciji.

- Neuspelo slanje se ne računa u rate limit — posetilac može odmah ponovo da pokuša.
- Popunjeno skriveno polje za botove (honeypot): upit se ne šalje, a u logu ostaje upozorenje.

Sve poruke u logu počinju sa `[contact]`.

## Deploy

<!-- TODO(feature 21): dopuniti kada se definiše deploy proces na Vercel -->

Deploy je ručan, na Vercel (bez CI/CD).
