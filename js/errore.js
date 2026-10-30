/* ==================================================================
   LA PAGINA DI ERRORE (404.html)

   Legge contenuti/comuni.txt e riempie la pagina: testata con logo e
   nome della scuola, titolo, una riga e il pulsante per la home. Il
   titolo, la riga e il pulsante sono gli stessi pezzi delle pagine
   chiuse dopo l'interramento (Comuni.paginaChiusa).

   Prima di questo file, lo script dentro 404.html ha già trovato la
   cartella del sito: i percorsi relativi funzionano a qualunque
   indirizzo.

   Ha bisogno di js/contenuti.js e js/comuni.js.
   ================================================================== */

(function () {
  "use strict";

  var C = window.Contenuti;
  var K = window.Comuni;

  C.leggi("contenuti/comuni.txt")
    .then(function (comuni) {
      K.testata(comuni);
      document.getElementById("testata").hidden = false;
      K.paginaChiusa(comuni, K.tempo(comuni),
        comuni.campo("PAGINA DI ERRORE", "titolo"), comuni.campo("PAGINA DI ERRORE", "testo"));
    })
    .catch(function (errore) {
      console.error(errore);
      document.getElementById("avviso").hidden = false;
    });
}());
