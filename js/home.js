/* ==================================================================
   LA PAGINA INIZIALE (index.html)

   Legge contenuti/comuni.txt e contenuti/home.txt e riempie la pagina:
   testata, apertura con il conto alla rovescia e i pulsanti, piede con
   il timbro.

   Il conto alla rovescia cambia con le tre fasi (CLAUDE.md, punto 10):
     - prima dell'interramento: foglietti per giorni, ore, minuti e
       secondi; sotto la data e l'ora (con "data provvisoria" finché non
       sono approvate) e la data dell'apertura;
     - dopo l'interramento: un solo foglietto, più largo, con tutti i
       giorni del calendario che mancano all'apertura (3.653 il giorno
       dell'interramento);
     - dopo l'apertura: la frase "La capsula è stata aperta il ..." e,
       quando la pagina c'è, il link ai contenuti.
   Se una fase finisce mentre la pagina è aperta, la pagina si ridispone
   da sola.

   Il lettore di schermo non sente il conteggio di continuo (niente
   aria-live): accanto alla riga sopra i foglietti c'è una frase
   nascosta, "185 giorni, 3 ore, 20 minuti", che si legge quando ci si
   arriva. Chi ha chiesto al computer di ridurre il movimento non vede
   il foglietto dei secondi, che cambierebbe ogni secondo. Per tutti gli
   altri i secondi restano, senza un pulsante per fermarli: eccezione
   consapevole alla regola WCAG 2.2.2, decisa da Alessandra (CLAUDE.md,
   punto 10).
   ================================================================== */

(function () {
  "use strict";

  var C = window.Contenuti;
  var K = window.Comuni;
  var RIDOTTO = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var orologio = null;

  Promise.all([C.leggi("contenuti/comuni.txt"), C.leggi("contenuti/home.txt"),
               C.leggi("contenuti/eventi.txt")])
    .then(function (file) { mostra(file[0], file[1], file[2]); })
    .catch(function (errore) {
      console.error(errore);
      document.getElementById("avviso").hidden = false;
    });

  function elemento(tag, classe, testo) {
    var e = document.createElement(tag);
    if (classe) { e.className = classe; }
    if (testo) { C.scrivi(e, testo); }
    return e;
  }

  function mostra(comuni, home, eventiFile) {
    var t = K.tempo(comuni);

    C.scrivi(document.getElementById("occhiello"), home.campo("APERTURA", "occhiello"));
    C.scrivi(document.getElementById("titolo"), home.campo("APERTURA", "titolo"));
    /* Le righe di testo sotto il titolo: un paragrafo per ogni "testo" */
    home.campi("APERTURA", "testo").forEach(function (riga) {
      document.getElementById("presentazione").appendChild(elemento("p", "", riga));
    });
    C.scrivi(document.getElementById("titolo-conto"), home.campo("CONTO ALLA ROVESCIA", "titolo"));
    K.timbro(comuni);

    /* Le parti che cambiano con la fase */
    function disponi() {
      K.testata(comuni, t);
      conto(comuni, home, t, disponi);
      pulsanti(comuni, home, t);
      eventi(comuni, home, eventiFile, t);
      document.getElementById("piede").textContent = "";
      document.getElementById("piede").hidden = true;
      K.piede(comuni, t);
    }
    disponi();

    document.getElementById("contenuto").hidden = false;
  }


  /* ---------------------------------------------------------------
     IL CONTO ALLA ROVESCIA
     --------------------------------------------------------------- */

  function conto(comuni, home, t, disponi) {
    var box = document.getElementById("conto");
    var parola = function (nome) { return home.campo("CONTO ALLA ROVESCIA", nome); };
    var fase = t.fase();
    box.textContent = "";
    if (orologio) { clearInterval(orologio); orologio = null; }

    if (t.interramento === null) {
      box.appendChild(elemento("p", "conto-riga", "[DA COMPLETARE: data dell'interramento in comuni.txt]"));
      return;
    }

    /* Dopo l'apertura: solo la frase e, se la pagina c'è, il link */
    if (fase === "aperta") {
      box.appendChild(elemento("p", "conto-aperta",
        parola("aperta").replace("[data]", t.scriviData(t.apertura))));
      var file = K.pagina(comuni, "capsula", t);
      if (file) {
        var riga = elemento("p", "conto-data");
        var link = elemento("a", "link-freccia", parola("link-contenuti"));
        link.href = file;
        riga.appendChild(link);
        box.appendChild(riga);
      }
      return;
    }

    /* Le unità dei foglietti: [scritta del foglietto, singolare]. Dopo
       l'interramento un solo foglietto, più largo, con tutti i giorni. */
    var unita = fase === "prima" ?
      [["giorni", "giorno"], ["ore", "ora"], ["minuti", "minuto"], ["secondi", "secondo"]] :
      [["giorni", "giorno"]];
    if (fase === "prima" && RIDOTTO) { unita.pop(); }

    var sopra = elemento("p", "conto-riga", parola(fase === "prima" ? "prima" : "dopo"));
    var frase = elemento("span", "solo-lettori");
    sopra.appendChild(frase);
    box.appendChild(sopra);

    var fila = elemento("div", "conto-foglietti");
    fila.setAttribute("aria-hidden", "true");
    var numeri = unita.map(function (u) {
      var foglietto = elemento("span", fase === "prima" ? "foglietto" : "foglietto foglietto-largo");
      foglietto.appendChild(elemento("span", "foglietto-scritta", parola(u[0])));
      var numero = elemento("span", "foglietto-numero");
      foglietto.appendChild(numero);
      fila.appendChild(foglietto);
      return numero;
    });
    box.appendChild(fila);

    /* Sotto, prima dell'interramento, la sua data e la sua ora:
       "1 maggio 2027, ore 15.00 · data provvisoria" */
    if (fase === "prima") {
      var data = elemento("p", "conto-data");
      var quando = t.scriviData(t.interramento);
      if (t.ora) { quando += ", " + parola("parola-ora") + " " + t.ora; }
      /* Data e ora non si spezzano; la scritta sulla data provvisoria,
         più lunga, va a capo dove serve */
      data.appendChild(elemento("span", "intero", quando));
      if (t.provvisoria) {
        var punto = elemento("span", "", " · ");
        punto.setAttribute("aria-hidden", "true");
        data.appendChild(punto);
        data.appendChild(elemento("span", "", comuni.campo("CAPSULA", "scritta-provvisoria")));
      }
      box.appendChild(data);
    }

    /* Poi la data dell'apertura: "Apertura prevista:" finché la data
       dell'interramento è provvisoria, "Apertura:" quando è approvata
       e sempre dopo l'interramento */
    var etichetta = fase === "prima" && t.provvisoria ? "apertura-prevista" : "apertura";
    box.appendChild(elemento("p", fase === "prima" ? "conto-apertura" : "conto-data",
      parola(etichetta) + " " + t.scriviData(t.apertura)));

    function dueCifre(n) { return n < 10 ? "0" + n : String(n); }

    /* Il punto delle migliaia: 3653 -> "3.653" */
    function migliaia(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "."); }

    function aggiorna() {
      if (t.fase() !== fase) { disponi(); return; }
      var adesso = t.adesso();
      var valori, mostrati;
      if (fase === "prima") {
        var m = K.mancano(adesso, t.interramento);
        valori = [m.giorni, m.ore, m.minuti, m.secondi];
        mostrati = [migliaia(m.giorni), dueCifre(m.ore), dueCifre(m.minuti), dueCifre(m.secondi)];
      } else {
        var giorni = K.giorniCalendario(adesso, t.apertura);
        valori = [giorni];
        mostrati = [migliaia(giorni)];
      }
      numeri.forEach(function (el, i) { el.textContent = mostrati[i]; });

      /* La frase per il lettore di schermo, senza i secondi */
      var pezzi = [];
      unita.forEach(function (u, i) {
        if (u[0] === "secondi") { return; }
        pezzi.push(migliaia(valori[i]) + " " + parola(valori[i] === 1 ? u[1] : u[0]));
      });
      frase.textContent = " " + pezzi.join(", ") + ".";
    }

    aggiorna();
    orologio = setInterval(aggiorna, fase === "prima" && !RIDOTTO ? 1000 : 60000);
  }


  /* ---------------------------------------------------------------
     GLI EVENTI DEL VENTENNALE
     Una riga di eventi.txt per evento: data | ora | titolo | luogo |
     relatore, nell'ordine del file. Per ogni evento il foglietto della
     data, il titolo e sotto, in grigio, ora, luogo e relatore. Con
     "interramento" in data e ora, si usano quelle di comuni.txt. Gli
     eventi passati spariscono dal giorno dopo; la sezione si vede solo
     prima dell'interramento e solo se resta almeno un evento. I
     segnaposto [DA COMPLETARE] restano visibili.
     --------------------------------------------------------------- */

  function eventi(comuni, home, eventiFile, t) {
    var sezione = document.getElementById("sezione-eventi");
    var elenco = document.getElementById("elenco-eventi");
    var parola = function (nome) { return home.campo("EVENTI", nome); };
    elenco.textContent = "";
    sezione.hidden = true;
    if (t.fase() !== "prima") { return; }

    var oggi = K.giornoItaliano(t.adesso());
    var oggiNumero = oggi[0] * 10000 + oggi[1] * 100 + oggi[2];

    eventiFile.righe("EVENTI").forEach(function (riga) {
      var testoData = riga[0] || "", testoOra = riga[1] || "";
      var data = testoData.toLowerCase() === "interramento" ?
        K.leggiData(comuni.campo("CAPSULA", "data-interramento")) : K.leggiData(testoData);
      if (testoOra.toLowerCase() === "interramento") { testoOra = t.ora; }

      /* Passato: dal giorno dopo non compare più */
      if (data && data[0] * 10000 + data[1] * 100 + data[2] < oggiNumero) { return; }

      var voce = elemento("li", "data");

      /* Il foglietto: è un disegno, la data per intero è scritta sotto
         per il lettore di schermo */
      var foglietto = elemento("span", "foglietto");
      foglietto.setAttribute("aria-hidden", "true");
      foglietto.appendChild(elemento("span", "foglietto-scritta", data ? K.MESI[data[1] - 1].slice(0, 3) : " "));
      foglietto.appendChild(elemento("span", "foglietto-numero", data ? String(data[2]) : "?"));
      voce.appendChild(foglietto);

      var testi = elemento("div", "data-testi");
      if (data) {
        testi.appendChild(elemento("p", "solo-lettori", data[2] + " " + K.MESI[data[1] - 1] + " " + data[0]));
      }
      testi.appendChild(elemento("h3", "evento-titolo", riga[2] || ""));

      /* Sotto il titolo, in grigio: la data se manca, l'ora, il luogo e
         il relatore, separati da un punto che il lettore di schermo non
         legge */
      var pezzi = [];
      if (!data) { pezzi.push(testoData); }
      if (testoOra) {
        pezzi.push(C.daCompletare(testoOra) ? testoOra : parola("parola-ora") + " " + testoOra);
      }
      if (riga[3]) { pezzi.push(riga[3]); }
      if (riga[4]) {
        pezzi.push(C.daCompletare(riga[4]) ? riga[4] : parola("parola-relatore") + " " + riga[4]);
      }
      var dettagli = elemento("p", "evento-dettagli");
      pezzi.forEach(function (pezzo, i) {
        if (i) {
          var punto = elemento("span", "", " · ");
          punto.setAttribute("aria-hidden", "true");
          dettagli.appendChild(punto);
        }
        dettagli.appendChild(elemento("span", "", pezzo));
      });
      testi.appendChild(dettagli);

      voce.appendChild(testi);
      elenco.appendChild(voce);
    });

    if (!elenco.firstChild) { return; }
    var titolo = document.getElementById("titolo-eventi");
    titolo.textContent = "";
    C.scrivi(titolo, parola("titolo"));
    sezione.hidden = false;
  }


  /* ---------------------------------------------------------------
     I PULSANTI DELL'APERTURA
     Solo quelli delle pagine che si possono collegare: "Partecipa"
     (pieno, solo prima dell'interramento) e "Il progetto" (vuoto).
     --------------------------------------------------------------- */

  function pulsanti(comuni, home, t) {
    var riga = document.getElementById("pulsanti");
    riga.textContent = "";
    [["partecipa", "pulsante-partecipa", "pulsante-pieno"],
     ["progetto", "pulsante-progetto", "pulsante-vuoto"]].forEach(function (p) {
      var file = K.pagina(comuni, p[0], t);
      if (!file) { return; }
      var a = elemento("a", "pulsante " + p[2], home.campo("APERTURA", p[1]));
      a.href = file;
      riga.appendChild(a);
    });
    riga.hidden = !riga.firstChild;
  }
}());
