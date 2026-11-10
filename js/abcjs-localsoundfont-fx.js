/*!
 * abcjs-localsoundfont-fx.js — Soundfonts locales pour abcjs, sans modifier abcjs
 * Version 1.0.0 — François Parlant — CC BY-NC 4.0
 *
 * Remplace le patch « en dur » de js/abcjs-basicfx.js (getNote réécrit) par un ajout
 * chargé APRÈS abcjs non modifié (testé avec abcjs 6.6.3, 6.6.4, 6.7.2) :
 *
 *   <script src="./js/abcjs-basic-min.js"></script>
 *   <script>
 *     // facultatif, AVANT le plugin (sinon : ABCJSLocalSoundfont.configure({...}) après)
 *     window.ABCJS_LOCAL_SOUNDFONT = {
 *       localUrl: "sound/",
 *       instruments: {
 *         acoustic_grand_piano: true,          // toutes les notes sont en local
 *         percussion: ["C2", "D2", "Eb3"]      // seulement ces notes
 *       }
 *     };
 *   </script>
 *   <script src="./js/abcjs-localsoundfont-fx.js"></script>
 *
 * 1) Soundfonts
 *    abcjs charge chaque note par XMLHttpRequest : <soundFontUrl><instrument>-mp3/<note>.mp3.
 *    Le module qui fait ce chargement (load-note.js) n'est pas exporté par abcjs : on ne peut
 *    pas le remplacer proprement. Le plugin intercepte donc ces requêtes (XMLHttpRequest
 *    .open/.send, uniquement pour les URL de la forme « …/<instrument>-mp3/<note>.mp3 ») :
 *      - note déclarée en local      -> requête vers localUrl ;
 *        si le fichier manque quand même (404, erreur) -> nouvelle requête vers l'URL d'origine (CDN) ;
 *      - note non déclarée en local  -> URL d'origine, inchangée (aucune requête locale inutile,
 *        donc aucune erreur 404 dans la console).
 *    La liste des notes locales (option instruments) évite les 404 : un navigateur affiche
 *    TOUJOURS une erreur console pour une requête en échec, on ne peut pas la masquer en JS.
 *    instruments: "*" = tout essayer en local (pratique, mais 404 en console si un fichier manque).
 *
 *    Pourquoi ne pas utiliser seulement l'option officielle soundFontUrl ?
 *      - elle vaut pour toutes les notes : pas de repli note par note vers le CDN ;
 *      - abcjs règle le volume selon l'URL (x3 pour les banques FluidR3_GM / MusyngKite par
 *        défaut, x1 pour une autre URL) : avec soundFontUrl:"sound/" le son est 3 fois plus faible.
 *        Ici abcjs garde son URL d'origine, donc le même volume.
 *    Si tout est en local, l'option officielle suffit :
 *        synthOptions = ABCJSLocalSoundfont.officialParams()  // {soundFontUrl, soundFontVolumeMultiplier:3}
 *
 *    file:// (WebView Android) : une requête locale réussie peut avoir le statut 0 ; elle est
 *    acceptée (réponse non vide) et présentée à abcjs avec le statut 200.
 *
 * 2) Accords supplémentaires (option extraChords)
 *    Le patch ajoutait 'm(add2)' et '(add2)' à la table des accords d'abcjs (non exportée).
 *    Le plugin pose, sur Object.prototype, un accesseur non énumérable pour chaque nom
 *    d'accord ajouté. Au premier accès depuis la table d'abcjs (repérée par ses clés M, m, m7),
 *    il copie tous les accords ajoutés dans cette table, puis se retire d'Object.prototype.
 *    Les autres objets ne voient rien (valeur undefined, comme avant).
 *
 * Compatibilité WebView Android 7 : ES5 uniquement.
 * API : window.ABCJSLocalSoundfont = { configure, officialParams, stats, log, version }
 */
(function (global) {
  "use strict";

  var VERSION = "1.0.0";
  var FLUID = "https://paulrosen.github.io/midi-js-soundfonts/FluidR3_GM/";

  var config = {
    enabled: true,
    localUrl: "sound/",
    // true = toutes les notes, tableau = ces notes, "*" (au lieu de l'objet) = tout essayer
    instruments: {},
    // null = intercepter toutes les banques ; sinon tableau de préfixes d'URL (ex. [FLUID])
    onlyFrom: null,
    fallback: true,
    extraChords: { "m(add2)": [0, 2, 3, 7], "(add2)": [0, 2, 4, 7] },
    debug: false
  };

  var stats = { local: 0, fallback: 0, remote: 0, failed: 0 };
  var log = [];
  var MAX_LOG = 300;
  // …/acoustic_grand_piano-mp3/Bb3.mp3  (éventuellement suivi de ?query)
  var NOTE_RE = /^(.*\/)([A-Za-z0-9_]+)-mp3\/([A-G]b?-?\d+)\.mp3(\?.*)?$/;

  function extend(target, src) {
    for (var k in src) if (Object.prototype.hasOwnProperty.call(src, k)) target[k] = src[k];
    return target;
  }

  function record(kind, url, from) {
    stats[kind]++;
    if (log.length < MAX_LOG) log.push({ kind: kind, url: url, from: from || null });
    if (config.debug && global.console) console.log("[localsoundfont] " + kind + " " + url);
  }

  function slash(url) {
    return url && url.charAt(url.length - 1) !== "/" ? url + "/" : url;
  }

  function isLocal(instrument, note) {
    var list = config.instruments;
    if (list === "*") return true;
    if (!list || !Object.prototype.hasOwnProperty.call(list, instrument)) return false;
    var entry = list[instrument];
    if (entry === true) return true;
    if (entry && typeof entry.length === "number") {
      for (var i = 0; i < entry.length; i++) if (entry[i] === note) return true;
    }
    return false;
  }

  function fromAllowedBank(base) {
    var only = config.onlyFrom;
    if (!only || !only.length) return true;
    for (var i = 0; i < only.length; i++) if (base.indexOf(slash(only[i])) === 0) return true;
    return false;
  }

  // ------------------------------------------------------------- 1) Soundfonts
  function installXhrHook() {
    var XHR = global.XMLHttpRequest;
    if (!XHR || !XHR.prototype || XHR.prototype.__fxLocalSoundfont) return;
    var proto = XHR.prototype;
    var origOpen = proto.open;
    var origSend = proto.send;
    proto.__fxLocalSoundfont = true;

    proto.open = function (method, url) {
      this.__fxsf = null;
      if (config.enabled && typeof url === "string" && String(method).toUpperCase() === "GET") {
        var m = NOTE_RE.exec(url);
        var localBase = slash(config.localUrl);
        if (m && m[1] !== localBase && fromAllowedBank(m[1])) {
          if (isLocal(m[2], m[3])) {
            var localUrl = localBase + m[2] + "-mp3/" + m[3] + ".mp3";
            this.__fxsf = { original: url, local: localUrl };
            var args = Array.prototype.slice.call(arguments);
            args[1] = localUrl;
            return origOpen.apply(this, args);
          }
          record("remote", url);
        }
      }
      return origOpen.apply(this, arguments);
    };

    proto.send = function () {
      var info = this.__fxsf;
      if (!info) return origSend.apply(this, arguments);
      var xhr = this;
      // abcjs pose onload/onerror avant send()
      var userOnload = xhr.onload;
      var userOnerror = xhr.onerror;
      var responseType = xhr.responseType;
      var done = false;

      function restore() {
        xhr.onload = userOnload;
        xhr.onerror = userOnerror;
        xhr.__fxsf = null;
      }

      function fallback() {
        if (done) return;
        done = true;
        restore();
        if (!config.fallback) {
          record("failed", info.local);
          if (userOnerror) userOnerror.call(xhr);
          return;
        }
        record("fallback", info.original, info.local);
        origOpen.call(xhr, "GET", info.original, true);
        xhr.responseType = responseType;
        origSend.call(xhr);
      }

      xhr.onload = function (ev) {
        var status = xhr.status;
        var body = xhr.response;
        var hasBody = body && (body.byteLength > 0 || body.length > 0);
        if (status === 200 || (status === 0 && hasBody)) {
          if (status === 0) {
            // file:// : abcjs n'accepte que 200
            try { Object.defineProperty(xhr, "status", { value: 200, configurable: true }); } catch (e) { /* ignoré */ }
          }
          done = true;
          restore();
          record("local", info.local);
          if (userOnload) return userOnload.call(xhr, ev);
          return undefined;
        }
        fallback();
        return undefined;
      };
      xhr.onerror = function () { fallback(); };
      return origSend.apply(this, arguments);
    };
  }

  // ------------------------------------------------------------- 2) Accords supplémentaires
  var chordTable = null;
  var chordGetters = [];

  function looksLikeChordTable(obj) {
    return obj && obj !== Object.prototype &&
      Object.prototype.hasOwnProperty.call(obj, "M") &&
      Object.prototype.hasOwnProperty.call(obj, "m") &&
      Object.prototype.hasOwnProperty.call(obj, "m7");
  }

  function copyChords(table) {
    var extra = config.extraChords || {};
    for (var name in extra) {
      if (Object.prototype.hasOwnProperty.call(extra, name)) table[name] = extra[name].slice(0);
    }
  }

  function removeChordGetters() {
    for (var i = 0; i < chordGetters.length; i++) {
      var name = chordGetters[i];
      var d = Object.getOwnPropertyDescriptor(Object.prototype, name);
      if (d && d.get && d.get.__fxChord) delete Object.prototype[name];
    }
    chordGetters = [];
  }

  function installChordHook() {
    removeChordGetters();
    if (chordTable) { copyChords(chordTable); return; }
    var extra = config.extraChords || {};
    for (var name in extra) {
      if (!Object.prototype.hasOwnProperty.call(extra, name)) continue;
      if (Object.prototype.hasOwnProperty.call(Object.prototype, name)) continue;
      (function (chordName) {
        var g = function () {
          if (!looksLikeChordTable(this)) return undefined;
          chordTable = this;
          removeChordGetters();
          copyChords(chordTable);
          return chordTable[chordName];
        };
        g.__fxChord = true;
        // set : une affectation sur un objet quelconque crée une propriété normale
        var s = function (v) {
          Object.defineProperty(this, chordName, { value: v, writable: true, enumerable: true, configurable: true });
        };
        try {
          Object.defineProperty(Object.prototype, chordName, { get: g, set: s, enumerable: false, configurable: true });
          chordGetters.push(chordName);
        } catch (e) { /* ignoré */ }
      })(name);
    }
  }

  // ------------------------------------------------------------- API
  function configure(opts) {
    if (opts) {
      if (opts.instruments !== undefined) config.instruments = opts.instruments;
      var copy = extend({}, opts);
      delete copy.instruments;
      extend(config, copy);
    }
    config.localUrl = slash(config.localUrl);
    installChordHook();
    return api;
  }

  var api = {
    version: VERSION,
    configure: configure,
    config: config,
    stats: stats,
    log: log,
    /** Paramètres officiels abcjs pour un mode « tout en local » (sans repli CDN). */
    officialParams: function () {
      return { soundFontUrl: config.localUrl, soundFontVolumeMultiplier: 3.0 };
    },
    resetStats: function () {
      stats.local = stats.fallback = stats.remote = stats.failed = 0;
      log.length = 0;
    },
    defaultSoundFontUrl: FLUID
  };

  installXhrHook();
  configure(global.ABCJS_LOCAL_SOUNDFONT || null);
  global.ABCJSLocalSoundfont = api;
})(typeof window !== "undefined" ? window : this);
