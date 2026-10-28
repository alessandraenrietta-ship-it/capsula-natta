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

Il sito "Vent'anni del Natta": la capsula del tempo per il ventennale
dell'IIS Giulio Natta di Rivoli (2006–2026).

- **Titolo del sito**: "Vent'anni del Natta", con l'articolo: senza,
  "Natta" sarebbe Giulio Natta, la persona. Occhiello sopra il titolo:
  "2006–2026 · CAPSULA DEL TEMPO". Titolo della scheda del browser
  della home: "Vent'anni del Natta | IIS Giulio Natta, Rivoli". Il nome
  del repository resta `capsula-natta`.
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
     senza i contenuti; spariscono Partecipa e Per i docenti, da sole,
     e al loro posto non compare nulla. Nella capsula ci sono di sicuro
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
  vecchia.

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
nasconde il sito a chi ha il link.

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
  righette. Con `prefers-reduced-motion` il disegno compare già
  completo. Tornando al pero da una foto il disegno compare completo,
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

Cinque voci prima dell'interramento, tre dopo:

1. Home
2. Il progetto
3. Il pero
4. Partecipa (solo prima dell'interramento)
5. Per i docenti (solo prima dell'interramento)

**Nessuna password**, in nessuna pagina: un sito statico non può
proteggere davvero una pagina, quindi tutto ciò che sta nel sito è
pubblico, anche "Per i docenti".

**Partecipa**: il sito non riceve nulla. La pagina contiene solo i link
(e i codici QR) ai Google Moduli del dominio della scuola: aperti solo
agli utenti dell'istituto, una risposta per persona, nessuna raccolta
delle email. Titolare del trattamento dei dati è la scuola; informativa
e modalità le decide la dirigente, sentito il DPO. Nei questionari non
si caricano foto.

**Per i docenti**: contiene il kit. Si scrive "docenti", non
"colleghe".

**Pagine non ancora fatte.** La sezione PAGINE di
`contenuti/comuni.txt` elenca le pagine, ognuna `pronta` o `in
preparazione`. Pulsanti e link verso una pagina `in preparazione` non
compaiono, così nessuno finisce su una pagina di errore. È una cosa
diversa dalle fasi: Partecipa e Per i docenti spariscono comunque da
sole dopo l'interramento, anche se sono `pronta` (`Comuni.pagina` in
`js/comuni.js`). Prima di ogni push si controlla che ogni pagina
`pronta` esista davvero.

**Il pulsante "Menu"** della testata si aggiunge con la seconda pagina:
con la sola home non servirebbe.

## 10. La home

In quest'ordine:

1. **Testata**: logo, nome della scuola e pulsante "Menu".
2. **Apertura**, senza disegno: occhiello "2006–2026 · CAPSULA DEL
   TEMPO", titolo "Vent'anni del Natta", conto alla rovescia (vedi
   sotto), pulsanti "Partecipa" e "Il progetto". Dopo l'interramento
   "Partecipa" sparisce e resta solo "Il progetto".
3. **"10 anni di PEROpezie"**: i dieci anni sono quelli della capsula
   sotto il pero, dall'interramento all'apertura, non quelli della
   scuola. Vedi sotto.
4. **"Gli eventi del ventennale"** (solo prima dell'interramento; dopo
   la sezione sparisce e al suo posto non compare nulla): il programma,
   ogni evento con il foglietto della data.
5. **Piede**: il timbro e il link al kit della pagina Per i docenti. Il
   link sparisce insieme alla pagina, da solo, con la data
   dell'interramento: non c'è un interruttore da cambiare a mano.

**Il conto alla rovescia** si mostra subito, con la data provvisoria
dell'interramento (1 maggio 2027, ore 15.00) scritta come provvisoria
anche sulla pagina. Cambia con le fasi:

- **prima dell'interramento**: "All'interramento della capsula
  mancano", foglietti per giorni, ore, minuti e secondi, sotto la data
  e l'ora dell'interramento (con "data provvisoria" finché non è
  approvata) e la riga "Apertura prevista: 1 maggio 2037" finché la
  data è provvisoria ("Apertura: ..." quando è approvata);
- **dopo l'interramento**: "All'apertura della capsula mancano", un solo
  foglietto, più largo degli altri, con "GIORNI" e il numero totale dei
  giorni all'apertura, con il punto delle migliaia (3.653); sotto
  "Apertura: 1 maggio 2037". Il conto si fa per giorni del calendario,
  non per ore: il giorno dell'interramento mostra il totale pieno;
- **dopo l'apertura** sparisce e resta la frase "La capsula è stata
  aperta il [data]", con il link "Che cosa c'era nella capsula" ai
  contenuti, quando la pagina c'è.

Testi approvati da Alessandra: "All'interramento della capsula
mancano", "All'apertura della capsula mancano", "Che cosa c'era nella
capsula", "Apertura prevista:" e "Apertura:".

Il conteggio non si annuncia di continuo ai lettori di schermo: niente
`aria-live` sui numeri. I foglietti sono `aria-hidden`; accanto alla
riga sopra i foglietti c'è una frase nascosta ("184 giorni, 7 ore, 53
minuti"), senza i secondi, che il lettore di schermo legge quando ci
arriva.

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
`contenuti/comuni.txt`, `contenuti/home.txt`. Titolo della scheda del
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

**La sezione "10 anni di PEROpezie"** (`js/peropezie.js`, testi nella
sezione PEROPEZIE di `contenuti/home.txt`, foto in
`contenuti/foto-pero.txt`):

- Titolo "10 anni di Peropezie", scritto normale nel file, verde come
  gli altri titoli; la sillaba "pero" la mette in maiuscolo il CSS
  (`text-transform`), così il lettore di schermo legge una parola sola.
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
- **Foto d'esempio**, per presentare il sito prima delle foto vere: tre
  immagini grigie senza persone (`immagini/esempio-foto-1.svg`, una
  orizzontale, una verticale, una quadrata), segnate "FOTO D'ESEMPIO"
  nell'immagine e nel testo alternativo. Sono l'unica eccezione voluta
  alla regola "nessun testo dentro le immagini" (punto 5). Compaiono con
  `esempio: sì` in `foto-pero.txt`; con `esempio: no` spariscono.

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
  solo negli intervalli (2006–2026).
- **Mai inventare dati.** Dove un dato manca si scrive
  `[DA COMPLETARE: ...]`, ben visibile, e lo si segnala.

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
- Testo della riga sotto "10 anni di PEROpezie" (punto 10): proposto
  "Dal giorno dell'interramento, una foto all'anno fino all'apertura
  della capsula.", da approvare.
- Quando togliere le foto d'esempio (`esempio: no`).
- Che cosa contiene la capsula oltre alle lettere (in definizione).
- Nome del sottodominio della scuola.
- Da confermare i valori predefiniti del punto 10: foto orizzontali
  intere con margini bianchi, data completa sotto le foto, eventi
  passati nascosti.
- Dati degli eventi: [DA COMPLETARE].
