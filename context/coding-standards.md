# Coding Standards

## TypeScript

- Strict mode enabled
- No `any` types - use proper typing or `unknown`
- Define interfaces for all props, API responses, and data models
- Use type inference where obvious, explicit types where helpful

## React

- Functional components only (no class components)
- Use hooks for state and side effects
- Keep components focused - one job per component
- Extract reusable logic into custom hooks
- DRY: Extract reusable code into smaller componets when you can
- Try keep components smaller than 150, max 200 lines. When not sure ask me. You shouldn't force it, but rather tear it where it makes sense

## Next.js

- Server components by default
- Only use `'use client'` when needed (interactivity, hooks, browser APIs)
- Use Server Actions for form submissions and simple mutations
- Use API routes when you need:
  - Webhooks (Stripe, GitHub, etc.)
  - File uploads with progress tracking
  - Long-running operations
  - Specific HTTP status codes or headers
  - Endpoints for future mobile/CLI clients
  - Third-party integrations
- Otherwise, fetch data directly in server components
- Dynamic routes for item/collection pages

## Images (next/image)

### `width` / `height` vs `fill`

- **Product grid (fiksni aspect ratio, npr. 1:1 kvadrat)** → koristi `width`/`height`, ne `fill`.
  `fill` je za slučajeve kad ne znaš aspect ratio ili kontejner diktira veličinu (hero, banner).
- **Fill** koristi samo za:
  - Hero/banner slike gde je kontejner responsive i ne znaš tačan ratio
  - ako bude nedoumica u nekoj konkretnoj situaciji, bolje pitati

### `sizes` — obavezno kad god slika NIJE fiksne render veličine

- Bez `sizes`, browser pretpostavlja `100vw` → preuzima nepotrebno veliku sliku čak i za malu
  karticu u gridu. Ovo je čest bug — slika "radi" ali se šalje 1920px verzija za 300px karticu.
- Za grid layout (npr. 4 kolone desktop, 2 mobile):

```jsx
sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";
```

- Za `/omiljeno` (wishlist) grid, ista logika — uskladi sa stvarnim CSS grid-template-columns.
- Fiksna veličina (npr. thumbnail uvek 120px) → `sizes` nije neophodan, ali ne škodi.

### Remote images (R2) — `remotePatterns` je obavezan

Next.js nema build-time pristup R2 fajlovima, pa:

1. Moraš eksplicitno whitelistovati R2 hostname u `next.config.js`:

```js
   images: {
     remotePatterns: [
       {
         protocol: 'https',
         hostname: 'your-r2-public-domain.com', // ili r2.dev / custom domain
         pathname: '/products/**',
       },
     ],
   },
```

Ne ostavljaj `hostname: '**'` — svaka slika van patterna vraća 400. 2. `width`/`height` moraš ručno proslediti (Next ne zna dimenzije remote fajla unapred) —
pošto su vam sve product slike 1:1, ovo je trivijalno: uvek isti `width={800} height={800}`
nezavisno od stvarnog fajla u R2.

### `placeholder="blur"` — pazi kod remote slika

- Automatski radi SAMO za statički importovane lokalne slike (`import x from './x.jpg'`).
- Za R2/remote slike moraš sam generisati `blurDataURL` (mali base64, ≤10px) — ne postoji
  "samo dodaj placeholder blur" za dinamičke URL-ove iz baze.
- Praktično rešenje za katalog sa stotinama proizvoda: generiši i sačuvaj `blurDataURL` kao
  kolonu u Neon bazi u trenutku uploada slike (npr. `sharp` na serveru pri uploadu → mali
  base64 string → upiši u `product.blurDataUrl`). Ne generiši on-the-fly pri renderu.
- Ako to nije isplativo za MVP: koristi `placeholder="empty"` (default) + skeleton/shimmer
  CSS preko `className` dok se slika ne učita, umesto da goniš blur za svaki proizvod.

### `priority` / `preload`

- Next.js 16 depre­cira `priority` u korist `preload={true}`. Proveri koju verziju koristiš
  (`package.json`) i standardizuj na `preload` ako si na 16+.
- Koristi SAMO za sliku koja je LCP element — obično prva product slika iznad fold-a na
  landing/kategorija stranici. Ne stavljaj na sve slike u gridu — to poništava svrhu
  (browser bi sve tretirao kao prioritetne, gubi se lazy loading benefit).
- Za sve ostale slike u gridu — default `loading="lazy"` je ono što želiš.

### `quality`

- Default je 75, dovoljno za web. Za product detail (glavna slika, zoom) razmisli o `quality={85-90}`
  jer su naočare proizvod gde kupac gleda detalje (materijal, boja, sjaj).
- Za thumbnails u gridu, default 75 je sasvim ok — ne troši bandwidth uzalud.
- Next.js 16 zahteva eksplicitan `qualities` niz u `next.config.js` ako koristiš custom quality:

```js
images: {
  qualities: [75, 90];
}
```

### `alt`

- Za e-commerce SEO ovo NIJE opciono ni generičko. `alt="slika naočara"` je beskorisno.
  Format: `{brend} {model} — {tip: okvir/kliker/kontaktna sočiva} — {boja}`
  npr. `alt="Ray-Ban Wayfarer RB2140 — okvir za naočare — crna"`.
- Generiši `alt` iz product podataka u bazi, ne hardkoduj — svaka slika treba dinamički alt.
- ako bude nedoumica u nekoj konkretnoj situaciji, bolje pitati

### SVG ikonice

- `unoptimized` ili plain `<img>` (već pokriveno gore) — next/image optimizacija ionako ne
  radi za SVG bez `dangerouslyAllowSVG: true`, i to nosi XSS rizik ako SVG-ovi nisu 100%
  pod vašom kontrolom. Za ikonice iz sopstvenog design sistema, plain `<img>` je prostije.

### Images

- Use `next/image` by default (automatic optimization, lazy loading, layout shift prevention)
- Exceptions (plain `<img>` allowed):
  - SVG icons/decorative graphics
  - Images inside CMS/markdown content (`dangerouslySetInnerHTML`)
  - HTML email templates
  - Canvas/download generation, third-party libs manipulating raw `<img>`

### Links

- Use `next/link` for internal navigation within the app (client-side routing, prefetch)
- Exceptions (plain `<a>` allowed):
  - External links (different domain) — use `target="_blank" rel="noopener noreferrer"`
  - `tel:`, `mailto:`, `sms:`, `wa.me` links
  - Download links (`download` attribute)
  - Links inside CMS/markdown content
  - Intentional full page reload (logout, cross-subdomain navigation)

## Tailwind CSS v4

**CRITICAL**: We are using Tailwind CSS v4, which uses CSS-based configuration.

**IMPORTANT**: Respect `tailwindcss(suggestCanonicalClasses)` recommendations whenever possible.

### Examples

**Example 1**

Instead of:

```html
<div class="min-h-[180px]"></div>
```

Prefer:

```html
<div class="min-h-45"></div>
```

because `180px = 45 × 4px`.

---

**Example 2**

Instead of:

```html
<div class="max-h-[400px]"></div>
```

Prefer:

```html
<div class="max-h-100"></div>
```

because `400px = 100 × 4px`.

---

- **DO NOT** create `tailwind.config.ts` or `tailwind.config.js` files (those are for Tailwind v3).
- All theme configuration must be done in CSS using the `@theme` directive in `src/app/globals.css`.
- Use CSS custom properties for colors, spacing, fonts, etc.
- No JavaScript-based configuration.

Example Tailwind v4 configuration:

```css
@import "tailwindcss";

@theme {
  --color-primary: oklch(50% 0.2 250);
}
```

## File Organization

- Components: `src/components/[feature]/ComponentName.tsx`
- Pages: `src/app/[route]/page.tsx`
- Server Actions: `src/actions/[feature].ts`
- Types: `src/types/[feature].ts`
- Lib/Utils: `src/lib/[utility].ts`

## Naming

- Component files: PascalCase and match the component name (`ItemCard.tsx`)
- Non-component files: kebab-case (`format-date.ts`, `user-schema.ts`)
- Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Interfaces: PascalCase with an `I` prefix (IUser, IProductCardProps)
- Type aliases: PascalCase with a `Type` at the end (UserRoleType, ApiResponseType)
- Enums: PascalCase with an `Enum` at the end (UserStatusEnum, OrderTypeEnum)
- Enum members: PascalCase (Active, Pending, Cancelled)
- Do not use `I`, `T`, or `E` prefixes for classes, components, functions, or variables

## Styling

- Tailwind CSS for all styling
- Use shadcn/ui components where applicable
- No inline styles

## Database

- Use Prisma ORM for all database operations
- Always use `prisma migrate dev` for schema changes (not `db push`)
- Run `prisma migrate status` before committing to verify migrations are in sync
- Production deployments must run `prisma migrate deploy` before the app starts

## Data Fetching

- Server components fetch directly with Prisma
- Client components use Server Actions
- Validate all inputs with Zod

## Error Handling

- Use try/catch in Server Actions
- Return `{ success, data, error }` pattern from actions
- Display user-friendly error messages via toast

## Testing

- Vitest for unit tests (server actions and utilities only, not components)
- Test files live next to source files: `feature.test.ts`
- Run tests: `npm run test` (single run) or `npm run test:watch` (watch mode)
- Use `vi.mock()` for external dependencies (Prisma, Resend, etc.)
- Use `vi.useFakeTimers()` for time-dependent logic

## Code Quality

- No commented-out code unless specified
- No unused imports or variables
- Keep functions under 50 lines when possible

## Documentation

- Whenever you add something that changes how the project is developed or maintained (new commands, scripts, setup steps, infrastructure, deployment process, database workflow, authentication, etc.), consider whether the `README.md` should also be updated.

- The goal is to keep the `README.md` as the single source of truth for developer onboarding and project setup.
