/* ==================================================================
   LA PAGINA INIZIALE (index.html)

   Legge contenuti/comuni.txt e contenuti/home.txt e riempie la pagina:
   testata, apertura con il conto alla rovescia e i pulsanti, piede con
   il timbro.

   Il conto alla rovescia cambia con le tre fasi (CLAUDE.md, punto 10):
     - prima dell'interramento: foglietti per mesi, giorni, ore, minuti
       e secondi; sotto la data e l'ora, con "data da confermare" finché
       non sono approvate;
     - dopo l'interramento: foglietti per anni, mesi e giorni che
       mancano all'apertura, contati sul calendario, senza guardare l'ora
       (10 anni il giorno dell'interramento); sotto la data dell'apertura;
     - dopo l'apertura: la frase "La capsula è stata aperta il ..." e,
       quando la pagina c'è, il link ai contenuti.
   I foglietti a zero all'inizio della fila non compaiono: anche quello
   degli anni solo quando gli anni sono almeno uno. Se una fase finisce mentre la pagina è aperta, la pagina si
   ridispone da sola.

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
    C.scrivi(document.getElementById("riga-apertura"), home.campo("APERTURA", "riga"));
    C.scrivi(document.getElementById("titolo-conto"), home.campo("CONTO ALLA ROVESCIA", "titolo"));
    C.scrivi(document.getElementById("riga-conto"), home.campo("CONTO ALLA ROVESCIA", "riga"));
    K.timbro(comuni);

    /* Le parti che cambiano con la fase */
    function disponi() {
      K.testata(comuni, t);
      conto(comuni, home, t, disponi);
      pulsanti(comuni, home, t);
      eventi(comuni, home, eventiFile, t);
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

    /* Quanto manca: prima dell'interramento fino al momento esatto, dopo
       sul calendario, senza guardare l'ora */
    function quantoManca() {
      var adesso = t.adesso();
      return fase === "prima" ? K.mancanoCalendario(adesso, t.interramento) :
        K.mancanoCalendario(K.mezzanotte(adesso), K.mezzanotte(t.apertura));
    }

    /* Le unità dei foglietti, [scritta del foglietto, singolare], in due
       gruppi: il calendario e l'orologio. Niente foglietti iniziali a
       zero: ne resta sempre almeno uno. */
    var CALENDARIO = [["anni", "anno"], ["mesi", "mese"], ["giorni", "giorno"]];
    var OROLOGIO = [["ore", "ora"], ["minuti", "minuto"], ["secondi", "secondo"]];

    function gruppiDiUnita(m) {
      var ore = fase !== "prima" ? [] : RIDOTTO ? OROLOGIO.slice(0, 2) : OROLOGIO;
      var tutte = CALENDARIO.concat(ore);
      var primo = 0;
      while (primo < tutte.length - 1 && !m[tutte[primo][0]]) { primo++; }
      return [CALENDARIO, ore].map(function (gruppo) {
        return gruppo.filter(function (u) { return tutte.indexOf(u) >= primo; });
      }).filter(function (gruppo) { return gruppo.length; });
    }

    function forma(gruppi) { return gruppi.map(function (g) { return g.length; }).join(); }

    var gruppi = gruppiDiUnita(quantoManca());
    var unita = gruppi.reduce(function (tutte, g) { return tutte.concat(g); }, []);

    var sopra = elemento("p", "conto-riga", parola(fase === "prima" ? "prima" : "dopo"));
    var frase = elemento("span", "solo-lettori");
    sopra.appendChild(frase);
    box.appendChild(sopra);

    var fila = elemento("div", "conto-foglietti");
    fila.setAttribute("aria-hidden", "true");
    var numeri = [];
    gruppi.forEach(function (gruppo) {
      var insieme = elemento("span", "conto-gruppo");
      gruppo.forEach(function (u) {
        var foglietto = elemento("span", "foglietto");
        foglietto.appendChild(elemento("span", "foglietto-scritta", parola(u[0])));
        var numero = elemento("span", "foglietto-numero");
        foglietto.appendChild(numero);
        insieme.appendChild(foglietto);
        numeri.push(numero);
      });
      fila.appendChild(insieme);
    });
    box.appendChild(fila);

    /* Sotto, prima dell'interramento, la sua data e la sua ora:
       "1 maggio 2027, ore 15.00 · data da confermare". Dopo, la sola
       data dell'apertura. */
    if (fase === "prima") {
      var data = elemento("p", "conto-data");
      var quando = t.scriviData(t.interramento);
      if (t.ora) { quando += ", " + parola("parola-ora") + " " + t.ora; }
      /* Data e ora non si spezzano; se non ci sta tutto, "data da
         confermare" va a capo intera */
      data.appendChild(elemento("span", "intero", quando));
      if (t.provvisoria) {
        var punto = elemento("span", "", " · ");
        punto.setAttribute("aria-hidden", "true");
        data.appendChild(punto);
        data.appendChild(elemento("span", "intero", comuni.campo("CAPSULA", "scritta-provvisoria")));
      }
      box.appendChild(data);
    } else {
      box.appendChild(elemento("p", "conto-data", t.scriviData(t.apertura)));
    }

    function dueCifre(n) { return n < 10 ? "0" + n : String(n); }

    function aggiorna() {
      if (t.fase() !== fase) { disponi(); return; }
      var m = quantoManca();
      /* Un foglietto si azzera per sempre: si rifà la fila senza */
      if (forma(gruppiDiUnita(m)) !== forma(gruppi)) { conto(comuni, home, t, disponi); return; }

      unita.forEach(function (u, i) {
        numeri[i].textContent = OROLOGIO.indexOf(u) !== -1 ? dueCifre(m[u[0]]) : String(m[u[0]]);
      });

      /* La frase per il lettore di schermo, senza i secondi, a meno che
         non siano rimasti solo quelli */
      var pezzi = [];
      unita.forEach(function (u) {
        if (u[0] === "secondi" && unita.length > 1) { return; }
        pezzi.push(m[u[0]] + " " + parola(m[u[0]] === 1 ? u[1] : u[0]));
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
     Sul telefono si vedono i primi tre e, se ce ne sono altri, il
     pulsante "Tutti gli eventi"; al computer il pulsante non c'è. Che
     cosa si vede a quale larghezza lo decide grafica.css.
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
    altriEventi(elenco, parola("pulsante-tutti"));
    sezione.hidden = false;
  }

  function altriEventi(elenco, scritta) {
    var riga = document.getElementById("eventi-altri");
    var pulsante = document.getElementById("eventi-tutti");
    Array.prototype.slice.call(elenco.children, 3).forEach(function (voce) {
      voce.classList.add("evento-in-piu");
    });
    riga.hidden = elenco.children.length <= 3;
    elenco.classList.remove("eventi-aperti");
    pulsante.setAttribute("aria-expanded", "false");
    pulsante.textContent = "";
    C.scrivi(pulsante, scritta);
    if (!pulsante.dataset.pronto) {
      pulsante.dataset.pronto = "1";
      pulsante.addEventListener("click", function () {
        var aperti = pulsante.getAttribute("aria-expanded") !== "true";
        elenco.classList.toggle("eventi-aperti", aperti);
        pulsante.setAttribute("aria-expanded", aperti ? "true" : "false");
      });
    }
  }


  /* ---------------------------------------------------------------
     I PULSANTI IN FONDO A "CAPSULA DEL TEMPO"
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
      var a = elemento("a", "pulsante " + p[2], home.campo("CONTO ALLA ROVESCIA", p[1]));
      a.href = file;
      riga.appendChild(a);
    });
    riga.hidden = !riga.firstChild;
  }
}());
