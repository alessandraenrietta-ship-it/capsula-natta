/* ==================================================================
   LA PAGINA "PER I DOCENTI" (per-i-docenti.html)

   Legge contenuti/comuni.txt e contenuti/docenti.txt e riempie la
   pagina: testata con il menu, apertura, "Come funziona in classe" (tre
   passaggi numerati), "Materiali da scaricare" (il nome diventa il link
   quando nel file c'è il percorso del file), "Il questionario dei
   docenti" (la frase di comuni.txt, sezione DOCENTI: nessun link e
   nessuna password), "Calendario", "Referenti", piede con il timbro.
   Nel piede di questa pagina la riga per i docenti non compare.

   Ha bisogno di js/contenuti.js e js/comuni.js.
   ================================================================== */

(function () {
  "use strict";

  var C = window.Contenuti;
  var K = window.Comuni;

  Promise.all([C.leggi("contenuti/comuni.txt"), C.leggi("contenuti/docenti.txt")])
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

  function paragrafi(id, testi) {
    var dove = document.getElementById(id);
    testi.forEach(function (t) { dove.appendChild(elemento("p", "", t)); });
  }

  function mostra(comuni, docenti) {
    var t = K.tempo(comuni);
    K.testata(comuni, t);
    K.timbro(comuni);
    K.piede(comuni, t);

    scriviIn("titolo", docenti.campo("APERTURA", "titolo"));
    paragrafi("testo-apertura", docenti.campi("APERTURA", "testo"));

    /* I tre passaggi: nome (h3) e descrizione; il numero lo mette il CSS */
    scriviIn("titolo-classe", docenti.campo("IN CLASSE", "titolo"));
    var passi = document.getElementById("passi");
    docenti.righe("IN CLASSE").forEach(function (r) {
      var li = elemento("li", "passo");
      li.appendChild(elemento("h3", "voce-nome", r[0] || ""));
      if (r[1]) { li.appendChild(elemento("p", "voce-testo", r[1])); }
      passi.appendChild(li);
    });

    /* I materiali: con il file, il nome è il link per scaricarlo; senza,
       il nome e il segnaposto */
    scriviIn("titolo-materiali", docenti.campo("MATERIALI", "titolo"));
    paragrafi("testo-materiali", docenti.campi("MATERIALI", "testo"));
    var materiali = document.getElementById("materiali");
    docenti.righe("MATERIALI").forEach(function (r) {
      var li = elemento("li");
      var file = (r[1] || "").trim();
      if (file && !C.daCompletare(file)) {
        var a = elemento("a", "link-freccia", r[0] || "");
        a.href = file;
        a.setAttribute("download", "");
        li.appendChild(a);
      } else {
        li.appendChild(elemento("span", "", (r[0] || "") + ": "));
        C.scrivi(li, file || "[DA COMPLETARE: file]");
      }
      materiali.appendChild(li);
    });

    scriviIn("titolo-questionario", docenti.campo("QUESTIONARIO", "titolo"));
    paragrafi("testo-questionario", [comuni.campo("DOCENTI", "questionario")]);

    scriviIn("titolo-calendario", docenti.campo("CALENDARIO", "titolo"));
    paragrafi("testo-calendario", docenti.campi("CALENDARIO", "testo"));

    scriviIn("titolo-referenti", docenti.campo("REFERENTI", "titolo"));
    paragrafi("testo-referenti", docenti.campi("REFERENTI", "testo"));

    document.getElementById("contenuto").hidden = false;
  }
}());
