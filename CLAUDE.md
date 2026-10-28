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
  da solo. Data provvisoria dell'interramento: 1 maggio 2027. Si mostra
  subito, scritta come provvisoria; il sito non verrà pubblicizzato
  finché la data non è approvata.
- **Tre fasi**, che il sito ricava da solo da quella data:
  1. **prima dell'interramento**: eventi, Partecipa, Per i docenti;
  2. **dopo l'interramento**: l'elenco di che cosa contiene la capsula,
     senza i contenuti; spariscono Partecipa e Per i docenti, da sole,
     e al loro posto non compare nulla. Nella capsula ci sono di sicuro
     le lettere; il resto è in definizione: [DA COMPLETARE: che cosa
     contiene la capsula];
  3. **dopo l'apertura**: i contenuti, compresi lettere e dizionario.
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
  contorno di 1 px blu notte, angoli vivi, circa 58 px di larghezza;
  dentro la scritta piccola maiuscola grigia (12 px) e il numero grande
  (30 px) in verde; niente anellini, niente striscia piena. Sono un
  disegno (`aria-hidden`): la data per intero è scritta per il lettore
  di schermo.
- Titoli e testi brevi centrati con le righe pareggiate
  (`text-wrap: balance`).
- **Non si riprendono** da orientamento il titolo che si gira e il
  testo giustificato su due colonne: il testo è allineato a sinistra.

## 7. Il disegno: il pero e la capsula

- In un file SVG a parte, in `immagini/`.
- **Tre linee continue e chiuse** in tre verdi: `#014A26` (10,4 sul
  bianco), `#026C37` (6,6), `#3E8E5E` (4,0). Il terzo è sotto 4,5: si
  usa **solo per le linee del disegno, mai per il testo**.
- Ogni linea parte dalla capsula sotto terra, sale nel tronco, disegna
  la chioma piramidale del pero, scende e chiude la capsula. Curve
  morbide, nessuno spigolo.
- Sulla chioma, righette corte verso l'esterno: i gruppi laterali della
  catena del polipropilene di Giulio Natta.
- Linea del terreno da bordo a bordo, nel grigio `#D5D9DE` dei
  filetti.
- Animazione: le linee si disegnano una dopo l'altra, poi compaiono le
  righette. Con `prefers-reduced-motion` il disegno compare già intero.
- Il disegno è decorativo: `aria-hidden`, senza descrizione.

## 8. Il timbro del piede

- Due cerchi. "IIS GIULIO NATTA" sull'arco superiore, "20º
  ANNIVERSARIO" sull'arco inferiore, leggibile da sinistra a destra.
  `º` è l'indicatore ordinale, **non** il simbolo dei gradi `°`.
- Righette verso l'interno lungo il cerchio interno.
- Al centro il logo ufficiale della scuola (`immagini/logo-natta.png`)
  colorato di verde dal CSS, **mai ridisegnato a mano**; sotto il logo
  "2006–2026".
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

## 10. La home

In quest'ordine:

1. **Testata**: logo, nome della scuola e pulsante "Menu".
2. **Apertura**, senza disegno: occhiello "2006–2026 · CAPSULA DEL
   TEMPO", titolo "Vent'anni del Natta", conto alla rovescia (vedi
   sotto), pulsanti "Partecipa" e "Il progetto". Dopo l'interramento
   "Partecipa" sparisce e resta solo "Il progetto".
3. **"10 anni di PEROpezie"**: i dieci anni sono quelli della capsula
   sotto il pero, dall'interramento all'apertura, non quelli della
   scuola. Sotto il titolo una riga lo spiega: [DA COMPLETARE: testo da
   scrivere insieme]. La sillaba "pero" la evidenzia il CSS; nel file
   di testo non è scritta in maiuscolo, così il lettore di schermo
   legge una parola sola. Al centro un palco: all'inizio il disegno del
   pero, che si traccia quando la sezione entra nello schermo; sotto,
   una fila di foto piccole, ognuna con la sua data, che si scorre con
   due frecce. Toccando una foto, la foto prende il posto del disegno,
   con la data e il pulsante "Torna al pero".
4. **"Gli eventi del ventennale"** (solo prima dell'interramento; dopo
   la sezione sparisce e al suo posto non compare nulla): il programma,
   ogni evento con il foglietto della data.
5. **Piede**: il timbro e il link al kit della pagina Per i docenti. Il
   link sparisce insieme alla pagina, da solo, con la data
   dell'interramento: non c'è un interruttore da cambiare a mano.

**Il conto alla rovescia** si mostra subito, con la data provvisoria
dell'interramento (1 maggio 2027) scritta come provvisoria anche sulla
pagina. Cambia con le fasi:

- prima dell'interramento: foglietti per giorni, ore, minuti e secondi;
- dopo l'interramento: anni e giorni all'apertura;
- dopo l'apertura sparisce e resta la frase "La capsula è stata aperta
  il [data]", con il link ai contenuti.

Il conteggio non si annuncia di continuo ai lettori di schermo: niente
`aria-live` sui numeri.

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

- Data dell'interramento: 1 maggio 2027 è provvisoria, da approvare.
- Testo della riga sotto "10 anni di PEROpezie" (punto 10).
- Che cosa contiene la capsula oltre alle lettere (in definizione).
- Nome del sottodominio della scuola.
- Forma delle foto nel palco: il palco è verticale; le foto
  orizzontali si mostrano intere con margini bianchi o ritagliate?
- Formato della data delle foto.
- Dati degli eventi: [DA COMPLETARE].
- Eventi passati: visibili come conclusi o nascosti?
