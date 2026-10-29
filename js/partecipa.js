/* ==================================================================
   LA PAGINA "PARTECIPA" (partecipa.html)

   Legge contenuti/comuni.txt e contenuti/partecipa.txt e riempie la
   pagina: testata con il menu, apertura con l'avviso sull'account della
   scuola, "Questionario per gli studenti", "Dizionario del presente",
   "Per i docenti", piede con il timbro.

   Il sito non riceve nulla. Per ogni modulo, quando nel file c'è il
   link (che comincia con https://), compaiono il pulsante pieno "Apri
   il modulo ›" e il codice QR; finché c'è [DA COMPLETARE], compare il
   segnaposto.

   Ha bisogno di js/contenuti.js, js/comuni.js e js/qr.js.
   ================================================================== */

(function () {
  "use strict";

  var C = window.Contenuti;
  var K = window.Comuni;

  Promise.all([C.leggi("contenuti/comuni.txt"), C.leggi("contenuti/partecipa.txt")])
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

  function mostra(comuni, partecipa) {
    var t = K.tempo(comuni);
    K.testata(comuni, t);
    K.timbro(comuni);
    K.piede(comuni, t);

    scriviIn("titolo", partecipa.campo("APERTURA", "titolo"));
    paragrafi("testo-apertura", partecipa.campi("APERTURA", "testo"));
    scriviIn("avviso-account", partecipa.campo("APERTURA", "avviso"));

    [["STUDENTI", "studenti"], ["DIZIONARIO", "dizionario"], ["DOCENTI", "docenti"]].forEach(function (s) {
      scriviIn("titolo-" + s[1], partecipa.campo(s[0], "titolo"));
      paragrafi("testo-" + s[1], partecipa.campi(s[0], "testo"));
    });
    modulo(partecipa, "STUDENTI", "link-studenti");
    modulo(partecipa, "DIZIONARIO", "link-dizionario");

    document.getElementById("contenuto").hidden = false;
  }

  /* Il link di un modulo: pulsante pieno e codice QR, oppure il
     segnaposto se il link non c'è ancora */
  function modulo(partecipa, sezione, id) {
    var dove = document.getElementById(id);
    var link = partecipa.campo(sezione, "link").trim();
    var scritta = function (nome) { return partecipa.campo("MODULO", nome); };

    if (!/^https:\/\//.test(link) || C.daCompletare(link)) {
      dove.appendChild(elemento("p", "modulo-segnaposto", link || "[DA COMPLETARE: link del modulo]"));
      return;
    }

    var riga = elemento("p", "modulo-pulsante");
    var a = elemento("a", "pulsante pulsante-pieno", scritta("pulsante"));
    a.href = link;
    riga.appendChild(a);
    dove.appendChild(riga);

    var qr = elemento("div", "modulo-qr");
    qr.innerHTML = window.QR ? QR.svg(link, { bordo: 4, titolo: scritta("qr-titolo") }) : "";
    dove.appendChild(qr);
    dove.appendChild(elemento("p", "modulo-inquadra", scritta("inquadra")));
  }
}());
