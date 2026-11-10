/*
 * i18n-fx.js — traduction FR / EN commune aux outils music-toolbox.
 *
 * Pourquoi ce module :
 *  - fonctionne en ligne, en local (file://) et dans la WebView Android : pas de fetch, dictionnaires dans la page ;
 *  - JS compatible vieux WebView (Android 7) : pas de ?? / ?. / paramètres par défaut / async ;
 *  - une seule clé de langue ("fx.lang") partagée par tous les outils.
 *
 * Utilisation dans une page :
 *   <script src="./js/i18n-fx.js"></script>
 *   <script>
 *     FxI18n.add({
 *       fr: { title: "Métronome", hello: "Bonjour {name}" },
 *       en: { title: "Metronome", hello: "Hello {name}" }
 *     });
 *     FxI18n.onChange(function (lang) { ...re-render des textes générés en JS... });
 *   </script>
 *
 * Attributs HTML reconnus :
 *   data-i18n="cle"              -> textContent
 *   data-i18n-html="cle"         -> innerHTML (textes avec <strong>, <code>…)
 *   data-i18n-title="cle"        -> attribut title
 *   data-i18n-placeholder="cle"  -> attribut placeholder
 *   data-i18n-aria="cle"         -> attribut aria-label
 *   data-i18n-content="cle"      -> attribut data-bs-content (popovers Bootstrap)
 *   data-i18n-toggle             -> bouton de bascule ; son texte devient "FR" ou "EN"
 *
 * En JS : FxI18n.t("cle", { name: "Ré" }) ; FxI18n.getLang() ; FxI18n.setLang("en").
 * Une clé absente en anglais retombe sur le français, puis sur la clé elle-même.
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'fx.lang';
  var SUPPORTED = ['fr', 'en'];
  var dict = { fr: {}, en: {} };
  var lang = null;
  var listeners = [];

  function lsGet(k) {
    try { return global.localStorage.getItem(k); } catch (e) { return null; }
  }
  function lsSet(k, v) {
    try { global.localStorage.setItem(k, v); } catch (e) { /* stockage indisponible */ }
  }

  function detect() {
    var stored = lsGet(STORAGE_KEY);
    if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    var nav = (global.navigator && (global.navigator.language || global.navigator.userLanguage)) || 'fr';
    return nav.toLowerCase().indexOf('fr') === 0 ? 'fr' : 'en';
  }

  function add(dicts) {
    for (var l in dicts) {
      if (!Object.prototype.hasOwnProperty.call(dicts, l)) continue;
      if (!dict[l]) dict[l] = {};
      var src = dicts[l];
      for (var k in src) {
        if (Object.prototype.hasOwnProperty.call(src, k)) dict[l][k] = src[k];
      }
    }
    if (lang) apply();
  }

  function t(key, vars) {
    var cur = lang || detect();
    var v = dict[cur] ? dict[cur][key] : undefined;
    if (v === undefined || v === null) v = dict.fr[key];
    if (v === undefined || v === null) return key;
    v = String(v);
    if (vars) {
      for (var name in vars) {
        if (Object.prototype.hasOwnProperty.call(vars, name)) {
          v = v.split('{' + name + '}').join(String(vars[name]));
        }
      }
    }
    return v;
  }

  function has(key) {
    var cur = lang || detect();
    return !!((dict[cur] && dict[cur][key] !== undefined) || dict.fr[key] !== undefined);
  }

  function eachEl(root, attr, fn) {
    var list = (root || document).querySelectorAll('[' + attr + ']');
    for (var i = 0; i < list.length; i++) fn(list[i], list[i].getAttribute(attr));
  }

  function apply(root) {
    if (!global.document) return;
    eachEl(root, 'data-i18n', function (el, k) { if (has(k)) el.textContent = t(k); });
    eachEl(root, 'data-i18n-html', function (el, k) { if (has(k)) el.innerHTML = t(k); });
    eachEl(root, 'data-i18n-title', function (el, k) {
      if (!has(k)) return;
      el.setAttribute('title', t(k));
      if (el.getAttribute('data-bs-original-title') !== null) el.setAttribute('data-bs-original-title', t(k));
    });
    eachEl(root, 'data-i18n-placeholder', function (el, k) { if (has(k)) el.setAttribute('placeholder', t(k)); });
    eachEl(root, 'data-i18n-aria', function (el, k) { if (has(k)) el.setAttribute('aria-label', t(k)); });
    eachEl(root, 'data-i18n-content', function (el, k) { if (has(k)) el.setAttribute('data-bs-content', t(k)); });
    eachEl(root, 'data-i18n-toggle', function (el) {
      el.textContent = (lang || 'fr').toUpperCase();
      el.setAttribute('title', lang === 'fr' ? 'Switch to English' : 'Passer en français');
    });
    if (!root && document.documentElement) document.documentElement.setAttribute('lang', lang);
  }

  function setLang(l) {
    if (SUPPORTED.indexOf(l) === -1) l = 'fr';
    lang = l;
    lsSet(STORAGE_KEY, l);
    apply();
    for (var i = 0; i < listeners.length; i++) {
      try { listeners[i](l); } catch (e) { if (global.console) global.console.error(e); }
    }
  }

  function toggle() { setLang(lang === 'fr' ? 'en' : 'fr'); }

  function onChange(fn) { if (typeof fn === 'function') listeners.push(fn); }

  function getLang() { return lang || detect(); }

  function init() {
    eachEl(document, 'data-i18n-toggle', function (el) {
      if (el.getAttribute('data-i18n-bound')) return;
      el.setAttribute('data-i18n-bound', '1');
      el.addEventListener('click', function (ev) { ev.preventDefault(); toggle(); });
    });
    setLang(getLang());
  }

  lang = detect();
  if (global.document) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else setTimeout(init, 0);
  }

  global.FxI18n = { add: add, t: t, has: has, apply: apply, setLang: setLang, getLang: getLang, toggle: toggle, onChange: onChange };
})(window);
