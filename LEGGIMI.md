# Come modificare i testi del sito

Tutti i testi, le date e gli eventi del sito stanno nella cartella
`contenuti/`, in file `.txt`. Si aprono con il Blocco note. Non serve
toccare nessun altro file.

## I file

- `comuni.txt`: i dati di tutte le pagine. Il nome della scuola; la
  **data dell'interramento** (l'unica data da scrivere: l'apertura è
  dieci anni dopo e il sito la calcola), la sua ora e la scritta "data
  provvisoria"; l'elenco delle **pagine**, con il nome nel menu, ognuna `pronta` o `in
  preparazione`; le scritte del timbro; il link del piede per i
  docenti.
- `home.txt`: i testi della pagina iniziale. Occhiello, titolo, scritte
  dei pulsanti e del conto alla rovescia, testi della sezione "10 anni
  di Peropezie".
- `foto-pero.txt`: le foto del pero, una riga per foto (file, data,
  credito, testo alternativo), e l'interruttore delle foto d'esempio.
- `progetto.txt`: i testi della pagina Il progetto. Le date
  dell'interramento e dell'apertura non stanno qui: la pagina le prende
  da `comuni.txt`, come la home. Le istruzioni per la foto annuale del
  pero sono nella sezione FOTO, una riga `voce` per punto dell'elenco.
- `partecipa.txt`: i testi della pagina Partecipa e i link dei Google
  Moduli. Per mettere un modulo si sostituisce `[DA COMPLETARE: link del
  modulo]` con il link, che comincia con `https://`: compaiono da soli
  il pulsante e il codice QR.
- `docenti.txt`: i testi della pagina Per i docenti. Per mettere un
  materiale da scaricare si salva il file nella cartella `materiali/`
  (nome minuscolo, con i trattini) e si scrive il percorso al posto di
  `[DA COMPLETARE: file]`, per esempio `materiali/scheda-revisione.pdf`.
  La frase sul questionario dei docenti sta in `comuni.txt`, sezione
  DOCENTI, perché la usa anche la pagina Partecipa.
- `eventi.txt`: gli eventi del ventennale, una riga per evento (data,
  ora, titolo, luogo, relatore), nell'ordine in cui devono comparire.
  Gli eventi passati spariscono da soli dal giorno dopo. Per
  l'interramento si scrive "interramento" in data e ora: il sito le
  prende da `comuni.txt`.

### Aggiungere una foto del pero

1. Si salva la foto in JPG, sotto i 300 KB, nella cartella `foto-pero/`,
   con un nome minuscolo, con i trattini, senza spazi né accenti
   (`foto-pero/pero-2028.jpg`).
2. In `foto-pero.txt`, nella sezione FOTO, si aggiunge una riga:

       foto-pero/pero-2028.jpg | 1 maggio 2028 | Foto della classe 1ª X, a.s. 2027/28 | [che cosa si vede nella foto]

   Il testo alternativo dice che cosa si vede, per chi non vede la foto.
   Nessun nome di studenti.
3. Quando ci sono le foto vere, in fondo allo stesso file si scrive
   `esempio: no`, così spariscono le cinque foto d'esempio (peri
   qualsiasi presi da Wikimedia Commons).

L'elenco si allunga man mano che si crea ogni file.

### La data dell'interramento e le tre fasi

La data si scrive con il mese in lettere (1 maggio 2027), l'ora con il
punto (15.00). Vale per tutti gli orari del sito.

Dalla data scritta in `comuni.txt` il sito capisce da solo in quale
fase siamo: prima dell'interramento, dopo l'interramento, dopo
l'apertura. Dopo l'interramento Partecipa e Per i docenti si chiudono
da sole: spariscono da menu, pulsanti e link, e chi ha il link trova
solo il titolo, una riga e il pulsante per la home. Il conto alla
rovescia cambia da solo. Sul sito non c'è niente da cambiare a mano quel
giorno. I Google Moduli invece vanno chiusi in Google Moduli: il sito
non può farlo, e i QR stampati portano al modulo, non alla pagina.

Per vedere come sarà la pagina in un altro momento, nell'anteprima si
aggiunge all'indirizzo `?prova=` e una data (in ora italiana):

    http://localhost:8767/index.html?prova=2030-01-01
    http://localhost:8767/index.html?prova=2027-04-30T23:59:50

La pagina si comporta come se fosse quel momento. Funziona anche sul
sito online, ma non cambia niente per gli altri visitatori.

## Le quattro regole

1. **Righe "campo: testo".** A sinistra dei due punti c'è il nome del
   campo: non va cambiato. A destra c'è il testo: si cambia
   liberamente. Ogni campo sta su una riga sola, anche se è lunga.
2. **Sezioni "== NOME ==".** Dividono il file in parti. Il nome non va
   cambiato.
3. **Tabelle.** Una riga per elemento, le colonne separate dalla barra
   verticale `|`. Le colonne sono spiegate nel commento sopra la
   tabella. Dentro i testi la barra `|` non si usa.
4. **Commenti.** Le righe che iniziano con `#` sono commenti: il sito
   le ignora. Per nascondere una riga senza cancellarla basta metterle
   un `#` davanti.

Un esempio (non è un file del sito):

    # Questa riga è un commento: il sito la ignora.
    == ESEMPIO ==
    titolo: Capsula del tempo
    # nome | descrizione
    Prima voce | Il testo della prima voce
    Seconda voce | Il testo della seconda voce

## Le lettere accentate

Il Blocco note di Windows 11 salva già nel formato giusto (UTF-8), che
conserva le lettere accentate. Se dopo una modifica sulla pagina
compaiono simboli strani al posto di "è" o "à": si riapre il file,
File > Salva con nome, e in basso si sceglie Codifica: UTF-8.

## Dati che mancano

Si scrive `[DA COMPLETARE: che cosa manca]`. Sul sito compare così
com'è, quindi si vede subito.

## Che cosa non si scrive mai in questi file

Il repository è pubblico e conserva la cronologia: quello che si
pubblica resta consultabile anche dopo averlo tolto. Quindi niente dati
personali di studenti, nomi di minori, contatti personali dei docenti,
password, né le voci del dizionario del presente prima dell'apertura
della capsula. Le note di lavoro vanno in `materiali-grezzi/` o in un
file con `NON-PUBBLICARE` nel nome.

## Dopo una modifica

Si controlla con `anteprima.bat`: si apre una finestra nera e poi il
browser, all'indirizzo http://localhost:8767/. Per fermare l'anteprima
si chiude la finestra nera. Poi si pubblica con commit e push.

## Come spostare il sito

Il sito è solo una cartella di file: niente database, niente programmi
da installare sul server, niente compilazione. I collegamenti interni
sono relativi (dicono "il file qui accanto", non "il file a
quell'indirizzo"), quindi **spostando la cartella il sito funziona
senza cambiare il codice**.

Oggi il repository è
https://github.com/alessandraenrietta-ship-it/capsula-natta e il sito è
https://alessandraenrietta-ship-it.github.io/capsula-natta/.

### Il repository passa al referente del sito d'istituto

- **Trasferimento su GitHub**: la proprietaria del repository va in
  Settings > General > Danger Zone > Transfer ownership e indica
  l'account del referente o della scuola. Il repository passa con tutta
  la cronologia. L'indirizzo `alessandraenrietta-ship-it.github.io`
  contiene il nome dell'account, quindi cambia; di norma il vecchio non
  rimanda al nuovo (da verificare al momento).
- **Copia**: il referente crea un repository suo e ci si copiano i
  file. Con `git push` verso il nuovo indirizzo passa anche la
  cronologia; copiando solo i file si riparte senza cronologia.

### Il sito passa al sottodominio della scuola

Indirizzo: [DA COMPLETARE: sottodominio].

**La scelta fatta**: il sottodominio della scuola punterà a GitHub
Pages. Il tecnico della scuola aggiunge un record DNS (l'indicazione
che collega il nome del sottodominio al server di GitHub) e su GitHub
si indica il dominio (Settings > Pages > Custom domain), che aggiunge
al repository un file `CNAME`. È l'unica eccezione voluta alla regola
"nessuna funzione specifica di GitHub": il file `CNAME` si aggiunge
solo quando il sito è pronto e il nome del sottodominio è deciso.

**Se un giorno il sito passerà sul server della scuola**, il file
`CNAME` non serve più: basta cancellarlo. Poi si copiano nella cartella
del sottodominio tutti i file e le cartelle del sito, con la stessa
struttura. Non si copiano `materiali-grezzi/`, i file con
`NON-PUBBLICARE` nel nome, la cartella nascosta `.git`, `anteprima.bat`
e `anteprima.ps1`. Il server deve mandare i file `.txt` in UTF-8: se le
lettere accentate compaiono storte, va sistemato sul server.

### Dopo ogni spostamento

1. Aprire ogni pagina al nuovo indirizzo, dal telefono e dal computer:
   menu, immagini, testi, disegno. Se i testi non compaiono, il server
   non manda i file di `contenuti/`.
2. Cercare in `contenuti/` gli indirizzi completi che contengono
   `github.io` e aggiornarli.
3. Codici QR e materiali stampati con il vecchio indirizzo: le copie
   già stampate continueranno a portare lì.
4. Decidere che cosa lasciare al vecchio indirizzo: una pagina che
   rimanda al nuovo, oppure niente.
5. Lo spostamento non toglie il `noindex`: si toglie solo quando il
   sito è approvato.
