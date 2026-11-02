# 18 — Blog (MDX)

## Pregled

Faza 3, fajl 4/4 (kraj faze). Blog iz MDX fajlova + 9 početnih članaka.

## Zahtevi

- Infrastruktura po poglavlju 13: `src/content/blog/sr|en/*.mdx`, frontmatter, SSG, draft mehanizam; tehnika po izboru (`next-mdx-remote` ili `@next/mdx` — proveriti aktuelne preporuke za App Router)
- en verzija članka opciona — bez en fajla članak ne postoji na `/en/blog` (nikad sr tekst na en listi)
- `/blog` lista po dizajn referenci (artboard `2c`): prvi članak istaknut u širokoj kartici sa naslovnom fotografijom, ostali u gridu 3×2 (naslov, kategorija, datum po locale formatu, opis, cover ako postoji), od najnovijeg
- **Filteri po kategorijama** — pilule iznad liste: Sve / Venčanja / Nekretnine / Dron i FPV / Iza kadra / Događaji i firme. Kategorije izviru iz `tags` u frontmatteru; vrednosti u `tags` su stabilni ključevi koji se NE prevode (princip 5), a nazivi se prikazuju kroz `blog` namespace. Ključevi: `vencanja`, `nekretnine`, `dron-fpv`, `iza-kadra`, `dogadjaji-firme`. Članak može imati više ključeva u `tags` i tada se pojavljuje u svakoj od tih kategorija. Filter kroz query param (`?kategorija=`, vrednost je ključ), ne kroz stanje u komponenti — da URL bude deljiv
- **„Prikaži još tekstova"** — dugme ispod grida; lista odjednom prikazuje 7 članaka (1 istaknut + grid 3×2), pa sa 9 početnih članaka dugme na listi „Sve" učitava preostala 2 i zatim se sakriva; sakriva se i kad u izabranoj kategoriji nema više stavki
- **Vreme čitanja** („6 min čitanja" na istaknutoj kartici, po dizajnu) — **računa se iz dužine teksta**, ne upisuje se u frontmatter (poglavlje 13). Utility u `src/lib/`, ~200 reči u minuti, zaokruženo naviše, minimum 1; prikaz kroz ICU plural u `blog` namespace-u (`{minutes, plural, one {# min čitanja} few {# min čitanja} other {# min čitanja}}`), nikad konkatenacija
- `/blog/[slug]`: tekst max 75ch (odluka vlasnika 26.10.2026.; putanja, naslov, opis i naslovna fotografija u široj koloni ~880px), tipografija kroz typography plugin usklađen sa paletom; custom MDX komponente iz poglavlja 13 (YouTubeLite, slika sa potpisom)
- Metadata iz frontmattera
- **9 početnih članaka na srpskom** (~500-800 reči, prirodan ton, vlasnik dorađuje). Pravila za sve članke:
  - ne izmišljati činjenice van navedenih teza (imena, datume, konkretne lokacije, cene, uslove saradnje); gde detalj nedostaje, pisati uopšteno
  - bez placeholder markera u tekstu (npr. „[dopuniti]"), jer bi završili u build-u
  - `date` u frontmatteru je placeholder, svaki članak ima drugi datum da sortiranje i istaknuta kartica budu predvidljivi; vlasnik datume menja pre objave
  - interni linkovi ka stranici odgovarajuće usluge i ka kontaktu, gde se prirodno uklapaju
  - nigde ne opisivati let dronom iznad okupljenih ljudi

1. "Kako izgleda snimanje svadbe dronom — šta treba da znate" (priprema, dozvole lokacije, vremenski uslovi, uklapanje sa klasičnim snimanjem)
   - slug: `snimanje-svadbe-dronom`, `tags: [vencanja, dron-fpv]`

2. "Zašto FPV prolet prodaje nekretninu bolje od fotografija" (osećaj prostora, primer kuće za Booking)
   - slug: `fpv-prolet-nekretnine`, `tags: [nekretnine, dron-fpv]`

3. "5 pitanja koja treba da postavite snimatelju pre venčanja" (oprema, backup, rok isporuke, šta je u ceni, zvuk)
   - slug: `pitanja-za-snimatelja-pre-vencanja`, `tags: [vencanja]`

4. "Jutro pre venčanja: kako sam snimio crkvu pre dolaska gostiju"
   - slug: `jutro-pre-vencanja-snimanje-crkve`, `tags: [iza-kadra, vencanja]`
   - stvarni projekat, prvo lice jednine, priča vlasnika
   - teze:
     - vlasnik je namerno došao kod crkve mnogo ranije, da natenane leti dronom i uhvati lepe kadrove
     - peh: ispraznila se baterija u ključu od kola, pa je morao da ode i kupi novu da ne bi ostao bez kola taj dan
     - zahvaljujući ranom dolasku stigao je i da reši ključ i da posle toga natenane snimi crkvu spolja dronom, a praznu crkvu iznutra kamerom
     - svetlo u crkvi je zahtevno: kroz prozore ulazi jako sunce, a zidovi sa freskama su tamniji; podešavaju se shutter i blenda, a da bi se videla lica ljudi blenda se otvara, pa prozori na snimku mogu da izgore
     - pravilo: lica ljudi su uvek bitnija od prozora
     - poenta za čitaoca: rani dolazak snimatelja je rezerva za nepredviđeno i vreme za kadrove koje kasnije, kad stignu gosti, nema kad da se snime

5. "Jahta, otvoreno more i dron koji se nije vratio"
   - slug: `snimanje-jahte-dronom-na-moru`, `tags: [iza-kadra, dogadjaji-firme]`
   - stvarni projekat, prvo lice jednine, priča vlasnika
   - teze:
     - klijent je firma za iznajmljivanje plovila, Jadran kod Zadra; klijent se ne imenuje
     - snimanje jahte (glisera) u brzoj vožnji na otvorenom moru, dron DJI Mavic Air
     - izazov: plovilo se ljulja, vlasnik stoji na njemu i mora da održi ravnotežu, a pogled sve vreme drži na ekranu daljinskog dok upravlja dronom i gradi kadrove
     - odsjaji sunca od vode i od belih delova jahte otežavaju kasniju obradu snimka
     - na kraju snimanja aktiviran je RTH, ali home point je ostao na mestu poletanja: jahta se u međuvremenu pomerila, a home point nije ažuriran, pa je dron krenuo ka toj staroj tački na otvorenom moru
     - vlasnik ga je nekoliko puta vraćao ručno, dron je pri tome udario u jahtu i pao u more
     - dron je dobro osušen, ali so je oštetila elektroniku i dron je ostao neispravan
     - memorijska kartica i snimci su spaseni, klijent je na kraju bio zadovoljan
     - pouka: pri snimanju sa plovila u pokretu home point se neposredno pre povratka ažurira na trenutnu poziciju daljinskog, a RTH se ne tretira kao automatski povratak do plovila
     - ton: iskreno, bez dramatizacije; akcenat na tome da je materijal sačuvan i da je klijent dobio snimak
     - bez pominjanja dozvola i regulative u ovom članku

6. "Koliko košta snimanje venčanja i od čega zavisi cena"
   - slug: `koliko-kosta-snimanje-vencanja`, `tags: [vencanja]`
   - teze:
     - bez konkretnih iznosa u tekstu: polazna cena venčanja dolazi iz `PRICES` (najniža cena paketa) i prikazana je na stranici venčanja, pa članak na nju upućuje linkom; konačan iznos zavisi od dogovora
     - tri paketa: Osnovni (kamera na zemlji), Standard (+ dron), Premium (+ FPV dron); iznosi paketa se u članku ne navode
     - dodaci koji utiču na cenu: statična kamera u crkvi (emocije gostiju), highlight spot, snimak celog događaja u punoj dužini
     - šta još utiče: trajanje snimanja i lokacija (Beograd i okolina kao baza, dalje po dogovoru)
     - poziv na kontakt za ponudu, link ka stranici venčanja

7. "Klasičan dron ili FPV: kada šta ima smisla"
   - slug: `klasican-dron-ili-fpv`, `tags: [dron-fpv]`
   - teze:
     - klasičan dron: miran, stabilan kadar iz vazduha, širok pogled na lokaciju, lebdenje, postepeno otkrivanje prostora
     - FPV: dinamičan prolet kroz prostor, osećaj kretanja i brzine, kadrovi koje klasičan dron ne može (prolazak kroz vrata, uske prostore)
     - gde šta ima smisla: venčanja, nekretnine, firme; najviše daje kombinacija
     - veza sa paketima venčanja (Standard sa dronom, Premium sa FPV dronom) i link ka članku o FPV proletu za nekretnine
     - link ka FPV usluzi

8. "Venčanje zimi ili po kiši: šta je realno snimiti"
   - slug: `vencanje-zimi-ili-po-kisi`, `tags: [vencanja]`
   - teze:
     - ne ponavljati članak 1 (vremenski uslovi su tamo pomenuti ukratko); ovde detaljnije, uz link ka njemu
     - dron ne leti po kiši i jakom vetru; plan B je kamera na zemlji i enterijer
     - zimi je dan kraći, pa se spoljni kadrovi i let dronom planiraju ranije u danu
     - hladnoća skraćuje trajanje baterija
     - sneg, magla i oblačno nebo mogu dati posebne kadrove
     - unapred se dogovara šta se snima ako vreme ne dozvoli let; ne obećavati konkretne uslove (povraćaj novca, novi termin), to se dogovara pojedinačno

9. "Promo video za firmu: od ideje do gotovog snimka"
   - slug: `promo-video-za-firmu`, `tags: [dogadjaji-firme]`
   - teze:
     - koraci: razgovor o cilju i o tome gde će video biti objavljen (sajt, društvene mreže), ideja i plan kadrova, snimanje (kamera, dron, FPV po potrebi), montaža samo jednom rečenicom, isporuka u formatima za namenu (horizontalno za sajt i YouTube, vertikalno 9:16 za Instagram)
     - šta firma treba da pripremi: lokaciju, ljude, proizvode ili prostor koji se prikazuje
     - kao primer link ka članku o snimanju jahte (bez imenovanja klijenta)
     - link ka stranici usluge promo videa i ka kontaktu

## Testiranje

1. Lista i članci rade na obe lokalizacije; članak bez en verzije ne postoji na /en/blog
2. `draft: true` ne izlazi u build; datumi formatirani po locale-u
3. YouTubeLite radi unutar MDX-a
4. Filter radi za svih 5 kategorija preko `?kategorija=`, URL je deljiv; članak sa više `tags` vrednosti pojavljuje se u svakoj svojoj kategoriji
5. „Prikaži još tekstova" na listi „Sve" učitava preostala 2 članka i zatim nestaje

## DoD Faze 3 (zbirna provera)

- [ ] O nama kompletna, uključujući ekipu iz `team.ts` i sekciju „Kako radimo"
- [ ] Kontakt: forma šalje na Gmail, rate limit i honeypot rade, telefon skriven do klika
- [ ] Blog sa 9 članaka; build zelen

## Reference

- @context/project-overview.md (poglavlja 8, 13)
- @context/features/03-i18n-i-tipizirane-rute-done.md
- https://nextjs.org/docs (MDX u App Routeru — proveriti najnoviju verziju)