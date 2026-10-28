/* ==================================================================
   LA SEZIONE "10 ANNI DI PEROPEZIE" (index.html)

   Legge contenuti/home.txt (sezione PEROPEZIE) e contenuti/foto-pero.txt
   e riempie la sezione:
     - il titolo, con la sillaba "pero" in maiuscolo messa dal CSS (nel
       file è scritta normale, così il lettore di schermo legge una
       parola sola);
     - il palco con il disegno del pero (immagini/pero-capsula.svg),
       che si disegna quando la sezione entra nello schermo: le due
       metà di linea-1 partono insieme dai bordi e si incontrano in cima
       alla chioma, linea-2 fa lo stesso mezzo secondo dopo, poi linea-3
       disegna la chioma interna e scende a chiudere la capsula, infine
       compaiono le righette. Con prefers-reduced-motion il disegno
       compare già completo. I tratti del terreno arrivano ai bordi
       della finestra;
     - la fila delle foto piccole, dalla più recente, con due frecce.
       Toccando una foto, la foto prende il posto del disegno, con sotto
       data, credito e il pulsante "Torna al pero". Tornando al pero il
       disegno compare completo, senza ripetere l'animazione.

   Le foto vere stanno nella sezione FOTO di foto-pero.txt; con
   "esempio: sì" si aggiungono le tre immagini d'esempio. Senza foto la
   fila non compare e il palco mostra solo il disegno.
   Niente scorrimento automatico. Il cambio del palco è annunciato al
   lettore di schermo.

   Ha bisogno di js/contenuti.js e js/comuni.js.
   ================================================================== */

(function () {
  "use strict";

  var C = window.Contenuti;
  var K = window.Comuni;
  var RIDOTTO = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Il disegno del pero. Se si cambia il disegno, si aumenta il numero
     ?v= qui sotto. */
  var FILE_DISEGNO = "immagini/pero-capsula.svg?v=2";

  /* Il disegno è largo 680 e alto 300; il pero sta nel mezzo, fra 230
     e 450. Il palco mostra solo il pero: i tratti del terreno escono
     dai due lati del palco e arrivano ai bordi della finestra. */
  var PERO = { x: 230, larghezza: 220, altezza: 300, fine: 680 };

  /* Lo spessore delle linee sullo schermo, in pixel: più sottili sul
     telefono (sotto i 40rem) */
  var SPESSORE_TELEFONO = 2;
  var SPESSORE_LINEE = 2.6;
  var LARGO = window.matchMedia ? window.matchMedia("(min-width: 40rem)") : null;

  /* Quanto dura il disegno: le due metà di linea-1 partono insieme dai
     bordi, linea-2 mezzo secondo dopo, poi linea-3, infine le righette
     (le stesse misure sono in grafica.css) */
  var DURATA_DISEGNO = 6200;

  Promise.all([C.leggi("contenuti/home.txt"), C.leggi("contenuti/foto-pero.txt")])
    .then(function (file) { prepara(file[0], file[1]); })
    .catch(function (errore) { console.error(errore); });

  function prepara(home, fotoFile) {
    var testo = function (nome) { return home.campo("PEROPEZIE", nome); };

    scriviTitolo(document.getElementById("titolo-peropezie"), testo("titolo"));
    C.scrivi(document.getElementById("riga-peropezie"), testo("riga"));
    disegno();
    fila(elencoFoto(fotoFile), testo);
  }

  /* "10 anni di Peropezie": la sillaba "pero" va in un pezzo a parte,
     che il CSS scrive in maiuscolo */
  function scriviTitolo(el, titolo) {
    var dove = titolo.toLowerCase().indexOf("pero");
    if (dove === -1) { C.scrivi(el, titolo); return; }
    el.appendChild(document.createTextNode(titolo.slice(0, dove)));
    var pero = document.createElement("span");
    pero.className = "pero";
    pero.textContent = titolo.slice(dove, dove + 4);
    el.appendChild(pero);
    el.appendChild(document.createTextNode(titolo.slice(dove + 4)));
  }


  /* ---------------------------------------------------------------
     IL DISEGNO DEL PERO
     Si legge il file e lo si mette dentro la pagina, così il CSS può
     farlo disegnare. Si disegna una volta sola, quando il palco entra
     nello schermo; poi resta completo ("completo").
     --------------------------------------------------------------- */

  function disegno() {
    var scena = document.getElementById("palco-pero");
    fetch(FILE_DISEGNO)
      .then(function (risposta) {
        if (!risposta.ok) { throw new Error(risposta.status); }
        return risposta.text();
      })
      .then(function (testo) {
        var svg = new DOMParser().parseFromString(testo, "image/svg+xml").documentElement;
        if (svg.nodeName !== "svg") { throw new Error("il file non è un disegno SVG"); }
        svg.setAttribute("viewBox", [PERO.x, 0, PERO.larghezza, PERO.altezza].join(" "));
        svg.removeAttribute("width");
        svg.removeAttribute("height");
        scena.appendChild(document.importNode(svg, true));
        adatta(scena, scena.querySelector("svg"));

        if (RIDOTTO || !window.IntersectionObserver) {
          scena.classList.add("completo");
          return;
        }
        var partito = false;
        function parti() {
          if (partito) { return; }
          partito = true;
          osservatore.disconnect();
          scena.classList.add("disegna");
          setTimeout(function () { scena.classList.add("completo"); }, DURATA_DISEGNO);
        }
        var osservatore = new IntersectionObserver(function (voci) {
          if (voci[0].isIntersecting) { parti(); }
        }, { threshold: 0.4 });
        osservatore.observe(scena);
        /* Se il palco è già nello schermo quando la pagina si apre, il
           disegno parte subito, senza aspettare l'osservatore */
        var box = scena.getBoundingClientRect();
        if (box.top < window.innerHeight * 0.6 && box.bottom > 0) { parti(); }
      })
      .catch(function (errore) {
        console.warn("Non riesco a leggere il disegno " + FILE_DISEGNO + ": " + errore.message);
      });
  }


  /* I tratti del terreno sono l'inizio delle metà di linea-1 e linea-2
     (da 0 a sinistra, da 680 a destra). Quando la finestra è più larga
     del disegno (computer, LIM), si allungano con un tratto dritto fino
     ai bordi della finestra, alla stessa altezza. Insieme si ricalcola
     lo spessore, perché sullo schermo resti uguale a ogni grandezza.
     Tutto si rifà ogni volta che cambia la larghezza. */
  function adatta(scena, svg) {
    /* Per ogni metà: il primo punto e la direzione in cui parte (verso
       il primo punto di controllo). Il tratto aggiunto arriva dal bordo
       dritto e orizzontale, poi con una curva morbida (Q) entra nella
       linea nella sua stessa direzione: niente angoli. */
    var RACCORDO = 40;
    var meta = Array.prototype.map.call(svg.querySelectorAll(".meta"), function (p) {
      var d = p.getAttribute("d");
      var n = d.match(/-?\d+(\.\d+)?/g).map(Number);
      var dx = n[2] - n[0], dy = n[3] - n[1], l = Math.hypot(dx, dy) || 1;
      var cx = n[0] - dx / l * RACCORDO, cy = n[1] - dy / l * RACCORDO;
      return {
        p: p, d: d, x: n[0], y: n[1],
        cx: cx, cy: cy,                                  /* il controllo della curva */
        ex: cx - (dx > 0 ? 1 : -1) * RACCORDO            /* dove finisce il tratto dritto */
      };
    });
    function allunga(m, bordo) {
      var verso = m.x <= 0 ? -1 : 1;
      var dritto = verso < 0 ? Math.min(bordo, m.ex) : Math.max(bordo, m.ex);
      return "M " + dritto.toFixed(1) + " " + m.cy.toFixed(1) +
             " L " + m.ex.toFixed(1) + " " + m.cy.toFixed(1) +
             " Q " + m.cx.toFixed(1) + " " + m.cy.toFixed(1) + " " + m.x + " " + m.y +
             " " + m.d.replace(/^\s*M\s*-?\d+(\.\d+)?\s+-?\d+(\.\d+)?/, "");
    }

    function aggiorna() {
      var box = svg.getBoundingClientRect();
      if (!box.width) { return; }
      var scala = box.width / PERO.larghezza;            /* pixel per unità */
      var sinistra = PERO.x - box.left / scala - 2;       /* il bordo sinistro della finestra */
      var destra = PERO.x + PERO.larghezza +
                   (document.documentElement.clientWidth - box.right) / scala + 2;
      meta.forEach(function (m) {
        var d = m.d;
        if (m.x <= 0 && sinistra < 0) {
          d = allunga(m, sinistra);
        } else if (m.x >= PERO.fine && destra > PERO.fine) {
          d = allunga(m, destra);
        }
        m.p.setAttribute("d", d);
      });
      var spessore = (!LARGO || LARGO.matches) ? SPESSORE_LINEE : SPESSORE_TELEFONO;
      svg.style.setProperty("--spessore", (spessore / scala) + "px");
      svg.style.setProperty("--spessore-righette", (spessore * 0.7 / scala) + "px");
    }
    aggiorna();
    if (window.ResizeObserver) {
      new ResizeObserver(aggiorna).observe(scena);
    }
    window.addEventListener("resize", aggiorna);
  }


  /* ---------------------------------------------------------------
     LE FOTO
     --------------------------------------------------------------- */

  /* Le righe "file | data | credito | testo alternativo" della sezione
     FOTO e, con "esempio: sì", della sezione ESEMPIO, dalla più recente */
  function elencoFoto(fotoFile) {
    var righe = fotoFile.righe("FOTO");
    if (fotoFile.campo("ESEMPIO", "esempio").trim().toLowerCase() === "sì") {
      righe = righe.concat(fotoFile.righe("ESEMPIO"));
    }
    var foto = righe.filter(function (r) { return r[0]; }).map(function (r) {
      var d = K.leggiData(r[1]);
      if (!d) { console.warn("foto-pero.txt: non capisco la data -> " + r[1]); }
      return {
        file: r[0],
        data: r[1] || "",
        credito: r[2] || "",
        alt: r[3] || "",
        ordine: d ? d[0] * 10000 + d[1] * 100 + d[2] : 0
      };
    });
    return foto.sort(function (a, b) { return b.ordine - a.ordine; });
  }

  function fila(foto, testo) {
    var contenitore = document.getElementById("fila-foto");
    var elenco = document.getElementById("miniature");
    var indietro = document.getElementById("freccia-indietro");
    var avanti = document.getElementById("freccia-avanti");
    var scenaPero = document.getElementById("palco-pero");
    var scenaFoto = document.getElementById("palco-foto");
    var immagine = document.getElementById("palco-immagine");
    var sotto = document.getElementById("palco-sotto");
    var torna = document.getElementById("torna-al-pero");
    var annuncio = document.getElementById("annuncio-palco");
    var aperta = null;

    if (!foto.length) { return; }

    elenco.setAttribute("aria-label", testo("nome-fila"));
    indietro.setAttribute("aria-label", testo("freccia-indietro"));
    avanti.setAttribute("aria-label", testo("freccia-avanti"));
    C.scrivi(torna, testo("torna"));

    var pulsanti = foto.map(function (f, i) {
      var voce = document.createElement("li");
      var b = document.createElement("button");
      b.type = "button";
      b.className = "miniatura";
      b.setAttribute("aria-pressed", "false");
      b.setAttribute("aria-label", testo("apri-foto").replace("[data]", f.data));
      var img = document.createElement("img");
      img.src = f.file;
      img.alt = "";
      img.width = 72;
      img.height = 72;
      img.loading = "lazy";
      b.appendChild(img);
      b.appendChild(C.scrivi(document.createElement("span"), f.data));
      b.lastChild.className = "miniatura-data";
      b.addEventListener("click", function () { mostra(i); });
      voce.appendChild(b);
      elenco.appendChild(voce);
      return b;
    });

    function mostra(i) {
      var f = foto[i];
      aperta = i;
      immagine.src = f.file;
      immagine.alt = f.alt;
      document.getElementById("palco-data").textContent = "";
      C.scrivi(document.getElementById("palco-data"), f.data);
      document.getElementById("palco-credito").textContent = "";
      C.scrivi(document.getElementById("palco-credito"), f.credito);
      scenaPero.hidden = true;
      scenaFoto.hidden = false;
      sotto.hidden = false;
      pulsanti.forEach(function (b, j) { b.setAttribute("aria-pressed", j === i ? "true" : "false"); });
      annuncio.textContent = testo("annuncio-foto").replace("[data]", f.data);
    }

    torna.addEventListener("click", function () {
      /* Il disegno torna completo, senza ripetere l'animazione */
      scenaPero.classList.add("completo");
      scenaPero.hidden = false;
      scenaFoto.hidden = true;
      sotto.hidden = true;
      pulsanti.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      annuncio.textContent = testo("annuncio-pero");
      /* Il pulsante sparisce: il focus torna sulla foto che era aperta */
      if (aperta !== null) { pulsanti[aperta].focus(); }
      aperta = null;
    });

    /* Le frecce scorrono la fila di quasi una larghezza; sono spente a
       inizio e a fine fila */
    function frecce() {
      var fine = elenco.scrollWidth - elenco.clientWidth;
      /* qualche pixel di tolleranza: lo scorrimento si ferma sulle foto */
      indietro.disabled = elenco.scrollLeft <= 6;
      avanti.disabled = elenco.scrollLeft >= fine - 6;
    }
    function scorri(verso) {
      elenco.scrollBy({ left: verso * elenco.clientWidth * 0.8, behavior: RIDOTTO ? "auto" : "smooth" });
    }
    indietro.addEventListener("click", function () { scorri(-1); });
    avanti.addEventListener("click", function () { scorri(1); });
    elenco.addEventListener("scroll", frecce);
    window.addEventListener("resize", frecce);

    contenitore.hidden = false;
    frecce();
  }
}());
