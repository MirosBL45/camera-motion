# Current Feature: 00 — Dizajn referenca i radna pravila

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

- Uvesti Claude Design projekat „Camera Motion prezentacioni sajt" preko claude_design MCP-a
- Sačuvati lokalnu kopiju dizajna u `context/design-reference/` kao izvor istine za izgled
- Napisati sažetak dizajna (artboardi, tokeni, tipografija, komponente) za brzu orijentaciju u kasnijim sesijama
- U ovoj sesiji se NIŠTA ne gradi — nema komponenti, nema stranica

## Notes

<!-- Any extra notes -->

Autorizacija preko `/design-login` je bila preduslov — claude.ai OAuth token nema design scopes po defaultu.

Dizajn pokriva 7 artboarda: početna (desktop i mobilna 390px), venčanja, nekretnine, o nama, blog lista, kontakt. Sve na 1440px osim mobilne.

Dizajn je usklađen sa motion pravilima iz overview 10.4 — nema animacija, samo hover tranzicije 0.2s.

Svih trinaest otvorenih pitanja je rešeno odlukama vlasnika i odluke su upisane u overview i feature fajlove. Nema više nerešenih neusklađenosti između dizajna i feature fajlova.

Najveća odluka: **recenzija nema u bilo kom obliku**. Feature 14 je otkazan, ali fajl nije obrisan — označen je kao otkazan sa sačuvanim originalnim zahtevima. To je i jedino mesto gde svesno ne slušamo dizajn referencu.

Dizajn ne pokriva: pregled usluga, usluge Eventi/Promo/FPV, blog članak, pravne stranice, 404, mobilne verzije podstranica. Dogovor: izgled se izvodi iz postojećih obrazaca dizajna, a ako zatreba dopuna radi se u Claude Design pa se ovde ponovo uvozi.

### Testiranje

<!-- If any testing, write here -->

- `context/design-reference/` sadrži dc.html, support.js i NOTES.md — potvrđeno, oba uvezena fajla `truncated=false`
- Nijedna komponenta ni stranica nije napravljena
- Build nije pokretan jer nema promena u `src/`

## History

<!-- Keep this updated. Earliest to latest -->

### Friday, 04.09.2026. | 15:43 — 00 Dizajn referenca i radna pravila

Uvezen Claude Design projekat preko claude_design MCP-a i sačuvana lokalna kopija dizajna i pratećeg canvas runtime-a. Napisan sažetak dizajna: 7 artboarda sa lokacijama, potvrđena paleta od 9 tokena, dodatne boje van overview-a, tipografska skala, radijusi i senke, konvencija placeholdera za slike, ponovljive komponente i lista otvorenih pitanja. Ništa nije implementirano.

### Friday, 04.09.2026. | 16:41 — Odluke po otvorenim pitanjima iz dizajna

Vlasnik odlučio po svih osam otvorenih pitanja i odluke su prenete u overview i feature fajlove. Model paketa proširen sa svadbenih na pakete po usluzi, sa cenama u jednom bloku radi lakše izmene. Pravilo za telefon prošireno na footer. Dodat nedostajući token za hover primarnog dugmeta, a tabele tipografije i senki usklađene sa dizajnom. Uveden model podataka za ekipu od šest članova sa pripremom za slike. Zadržani hero brojevi, blog filteri i dugme za učitavanje još tekstova. Popravljen sukob gde je jedan feature zabranjivao brojke koje dizajn ima. Unakrsnom proverom nađeno pet novih neusklađenosti između dizajna i feature fajlova — zabeležene kao otvorena pitanja, bez implementacije.

### Friday, 04.09.2026. | 16:53 — Odluke po drugom krugu pitanja

Recenzije uklonjene iz celog opsega projekta: feature otkazan uz očuvan sadržaj, model podataka izbačen, sekcija skinuta sa početne, faza 3 prebrojana na četiri fajla, a README podsetnik za vlasnika ažuriran. Zabeleženo da je to jedini svesni otklon od dizajn reference. Sekcija sa četiri koraka procesa dodata na stranicu o nama po dizajnu. Mapa na kontaktu odbačena, uz izričitu napomenu da se ne dodaje iz dizajna u kasnijim sesijama. Vreme čitanja članka definisano kao izračunato iz teksta, sa prikazom kroz ICU plural.
