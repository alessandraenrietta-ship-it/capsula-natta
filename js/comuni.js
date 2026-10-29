/* ==================================================================
   I PEZZI COMUNI A TUTTE LE PAGINE

     - le tre fasi del sito, ricavate dalla data dell'interramento
       scritta in contenuti/comuni.txt (Comuni.tempo)
     - le pagine che si possono collegare (Comuni.pagina)
     - la testata (Comuni.testata), il piede (Comuni.piede) e il suo
       timbro rotondo (Comuni.timbro)

   Ha bisogno di js/contenuti.js, che va caricato prima di questo.
   ================================================================== */

window.Comuni = (function () {
  "use strict";

  var C = window.Contenuti;
  var SVG = "http://www.w3.org/2000/svg";
  var GIORNO = 24 * 60 * 60 * 1000;

  var MESI = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
              "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];

  /* L'apertura è dieci anni dopo l'interramento, lo stesso giorno */
  var ANNI_CAPSULA = 10;

  /* Le pagine che spariscono da sole dopo l'interramento, anche se
     sono "pronta" in comuni.txt (CLAUDE.md, punto 1) */
  var SOLO_PRIMA = ["partecipa", "docenti"];


  /* ---------------------------------------------------------------
     L'ORA ITALIANA
     Le date della capsula sono in ora italiana, anche per chi apre il
     sito da un altro fuso orario. Il browser sa quanto l'Italia è
     avanti rispetto all'ora universale in un certo momento (un'ora
     d'inverno, due d'estate): qui lo si chiede.
     --------------------------------------------------------------- */

  function scartoItalia(momento) {
    try {
      var parti = {};
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Rome", hourCycle: "h23",
        year: "numeric", month: "numeric", day: "numeric",
        hour: "numeric", minute: "numeric", second: "numeric"
      }).formatToParts(new Date(momento)).forEach(function (p) { parti[p.type] = p.value; });
      var comeInItalia = Date.UTC(+parti.year, +parti.month - 1, +parti.day,
                                  +parti.hour % 24, +parti.minute, +parti.second);
      return comeInItalia - Math.floor(momento / 1000) * 1000;
    } catch (e) {
      /* Browser molto vecchio: si usa il fuso del computer */
      return -new Date(momento).getTimezoneOffset() * 60000;
    }
  }

  /* Il momento (in millisecondi) che in Italia corrisponde a quel
     giorno e a quell'ora */
  function oraItaliana(anno, mese, giorno, ore, minuti, secondi) {
    var universale = Date.UTC(anno, mese - 1, giorno, ore || 0, minuti || 0, secondi || 0);
    var momento = universale - scartoItalia(universale);
    /* Una seconda volta, per i giorni del cambio d'ora */
    return universale - scartoItalia(momento);
  }


  /* ---------------------------------------------------------------
     LE TRE FASI
     Dalla data dell'interramento il sito ricava l'apertura (dieci anni
     dopo) e la fase in cui siamo:
       "prima"  prima dell'interramento
       "dopo"   dopo l'interramento, prima dell'apertura
       "aperta" dopo l'apertura

     PER PROVARE LE FASI senza aspettare: si aggiunge all'indirizzo
     della pagina una data finta, in ora italiana, per esempio
         index.html?prova=2030-01-01
         index.html?prova=2027-04-30T23:59:50
     La pagina si comporta come se fosse quel momento, e il tempo
     scorre da lì.
     --------------------------------------------------------------- */

  /* "1 maggio 2027" (anche "1º maggio 2027") -> [2027, 5, 1] */
  function leggiData(testo) {
    var parti = (testo || "").trim().toLowerCase().match(/^(\d{1,2})º?\s+([a-z]+)\s+(\d{4})$/);
    if (!parti) { return null; }
    var mese = MESI.indexOf(parti[2]) + 1;
    if (!mese) { return null; }
    return [+parti[3], mese, +parti[1]];
  }

  /* "15.00" (oppure "15:00") -> [15, 0]; vuoto o sbagliato -> null */
  function leggiOra(testo) {
    var parti = (testo || "").trim().match(/^(\d{1,2})[.:](\d{2})$/);
    return parti && +parti[1] < 24 && +parti[2] < 60 ? [+parti[1], +parti[2]] : null;
  }

  /* La data finta di ?prova=, se c'è */
  function dataDiProva() {
    var prova = new URLSearchParams(window.location.search).get("prova");
    var parti = prova && prova.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{1,2})[:.](\d{2})(?:[:.](\d{2}))?)?$/);
    if (!parti) { return null; }
    return oraItaliana(+parti[1], +parti[2], +parti[3], +(parti[4] || 0), +(parti[5] || 0), +(parti[6] || 0));
  }

  /* Il giorno del calendario italiano di un momento: [anno, mese, giorno] */
  function giornoItaliano(momento) {
    var parti = {};
    try {
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Rome", year: "numeric", month: "numeric", day: "numeric"
      }).formatToParts(new Date(momento)).forEach(function (p) { parti[p.type] = p.value; });
    } catch (e) {
      var d = new Date(momento);
      parti = { day: d.getDate(), month: d.getMonth() + 1, year: d.getFullYear() };
    }
    return [+parti.year, +parti.month, +parti.day];
  }

  /* Un momento scritto per esteso, in italiano: "1 maggio 2027" */
  function scriviData(momento) {
    var g = giornoItaliano(momento);
    return g[2] + " " + MESI[g[1] - 1] + " " + g[0];
  }

  function tempo(comuni) {
    var data = leggiData(comuni.campo("CAPSULA", "data-interramento"));
    var testoOra = comuni.campo("CAPSULA", "ora-interramento").trim();
    var oraLetta = leggiOra(testoOra);
    /* Senza ora, la mezzanotte */
    var ora = oraLetta || [0, 0];
    if (testoOra && !oraLetta) {
      console.warn("comuni.txt: non capisco l'ora dell'interramento -> " + testoOra +
                   " (si scrive così: 15.00)");
    }
    var prova = dataDiProva();
    /* Con la data finta, l'orologio parte da lì e poi scorre */
    var spostamento = prova === null ? 0 : prova - Date.now();

    var t = {
      interramento: null,
      apertura: null,
      /* L'ora come va scritta sulla pagina, con il punto ("15.00"), o
         "" se nel file non c'è */
      ora: oraLetta ? ora[0] + "." + (ora[1] < 10 ? "0" : "") + ora[1] : "",
      provvisoria: comuni.campo("CAPSULA", "data-provvisoria").trim().toLowerCase() !== "no",
      adesso: function () { return Date.now() + spostamento; },
      fase: function () {
        var adesso = t.adesso();
        if (t.interramento === null || adesso < t.interramento) { return "prima"; }
        return adesso < t.apertura ? "dopo" : "aperta";
      },
      scriviData: scriviData
    };

    if (data) {
      t.interramento = oraItaliana(data[0], data[1], data[2], ora[0], ora[1]);
      t.apertura = oraItaliana(data[0] + ANNI_CAPSULA, data[1], data[2], ora[0], ora[1]);
    } else {
      console.warn("comuni.txt: non capisco la data dell'interramento -> " +
                   comuni.campo("CAPSULA", "data-interramento") +
                   " (si scrive così: 1 maggio 2027)");
    }
    return t;
  }

  /* Quanto manca da un momento all'altro, in giorni, ore, minuti e
     secondi */
  function mancano(da, a) {
    var s = Math.max(0, Math.floor((a - da) / 1000));
    return {
      giorni: Math.floor(s / 86400),
      ore: Math.floor(s / 3600) % 24,
      minuti: Math.floor(s / 60) % 60,
      secondi: s % 60
    };
  }

  /* Quanti giorni del calendario italiano ci sono fra un momento e
     l'altro, senza guardare l'ora: dal giorno dell'interramento
     all'apertura sono 3.653 (dieci anni, con tre 29 febbraio), anche
     subito dopo l'interramento */
  function giorniCalendario(da, a) {
    var g1 = giornoItaliano(da), g2 = giornoItaliano(a);
    return Math.max(0, Math.round((Date.UTC(g2[0], g2[1] - 1, g2[2]) -
                                   Date.UTC(g1[0], g1[1] - 1, g1[2])) / GIORNO));
  }


  /* ---------------------------------------------------------------
     LE PAGINE
     Il file di una pagina, se si può collegare: la pagina è "pronta"
     in comuni.txt e, per Partecipa e Per i docenti, siamo ancora prima
     dell'interramento. Altrimenti "".
     --------------------------------------------------------------- */

  function pagina(comuni, nome, t) {
    var trovata = comuni.righe("PAGINE").filter(function (riga) {
      return riga[0].toLowerCase() === nome;
    })[0];
    if (!trovata || (trovata[2] || "").toLowerCase() !== "pronta") { return ""; }
    if (SOLO_PRIMA.indexOf(nome) !== -1 && t.fase() !== "prima") { return ""; }
    return trovata[1];
  }


  /* ---------------------------------------------------------------
     TESTATA E PIEDE
     --------------------------------------------------------------- */

  /* La testata: il nome della scuola accanto al logo e il menu. Nelle
     pagine interne logo e nome portano alla home: il link ha per il
     lettore di schermo il nome scritto per intero, "IIS Giulio Natta,
     pagina iniziale", senza il maiuscolo della testata. */
  function testata(comuni, t) {
    var nome = comuni.campo("SCUOLA", "nome");
    var dove = document.getElementById("nome-scuola");
    dove.textContent = "";
    C.scrivi(dove, nome);
    var link = document.querySelector("a.marchio");
    if (link) { link.setAttribute("aria-label", nome + ", " + comuni.campo("MENU", "pagina-iniziale")); }
    if (t) { menu(comuni, t); }
  }


  /* ---------------------------------------------------------------
     IL MENU
     Le voci sono le righe della sezione PAGINE di comuni.txt con il
     nome nell'ultima colonna, nell'ordine del file, solo se la pagina
     si può collegare (Comuni.pagina: "pronta" e, per Partecipa e Per i
     docenti, prima dell'interramento). La pagina in cui si è ha
     aria-current="page"; quale sia lo dice <body data-pagina="...">.
     Se le voci stanno nella testata accanto al nome, si vedono
     affiancate; altrimenti (telefono) c'è il pulsante "Menu", che apre
     e chiude l'elenco. Il pulsante ha aria-expanded e aria-controls; Esc
     chiude il menu e riporta il focus sul pulsante.
     --------------------------------------------------------------- */

  function menu(comuni, t) {
    var testataEl = document.querySelector(".testata");
    var nav = document.getElementById("menu");
    var lista = document.getElementById("menu-lista");
    var pulsante = document.getElementById("menu-pulsante");
    if (!nav || !lista || !pulsante) { return; }
    var corrente = document.body.getAttribute("data-pagina") || "";

    /* PROVVISORIO, finché Alessandra non sceglie: ?menu=b mostra la
       seconda disposizione del menu (grafica.css, "menu-b") */
    if (new URLSearchParams(window.location.search).get("menu") === "b") {
      document.documentElement.classList.add("menu-b");
    }

    lista.textContent = "";
    comuni.righe("PAGINE").forEach(function (riga) {
      var chiave = (riga[0] || "").toLowerCase();
      var voce = riga[3] || "";
      if (!voce) { return; }
      var file = pagina(comuni, chiave, t);
      if (!file) { return; }
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = file;
      C.scrivi(a, voce);
      if (chiave === corrente) { a.setAttribute("aria-current", "page"); }
      li.appendChild(a);
      lista.appendChild(li);
    });
    /* Con una voce sola (la home) il menu non serve */
    if (lista.children.length < 2) { nav.hidden = true; return; }

    nav.setAttribute("aria-label", comuni.campo("MENU", "nome"));
    pulsante.textContent = "";
    C.scrivi(pulsante, comuni.campo("MENU", "pulsante"));
    nav.hidden = false;

    function apri(si) {
      testataEl.classList.toggle("menu-aperto", si);
      pulsante.setAttribute("aria-expanded", si ? "true" : "false");
    }
    if (!pulsante.dataset.pronto) {
      pulsante.dataset.pronto = "1";
      pulsante.addEventListener("click", function () {
        apri(pulsante.getAttribute("aria-expanded") !== "true");
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && pulsante.getAttribute("aria-expanded") === "true") {
          apri(false);
          pulsante.focus();
        }
      });
      /* Un clic fuori dal menu lo chiude */
      document.addEventListener("click", function (e) {
        if (pulsante.getAttribute("aria-expanded") === "true" && !nav.contains(e.target)) { apri(false); }
      });
    }

    /* Le voci stanno nella testata? Si prova a metterle affiancate: se
       escono dallo spazio accanto al nome, si usa il pulsante. Si rifà
       quando cambia la larghezza. */
    var larghezza = 0;
    function misura(forza) {
      var ora = testataEl.clientWidth;
      if (forza !== true && ora === larghezza) { return; }   /* cambia solo l'altezza: niente da rifare */
      larghezza = ora;
      testataEl.classList.remove("menu-stretto");
      var stretto = lista.scrollWidth > nav.clientWidth + 1;
      testataEl.classList.toggle("menu-stretto", stretto);
      if (!stretto) { apri(false); }
    }
    misura(true);
    if (!nav.dataset.misurato) {
      nav.dataset.misurato = "1";
      if (window.ResizeObserver) { new ResizeObserver(function () { misura(); }).observe(testataEl); }
      else { window.addEventListener("resize", function () { misura(); }); }
      if (document.fonts && document.fonts.ready) { document.fonts.ready.then(function () { misura(true); }); }
    }
  }

  /* Accanto al timbro, il link al kit della pagina Per i docenti, solo
     quando la pagina si può collegare */
  function piede(comuni, t) {
    var file = pagina(comuni, "docenti", t);
    var elenco = document.getElementById("piede");
    if (!file || !elenco) { return; }
    var voce = document.createElement("li");
    voce.appendChild(C.scrivi(document.createElement("span"), comuni.campo("PIEDE", "docenti-domanda")));
    voce.querySelector("span").className = "piede-domanda";
    voce.appendChild(document.createTextNode(" "));
    var link = document.createElement("a");
    link.href = file;
    link.className = "link-freccia";
    C.scrivi(link, comuni.campo("PIEDE", "docenti-link"));
    voce.appendChild(link);
    elenco.appendChild(voce);
    elenco.hidden = false;
  }


  /* ---------------------------------------------------------------
     IL TIMBRO
     Due cerchi. "IIS GIULIO NATTA" sull'arco in alto, "2006 ·
     VENT'ANNI · 2026" sull'arco in basso, tutte e due leggibili da
     sinistra a destra. Righette verso l'interno lungo tutto il cerchio
     interno. Al centro il logo, tinto di verde da grafica.css. Le
     scritte vengono dalla sezione TIMBRO di comuni.txt. È solo decorativo: va nell'elemento con id="timbro",
     che ha aria-hidden.
     --------------------------------------------------------------- */

  function nuovo(tag, attributi) {
    var e = document.createElementNS(SVG, tag);
    Object.keys(attributi).forEach(function (k) { e.setAttribute(k, attributi[k]); });
    return e;
  }

  function timbro(comuni) {
    var contenitore = document.getElementById("timbro");
    if (!contenitore) { return; }

    /* Il disegno è largo 120. Bordo esterno di raggio 58, interno di
       raggio 38. La scritta in alto poggia sul raggio 44 e sale verso
       l'esterno; quella in basso poggia sul raggio 52 e sale verso il
       centro: così tutte e due stanno fra i due cerchi. */
    var svg = nuovo("svg", { viewBox: "0 0 120 120", focusable: "false" });
    svg.appendChild(nuovo("circle", { cx: 60, cy: 60, r: 58, "class": "timbro-bordo" }));
    svg.appendChild(nuovo("circle", { cx: 60, cy: 60, r: 38, "class": "timbro-bordo" }));

    /* Le righette: 48 tratti corti dal cerchio interno verso il centro */
    var righette = "";
    for (var i = 0; i < 48; i++) {
      var angolo = i * Math.PI * 2 / 48;
      var cos = Math.cos(angolo), sin = Math.sin(angolo);
      righette += "M" + (60 + 38 * cos).toFixed(2) + " " + (60 + 38 * sin).toFixed(2) +
                  "L" + (60 + 34.5 * cos).toFixed(2) + " " + (60 + 34.5 * sin).toFixed(2);
    }
    svg.appendChild(nuovo("path", { d: righette, "class": "timbro-righette" }));

    /* Gli archi su cui corrono le scritte: tutti e due da sinistra a
       destra; quello in alto passa sopra il centro, quello in basso
       sotto */
    svg.appendChild(nuovo("path", { id: "timbro-arco-alto", d: "M 16 60 A 44 44 0 0 1 104 60", fill: "none" }));
    svg.appendChild(nuovo("path", { id: "timbro-arco-basso", d: "M 8 60 A 52 52 0 0 0 112 60", fill: "none" }));

    function scritta(testo, arco) {
      var t = nuovo("text", { "class": "timbro-scritta", "text-anchor": "middle" });
      var percorso = nuovo("textPath", { href: "#" + arco, startOffset: "50%" });
      percorso.textContent = testo.toUpperCase();
      t.appendChild(percorso);
      svg.appendChild(t);
    }
    scritta(comuni.campo("TIMBRO", "in-alto"), "timbro-arco-alto");
    scritta(comuni.campo("TIMBRO", "in-basso"), "timbro-arco-basso");

    contenitore.appendChild(svg);

    var logo = document.createElement("span");
    logo.className = "timbro-logo";
    contenitore.appendChild(logo);
  }

  return {
    tempo: tempo,
    leggiData: leggiData,
    giornoItaliano: giornoItaliano,
    MESI: MESI,
    mancano: mancano,
    giorniCalendario: giorniCalendario,
    pagina: pagina,
    testata: testata,
    piede: piede,
    timbro: timbro
  };
}());
