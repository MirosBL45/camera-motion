# 00 — Dizajn referenca i radna pravila

## Pregled

Faza 0, fajl 1/4. Prva sesija u Claude Code-u: uvoz Claude Design projekta kao referencu, postavljanje `context/` foldera i CLAUDE.md sa stalnim pravilima. **U ovoj sesiji se NIŠTA ne gradi** — nema komponenti, nema stranica.

## Priprema (radi vlasnik, jednom)

1. U Claude Code-u: `/design-login` (claude_design MCP je ugrađen u novije verzije; ako `/mcp` ne prikazuje server: `claude mcp add --scope user --transport http claude-design https://api.anthropic.com/v1/design/mcp`, pa ponovo `/design-login`; kod HTTP 404 — update Claude Code)
2. Iz Claude Design: Share → Claude Code (implement this design in code) → Local agent → Copy prompt
3. Iz kopiranog prompta **obrisati poslednju liniju `Implement: Camera Motion Sajt.dc.html`** i zalepiti MCP blok na početak prve sesije, praćen instrukcijama ovog feature fajla

## Zahtevi (radi Claude Code u prvoj sesiji)

- Preko claude_design MCP-a uvesti projekat i pročitati `Camera Motion Sajt.dc.html` + `support.js`
- Sačuvati lokalnu kopiju oba fajla u `context/design-reference/` — kasnije sesije referišu lokalnu kopiju i MCP blok više nije potreban
- Napraviti `context/` strukturu: `context/project-overview.md`, `context/features/` (svi feature fajlovi), `context/design-reference/`
- Napraviti `CLAUDE.md` u korenu repoa sa sadržajem iz sekcije ispod
- Napisati kratak rezime pročitanog dizajna (sekcije, tokeni, fontovi) kao `context/design-reference/NOTES.md` — služi za brzu orijentaciju u kasnijim sesijama

## Šablon prompta za svaku sledeću feature sesiju

```
Implementiraj SAMO {naziv feature-a} prema @context/features/{NN-fajl}.md.
Arhitekturu i konvencije uzmi iz @context/project-overview.md (poglavlja navedena
u feature fajlu). Iz @context/design-reference/ koristi odgovarajuću sekciju kao
vizuelnu referencu (1:1 izgled). Ništa drugo iz dizajna ne diraj u ovoj sesiji.
```

## Testiranje

1. `context/design-reference/` sadrži dc.html, support.js i NOTES.md
3. Nijedna komponenta ni stranica nije napravljena od strane AI

## Reference

- @context/project-overview.md (poglavlja 5, 11, 16)
