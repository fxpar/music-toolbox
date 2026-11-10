# Plan — un seul player abc (à partir du player v9)

*Proposition du 9/11/2026, à valider avant implémentation. Rien n'est encore modifié dans les pages.*

Objectif : remplacer `abc-editeur-simple.html` et `abc-editor-player.html` par **un outil** construit sur
`abcplayer9.js` (`../abcjsfx-refactor/nouveau/`), sans tout refaire. `simpleAbc.html` reste un gabarit
de développement hors catalogue (audit 4.1).

---

## 0. Déjà fait : patch des soundfonts → plugin

### Ce que contient `js/abcjs-basicfx.js` (comparé à abcjs **6.6.3** officiel)

Diff complet : 3 blocs seulement, tout le reste est identique à `abcjs@6.6.3/dist/abcjs-basic.js`.

| Bloc | Ligne (fx) | Modification |
|---|---|---|
| Accords | ~14602 | `ChordTrack.prototype.chordIntervals` : ajout de `'m(add2)': [0,2,3,7]` et `'(add2)': [0,2,4,7]` (« Added FXP 25 august 2026 »). abcjs 6.7.x connaît `madd2`/`add2`, **pas** les formes avec parenthèses. |
| Soundfonts | ~15673-15826 | `getNote` d'origine mis en commentaire ; nouvelle version : requête d'abord vers **`sound/<instrument>-mp3/<note>.mp3`** (chemin relatif à la page, codé en dur), puis vers l'URL de la banque (CDN) si le statut n'est pas 200 ou en cas d'erreur. |

Effets du patch : chaque note absente en local produit une **erreur 404 dans la console** (le navigateur
l'affiche toujours) ; sous `file://` une requête locale réussie peut avoir le statut 0, donc elle repart
vers le CDN (à vérifier dans l'appli).

Autre version patchée trouvée : `abcjsfx-refactor/libs/abcjs-basicfxv5.js` = abcjs **6.6.4** + correctif de
**tablature** (accordages réentrants type ukulélé GCEA : choix de corde par hauteur réelle, et non par
ordre des cordes ; ~370 lignes de diff dans `abc_tablature`). **Aucun** patch soundfont ni accord dans
celle-ci. Les deux patchs sont donc à réunir ou à sortir d'abcjs (voir § 5).

### Le plugin `js/abcjs-localsoundfont-fx.js` (ES5, chargé après abcjs non modifié)

- Intercepte seulement les requêtes `…/<instrument>-mp3/<note>.mp3` d'abcjs (le module de chargement
  d'abcjs n'est pas exporté : impossible de le remplacer autrement sans patcher abcjs).
- Une **liste des notes locales** (`instruments`) évite toute requête vouée au 404 → console propre ;
  si un fichier déclaré manque quand même : repli automatique vers l'URL d'origine.
- abcjs garde son URL de banque d'origine → **même volume** (abcjs multiplie par 3 pour FluidR3_GM ;
  avec `soundFontUrl:"sound/"` le son serait 3 fois plus faible).
- Statut 0 sous `file://` accepté (réponse non vide).
- Ajoute aussi `m(add2)` et `(add2)` (option `extraChords`) sans toucher à abcjs.
- Option officielle seule possible si **tout** est en local : `ABCJSLocalSoundfont.officialParams()`.

Testé dans le navigateur (`test-soundfont_local/index.html`, ignoré par git) avec abcjs 6.6.3 et 6.7.2 :
7 notes chargées depuis `sound/`, notes non déclarées chargées directement depuis le CDN sans 404, repli
CDN après un 404 volontaire, `Am(add2)` → A B C E, console vide (hors 404 volontaire et `favicon.ico`).

Configuration de l'appli Android (dossier `sound/` de musicTheoryGamesWww : piano, guitare nylon, violon
complets ; percussion = 2 fichiers) :

```html
<script src="./js/abcjs-basic-min.js"></script>
<script>
  window.ABCJS_LOCAL_SOUNDFONT = { localUrl: "sound/", instruments: {
    acoustic_grand_piano: true, acoustic_guitar_nylon: true, violin: true,
    percussion: ["…liste exacte des fichiers…"] } };
</script>
<script src="./js/abcjs-localsoundfont-fx.js"></script>
```

**À tester sur la tablette Android 7** (non fait) : statut des requêtes locales dans la WebView.

---

## 1. Page cible : `abc-player.html` (nom à valider)

Ordre de l'écran, du plus utilisé au moins utilisé :

1. **Saisie rapide** (premier plan) : une zone de texte courte pré-remplie d'un en-tête minimal
   (`X:1 M:4/4 L:1/8 K:C`, masqué par défaut, modifiable dans les options) ; l'élève tape seulement les
   notes/le rythme. Bouton ▶ **gros**, Espace/Entrée = lecture. Rendu différé (debounce ~400 ms) qui ne
   coupe pas la lecture en cours (bug actuel d'abc-editeur-simple).
2. **Partition** avec curseur (v9 : clic sur une note = saut, décompte, boucle).
3. **Options avancées** dans un `<details>` replié (v9 a déjà le panneau ⋮) : tempo ±5, transposition,
   swing, métronome, décompte, accords on/off, instrument MIDI, en-tête complet.
4. **Tablature** : case « Afficher la tablature » + choix instrument/accordage (§ 2).
5. **Mes morceaux** (§ 3) : liste, ajouter, renommer, supprimer, import/export.
6. **Aide en accordéon** en bas de page (modèle latin-percussions) : syntaxe abc minimale (durées,
   silences, triolets, accords `"Am"`), exemples cliquables qui remplissent la saisie, raccourcis clavier.

Reprise depuis les deux pages actuelles : bibliothèque + thème (éditeur simple), import/export JSON +
MIDI + mute mélodie/accords (editor-player). Tout le reste vient de v9.

## 2. Tablature et instrument / accordage

Deux besoins distincts :

| Besoin | Moyen |
|---|---|
| Tablature **calculée** (afficher/masquer, choisir l'instrument) | Option native abcjs `tablature: [{instrument:"guitar"|"violin", tuning:[…], capo}]`. Préréglages : guitare EADGBE, ukulélé GCEA (réentrant), ukulélé low-G, baryton DGBE, mandoline GDAE, basse EADG + accordage libre. Nécessite le correctif réentrant (abcjs-basicfxv5) → à vérifier dans abcjs 6.7.x, sinon à transformer aussi en plugin. |
| Tablature **écrite à la main** (`t:` sous la musique) | Plugin `abcjs-tabs` (`CustomAbcTabPlugin`), branché via `AbcPlayer9.plugins` (`configure` / `afterRender`). |

Points d'attention `abcjs-tabs` :
- c'est un **module ES6** (`class`, `const`, `=>`, `import/export`) : à fournir aussi en version ES5
  (`CustomAbcTabPluginfx.js`, objet global) pour la WebView Android 7 ;
- testé avec abcjs 6.7.2 et pas encore avec `ABCJS.Editor` (que v9 utilise) : premier test à faire ;
- une seule voix / un seul morceau par rendu.

`%%tab-instrument` dans le code abc prime sur le choix de l'interface (même règle que le plugin).

## 3. Stockage avec le minimum de permissions

- **`localStorage`** seulement (aucune permission Android, fonctionne en WebView si
  `setDomStorageEnabled(true)` dans l'appli — à vérifier). Une clé versionnée :
  `fxAbcPlayer.v1 = {songs:[{id,title,abc,updated}], lastId, prefs:{lang,theme,tabInstrument,…}}`.
- **Migration** au premier lancement des anciennes clés `abc_editor_songs`, `abc_editor_theme`
  (éditeur simple) et `AbcJs_Scores_Database`, `AbcJs_LastCurrentId` (editor-player) ; anciennes clés
  conservées.
- **Export** : fichier `.abc` (recueil) et `.json` par `Blob` + `<a download>` ; en WebView, si le
  téléchargement n'est pas géré par l'appli, repli « Copier » (presse-papiers / zone de texte
  sélectionnable). **Import** : `<input type="file">` + coller du texte. Pas de File System Access API,
  pas de stockage externe, pas de micro.
- **Partage** facultatif : morceau dans l'ancre de l'URL (`#abc=…` encodé), sans serveur.
- Pas de sauvegarde automatique silencieuse du morceau d'exemple (bug actuel : directives métronome
  enregistrées dans le code de l'élève).

## 4. i18n FR/EN

- v9 a déjà un dictionnaire `I18N.fr/en` interne et l'attribut `lang`. Ajouter :
  `AbcPlayer9.addStrings(lang, {…})` pour que la page (saisie rapide, bibliothèque, aide) et les
  plugins (tablature) ajoutent leurs libellés au même dictionnaire.
- Textes de la page en `data-i18n="clé"` ; langue = `?lang=` > préférence enregistrée > `navigator.language`.
- L'aide en accordéon : un bloc par langue (`<section lang="fr">` / `lang="en"`), on masque l'autre.
- `js/i18n.js` existe déjà dans music-toolbox : vérifier s'il peut servir de module commun avant d'en
  créer un (audit 3.6, `fx-common`).

## 5. Fichiers et étapes proposées

| Étape | Contenu | Effort |
|---|---|---|
| 1 | Copier `abcplayer9.js` dans `js/abcplayer9fx.js` (nom avec « fx » pour le dépôt) ; vérifier ES5 (déjà : 0 `const`/`=>`/`?.`). | S |
| 2 | Page `abc-player.html` : saisie rapide + v9 en mode `editor` + options repliées ; lignes CDN/local commentées comme ailleurs. | M |
| 3 | Bibliothèque + migration localStorage + import/export. | M |
| 4 | Tablature native (case + préréglages) ; décider du sort du correctif réentrant (plugin ou abcjs ≥ 6.7). | M |
| 5 | Version ES5 d'abcjs-tabs + branchement `AbcPlayer9.plugins`. | M |
| 6 | Aide en accordéon FR/EN, puis test sur la tablette Android 7 (son local, stockage, export). | M |
| 7 | Rediriger `abc-editeur-simple.html` et `abc-editor-player.html` vers la nouvelle page (garder les fichiers un temps, ou `<meta refresh>`), mettre à jour index/README. | S |

**Une seule version d'abcjs** pour tout l'outil : abcjs officiel (6.6.4 ou 6.7.x) + `abcjs-localsoundfont-fx.js`
(+ éventuellement un plugin tablature réentrante), au lieu de trois copies modifiées (6.2.2, 6.4.0, 6.6.3 fx).
`js/abcjs-basicfx.js` reste en place tant que l'appli Android en dépend.

### Questions pour l'auteur
1. Nom de la page (`abc-player.html` ?) et devenir des deux anciennes (redirection ou suppression).
2. abcjs de référence : 6.6.4 (celui de v9) ou 6.7.2 (celui d'abcjs-tabs) ?
3. Dans l'appli Android, les pages sont-elles servies en `file:///android_asset/` ou via un
   `WebViewAssetLoader` (https) ? (influe sur le statut des requêtes locales et sur les téléchargements).
