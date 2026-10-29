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

Il sito "Vent'anni di Natta": la capsula del tempo per il ventennale
dell'IIS Giulio Natta di Rivoli (2006–2026).

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

Ordine deciso il 29 ottobre 2026. Titoli: un solo h1, il titolo del
sito; h2 le sezioni.

1. **Testata**: logo, nome della scuola e menu (punto 9).
2. **Apertura**, senza disegno: occhiello "2006–2026", titolo
   "Vent'anni di Natta" (primo elemento della pagina e unico h1),
   alcune righe di testo (campo `testo` della sezione APERTURA di
   `home.txt`, una riga per paragrafo), poi i pulsanti "Partecipa" e "Il
   progetto", quando le pagine sono pronte. Dopo l'interramento
   "Partecipa" sparisce e resta solo "Il progetto".
3. **"Gli eventi del ventennale"** (solo prima dell'interramento; dopo
   la sezione sparisce e al suo posto non compare nulla): il programma,
   ogni evento con il foglietto della data. Vedi sotto.
4. **"Capsula del tempo"** (h2): il conto alla rovescia e la data (vedi
   sotto). Dopo l'interramento, spariti gli eventi, sale da sola sotto
   le righe di testo, senza modifiche a mano.
5. **"10 anni di PEROpezie"**: i dieci anni sono quelli della capsula
   sotto il pero, dall'interramento all'apertura, non quelli della
   scuola. Vedi sotto.
6. **Piede**: il timbro e il link al kit della pagina Per i docenti. Il
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

### Lo stile futurista (deciso il 29 ottobre 2026)

**Tutti i testi del sito sono scritti in stile futurista**, compresi i
nomi e le descrizioni degli eventi e le scritte del conto alla
rovescia. Restano come sono soltanto:

- i titoli concordati: titolo del sito, occhiello, voci del menu,
  titoli delle pagine e delle sezioni ("Gli eventi del ventennale",
  "Capsula del tempo", "10 anni di PEROpezie", "Il progetto", "La
  capsula del tempo", "Che cosa mettiamo nella capsula", "Chi
  partecipa", "Quando si chiude, quando si apre", "La foto annuale del
  pero", "Partecipa", "Questionario per gli studenti", "Dizionario del
  presente", "Per i docenti", "Come funziona in classe", "Materiali da
  scaricare", "Il questionario dei docenti", "Calendario",
  "Referenti");
- i testi dei pulsanti e i link di servizio (per esempio "Il kit per i
  docenti ›");
- i crediti delle foto ("Foto della classe 1ª X, a.s. AAAA/AA" e i
  crediti delle foto d'esempio, con autore e licenza), i segnaposto
  `[DA COMPLETARE: ...]`, le date e gli orari, la descrizione per i
  motori di ricerca e i testi nascosti per l'accessibilità (etichette
  aria, testo alternativo).

Se un testo non rientra chiaramente in queste eccezioni, si chiede ad
Alessandra. **Prima di scrivere i testi nei file si propongono tutti in
un unico elenco** e si aspetta la conferma.

**Come si scrive**: frasi brevi e incalzanti, verbi all'infinito,
accostamenti di parole senza congiunzioni, segni matematici al posto
delle congiunzioni (+, =, x), qualche onomatopea, esaltazione della
velocità, della macchina, della chimica e della plastica, il futuro
contro il passato, la capsula come razzo lanciato verso il futuro.
Bizzarri ma attinenti al tema.

- **Leggibilità**: ogni testo resta comprensibile a una prima lettura e
  dice comunque di che cosa parla; punteggiatura ridotta ma sufficiente
  perché un lettore di schermo lo legga in modo sensato; al massimo una
  onomatopea per testo, breve; niente paragrafi interi in maiuscolo;
  nessun effetto tipografico nuovo (solo Cutive Mono, con gli stili che
  il sito ha già).
- **Non contengono**: esaltazione della guerra, della violenza o della
  distruzione; disprezzo per qualcuno; citazioni o frasi riconoscibili
  dei manifesti futuristi o di Marinetti (si imita lo stile, non si
  copia); date, orari, numeri o luoghi inventati che sembrino reali;
  nomi di persone reali (dirigente, docenti, studenti, Giulio Natta, i
  futuristi); promesse o impegni a nome della scuola; nulla che prenda
  in giro studenti, docenti o la scuola.

**Testi con informazioni vere**: anche questi in stile futurista, ma
ogni informazione resta esatta e impossibile da fraintendere:

- le scritte del conto alla rovescia: che cosa si sta contando
  (l'interramento, poi l'apertura), che la data è provvisoria finché
  vale, la data prevista dell'apertura, la frase dopo l'apertura;
- i moduli si aprono solo con l'account della scuola;
- il questionario dei docenti arriva solo via mail istituzionale, senza
  link né password sul sito;
- la foto annuale: una classe prima, stesso punto, stessa data,
  liberatorie verificate dalla vicepresidenza, invio a chi gestisce il
  sito, nessun nome di studenti, JPG sotto i 300 KB, scatto in
  verticale consigliato;
- la capsula si interra sotto il pero e si apre dopo dieci anni.

Dati tecnici, formati, nomi di cartelle e date si scrivono alla
lettera. Se lo stile rende un'informazione ambigua, vince la chiarezza.

### Eccezione temporanea: i contenuti d'esempio

Decisa da Alessandra il 29 ottobre 2026, per presentare il sito: sono
d'esempio gli eventi del ventennale, le foto del pero e i testi in
stile futurista. **Da sostituire prima di dare il link a chi non sa che
è una prova.** Sul sito non sono segnati come esempi. Stanno qui:

- `contenuti/eventi.txt`, sezione EVENTI: tutti gli eventi tranne
  l'interramento (nomi, date, orari, luogo e relatori inventati); il
  nome dell'interramento è in stile futurista;
- `contenuti/foto-pero.txt`, sezione ESEMPIO, con i file
  `foto-pero/esempio-pero-1.jpg` … `-5.jpg`: peri qualsiasi presi da
  Wikimedia Commons, con date inventate; restano come sono, con i loro
  crediti;
- i testi in stile futurista: `contenuti/home.txt` (righe
  dell'apertura, scritte del conto alla rovescia, riga sotto "10 anni
  di PEROpezie"), `contenuti/comuni.txt` (scritta "data provvisoria",
  riga del piede per i docenti), e dalle tappe 1, 2 e 3
  `contenuti/progetto.txt`, `contenuti/partecipa.txt`,
  `contenuti/docenti.txt`. Nei file sono segnati con il commento
  `# ESEMPIO FUTURISTA`.

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
- Testo della riga sotto "10 anni di PEROpezie" (punto 10): proposto
  "Dal giorno dell'interramento, una foto all'anno fino all'apertura
  della capsula.", da approvare.
- Quando togliere le foto d'esempio (`esempio: no`).
- Che cosa contiene la capsula oltre alle lettere (in definizione).
- Nome del sottodominio della scuola.
- Da confermare i valori predefiniti del punto 10: foto orizzontali
  intere con margini bianchi, data completa sotto le foto, eventi
  passati nascosti.
- Dati degli eventi: oggi sono inventati (punto 10), da sostituire con
  quelli veri.
