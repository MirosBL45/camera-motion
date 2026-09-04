<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Context Files

Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Commands

- **Dev server**: `npm run dev` (runs on http://localhost:3000)
- **Build**: `npm run build`
- **Production server**: `npm run start`
- **Lint**: `npm run lint`

**IMPORTANT:** Do not add Claude or Codex or any AI to any commit messages

# Pravila implementacije — Camera Motion

- Radi feature po feature; ne gradi ništa što nije eksplicitno traženo u toj sesiji.
- Izvor istine za IZGLED: context/design-reference/ (1:1). Izvor istine za
  funkcionalnost, sadržaj, arhitekturu: context/project-overview.md + feature fajl.
- Element postoji u dizajnu, a feature ga ne opisuje → ne implementirati, pitati.
- Nedoumica oko dizajna ili sukob smernica → PRVO PITATI sa objašnjenjem problematike.
- Slike koje ne postoje: placeholder (div sa aspect-ratio i pozadinom iz palete,
  ili next/image placeholder) + // TODO: prava slika. Ne izmišljati i ne skidati
  slike sa interneta.
- Ne dirati postojeće komentare u kodu.
- Sav vidljivi tekst kroz next-intl poruke (sr + en); ništa hardkodovano.
- Integracije (Resend, Upstash): env varijable kao placeholder, bez hardkodovanih
  kredencijala; ništa osetljivo pod NEXT_PUBLIC_.
- Boje/fontovi/radijusi samo kroz tokene dizajn sistema, nikad sirove vrednosti.
- Bez scroll animacija, fade-in efekata i parallaxa — striktno (overview 10.4).
- Posle svakog feature-a: npm run build mora proći bez grešaka.
