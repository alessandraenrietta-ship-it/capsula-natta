# Regole del progetto "capsula-natta"

Questo file contiene le regole che Claude deve rispettare **sempre**
quando lavora in questa cartella.

Repository: https://github.com/alessandraenrietta-ship-it/capsula-natta
Indirizzo provvisorio (GitHub Pages):
https://alessandraenrietta-ship-it.github.io/capsula-natta/
Cartella sul computer: `C:\Users\aless\Documents\capsula-natta`. Si
lavora solo dentro questa cartella e non si tocca nient'altro in
Documenti.

Modello di riferimento: il sito di orientamento, nella cartella
`../orientamento-natta`
(https://github.com/alessandraenrietta-ship-it/orientamento-natta). Si
legge e se ne copiano file, ma **non si modifica mai**. Prima di
proporre qualcosa sulla grafica si leggono il suo `CLAUDE.md`,
`docs/decisioni-grafica.md` e `grafica.css`. Da lì si copiano, quando
servono: `fonts/cutive-mono-regular.ttf` con `fonts/OFL.txt`,
`immagini/logo-natta.png`, `anteprima.bat` e `anteprima.ps1`.

## 1. Che cos'è

Il sito "Vent'anni di Natta": il sito del ventennale dell'IIS Giulio
Natta di Rivoli (2006–2026), non della sola capsula del tempo. La
scuola nasce nel 2006: prima non esisteva.

- **Titolo del sito**: "Vent'anni di Natta" (sostituisce "Vent'anni del
  Natta"; scelta di Alessandra, 28 ottobre 2026, consapevole del doppio
  senso fra la scuola e la persona, Giulio Natta).
  Occhiello sopra il titolo: solo "2006–2026" (dal 29 ottobre 2026;
  prima "2006–2026 · CAPSULA DEL TEMPO"). Titolo
  della scheda del browser della home: "Vent'anni di Natta | IIS Giulio
  Natta, Rivoli". Il nome del repository resta `capsula-natta`.
- **A chi si rivolge**: studenti e docenti di oggi. I testi devono
  essere comprensibili anche a famiglie, ex studenti e ospiti delle
  conferenze.
- **Una sola data da gestire**: quella dell'interramento, scritta nel
  file dei contenuti. L'apertura è dieci anni dopo e il sito la calcola
  da solo. Data provvisoria dell'interramento: 1 maggio 2027, ore
  15.00. Data e ora stanno in `contenuti/comuni.txt`. Si mostrano
  subito, scritte come provvisorie; il sito non verrà pubblicizzato
  finché la data non è approvata.
- **Tre fasi**, che il sito ricava da solo da quella data:
  1. **prima dell'interramento**: eventi, Partecipa, Per i docenti;
  2. **dopo l'interramento**: l'elenco di che cosa contiene la capsula,
     senza i contenuti; Partecipa e Per i docenti spariscono da sole da
     menu, pulsanti e link, e chi ha il link le trova chiuse (punto 9).
     Nella capsula ci sono di sicuro
     le lettere; il resto è in definizione: [DA COMPLETARE: che cosa
     contiene la capsula];
  3. **dopo l'apertura**: i contenuti, comprese le lettere.
- I contenuti della capsula non si mostrano prima dell'apertura.

## 2. Sito statico

- Solo **HTML, CSS e JavaScript** scritti a mano. **Nessuna libreria
  esterna**, **nessun font esterno**, **nessun passaggio di
  compilazione**: i file nella cartella sono esattamente quelli che
  finiscono online.
- **Solo percorsi relativi** per i file del sito (`grafica.css`,
  `immagini/logo-natta.png`, mai `/grafica.css` né l'indirizzo completo
  del sito). Il sito deve poter cambiare indirizzo senza toccare il
  codice: oggi sta su GitHub Pages, poi avrà un sottodominio della
  scuola e il repository passerà al referente del sito d'istituto. Gli
  indirizzi completi (`https://...`) si usano solo per i siti esterni.
- **Nessuna funzione specifica di GitHub** (niente GitHub Actions,
  niente impostazioni o file che funzionano solo su GitHub Pages): il
  sito deve funzionare uguale su qualsiasi server. Come si sposta è
  spiegato in `LEGGIMI.md`.
- **L'unica eccezione voluta è il file `CNAME`**, che fa puntare un
  sottodominio della scuola a GitHub Pages. Si aggiunge solo quando il
  sito è pronto e il nome del sottodominio è deciso. Se un giorno il
  sito passerà sul server della scuola, basta cancellarlo.
- **La pagina di errore `404.html`** non è un'eccezione: è una pagina
  normale. GitHub Pages la mostra da solo; su un altro server va
  attivata nelle sue impostazioni, altrimenti si vede l'errore del
  server (punto 9).
- Le pagine leggono i file di `contenuti/` con JavaScript: aprire una
  pagina con un doppio clic non basta, l'anteprima si fa con
  `anteprima.bat`.
- Prima di dare per buono un collegamento si controlla che il file
  esista con quel nome esatto, maiuscole comprese: il server distingue
  `Foto.jpg` da `foto.jpg`, il computer di casa no.
- Nomi di file e cartelle **minuscoli**, con **trattini**, senza spazi
  né accenti.
- **Il numero `?v=`.** Quando cambia un file CSS o JS si aumenta di uno
  il `?v=` in **tutte** le pagine che lo richiamano (`grafica.css?v=3`
  diventa `?v=4`). Senza, i browser continuano a mostrare la versione
  vecchia. In `404.html` i numeri stanno nello script in fondo alla
  pagina (`FOGLIO` e `SCRIPT`).

## 3. Contenuti separati dal codice

- Testi, date ed eventi stanno nella cartella `contenuti/`, in file
  `.txt` modificabili da chi non programma, con lo stesso formato del
  sito di orientamento, spiegato in `LEGGIMI.md`:
  - righe `campo: testo`
  - sezioni `== NOME ==`
  - tabelle con le colonne separate dalla barra verticale `|`, una riga
    per elemento
  - le righe che iniziano con `#` sono commenti
- Ogni scritta che compare sulla pagina sta in un file di `contenuti/`,
  non nel codice.
- Un dato comune a più pagine sta in un solo file e non si ricopia
  altrove.

## 4. Il sito è in bozza

Ogni pagina ha nella testa
`<meta name="robots" content="noindex, nofollow">`, così i motori di
ricerca non la mostrano. Si mette anche nelle pagine nuove e si toglie
da tutte solo quando Alessandra dice che il sito è approvato. Non
nasconde il sito a chi ha il link. In `404.html` resta anche dopo: una
pagina di errore non va mai sui motori di ricerca.

## 5. Prima il telefono, accessibilità sempre

- Si progetta per il telefono (375 pixel), poi per computer e LIM.
- Contrasto del testo almeno **4,5:1**, verificato con il calcolo.
- Testo alternativo per ogni immagine, `alt=""` per quelle solo
  decorative. Nessun testo dentro le immagini.
- Tutto usabile da tastiera, con il focus ben visibile: contorno blu
  notte di 3 px.
- Con `prefers-reduced-motion` (chi ha chiesto al computer di ridurre
  il movimento) niente animazioni: i disegni compaiono già interi.
- Elementi da toccare alti almeno 44 px. Testi ad almeno 16 px (di
  base 17), interlinea 1,6.

## 6. Grafica "a cartolina"

Come il sito di orientamento (punto 13 del suo `CLAUDE.md`), con queste
regole:

- **Fondo tutto bianco.** Sezioni separate da un filetto grigio sottile
  `#D5D9DE`, solo decorativo.
- **Colori** (contrasto sul bianco):
  - verde `#026C37` (6,6): titoli, pulsanti, link;
  - blu notte `#00193C` (17,9): il testo;
  - grigio `#5B6B80` (5,4): scritte secondarie;
  - i tre verdi del disegno, al punto 7.
  Arancione, rosa e blu degli indirizzi qui **non si usano**. I colori
  non si cambiano senza dirlo ad Alessandra.
- **Un solo carattere: Cutive Mono**, anche nei testi lunghi (licenza
  SIL OFL, testo in `fonts/OFL.txt`), dal file
  `fonts/cutive-mono-regular.ttf` caricato con `@font-face`: nessun
  collegamento a Google Fonts. Ha un solo spessore:
  `font-synthesis: none` impedisce il grassetto finto,
  `font-variant-ligatures: none` toglie le legature ("fi" resta di due
  lettere). Contorno di 0,3 px nel colore del testo
  (`-webkit-text-stroke`), come in orientamento; non sul timbro.
- **Pulsanti a etichetta**: rettangolo ad angoli vivi, alti almeno
  44 px, con la freccia "›" disegnata dal CSS (il "›" del Cutive Mono
  è uguale a ">"), nascosta al lettore di schermo. Pieni verdi con
  testo bianco, oppure bianchi con bordo e testo verdi.
- **Foglietti da calendario** per le date e il conto alla rovescia:
  contorno di 1 px blu notte, angoli vivi, circa 58 px di larghezza
  (64 nel conto alla rovescia, perché ci stiano "SECONDI" e i giorni a
  tre cifre);
  dentro la scritta piccola maiuscola grigia (12 px) e il numero grande
  (30 px) in verde; niente anellini, niente striscia piena. Sono un
  disegno (`aria-hidden`): la data per intero è scritta per il lettore
  di schermo.
- Titoli e testi brevi centrati con le righe pareggiate
  (`text-wrap: balance`).
- **Non si riprendono** da orientamento il titolo che si gira e il
  testo giustificato su due colonne: il testo è allineato a sinistra.

## 7. Il disegno: il pero e la capsula

- **Il disegno definitivo** è `immagini/pero-capsula.svg`, preparato
  da Alessandra e scelto il 28 ottobre 2026: si usa **così com'è** e
  sostituisce ogni versione precedente. Chioma a nuvola, base sinuosa,
  il terreno formato dalle linee stesse. Largo 680 e alto 300; il
  pero sta fra 230 e 450.
- **Tre verdi**, dall'esterno all'interno: `#00321A` (14,3 sul
  bianco), `#026C37` (6,6), `#5B9B2F` (3,4). Il terzo è sotto 4,5: si
  usa **solo per le linee del disegno, mai per il testo**.
- **linea-1 e linea-2** fanno terreno, tronco e chioma; ognuna è divisa
  in due metà, sinistra e destra, che si incontrano in cima alla chioma.
  **linea-3** disegna la chioma interna e la capsula sotto terra.
- **Niente linea grigia del terreno**: il terreno lo fanno i primi
  tratti di linea-1 e linea-2.
- **Righette solo nella parte alta della chioma**, corte e verso
  l'esterno: i gruppi laterali della catena del polipropilene di
  Giulio Natta.
- **Animazione**, quando il palco entra nello schermo: le due metà di
  linea-1 partono insieme dai due bordi e si incontrano in cima alla
  chioma; linea-2 fa lo stesso mezzo secondo dopo; poi linea-3 disegna
  la chioma interna e scende a chiudere la capsula; infine compaiono le
  righette. In tutto circa 3,3 secondi (accorciata il 28 ottobre 2026,
  sera, perché era troppo lenta): linea-1 1,3 s, linea-2 1,3 s dopo
  0,5 s, linea-3 1 s, righette 0,5 s. Con `prefers-reduced-motion` il
  disegno compare già completo. Tornando al pero da una foto il disegno compare completo,
  senza ripetere l'animazione.
- **Al computer** i tratti del terreno si allungano fino ai bordi della
  finestra (`js/peropezie.js`, con un raccordo morbido, senza angoli).
  Lo spessore delle linee sullo schermo resta uguale a ogni grandezza:
  2 px sul telefono, 2,6 px dai 40rem.
- Il disegno è decorativo: `aria-hidden`, senza descrizione.

## 8. Il timbro del piede

Seconda versione, decisa il 28 ottobre 2026: in Cutive Mono "º" si
leggeva come "°" ("20º ANNIVERSARIO"), e gli anni sotto il logo
toccavano quasi le righette.

- Due cerchi. "IIS GIULIO NATTA" sull'arco superiore, "2006 · VENT'ANNI
  · 2026" sull'arco inferiore, tutte e due leggibili da sinistra a
  destra. Le scritte stanno nella sezione TIMBRO di
  `contenuti/comuni.txt`.
- Righette verso l'interno lungo tutto il cerchio interno.
- Al centro il logo ufficiale della scuola (`immagini/logo-natta.png`),
  più grande della prima versione, colorato di verde dal CSS, **mai
  ridisegnato a mano**. Niente scritte sotto il logo.
- Tutto in verde `#026C37`. Decorativo (`aria-hidden`).
- Il logo è piccolo (231 × 155 pixel): non va ingrandito molto. Se
  arriva l'originale in alta risoluzione, si sostituisce.

## 9. Pagine e menu

Quattro voci prima dell'interramento, due dopo (deciso il 29 ottobre
2026):

1. Home
2. Il progetto
3. Partecipa (solo prima dell'interramento)
4. Per i docenti (solo prima dell'interramento)

Partecipa e Per i docenti compaiono solo prima dell'interramento (fase
ricavata dalla data, come nella home) e solo se il loro stato in
`comuni.txt` è `pronta`.

**Le pagine chiuse** (deciso il 30 ottobre 2026). Dopo l'interramento,
e anche dopo l'apertura, Partecipa e Per i docenti restano raggiungibili
da chi ha il link, ma non mostrano più moduli, QR, materiali né testi:
solo il titolo, una riga che dice che la partecipazione è chiusa e il
pulsante pieno "Torna alla home ›" (`Comuni.paginaChiusa` in
`js/comuni.js`). La riga sta nella sezione CHIUSA del file della pagina,
la scritta del pulsante in `comuni.txt`, sezione PAGINE CHIUSE. La riga
deve restare vera anche dopo l'apertura, per questo dice "Capsula
partita" e non "sigillata". La pagina si chiude al primo caricamento
dopo l'interramento: a differenza della home, non si ridispone da sola
se resta aperta in quel momento.

**La pagina di errore** (`404.html`, `js/errore.js`, testi nella sezione
PAGINA DI ERRORE di `comuni.txt`; deciso il 30 ottobre 2026): logo, nome
della scuola, titolo, una riga e il pulsante "Torna alla home ›". Può
comparire a qualunque indirizzo sbagliato, anche dentro cartelle che non
esistono, dove i percorsi relativi non funzionano. Scelta fra due
soluzioni: non una pagina autosufficiente, ma uno script dentro
`404.html` che risale dall'indirizzo fino al primo `index.html` e da lì
fa partire tutti i percorsi con un `<base>`. L'indirizzo del sito non è
scritto da nessuna parte, i testi restano in `contenuti/` e lo stile è
quello di tutto il sito. Senza JavaScript, o se la cartella del sito non
si trova, si vede solo il titolo con il link al sito della scuola: quel
testo sta nel file, come gli avvisi delle altre pagine. Per lo stesso
`<base>` qui non c'è il link "Salta al contenuto". Con l'anteprima si
prova a un indirizzo sbagliato (`anteprima.ps1` mostra `404.html` come
GitHub); online si può provare solo dopo il push.

**Niente pagina "Il pero".** Il pero sta nella home, nella sezione "10
anni di PEROpezie". Le istruzioni per la foto annuale stanno in una
sezione della pagina Il progetto, che resta online per tutti i dieci
anni.

**Nessuna password**, in nessuna pagina: un sito statico non può
proteggere davvero una pagina, quindi tutto ciò che sta nel sito è
pubblico, anche "Per i docenti".

**Partecipa**: il sito non riceve nulla. La pagina contiene solo i link
(e i codici QR) ai Google Moduli del dominio della scuola: aperti solo
agli utenti dell'istituto, una risposta per persona, nessuna raccolta
delle email. Titolare del trattamento dei dati è la scuola; informativa
e modalità le decide la dirigente, sentito il DPO. Nei questionari non
si caricano foto.

La pagina `partecipa.html` (`js/partecipa.js`, testi in
`contenuti/partecipa.txt`, fatta il 29 ottobre 2026):

- apertura: titolo "Partecipa", una riga futurista e, in un riquadro
  con il bordo verde, l'informazione vera che i moduli si aprono solo
  con l'account della scuola;
- "Questionario per gli studenti" e "Dizionario del presente": per
  ciascuno una riga futurista e il campo `link`. Finché c'è
  `[DA COMPLETARE: link del modulo]` compare il segnaposto; quando c'è
  un link che comincia con `https://`, compaiono il pulsante pieno
  "Apri il modulo ›", il codice QR (`js/qr.js`, copiato identico dal
  sito di orientamento, che lo ha preso dal Liceo Digitale) e sotto la
  riga per inquadrarlo;
- "Per i docenti": l'informazione vera che il questionario dei docenti
  arriva solo via mail istituzionale, senza link né password; sotto, il
  link "Il kit per i docenti ›" verso `per-i-docenti.html`, con le
  stesse regole del link nel piede (`Comuni.linkKit`): solo se la pagina
  è `pronta`.

**Per i docenti**: contiene il kit. Si scrive "docenti", non
"colleghe". La pagina `per-i-docenti.html` (`js/docenti.js`, testi in
`contenuti/docenti.txt`, fatta il 29 ottobre 2026):

- apertura: titolo "Per i docenti" e una riga futurista;
- "Come funziona in classe": tre passaggi numerati (il questionario con
  il QR, 20–30 minuti; il controllo delle risposte della propria
  classe; la lezione di revisione sulla bozza stampata), con i nomi
  normali e le descrizioni futuriste;
- "Materiali da scaricare": scheda di lavoro per la revisione, QR da
  stampare, istruzioni passo passo, ognuno con `[DA COMPLETARE: file]`;
  quando c'è il percorso del file (cartella `materiali/`), il nome
  diventa il link per scaricarlo;
- "Il questionario dei docenti": la frase vera sulla mail
  istituzionale, senza link né password. Sta in `comuni.txt`, sezione
  DOCENTI, perché la usa anche Partecipa: un dato comune a più pagine
  sta in un solo file;
- "Calendario" e "Referenti": `[DA COMPLETARE]` (referenti: solo
  contatti istituzionali).

**Pagine non ancora fatte.** La sezione PAGINE di
`contenuti/comuni.txt` elenca le pagine, ognuna `pronta` o `in
preparazione`. Pulsanti e link verso una pagina `in preparazione` non
compaiono, così nessuno finisce su una pagina di errore. È una cosa
diversa dalle fasi: dopo l'interramento Partecipa e Per i docenti non
si collegano più, anche se sono `pronta` (`Comuni.pagina` in
`js/comuni.js`). Prima di ogni push si controlla che ogni pagina
`pronta` esista davvero.

**Il menu** (disposizione A, scelta da Alessandra il 29 ottobre 2026; la
B, centrata su due righe, è stata scartata). Lo costruisce
`Comuni.menu` in `js/comuni.js`, leggendo la sezione PAGINE di
`comuni.txt`: le voci sono le righe con il nome nell'ultima colonna,
nell'ordine del file, solo per le pagine che si possono collegare.
Con una sola voce il menu non compare.

- Al computer le voci stanno affiancate a destra del nome della scuola,
  sulla stessa riga, se ci stanno; il sito lo misura da solo.
- Altrimenti (telefono) a destra c'è il pulsante vuoto "Menu" con la
  freccia in basso; il nome della scuola, se serve, va su due righe.
  Il pulsante apre l'elenco sotto la testata, sopra la pagina, una voce
  per riga separate da filetti.
- La pagina in cui si è: verde e sottolineata, con
  `aria-current="page"` (la dice `<body data-pagina="...">`).
- Il pulsante ha `aria-expanded` e `aria-controls`; Esc chiude il menu
  e riporta il focus sul pulsante; anche un clic fuori lo chiude.
- Nelle pagine interne logo e nome della scuola portano alla home ("IIS
  Giulio Natta, pagina iniziale" per il lettore di schermo).

## 10. La home

In quest'ordine:

Ordine deciso il 29 ottobre 2026. Titoli: un solo h1, il titolo del
sito; h2 le sezioni.

1. **Testata**: logo, nome della scuola e menu (punto 9).
2. **Apertura**, senza disegno: occhiello "2006–2026", titolo
   "Vent'anni di Natta" (primo elemento della pagina e unico h1), la
   riga "La nostra storia, dalle origini a oggi." e il carosello delle
   foto storiche (vedi sotto). I pulsanti non stanno qui.
3. **"Gli eventi del ventennale"** (solo prima dell'interramento; dopo
   la sezione sparisce e al suo posto non compare nulla): il programma,
   ogni evento con il foglietto della data. Vedi sotto.
4. **"Capsula del tempo"** (h2): la riga "La scuola di oggi parla a
   quella di domani.", in tutte e tre le fasi, il conto alla rovescia e
   la data (vedi sotto); in fondo i pulsanti "Partecipa" e "Il progetto",
   quando le pagine sono pronte. Dopo l'interramento "Partecipa" sparisce
   e resta solo "Il progetto". Dopo l'interramento, spariti gli eventi,
   la sezione sale da sola sotto l'apertura, senza modifiche a mano.
5. **"10 anni di PEROpezie"**: i dieci anni sono quelli della capsula
   sotto il pero, dall'interramento all'apertura, non quelli della
   scuola. Vedi sotto.
6. **Piede**: solo il timbro. Il link al kit non sta più nel piede di
   tutte le pagine (deciso il 30 ottobre 2026): compare solo nel piede
   della pagina Il progetto (punto 9).

**Il conto alla rovescia** si mostra subito, con la data provvisoria
dell'interramento (1 maggio 2027, ore 15.00) scritta come tale anche
sulla pagina. Dal 30 ottobre 2026 ha mesi e anni: sostituiscono il
foglietto unico con il totale dei giorni, deciso il 28 ottobre 2026.
Cambia con le fasi:

- **prima dell'interramento**: "All'interramento della capsula
  mancano", foglietti per mesi, giorni, ore, minuti e secondi; sotto
  "1 maggio 2027, ore 15.00 · data da confermare" (data e ora da
  `comuni.txt`, la scritta finché la data non è approvata);
- **dopo l'interramento**: "All'apertura della capsula mancano",
  foglietti per anni, mesi e giorni; sotto la sola data dell'apertura;
- **dopo l'apertura** sparisce e resta la frase "La capsula è stata
  aperta il [data].", con il link "Che cosa c'era nella capsula" ai
  contenuti, quando la pagina c'è.

**Come si conta** (`Comuni.mancanoCalendario`): anni e mesi sul
calendario, come si conta l'età, non dividendo i giorni per 30 o per
365; se il mese d'arrivo è più corto, ci si ferma al suo ultimo giorno.
Prima dell'interramento si conta fino al momento esatto. Dopo si guarda
solo il giorno, non l'ora: il giorno dell'interramento, dalle 15.00,
mostra 10 anni, 0 mesi, 0 giorni; il giorno dopo 9 anni, 11 mesi, 29
giorni.

**Niente foglietti iniziali a zero**: si tolgono da sinistra e ne resta
sempre almeno uno (quello degli anni c'è solo con almeno un anno; a 15
ore dall'interramento restano ore, minuti e secondi). Uno zero in mezzo
resta ("6 mesi, 0 giorni"). I foglietti stanno in due gruppi, calendario
e orologio: sul telefono vanno su due righe centrate.

Il conteggio non si annuncia di continuo ai lettori di schermo: niente
`aria-live` sui numeri. I foglietti sono `aria-hidden`; accanto alla
riga sopra i foglietti c'è una frase nascosta ("6 mesi, 1 giorno, 7 ore,
53 minuti"), senza i secondi, che il lettore di schermo legge quando ci
arriva. Se restano solo i secondi, dice quelli.

**Eccezione consapevole alla regola WCAG 2.2.2** (un contenuto che si
aggiorna da solo deve potersi fermare): il foglietto dei secondi cambia
ogni secondo e non c'è un pulsante per fermarlo. Decisione di
Alessandra, 28 ottobre 2026. Resta la mitigazione: con
`prefers-reduced-motion` il foglietto dei secondi non c'è e il conto si
aggiorna una volta al minuto.

- **L'ora** dell'interramento è il campo `ora-interramento` di
  `comuni.txt`, scritta con il punto (15.00); se il campo è vuoto, il
  conto arriva alla mezzanotte. Le date sono sempre in ora italiana,
  anche per chi apre il sito da un altro fuso orario.
- Gli orari, in tutto il sito, si scrivono con il punto: 15.00.
- Se una fase finisce mentre la pagina è aperta, la pagina si
  ridispone da sola.
- **Per provare le fasi**: `index.html?prova=2030-01-01` (oppure
  `?prova=2027-04-30T23:59:50`) mostra la pagina come se fosse quel
  momento, in ora italiana. Le schermate delle tre fasi si fanno così.

File della home: `index.html`, `grafica.css`, `js/contenuti.js`
(copiato identico da orientamento: è il lettore dei file di testo),
`js/comuni.js` (fasi, pagine, testata, piede, timbro), `js/home.js`,
`js/foto-storiche.js`, `contenuti/comuni.txt`, `contenuti/home.txt`,
`contenuti/foto-storiche.txt`. Titolo della scheda del
browser e descrizione per i motori di ricerca stanno in `index.html`,
perché devono esserci prima che la pagina legga i file di testo.
Descrizione della home: "Il ventennale dell'IIS Giulio Natta di Rivoli
(2006–2026) e la capsula del tempo custodita per dieci anni sotto il
pero della scuola."

**Valori predefiniti, per poter presentare il sito** (da confermare,
tutti modificabili dai file di contenuto):

- foto orizzontali nel palco: intere, con margini bianchi;
- data sotto le foto: completa (1 maggio 2027);
- eventi passati: nascosti, come le date degli open day di
  orientamento.

**Il carosello delle foto storiche** (`js/foto-storiche.js`, testi per
il lettore di schermo nella sezione FOTO STORICHE di
`contenuti/home.txt`, foto in `contenuti/foto-storiche.txt`; deciso il 30
ottobre 2026):

- Una foto alla volta, in ordine di anno, dalla più vecchia, in tutte e
  tre le fasi. Riquadro 3 per 2, largo come la pagina sul telefono:
  foto intere, con margini bianchi se non hanno quella forma.
- Due frecce (pulsanti quadrati a etichetta da 44 px, come PEROpezie):
  sul telefono sopra la foto, ai lati (disposizione A, scelta da
  Alessandra; la B, con le frecce sotto la foto, è stata scartata); al
  computer accanto alla foto. Sul telefono si scorre anche con il dito.
  Niente scorrimento automatico.
- Sotto la foto, di seguito sulla stessa riga: l'anno in verde e il
  credito in grigio, separati da un punto, della stessa grandezza,
  16 px, nessuna didascalia. Al computer sta su una riga, sul telefono
  va su due.
- **Accessibilità**: frecce raggiungibili da tastiera ("Foto
  precedente", "Foto successiva"), spente alla prima e all'ultima foto;
  se la freccia in uso si spegne, il focus passa all'altra; ogni cambio
  annunciato al lettore di schermo ("Foto del 2009, 2 di 5"), che legge
  solo la foto visibile; testo alternativo per ogni foto; con
  `prefers-reduced-motion` nessun movimento.
- **Foto**: una riga per foto in `foto-storiche.txt` (file, anno,
  credito, testo alternativo), con la sezione ESEMPIO e il campo
  `esempio: sì/no` come in `foto-pero.txt`. File nella cartella
  `foto-storiche/`, in JPG, sotto i 300 KB. Senza foto il carosello non
  compare.
- **Foto vere**: le sceglie e le verifica la vicepresidenza (liberatorie
  di tutte le persone riconoscibili e diritti), come le foto del pero.
  Forma del credito: [DA COMPLETARE: forma del credito delle foto
  storiche]. Nessun nome di studenti.
- **Foto d'esempio** (dal 30 ottobre 2026): cinque foto generiche di
  scuole e aule, **non** del Natta, senza persone, scaricate da Wikimedia
  Commons con il permesso di Alessandra
  (`foto-storiche/esempio-storica-1.jpg` … `-5.jpg`, rimpicciolite a
  1000 pixel e sotto i 300 KB). Due sono CC0, tre CC BY-SA 4.0: il
  credito dice autore, Wikimedia Commons e licenza, e non va tolto
  finché la foto è nel sito. Gli anni sono inventati (2006, 2009, 2014,
  2019, 2025).

**La sezione "10 anni di PEROpezie"** (`js/peropezie.js`, testi nella
sezione PEROPEZIE di `contenuti/home.txt`, foto in
`contenuti/foto-pero.txt`):

- Titolo "10 anni di Peropezie", scritto normale nel file, verde come
  gli altri titoli; la sillaba "pero" la mette in maiuscolo il CSS
  (`text-transform`), così il lettore di schermo legge una parola sola,
  e la inclina (12 gradi), come un timbro messo di traverso.
- Sotto il titolo la riga "Dal giorno dell'interramento, una foto
  all'anno fino all'apertura della capsula." (da approvare).
- **Il palco**, centrato, verticale (proporzioni 220 per 300, largo 18rem
  sul telefono e 22rem al computer): il disegno del pero (punto 7).
- **La fila delle foto** sotto il palco: foto piccole quadrate da 72 px
  con la data sotto, dalla più recente, fra due frecce (pulsanti
  quadrati a etichetta da 44 px, spenti a inizio e a fine fila). La
  data sotto le foto piccole è a 14 px: eccezione voluta al minimo di
  16, perché "1 maggio 2027" stia sotto una foto di 72 px.
- Toccando una foto, la foto prende il posto del disegno nel palco,
  **intera, con margini bianchi** se non ha la forma del palco; sotto
  data, credito e il pulsante vuoto "Torna al pero ›". La foto piccola
  scelta ha il bordo verde.
- **Accessibilità**: foto piccole e frecce sono pulsanti raggiungibili
  da tastiera ("Mostra la foto del 1 maggio 2028", "Foto più recenti",
  "Foto meno recenti"); la foto scelta ha `aria-pressed`; ogni cambio
  del palco è annunciato al lettore di schermo ("Nel palco la foto
  del ...", "Nel palco il disegno del pero."); ogni foto ha il suo
  testo alternativo dal file; tornando al pero il focus torna sulla
  foto piccola che era aperta. Niente scorrimento automatico.
- **Foto**: una riga per foto in `foto-pero.txt` (file, data, credito,
  testo alternativo). I file vanno nella cartella `foto-pero/`, in JPG,
  sotto i 300 KB. Senza foto la fila non compare e il palco mostra solo
  il disegno.
- **Foto d'esempio**, per presentare il sito prima delle foto vere
  (dal 28 ottobre 2026, sera, al posto di tre immagini grigie): cinque
  foto di peri qualsiasi, **non** del pero della scuola, senza persone,
  scaricate da Wikimedia Commons con il permesso di Alessandra
  (`foto-pero/esempio-pero-1.jpg` … `-5.jpg`, tre orizzontali e due
  verticali, rimpicciolite a 1000 pixel e sotto i 300 KB). Una è CC0,
  quattro sono CC BY-SA 4.0: il credito sotto la foto dice autore,
  Wikimedia Commons e licenza, e non va tolto finché la foto è nel
  sito. Le date sotto le foto sono inventate (1 maggio 2028–2032).
  Compaiono con `esempio: sì` in `foto-pero.txt`; con `esempio: no`
  spariscono.

**La sezione "Gli eventi del ventennale"** (`js/home.js`, titolo nella
sezione EVENTI di `contenuti/home.txt`, eventi in
`contenuti/eventi.txt`):

- Una riga per evento: data | ora | titolo | luogo | relatore,
  nell'ordine del file. Per ogni evento il foglietto della data, come
  gli open day di orientamento (58 px, mese abbreviato in grigio,
  giorno in verde, `aria-hidden`; la data per intero è scritta per il
  lettore di schermo), poi il titolo e sotto, in grigio, "ore 15.00 ·
  luogo · con relatore". Una colonna sul telefono, due dai 48rem, tre
  dai 66rem.
- Per l'interramento, in data e ora c'è "interramento": il sito prende
  data e ora da `comuni.txt`, così non si scrivono due volte.
- **Eventi inventati, per presentare il sito** (decisione di
  Alessandra, 28 ottobre 2026, sera): cinque eventi con nomi bizzarri e
  date inventate, tutti al Teatro del Natta, più l'interramento "Sotto
  il pero". **Sul sito non sono segnati come inventati**: fanno parte
  dei contenuti d'esempio (punto 12).
  Vanno sostituiti con quelli veri prima di dare il link a chi non lo
  sa. Senza data il foglietto mostra "?".
- Gli eventi passati spariscono da soli dal giorno dopo; la sezione si
  vede solo prima dell'interramento e solo se resta almeno un evento.
- **Sul telefono** (sotto i 48rem) si vedono i primi tre eventi e il
  pulsante vuoto "Tutti gli eventi", con `aria-expanded` e
  `aria-controls`; toccandolo, gli altri compaiono nella stessa pagina e
  si possono richiudere. Al computer tutti gli eventi restano visibili e
  il pulsante non c'è. Con tre eventi o meno il pulsante non compare.

**Le foto del pero** le scattano gli studenti della classe prima
incaricata, oppure le sceglie la vicepresidenza. Sotto ogni foto il
credito, nella forma "Foto della classe 1ª X, a.s. AAAA/AA": nessun
nome di studenti. Liberatorie e diritti li verifica la vicepresidenza
prima di inviare le foto.

I contenuti della capsula non si mostrano prima dell'apertura.

## 11. Il repository è pubblico

Tutto quello che entra qui dentro è visibile a chiunque, anche dopo
averlo tolto, perché resta nella cronologia di Git. Quindi niente:

- dati personali di studenti, nomi di minori
- foto riconoscibili senza liberatoria
- contatti personali dei docenti: solo contatti istituzionali
- password, chiavi o token, nemmeno in un commento
- le voci del dizionario del presente, prima dell'apertura della
  capsula

Nascondere un contenuto con il CSS o con JavaScript non basta: se il
file è nel repository, si può leggere. Si segnalano i link non
funzionanti e le immagini di provenienza o licenza incerta. Le note di
lavoro di Alessandra stanno in `materiali-grezzi/` o hanno
`NON-PUBBLICARE` nel nome: `.gitignore` le tiene fuori.

## 12. Come si scrive

- Frasi brevi, in italiano.
- Mai il trattino lungo al posto della virgola. Il trattino medio "–"
  solo negli intervalli (2006–2026). Il trattino "—" come segno degli
  elenchi e l'apostrofo del titolo restano come sono (deciso il 30
  ottobre 2026).
- **Date e orari non vanno mai a capo nel mezzo**: fra giorno, mese e
  anno ("1 maggio 2037") e fra "ore" e l'orario ("ore 15.00") c'è lo
  spazio indivisibile, cioè uno spazio che impedisce di andare a capo.
  Nei file di testo si scrive lo spazio normale: lo cambia il sito
  (`dateIntere` in `js/comuni.js`) in tutto quello che passa da
  `Contenuti.scrivi`, comprese le date che calcola da solo. Il mese
  deve essere in lettere e l'orario preceduto dalla parola "ore".
  **Unica eccezione**: la data sotto le foto piccole di PEROpezie, che
  a 14 px non sta su una riga in 80 px e senza a capo uscirebbe dalla
  foto, sovrapponendosi a quella accanto.
- **Mai inventare dati.** Dove un dato manca si scrive
  `[DA COMPLETARE: ...]`, ben visibile, e lo si segnala.

### Come sono i testi (deciso il 30 ottobre 2026)

**Lo stile futurista è abbandonato**: tutti i testi definitivi sono in
prosa normale ed essenziale. Date, orari, formati e nomi di cartelle si
scrivono alla lettera. Non contengono date, orari, numeri o luoghi
inventati che sembrino reali, nomi di persone reali, promesse o impegni
a nome della scuola.

I titoli concordati: titolo del sito, occhiello, voci del menu, titoli
delle pagine e delle sezioni ("Gli eventi del ventennale", "Capsula del
tempo", "10 anni di PEROpezie", "Il progetto", "La capsula del tempo",
"Che cosa mettiamo nella capsula", "Quando si chiude, quando si apre",
"Partecipa", "Questionario per gli studenti", "Dizionario del presente",
"Per i docenti", "Come funziona in classe", "Materiali da scaricare",
"Il questionario dei docenti", "Calendario", "Referenti").

### Eccezione temporanea: i contenuti d'esempio

Decisa da Alessandra il 29 ottobre 2026, per presentare il sito. **Da
sostituire prima di dare il link a chi non sa che è una prova.** Sul
sito non sono segnati come esempi. Restano d'esempio soltanto:

- `contenuti/eventi.txt`, sezione EVENTI: tutti gli eventi (nomi, date,
  orari, luogo e relatori inventati), compresi il nome e il luogo
  dell'interramento;
- `contenuti/foto-pero.txt`, sezione ESEMPIO, con i file
  `foto-pero/esempio-pero-1.jpg` … `-5.jpg`: peri qualsiasi presi da
  Wikimedia Commons, con date inventate; restano come sono, con i loro
  crediti;
- `contenuti/foto-storiche.txt`, sezione ESEMPIO, con i file
  `foto-storiche/esempio-storica-1.jpg` … `-5.jpg`: scuole e aule
  qualsiasi prese da Wikimedia Commons, con anni inventati; restano come
  sono, con i loro crediti;
- `contenuti/progetto.txt`, sezione CONTENUTI ("Che cosa mettiamo nella
  capsula"): la rivede Alessandra dopo aver sentito il dirigente.
I dati veri che mancano restano `[DA COMPLETARE: ...]`.

## 13. Git e metodo di lavoro

- Si usa **sempre `git` da riga di comando**, **mai `gh`**.
- Prima di creare o modificare file si propone l'intervento e si
  aspetta la conferma. Piccoli passi verificabili.
- Prima di iniziare a lavorare: `git pull`.
- **Prima di ogni push**: elenco dei file modificati e di che cosa è
  cambiato, un messaggio di commit breve in italiano, poi si aspetta il
  **sì esplicito**. Dopo il push si dice dove controllare online.
- I messaggi di commit dicono che cosa è cambiato, non come.
- Se Git chiede di accedere a GitHub si spiega che cosa succede e che
  cosa fare. **Mai chiedere password o token in chat.**

## 14. Come parlare con Alessandra

- Alessandra non è una programmatrice: parole semplici e termini
  tecnici corretti, spiegati la prima volta che compaiono.
- Mettere alla prova le sue idee, segnalare incertezze e dati da
  verificare, niente complimenti.

## 15. Questioni aperte

- Data e ora dell'interramento: 1 maggio 2027, ore 15.00, provvisorie,
  da approvare.
- Quando togliere le foto d'esempio (`esempio: no`), del pero e storiche.
- Forma del credito delle foto storiche vere (punto 10).
- Mail della commissione anniversario: dovrà essere un indirizzo sul
  dominio della scuola, non su un servizio esterno, perché ci arrivano
  le risposte degli studenti. Finché non esiste: [DA COMPLETARE:
  indirizzo mail istituzionale della commissione].
- "Che cosa mettiamo nella capsula" in `progetto.txt`: la rivede
  Alessandra dopo aver sentito il dirigente.
- Che cosa contiene la capsula oltre alle lettere (in definizione).
- Nome del sottodominio della scuola.
- Da confermare i valori predefiniti del punto 10: foto orizzontali
  intere con margini bianchi, data completa sotto le foto, eventi
  passati nascosti.
- Dati degli eventi: oggi sono inventati (punto 10), da sostituire con
  quelli veri.
- Dopo l'interramento i Google Moduli vanno chiusi a mano, in Google
  Moduli: il sito non può farlo. I QR contengono il link del modulo,
  non quello del sito: chi inquadra un QR stampato arriva al modulo, non
  alla pagina chiusa. I link restano leggibili in `partecipa.txt` finché
  non si cancellano, e comunque nella cronologia di Git.
- Scartata il 30 ottobre 2026: l'immagine d'anteprima per la
  condivisione del link (WhatsApp, mail).
