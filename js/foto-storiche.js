/* ==================================================================
   IL CAROSELLO DELLE FOTO STORICHE (index.html)

   Legge contenuti/home.txt (sezione FOTO STORICHE) e
   contenuti/foto-storiche.txt e riempie il carosello dell'apertura: una
   foto alla volta, in ordine di anno, dalla più vecchia, con sotto solo
   anno e credito, di seguito. Si cambia foto con le due frecce e, sul telefono,
   scorrendo con il dito. Niente scorrimento automatico.

   Le foto vere stanno nella sezione FOTO di foto-storiche.txt; con
   "esempio: sì" si aggiungono quelle d'esempio. Senza foto il carosello
   non compare; con una foto sola le frecce non servono.

   Ogni cambio di foto è annunciato al lettore di schermo ("Foto del
   2009, 2 di 5"). Con prefers-reduced-motion la foto cambia senza
   movimento. Le frecce sono spente alla prima e all'ultima foto.

   Ha bisogno di js/contenuti.js e js/comuni.js.
   ================================================================== */

(function () {
  "use strict";

  var C = window.Contenuti;
  var RIDOTTO = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  Promise.all([C.leggi("contenuti/home.txt"), C.leggi("contenuti/foto-storiche.txt")])
    .then(function (file) { prepara(file[0], file[1]); })
    .catch(function (errore) { console.error(errore); });

  /* Le righe "file | anno | credito | testo alternativo" della sezione
     FOTO e, con "esempio: sì", della sezione ESEMPIO, dalla più vecchia */
  function elencoFoto(fotoFile) {
    var righe = fotoFile.righe("FOTO");
    if (fotoFile.campo("ESEMPIO", "esempio").trim().toLowerCase() === "sì") {
      righe = righe.concat(fotoFile.righe("ESEMPIO"));
    }
    var foto = righe.filter(function (r) { return r[0]; }).map(function (r) {
      return { file: r[0], anno: r[1] || "", credito: r[2] || "", alt: r[3] || "" };
    });
    return foto.sort(function (a, b) { return (parseInt(a.anno, 10) || 0) - (parseInt(b.anno, 10) || 0); });
  }

  function prepara(home, fotoFile) {
    var foto = elencoFoto(fotoFile);
    if (!foto.length) { return; }

    var testo = function (nome) { return home.campo("FOTO STORICHE", nome); };
    var carosello = document.getElementById("carosello");
    var striscia = document.getElementById("carosello-striscia");
    var indietro = document.getElementById("carosello-indietro");
    var avanti = document.getElementById("carosello-avanti");
    var anno = document.getElementById("carosello-anno");
    var credito = document.getElementById("carosello-credito");
    var annuncio = document.getElementById("carosello-annuncio");
    var corrente = 0;

    carosello.setAttribute("aria-label", testo("nome"));
    indietro.setAttribute("aria-label", testo("freccia-indietro"));
    avanti.setAttribute("aria-label", testo("freccia-avanti"));
    indietro.hidden = avanti.hidden = foto.length < 2;

    var immagini = foto.map(function (f, i) {
      var img = document.createElement("img");
      img.src = f.file;
      img.alt = f.alt;
      if (i) { img.loading = "lazy"; }
      striscia.appendChild(img);
      return img;
    });

    function aggiorna(annuncia) {
      var f = foto[corrente];
      anno.textContent = "";
      C.scrivi(anno, f.anno);
      credito.textContent = "";
      C.scrivi(credito, f.credito);
      /* Il lettore di schermo legge solo la foto che si vede */
      immagini.forEach(function (img, i) {
        if (i === corrente) { img.removeAttribute("aria-hidden"); }
        else { img.setAttribute("aria-hidden", "true"); }
      });
      /* Una freccia spenta perde il focus: passa a quella accanto */
      var prima = corrente === 0, ultima = corrente === foto.length - 1;
      if (prima && document.activeElement === indietro) { avanti.focus(); }
      if (ultima && document.activeElement === avanti) { indietro.focus(); }
      indietro.disabled = prima;
      avanti.disabled = ultima;
      if (annuncia) {
        annuncio.textContent = testo("annuncio").replace("[anno]", f.anno)
          .replace("[numero]", corrente + 1).replace("[totale]", foto.length);
      }
    }

    /* Mentre la striscia scorre per una freccia, la foto è già decisa */
    var daFreccia = false;
    var fermo = null;

    function attendi() {
      clearTimeout(fermo);
      fermo = setTimeout(function () { daFreccia = false; }, 200);
    }

    function vai(verso) {
      corrente += verso;
      daFreccia = true;
      aggiorna(true);
      striscia.scrollTo({ left: corrente * striscia.clientWidth, behavior: RIDOTTO ? "auto" : "smooth" });
      attendi();
    }

    indietro.addEventListener("click", function () { vai(-1); });
    avanti.addEventListener("click", function () { vai(1); });

    /* Scorrendo con il dito, la foto corrente è quella che occupa la
       maggior parte del riquadro */
    striscia.addEventListener("scroll", function () {
      if (daFreccia) { attendi(); return; }
      var i = Math.round(striscia.scrollLeft / striscia.clientWidth);
      if (i !== corrente && foto[i]) {
        corrente = i;
        aggiorna(true);
      }
    });

    aggiorna(false);
    carosello.hidden = false;
  }
}());
