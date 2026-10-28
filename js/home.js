/* ==================================================================
   LA PAGINA INIZIALE (index.html)

   Legge contenuti/comuni.txt e contenuti/home.txt e riempie la pagina:
   testata, apertura con il conto alla rovescia e i pulsanti, piede con
   il timbro.

   Il conto alla rovescia cambia con le tre fasi (CLAUDE.md, punto 10):
     - prima dell'interramento: foglietti per giorni, ore, minuti e
       secondi, e sotto la data (con "data provvisoria" finché non è
       approvata);
     - dopo l'interramento: anni e giorni all'apertura;
     - dopo l'apertura: la frase "La capsula è stata aperta il ..." e,
       quando la pagina c'è, il link ai contenuti.
   Se una fase finisce mentre la pagina è aperta, la pagina si ridispone
   da sola.

   Il lettore di schermo non sente il conteggio di continuo (niente
   aria-live): accanto alla riga sopra i foglietti c'è una frase
   nascosta, "185 giorni, 3 ore, 20 minuti", che si legge quando ci si
   arriva. Chi ha chiesto al computer di ridurre il movimento non vede
   il foglietto dei secondi, che cambierebbe ogni secondo.
   ================================================================== */

(function () {
  "use strict";

  var C = window.Contenuti;
  var K = window.Comuni;
  var RIDOTTO = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var orologio = null;

  Promise.all([C.leggi("contenuti/comuni.txt"), C.leggi("contenuti/home.txt")])
    .then(function (file) { mostra(file[0], file[1]); })
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

  function mostra(comuni, home) {
    var t = K.tempo(comuni);

    K.testata(comuni);
    C.scrivi(document.getElementById("occhiello"), home.campo("APERTURA", "occhiello"));
    C.scrivi(document.getElementById("titolo"), home.campo("APERTURA", "titolo"));
    K.timbro(comuni);

    /* Le parti che cambiano con la fase */
    function disponi() {
      conto(comuni, home, t, disponi);
      pulsanti(comuni, home, t);
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

    /* Le unità dei foglietti: [scritta del foglietto, singolare] */
    var unita = fase === "prima" ?
      [["giorni", "giorno"], ["ore", "ora"], ["minuti", "minuto"], ["secondi", "secondo"]] :
      [["anni", "anno"], ["giorni", "giorno"]];
    if (fase === "prima" && RIDOTTO) { unita.pop(); }

    var sopra = elemento("p", "conto-riga", parola(fase === "prima" ? "prima" : "dopo"));
    var frase = elemento("span", "solo-lettori");
    sopra.appendChild(frase);
    box.appendChild(sopra);

    var fila = elemento("div", "conto-foglietti");
    fila.setAttribute("aria-hidden", "true");
    var numeri = unita.map(function (u) {
      var foglietto = elemento("span", "foglietto");
      foglietto.appendChild(elemento("span", "foglietto-scritta", parola(u[0])));
      var numero = elemento("span", "foglietto-numero");
      foglietto.appendChild(numero);
      fila.appendChild(foglietto);
      return numero;
    });
    box.appendChild(fila);

    /* Sotto, la data: dell'interramento prima, dell'apertura dopo */
    var data = elemento("p", "conto-data");
    if (fase === "prima") {
      data.appendChild(document.createTextNode(t.scriviData(t.interramento)));
      if (t.provvisoria) {
        var punto = elemento("span", "", " · ");
        punto.setAttribute("aria-hidden", "true");
        data.appendChild(punto);
        C.scrivi(data, comuni.campo("CAPSULA", "scritta-provvisoria"));
      }
    } else {
      C.scrivi(data, parola("data-apertura") + " " + t.scriviData(t.apertura));
    }
    box.appendChild(data);

    function dueCifre(n) { return n < 10 ? "0" + n : String(n); }

    function aggiorna() {
      if (t.fase() !== fase) { disponi(); return; }
      var adesso = t.adesso();
      var valori, mostrati;
      if (fase === "prima") {
        var m = K.mancano(adesso, t.interramento);
        valori = [m.giorni, m.ore, m.minuti, m.secondi];
        mostrati = [String(m.giorni), dueCifre(m.ore), dueCifre(m.minuti), dueCifre(m.secondi)];
      } else {
        var a = K.mancanoAnni(adesso, t.apertura);
        valori = [a.anni, a.giorni];
        mostrati = [String(a.anni), String(a.giorni)];
      }
      numeri.forEach(function (el, i) { el.textContent = mostrati[i]; });

      /* La frase per il lettore di schermo, senza i secondi */
      var pezzi = [];
      unita.forEach(function (u, i) {
        if (u[0] === "secondi") { return; }
        pezzi.push(valori[i] + " " + parola(valori[i] === 1 ? u[1] : u[0]));
      });
      frase.textContent = " " + pezzi.join(", ") + ".";
    }

    aggiorna();
    orologio = setInterval(aggiorna, fase === "prima" && !RIDOTTO ? 1000 : 60000);
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
