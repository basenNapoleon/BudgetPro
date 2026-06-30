# Budget Pro 💰

Testversion av Min Budget — egen kopia/eget repo för att prova en större
omstrukturering (nya kategorier + CSV-import) innan den delas vidare till
fler användare.

En personlig budget-PWA byggd för iPhone. Sparas som webb-app på
hemskärmen och fungerar offline. Bygger vidare på samma grund som
Min Budget (Budget / Logg / Analys / Inställningar), men med:

- Ny kategoristruktur anpassad för CSV-import och automatisk kategorisering
- Eget namn, egen ikon (mörklila med "PRO"-bricka) så den går att skilja
  från originalappen på hemskärmen
- Helt separat data — eftersom appen körs på en annan domän delar den
  inte localStorage med originalappen, så det går att testa fritt utan
  att påverka befintlig budgetdata

## Funktioner

- **Budget** — sätt månadsbudget per kategori
- **Logg** — logga faktisk spending per månad, navigera bakåt i tiden
- **CSV-import** — importera Nordea-kontoutdrag, automatisk kategorisering
  med regelbaserad motor, dedup mot redan importerade transaktioner,
  granskningslista innan något sparas, inlärning av nya butiksregler
- **Analys** — budget vs. snitt, differens per kategori, trendgraf
- **Inställningar** — lägg till/ta bort/döp om kategorier, förslagna kategorier
- All data lagras lokalt på enheten (localStorage)
- Auto-rensar loggdata äldre än 12 månader, transaktionsrader äldre än 4 månader

## Kategoristruktur (Budget Pro)

- **Boende & fasta utgifter** — Hyra, Bankavgift
- **Skulder** — Lånåterbetalning (t.ex. CSN)
- **Transport** — Bensin, Parkering & trängselskatt, Bilförsäkring, Service & däck
- **Mat** — Dagligvaror, Restaurang & uteliv, Fika & snacks
- **Nöje & fritid** — Nöje & fritid, Shopping
- **Abonnemang & försäkring** — Telefon, Försäkringar, Övriga abonnemang
- **Övrigt** — Swish (enbart logg), Oförutsedda (enbart logg)
- **Sparande** — Semester, Långsiktigt spar

## Installation (iPhone)

1. Öppna URL:en i **Safari**
2. Tryck dela-ikonen → *Lägg till på hemskärmen*

## Deploy

1. Skapa ett nytt repo på GitHub
2. Kör följande kommandon i denna mapp:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/DITT-ANVÄNDARNAMN/DITT-REPO.git
git push -u origin main
```

3. Koppla repot till Vercel (eller GitHub Pages → Settings → Pages →
   Source: `main` / `/ (root)`)
4. Din app finns på den URL Vercel/GitHub Pages ger dig

## Uppdatera appen

```bash
git add .
git commit -m "Beskrivning av ändringen"
git push
```

Deploy sker automatiskt inom någon minut efter push.

## CSV-import — så funkar det

1. Exportera kontoutdrag från Nordea (nätbanken → Ekonomi → Kontohändelser
   & detaljer → spara som CSV)
2. Navigera till rätt månad på Logg-fliken, tryck **Importera CSV**
3. Appen filtrerar automatiskt till den 25–25-period du står på och
   hoppar över transaktioner som redan importerats
4. Granska listan — okategoriserade och fasta/inkomst-transaktioner
   visas separat. Tryck på en kategori-bricka för att ändra
5. Ändrar du en kategori får du frågan om appen ska komma ihåg
   butiken till nästa import
6. Tryck **Spara import** — beloppen läggs ovanpå eventuella manuella
   inmatningar i Logg (inget skrivs över)

Kända begränsningar: mobiloperatören "Tre" matchas inte automatiskt
(för hög risk för falska träffar på kort sökord), och försäkringsbolag
kategoriseras alltid som "Försäkringar" oavsett om det gäller hem-
eller bilförsäkring — justera manuellt och spara som regel vid behov.

## Versioner

- **v1.0** — Budget + Logg + Analys, PWA-stöd
- **v2.0** — Logg visar bara variabla kategorier, utökad Transport, ny
  log-only-kategori (Oförutsedda)
- **v3.0** — Inställningar-flik (lägg till/ta bort/döp om kategorier och
  underkategorier), förslagna kategorier, trendgraf i Analys
- **Budget Pro** — ny kategoristruktur, eget namn/ikon, CSV-import med
  regelbaserad kategorisering, dedup, granskningslista och inlärning
  av nya butiksregler

## Kontosaldo & "mörkertal" (ej påbörjad)

Kontosaldo-inmatning den 25:e för att jämföra mot (inkomst − loggat) och
visa eventuellt mörkertal. Inte designdiskuterat klart ännu.
