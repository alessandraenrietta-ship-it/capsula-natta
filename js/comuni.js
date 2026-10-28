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

  /* "10.30" oppure "10:30" -> [10, 30]; vuoto -> mezzanotte */
  function leggiOra(testo) {
    var parti = (testo || "").trim().match(/^(\d{1,2})[.:](\d{2})$/);
    return parti ? [+parti[1], +parti[2]] : [0, 0];
  }

  /* La data finta di ?prova=, se c'è */
  function dataDiProva() {
    var prova = new URLSearchParams(window.location.search).get("prova");
    var parti = prova && prova.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{1,2})[:.](\d{2})(?:[:.](\d{2}))?)?$/);
    if (!parti) { return null; }
    return oraItaliana(+parti[1], +parti[2], +parti[3], +(parti[4] || 0), +(parti[5] || 0), +(parti[6] || 0));
  }

  /* Un momento scritto per esteso, in italiano: "1 maggio 2027" */
  function scriviData(momento) {
    var parti = {};
    try {
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Rome", year: "numeric", month: "numeric", day: "numeric"
      }).formatToParts(new Date(momento)).forEach(function (p) { parti[p.type] = p.value; });
    } catch (e) {
      var d = new Date(momento);
      parti = { day: d.getDate(), month: d.getMonth() + 1, year: d.getFullYear() };
    }
    return +parti.day + " " + MESI[+parti.month - 1] + " " + parti.year;
  }

  function tempo(comuni) {
    var data = leggiData(comuni.campo("CAPSULA", "data-interramento"));
    var ora = leggiOra(comuni.campo("CAPSULA", "ora-interramento"));
    var prova = dataDiProva();
    /* Con la data finta, l'orologio parte da lì e poi scorre */
    var spostamento = prova === null ? 0 : prova - Date.now();

    var t = {
      interramento: null,
      apertura: null,
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

  /* Quanto manca, in anni interi e giorni */
  function mancanoAnni(da, a) {
    var anni = new Date(a).getUTCFullYear() - new Date(da).getUTCFullYear();
    function piuAnni(n) {
      var d = new Date(da);
      d.setUTCFullYear(d.getUTCFullYear() + n);
      return d.getTime();
    }
    while (anni > 0 && piuAnni(anni) > a) { anni--; }
    return { anni: anni, giorni: Math.floor((a - piuAnni(anni)) / GIORNO) };
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

  function testata(comuni) {
    C.scrivi(document.getElementById("nome-scuola"), comuni.campo("SCUOLA", "nome"));
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
     Due cerchi. "IIS GIULIO NATTA" sull'arco in alto, "20º
     ANNIVERSARIO" sull'arco in basso, tutte e due leggibili da
     sinistra a destra. Righette verso l'interno lungo il cerchio
     interno. Al centro il logo, tinto di verde da grafica.css, e sotto
     il logo gli anni. Le scritte vengono dalla sezione TIMBRO di
     comuni.txt. È solo decorativo: va nell'elemento con id="timbro",
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

    var anni = nuovo("text", { x: 60, y: 82, "class": "timbro-scritta timbro-anni", "text-anchor": "middle" });
    anni.textContent = comuni.campo("TIMBRO", "anni");
    svg.appendChild(anni);

    contenitore.appendChild(svg);

    var logo = document.createElement("span");
    logo.className = "timbro-logo";
    contenitore.appendChild(logo);
  }

  return {
    tempo: tempo,
    mancano: mancano,
    mancanoAnni: mancanoAnni,
    pagina: pagina,
    testata: testata,
    piede: piede,
    timbro: timbro
  };
}());
