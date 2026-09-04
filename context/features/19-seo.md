# 19 — SEO i metapodaci

## Pregled

Faza 4, fajl 1/3. Kompletna SEO infrastruktura po poglavlju 14.

## Zahtevi

- `generateMetadata` za svaku stranicu: title šablon `%s | Camera Motion`, description sr+en (iz `metadata` namespace-a), canonical, hreflang alternates (sr ↔ en, x-default → sr) — pažljivo sa lokalizovanim pathname-ovima iz 7.1
- OG default `public/og.png` 1200×630 — placeholder generisan iz palete (logo + slogan) + `// TODO(vlasnik): zameniti pravim kadrom`
- `sitemap.ts`: sve rute u obe lokalizacije + blog članci (samo objavljeni)
- `robots.ts`: allow sve, disallow `/dev-ui`; link na sitemap
- JSON-LD po poglavlju 14: LocalBusiness (layout — naziv, url, logo, areaServed, email; BEZ telefona), Service (stranice usluga), BlogPosting (članci), BreadcrumbList (usluge + blog)
- Favicon set iz loga: `favicon.ico`, `apple-touch-icon`, manifest sa temom `#FAF8F4` (placeholder ikone + TODO)
- Provera semantike: jedan h1 po stranici, logičan redosled naslova, alt tekstovi

## Testiranje

1. Rich Results test prolazi za LocalBusiness/Service/BlogPosting
2. hreflang ispravan na svim stranicama (proveriti izvor obe verzije)
3. OG pregled ispravan u share debuggeru; sitemap sadrži sve rute i članke

## Reference

- @context/project-overview.md (poglavlja 7, 14)
- @context/features/18-blog.md
