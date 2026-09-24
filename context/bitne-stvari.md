# Bitne stvari

Ovde idu samo ultrakratke teze — jedna odluka ili savet po redu, bez objašnjavanja.

## Cene

- Svaka usluga ima „od X €"; „cena po dogovoru" ne postoji nigde
- Sve cene samo u `PRICES` u `src/data/packages.ts`
- Venčanja i nekretnine: cene paketa iz dizajna
- Bez paketa, namerno različite radi lakšeg nalaženja: događaji 100, promo 150, FPV 200, FPV kao dodatak 250

## Kontakt linkovi

- `?usluga=` ostaje srpski ključ i na engleskom (`/en/contact?usluga=vencanje`) — namerno
- „Zatražite ponudu" u header-u na stranici usluge vodi na kontakt sa `?usluga=` te usluge (posle feature-a 13, poseban commit)

## Video

- Video na sajtu = YouTube ID (11 znakova posle `v=`), upisuje se u `videoIds` u `src/data/services.ts`
- Do klika se vidi sličica sa YouTube-a (custom thumbnail ako je postavljen)
- Savet: video može da bude „Unlisted" — ne vidi se na kanalu, a radi na sajtu
- Hero video na početnoj nije YouTube, nego MP4/WebM fajl u projektu

## Stranice usluga

- Stranice bez artboarda (događaji, promo, FPV) se sklapaju iz postojećeg šablona
- Primeri su placeholderi dok ne stignu pravi snimci
- FPV stranica koristi isti snimak kao nekretnine, ali ima više teksta (SEO)
- Koraci saradnje: deljena komponenta `ProcessSteps` (promo, kasnije O nama)
