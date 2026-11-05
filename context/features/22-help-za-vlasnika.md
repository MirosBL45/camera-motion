# 22 — Pomoć vlasniku oko to-do spiska

## Pregled

Ovo nije feature koji se implementira odjednom. Ovo su uputstva za AI asistenta kada vlasnik radi stavke iz `context/todo-bitno/to-do-vlasnik.md` i zapne negde („kako se ovo radi", „gde se ovo upisuje", „ne radi mi posle izmene").

Sajt je završen (feature 01–21). Preostalo je da se upišu pravi podaci i zamene placeholderi. Vlasnik to radi stavku po stavku, kad stigne materijal.

## Kako se koristi

Vlasnik otvori novu sesiju i napiše, na primer:

1. „Pročitaj `@context/features/22-help-za-vlasnika.md`, zapeo sam na stavci 10."
2. „Po 22-help: kako da uradim stavku 20, ne razumem DNS deo."
3. „Po 22-help: upisao sam YouTube ID-jeve, a i dalje se vidi opis kadra."

Stavke se uvek pozivaju **po broju** iz `to-do-vlasnik.md`.

## Izvori istine

1. `context/todo-bitno/to-do-vlasnik.md` — spisak stavki sa putanjama do fajlova; **prvo se čita ovaj fajl**
2. `context/todo-bitno/bitne-stvari.md` — kratke odluke i saveti (cene, video, DCV, SEO)
3. `README.md` — uputstva za blog, env varijable, naloge (Resend, Upstash), slike za zamenu, rešavanje problema
4. `context/project-overview.md` i `AGENTS.md` — pravila projekta, koja i dalje važe
5. Sam kod — putanje u spisku su tačne na dan 05.11.2026.; pre odgovora proveriti da fajl i ključ i dalje postoje

## Pravila za AI

### Redosled kad vlasnik zapne

1. Pročitaj stavku po broju u `to-do-vlasnik.md`.
2. Otvori fajl iz stavke i proveri trenutno stanje u kodu — ne odgovaraj napamet.
3. Ako stavka nije jasna ili vlasnik nije rekao gde je tačno zapeo, **pitaj jedno kratko pitanje**, pa tek onda objašnjavaj.
4. Objasni korake (vidi „Format odgovora").
5. Ako stavka traži izmenu u kodu, **ponudi da je uradiš i čekaj odobrenje** („može", „uradi"). Bez odobrenja ne menjaj fajlove.

### Šta AI radi, a šta vlasnik

1. **Izmene u repou** (upis ID-ja, cene, teksta, zamena slike, brisanje placeholdera): AI ih radi tek posle odobrenja.
2. **Spoljni servisi** (Vercel, Resend, Upstash, Google Search Console, registrar domena, YouTube, Facebook debugger): uvek radi vlasnik; AI ga vodi klik po klik.
3. **Tajne** (API ključevi, tokeni, broj telefona, lozinke): nikad ne tražiti da se nalepe u chat i nikad ih ne upisivati u kod. Idu samo u `.env.local` i na Vercel.
4. **Podaci se ne izmišljaju**: cene, YouTube ID-jevi, imena, trajanja, adrese profila, pravni podaci (PIB, matični broj) i tekstovi o osobama dolaze od vlasnika. Ako fale — pitaj.
5. **Pravni tekstovi**: AI može da pomogne sa formulacijom, ali nije pravni savetnik; to treba reći kad se menjaju politika privatnosti ili uslovi korišćenja.

### Spisak `to-do-vlasnik.md`

1. **AI ne menja spisak** — ni ne briše, ni ne precrtava, ni ne dodaje stavke.
2. Kad je stavka gotova, AI kaže: „Stavka N je gotova — možeš da je obrišeš iz spiska", i navede koji `TODO` komentar u kodu je uklonjen ili još stoji.
3. `TODO` komentar u kodu koji se odnosi na stavku briše se kao deo izmene, samo uz odobrenje (pravilo „ne dirati postojeće komentare" važi za sve ostale komentare).

### Git

1. **Grana po stavci**, uvek iz `develop`-a: `chore/todo-<broj>-<kratak-opis>`, npr. `chore/todo-10-youtube-id`, `chore/todo-12-slike-ekipe`.
2. Na `main` se nikad ne radi checkout, merge ni push.
3. Pre commit-a: `npm run lint`, `npm run test` i `npm run build` moraju da prođu.
4. Commit i push **samo kad vlasnik kaže**; poruka u conventional formatu (`chore:`, `fix:`, `feat:`), **bez pominjanja AI-ja**.
5. Posle push-a pitaj da li da se grana obriše.
6. Stavke koje ne menjaju repo (Vercel, Resend nalog, Search Console) ne traže granu.

### Format odgovora

1. Srpski, ekavica, obraćanje sa „ti"; tehnički termini ostaju na engleskom (Settings, Environment Variables, DNS, Deploy…).
2. **Korak po korak, kratko**: numerisani koraci sa tačnim nazivima menija i dugmadi (npr. Vercel → Project → Settings → Environment Variables). Bez teorije; „zašto" samo kad nešto nije očigledno.
3. Svako nabrajanje je numerisana lista, nikad lista sa tačkama — da bi vlasnik mogao da se pozove na korak po broju.
4. Na kraju: kako se proverava da je uspelo (šta treba da se vidi na sajtu ili u servisu).
5. Ako nešto ne radi ni posle 2–3 pokušaja — stani, objasni šta je problem i šta su opcije, ne pokušavaj nasumično.

### Pravila projekta koja i dalje važe

1. Sav vidljivi tekst kroz next-intl, **uvek u oba jezika** (`src/i18n/messages/sr/` i `en/`, isti ključevi) — validator ruši build ako se razlikuju.
2. Iznos sme da stoji samo u `PRICES` u `src/data/packages.ts`.
3. Telefon nikad u kodu, HTML-u ni JSON-LD-u — samo `CONTACT_PHONE` env varijabla.
4. DCV formulacija: „registrovan pilot pri DCV" + „u skladu sa regulativom"; osiguranje se ne pominje.
5. Nigde ne opisivati let dronom iznad okupljenih ljudi.
6. Boje, fontovi i radijusi samo kroz tokene; bez scroll animacija i fade-in efekata.
7. Slike kroz `next/image` sa `sizes`; pravila za `width`/`height` i `fill` su u `context/coding-standards.md` — kad nije jasno, pitati.

## Napomene po stavkama

Česte zamke i šta proveriti. Brojevi su isti kao u `to-do-vlasnik.md`.

1. **Stavka 1 (DCV)** — nema izmene koda. Ako se registracija odloži, tekst o „registrovanom pilotu" stoji u footeru, na početnoj, na stranicama usluga, O nama i u uslovima korišćenja; promena formulacije je odluka vlasnika.
2. **Stavka 2 (env na Vercel-u)** — posle dodavanja ili izmene varijable potreban je novi deploy. `NEXT_PUBLIC_SITE_URL` je bez kose crte na kraju. Detalji i ponašanje bez ključeva: README, „Environment varijable" i „Kontakt forma".
3. **Stavka 3 (pravni tekstovi)** — menja se u oba jezika u `legal.json`; posle svake izmene i datum u `src/constants/legal.ts`.
4. **Stavke 5–8 (cene, brojke, rok isporuke, ekipa)** — samo upis vrednosti. Član ekipe bez teksta u `about.team.{id}` ruši build; isto važi za uslugu bez cene.
5. **Stavka 9 (hero video)** — postupak je u komentaru u `src/components/sections/HeroVideo.tsx`. Lokaciju fajlova u `public/` AI predlaže i pita pre nego što je uvede. Kad video uđe, brišu se placeholder blok i ključevi `home.hero.videoPlaceholder` u oba jezika. Posle izmene proveriti da hero i dalje drži 9:16 i da nema pomeranja sadržaja (CLS) — poster je obavezan.
6. **Stavka 10 (YouTube ID)** — ID ima tačno 11 znakova. Ako se posle upisa i dalje vidi opis kadra, ID je prazan ili pogrešan; ako sličica ne radi, video je verovatno „Private" („Unlisted" radi).
7. **Stavka 11 (naslovi radova)** — tekstovi u `services.json`, oba jezika; `TODO` komentari stoje na stranicama usluga.
8. **Stavke 12–14 (fotografije)** — folder `src/assets/team/` još ne postoji, pravi se sa prvom slikom. Statički import sam daje blur placeholder. Za kadrove umesto `MediaPlaceholder` i naslovne fotografije članaka proveriti `sizes` i odnos stranica; `alt` tekst ide kroz prevode ili frontmatter, nikad prazan za sadržajnu sliku.
9. **Stavke 15–19 (logo i ikonice)** — fajl se menja istim imenom i dimenzijama, kod se ne dira. `favicon.ico` je u `src/app/`, ostalo u `public/`. Spisak sa dimenzijama: README, „Slike i ikonice za zamenu".
10. **Stavka 20 (Resend domen)** — Resend daje DNS zapise koje vlasnik upisuje kod registrara domena; verifikacija može da potraje. Tek posle verifikacije se menja `FROM_ADDRESS` u `src/app/actions/contact.ts`. Od tada `CONTACT_EMAIL` ne mora biti isti Gmail kao Resend nalog.
11. **Stavka 21 (javni email)** — menja se samo `CONTACT_DISPLAY_EMAIL` u `src/constants/contact.ts`. Pošto se email pojavljuje i u politici privatnosti, pitati da li da se pomeri datum izmene u `src/constants/legal.ts`.
12. **Stavke 22–25 (posle objave)** — samo vođenje kroz servise; sajt mora biti na pravom domenu.

## Kad je stavka gotova

1. `npm run lint`, `npm run test` i `npm run build` prolaze (za izmene u repou).
2. Izmena je proverena na oba jezika (`/` i `/en`), na telefonu i desktopu, gde ima smisla.
3. AI kaže da je stavka spremna za brisanje iz `to-do-vlasnik.md` — vlasnik je briše sam.
4. Commit, push i brisanje grane — samo kad vlasnik kaže.

## Reference

- @context/todo-bitno/to-do-vlasnik.md
- @context/todo-bitno/bitne-stvari.md
- @README.md
- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
