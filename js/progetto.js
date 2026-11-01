/* ==================================================================
   LA PAGINA "IL PROGETTO" (il-progetto.html)

   Legge contenuti/comuni.txt e contenuti/progetto.txt e riempie la
   pagina: testata con il menu, apertura, "La capsula del tempo" (tre
   domande con la risposta), "Che cosa mettiamo nella capsula", "Quando
   si chiude, quando si apre" (le date di comuni.txt, le stesse della
   home: nessuna data scritta in progetto.txt), piede con il timbro e i
   due link: il kit per i docenti, solo se la pagina si può collegare, e
   le istruzioni per la foto del pero, solo quando c'è il file.

   Ha bisogno di js/contenuti.js e js/comuni.js.
   ================================================================== */

(function () {
  "use strict";

  var C = window.Contenuti;
  var K = window.Comuni;

  Promise.all([C.leggi("contenuti/comuni.txt"), C.leggi("contenuti/progetto.txt")])
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

  function scriviIn(id, testo) {
    var el = document.getElementById(id);
    el.textContent = "";
    C.scrivi(el, testo);
  }

  /* Un paragrafo per ogni campo con quel nome */
  function paragrafi(id, testi) {
    var dove = document.getElementById(id);
    testi.forEach(function (t) { dove.appendChild(elemento("p", "", t)); });
  }

  /* Una voce per riga della tabella: nome (h3) e descrizione */
  function voci(id, righe) {
    var dove = document.getElementById(id);
    righe.forEach(function (r) {
      var li = elemento("li", "voce");
      li.appendChild(elemento("h3", "voce-nome", r[0] || ""));
      if (r[1]) { li.appendChild(elemento("p", "voce-testo", r[1])); }
      dove.appendChild(li);
    });
  }

  function mostra(comuni, progetto) {
    var t = K.tempo(comuni);
    var campo = function (sezione, nome) { return progetto.campo(sezione, nome); };

    K.testata(comuni, t);
    K.timbro(comuni);
    piede(comuni, progetto, t);

    scriviIn("titolo", campo("APERTURA", "titolo"));
    paragrafi("riga-apertura", progetto.campi("APERTURA", "testo"));

    scriviIn("titolo-capsula", campo("CAPSULA", "titolo"));
    voci("voci-capsula", progetto.righe("CAPSULA"));

    scriviIn("titolo-contenuti", campo("CONTENUTI", "titolo"));
    paragrafi("nota-contenuti", progetto.campi("CONTENUTI", "testo"));
    voci("voci-contenuti", progetto.righe("CONTENUTI"));

    scriviIn("titolo-date", campo("DATE", "titolo"));
    date(comuni, progetto, t);

    document.getElementById("contenuto").hidden = false;
  }

  /* I link del piede, uno per riga. Il kit come le altre pagine che si
     collegano; le istruzioni solo quando in progetto.txt c'è il percorso
     del file al posto del segnaposto. */
  function piede(comuni, progetto, t) {
    var link = [];
    var kit = K.pagina(comuni, "docenti", t);
    if (kit) { link.push([comuni.campo("PIEDE", "docenti-link"), kit]); }
    var foto = progetto.campo("PIEDE", "istruzioni-foto").trim();
    if (foto && !C.daCompletare(foto)) { link.push([progetto.campo("PIEDE", "link-foto"), foto]); }

    var elenco = document.getElementById("piede");
    link.forEach(function (l) {
      var voce = document.createElement("li");
      voce.appendChild(K.linkConFreccia(l[0], l[1]));
      elenco.appendChild(voce);
    });
    elenco.hidden = !link.length;
  }


  /* ---------------------------------------------------------------
     QUANDO SI CHIUDE, QUANDO SI APRE
     Due voci con il foglietto: l'interramento (data e ora di comuni.txt,
     con la scritta sulla data provvisoria finché vale) e l'apertura,
     dieci anni dopo ("prevista" finché la data è provvisoria).
     --------------------------------------------------------------- */

  function date(comuni, progetto, t) {
    var elenco = document.getElementById("elenco-date");
    var campo = function (nome) { return progetto.campo("DATE", nome); };
    if (t.interramento === null) {
      elenco.appendChild(elemento("li", "", "[DA COMPLETARE: data dell'interramento in comuni.txt]"));
      return;
    }
    var provvisoria = t.provvisoria && t.fase() === "prima";

    function voce(momento, titolo, dettagli) {
      var li = elemento("li", "data");
      li.appendChild(K.foglietto(K.giornoItaliano(momento)));
      var testi = elemento("div", "data-testi");
      testi.appendChild(elemento("h3", "evento-titolo", titolo));
      var p = elemento("p", "evento-dettagli");
      dettagli.forEach(function (pezzo, i) {
        if (i) {
          var punto = elemento("span", "", " · ");
          punto.setAttribute("aria-hidden", "true");
          p.appendChild(punto);
        }
        p.appendChild(elemento("span", "", pezzo));
      });
      testi.appendChild(p);
      li.appendChild(testi);
      elenco.appendChild(li);
    }

    var quando = t.scriviData(t.interramento) + (t.ora ? ", " + campo("parola-ora") + " " + t.ora : "");
    voce(t.interramento, campo("interramento"),
      provvisoria ? [quando, comuni.campo("CAPSULA", "scritta-provvisoria")] : [quando]);
    voce(t.apertura, campo(provvisoria ? "apertura-prevista" : "apertura"), [t.scriviData(t.apertura)]);
  }
}());
