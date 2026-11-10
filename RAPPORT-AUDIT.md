# Rapport d'audit — Music Toolbox

*Date : 9 novembre 2026 — périmètre : README.md + 30 fichiers HTML + scripts associés.*

> **Méthode.** Audit par **lecture du code** (fichiers lus en entier), comparaison avec ce qu'annonce le README, et vérification en ligne des ressources sur GitHub Pages (codes HTTP). Les outils n'ont **pas été testés à la main dans un navigateur** : les bugs listés sont ceux visibles dans le code ; quelques-uns (signalés « à vérifier ») demandent une confirmation visuelle. Les numéros de ligne renvoient à l'état du 9/11/2026 (`ukulele-cadences.html` inclut les modifications non commitées).

---

## Suivi

### Décisions de l'auteur (9/11/2026)
- **Contrainte Android** : les fichiers sont copiés dans une appli Android (WebView), qui doit aussi tourner sur une tablette Android 7.
  - JS prudent : pas de `??` ni de `?.`.
  - **Garder les lignes `<script>`/`<link>` commentées** (bascule entre CDN et fichiers locaux) tant qu'aucune meilleure solution n'est retenue. → Le point 3.1 « supprimer les références mortes » est **suspendu**.
- **FR + EN et explication pour tous les outils**, à terme. Aide de préférence en **accordéon en bas de page** (modèle latin-percussions / abc-grid+diagrams).
- **Player abc** : partir du player v9 (refactor abcjs) plutôt que de tout refaire.
  - Ajouter l'affichage de la tablature et le choix instrument / accordage.
  - Patch des soundfonts locales à transformer en plugin.
  - abc-grid et abc-grid+diagrams : les `///` et la syntaxe `o` sont **voulus**.
- **Assumés « cassés », basse priorité** : sample_json_abc, convertisseur basse, outils micro (volume-tester à refaire plus tard en plus simple, avec exercices progressifs).
- **Manches** : pedago → mouvant → cadences (la suite).
  - Logique **relative** : l'audio de *mouvant* dépend de la racine (note de référence en paramètre), ce n'est **pas un bug** ; il manque seulement l'explication.
  - *uke-chord-advanced* : essai volontairement non publié.

### Fait le 9/11/2026 (non commité, non testé sur Android 7)
| Sujet | Fichiers | Vérification |
|---|---|---|
| Footer : lien vers le bon fichier du dépôt music-toolbox, licence CC BY-NC, année remplie | 18 fichiers | grep |
| `viewport-fit=cover` + bloc `<style id="fx-safe-area">` (padding `env(safe-area-inset-*)`, ajouté au padding existant) | 29 fichiers (cadences l'avait déjà) | grep, rendu desktop |
| Viewport ajouté | key-signatures-svg, volume-tester | – |
| README : 4 liens corrigés, « À faire » déjà fait coché | README.md | curl |
| Index : fonctionnalités détectées (Fonctionnalités / Paramètres / Activités / tableau), attribut réparé, `marked` épinglé (ancienne ligne gardée en commentaire) | index.html | navigateur : 19 cartes sur 26 (les 7 autres n'ont pas de liste) |
| Recherche d'accords : barrés convertis au format uke-chord, numéro de case décalé d'une case corrigé | ukulele-chords-search.html | navigateur : 178 barrés, Cm7 / Cm6/9 vérifiés |
| Modes : audio depuis la vraie tonique du mode, bouton Audio actif, altérations au centre, « 3 Bémols », « sur »/« on » | modes_musicaux_interactifs.html | 77 cas tonique affichée = jouée ; son non écouté |
| Cadences : badges actifs recalculés, cases relatives (0 = origine de cadence, -1, +1…), andalouse ♭II, import validé et libellés échappés, aide en accordéon, `catch {}` et `{...obj}` remplacés (incompatibles Android 7) | ukulele-cadences.html | navigateur |
| Quiz formules : verrou de réponse, distracteurs non équivalents, explication + « Question suivante », séries de 10 avec écran de fin, meilleur score, consigne, cours réécrit (inspiré de deleteMe.html), coquilles | quiz-formule-accords.html | navigateur mobile |
| Quiz position : correction par recherche exhaustive, règle unique avec « Valider », listener fautif supprimé, pas de points après correction, consigne, score visible | ukulele-position-accord-quiz.html | 5 824 cas + 20 000 tirages : 0 échec ; navigateur mobile |

**À valider par l'auteur** : dans cadences, le « 0 » suit l'origine de la cadence quand on la déplace (au départ il est bien sur la ligne 18).

### Fait le 9/11/2026, 2e vague (non commité, non testé sur Android 7)
| Sujet | Fichiers | Vérification |
|---|---|---|
| Accords ABC et noms de notes recalculés depuis les doigtés, un temps = une noire, clé de Fa pour la guitare, portée lisible en sombre, message si pas d'audio. abcjs : CDN 6.4.0 commenté, `js/abcjs-basicfx.js` actif. | chord-ear-trainer.html | script : 0 erreur ; navigateur |
| Doublons retirés, Bm et G7 guitare corrigés, formes « Haut » corrigées, liste perso sensible à la casse, tempo borné (30-240), vraies 2 mesures à vide. D7 ukulélé gardé en `2020` (forme débutant). | chord-change.html | script ; navigateur |
| 4 vraies grilles de 12 mesures (ii-V-I, iim7-V7-Imaj7, blues jazz, turnaround), descriptions dynamiques, repli enharmonique (F#7 ↔ Gb7…) | blues-grids.html | 28 combinaisons, 0 « Inconnu » |
| Mode R repart vraiment de la base ; horloge Web Audio à anticipation ; `AudioContext` créé au clic ; erreurs de formule visibles ; tempo min 20 | metronome-graduel.html | clics à 0,5000 s à 120 bpm |
| `Tone.immediate()` (biais de +100 ms supprimé), écart à la cible la plus proche, presets réparés (p6, p7), statistiques de session, `async/await` retiré | timing-trainer.html | frappes simulées : écart < 3 ms |
| Transposition en ♯ ou ♭ selon la tonalité, repli enharmonique des diagrammes, 2e « Enregistrer » neutralisé (commenté), regex d'accords stricte, recherche par tags, fermeture de la modale | js/songbookfx*.js | 68 accords détectés avant/après ; navigateur |
| La forme est conservée en changeant de corde de référence, validation avant application, en-tête de cordes dynamique, clés i18n manquantes ajoutées, deux `?.` retirés | ukulele-position-accord-pedago.html | navigateur |
| Plugin soundfont local avec repli CDN + plan du player unique | js/abcjs-localsoundfont-fx.js, PLAN-PLAYER.md | session dédiée, abcjs 6.6.3 / 6.7.2 non modifiés |

### Fait le 9/11/2026, 3e vague : traduction anglaise (non commité, non testé sur Android 7)
- **Architecture** : module commun `js/i18n-fx.js` (publié grâce au « fx »).
  - Dictionnaires FR/EN **dans chaque page**, sans `fetch` : fonctionne en ligne, en `file://` et dans la WebView.
  - Attributs `data-i18n*`, `FxI18n.t()` pour les textes générés en JS, bouton `data-i18n-toggle`.
  - Une seule préférence de langue `fx.lang` pour tous les outils (navigateur non francophone → anglais par défaut).
  - L'ancien `js/i18n.js` (fetch de JSON, non publié) n'est pas utilisé.
- **Pages traduites avec le module (24)** : abc-editeur-simple, abc-editor-player, abc-grid, abc-grid+diagrams, sample_json_abc, drum-licks, latin-percussions, metronome-graduel, timing-trainer, chord-change, chord-ear-trainer (notes affichées C E G en anglais), blues-grids, key-signatures-svg, songbookfx, quiz-formule-accords, ukulele-position-accord-quiz, ukulele-position-accord-mouvant, ukulele-chords-search, uke-chord-advanced, convertisseur-tab-bass-ukulele, volume-tester, chord-recognition, uku-hero, privacy.
- **Pages qui gardent leur propre système** mais lisent et écrivent maintenant `fx.lang` : ukulele-cadences, ukulele-position-accord-pedago (FR/EN/DE), modes_musicaux_interactifs (FR/INT).
- **Non traduites** : index.html (construite à partir du README, en français), simpleAbc (gabarit), deleteMe, `*_local`.
- **Corrigé au passage pour Android 7** :
  - `?.` et `async/await` dans sample_json_abc ;
  - paramètre par défaut dans songbookfx.js ;
  - 3 `{...obj}` dans mouvant ;
  - `padEnd` dans songbookfx-parser.js.
  - Restent des `async/await` dans les outils micro, index et simpleAbc, qui ne servent pas dans l'appli.
- **À l'usage** : dans mouvant, le bouton de notation FR/INT et le nouveau bouton FR/EN se ressemblent (distingués seulement par l'infobulle).

### Fait le 9/11/2026, 4e vague : pages « Tonal » venues de l'appli Android (non commité)
- **Pages** : `tonal_intervals_note`, `tonal_intervals_ear`, `tonal_intervals_namesTrebble`, `tonal_intervals_names_Bass`, `tonal_scale_namesTrebble`, `tonal_scale_namesTrebble_ear`. La librairie `js/tonalfx.js` est copiée depuis `musicTheoryGamesWww` (publiée grâce au « fx »).
- **Chemins** :
  - en ligne actifs : Bootstrap 5.3.3, icônes, CSS abcjs 6.6.3 ;
  - `./js/abcjs-basicfx.js` remplace `abcjs-basicfxv3.js` ;
  - lignes locales gardées **en commentaire**, ainsi que `scale-coach-lg.js` (clés manquantes → « undefined ») et `lesson.js` (inexistant).
- **Bugs corrigés** :
  - titres vides, `document.write`, offcanvas de démo, icône absente ;
  - `paper_abc_ex_01` en double, `<!-- -->` dans le JS, textes FR en dur ;
  - éditeur abcjs recréé à chaque question ;
  - octave calculée avec `8M`.
- **Justesse (tests exhaustifs)** :
  - intervalles : 362 questions en clé de sol et 518 en clé de fa, 0 impossible ; les 16 à 22 combinaisons à triple altération sont exclues ;
  - gammes : 103 sur 105 retenues (Mi et Si augmentées exclues).
- **Ajouts** : consigne, score, retour détaillé (enharmonie signalée), indice/solution (la solution annule le point), aide en accordéon en bas, FR/EN avec notes Do Ré Mi / C D E.
- **Attention** : les 4 pages d'intervalles ont été **régénérées depuis un gabarit commun** ; elles ne correspondent plus ligne à ligne à la version Android, et la version web devient la référence. Les pages « ear » restent ta variante : le nom de l'intervalle ou la tonique reste affiché, ce n'est pas une dictée pure.
- **Pas encore dans le README**, donc absentes de la page d'accueil.

**Points ouverts :**
- ~~**Métronome, R**~~ : réglé. R garde son sens (retour à la base, la partie entre parenthèses n'est jouée qu'une fois) ; le preset « Gammes lentes » devient `5D, 5T+5, R` → 72×5, 77×5, 72×5… (vérifié par simulation), et un exemple est ajouté à l'aide.
- **Diagrammes manquants** : `js/songbookfx-chords.js` n'a pas plusieurs accords courants (Ab7, C#7, Cm7, F#7, Bbm, Ebm, G#m, F#, et beaucoup d'accords guitare de base).
- **`chord-library.js`** : convention de position décalée d'une case (Ebmaj7 ukulélé ; Bm7, C#m7, Dm7, Cm7 guitare) ; doigtés faux `A_v2` (1343) et `Am_v3`.
- **Android 7** : `padEnd` (ES2017) est utilisé dans songbookfx-parser.js (code d'origine) ; à surveiller si la WebView est antérieure à Chrome 57.
- **chord-ear-trainer en ligne** : la version locale d'abcjs cherche d'abord `sound/*.mp3` (404 en ligne, puis CDN). À basculer sur abcjs officiel + le nouveau plugin quand il sera adopté.

---

## Sommaire

1. [Synthèse](#1-synthèse)
2. [Tableau de bord des outils](#2-tableau-de-bord-des-outils)
3. [Problèmes transverses](#3-problèmes-transverses)
4. [Analyse outil par outil](#4-analyse-outil-par-outil)
   - 4.1 Partitions & notation abc
   - 4.2 Rythme, métronome, micro
   - 4.3 Manche & accords ukulélé
   - 4.4 Théorie, entraînement, songbook
   - 4.5 Pages annexes
5. [Fonctionnalités annoncées dans le README mais absentes](#5-fonctionnalités-annoncées-dans-le-readme-mais-absentes)
6. [Plan d'action](#6-plan-daction)

---

## 1. Synthèse

**Ce qui va bien.** La boîte à outils est riche (26 outils documentés), couvre des besoins réels d'un prof/élève de ukulélé, et plusieurs outils sont solides : *latin-percussions* (seul vrai moteur audio précis), *key-signatures-svg*, *songbookfx* (parsing, diagrammes justes), *abc-grid+diagrams*, *ukulele-chords-search* (2000+ positions), *timing-trainer* (bon moteur Tone.js).

**Les 4 problèmes de fond :**

1. **Des erreurs musicales** dans des outils pédagogiques — c'est le plus grave pour un élève : accords mal écrits dans *chord-ear-trainer*, mauvaise tonique jouée dans *modes*, hauteurs fausses dans *accord-mouvant*, corrections fausses dans *position-accord-quiz*, bécarres manquants dans le *convertisseur*, transposition en dièses incompatible avec la base d'accords du *songbook*.
2. **Du code généré par IA non nettoyé** : gestionnaires d'événements en double, contrôles affichés mais non branchés (swing, tablature, bouton audio…), code mort qui lève des erreurs, `AudioContext` créés à chaque clic.
3. **Une forte duplication** : 3 éditeurs abc, 2 générateurs de grilles, 4 « manches ukulélé », 5 moteurs de tempo, 6 bibliothèques d'accords, un footer copié-collé (avec un mauvais lien et une mauvaise licence) dans presque chaque fichier. Chaque bug doit être corrigé plusieurs fois.
4. **Une pédagogie implicite** : presque aucun outil n'explique *l'objectif* et *comment s'en servir* ; peu de score/progression ; FR/EN mélangés ; accessibilité mobile/zoom limitée.

**Recommandation de logique de travail :** d'abord *rendre juste* (bugs musicaux), puis *rendre fiable* (bugs fonctionnels), puis *mutualiser* (modules communs `*fx*`), puis *fusionner* les doublons, et enfin *enrichir la pédagogie* sur une base saine. Détail en [section 6](#6-plan-daction).

---

## 2. Tableau de bord des outils

Légende état : 🟢 fonctionne · 🟠 fonctionne avec bugs notables · 🔴 cassé ou musicalement faux.
Pédagogie : ★ outil brut · ★★ utilisable avec un prof · ★★★ autonome pour l'élève.

| Famille | Outil | État | Pédago | Problème principal | Décision proposée |
|---|---|:-:|:-:|---|---|
| abc | abc-editeur-simple | 🟠 | ★★ | Swing non branché, tablature inopérante | **Garder** = éditeur de référence |
| abc | abc-editor-player | 🟠 | ★ | Éditeur ré-instancié à chaque chargement | Fusionner dans l'éditeur simple |
| abc | simpleAbc | 🟢 | – | Gabarit développeur | Retirer du catalogue (garder comme gabarit) |
| abc | abc-grid | 🟠 | ★★ | Transposition doublée | Fusionner dans abc-grid+diagrams |
| abc | abc-grid+diagrams | 🟠 | ★★ | Mesures x/8 trop longues, variantes perdues | **Garder** |
| abc | sample_json_abc | 🔴 | ★ | Dièses invalides, sons de piano au lieu de batterie | Corriger |
| abc | convertisseur-tab-bass-ukulele | 🔴 | ★★ | Bécarres manquants → notes fausses ; AlphaTab `@latest` | Corriger |
| abc | key-signatures-svg | 🟢 | ★★ | Détails (viewport, armure sur clé percussion) | Garder |
| rythme | metronome-graduel | 🟠 | ★ | Mode R faux, horloge imprécise | Corriger + moteur commun |
| rythme | timing-trainer | 🟠 | ★★ | Biais ≈ +100 ms, presets faux | Corriger |
| rythme | drum-licks | 🟠 | ★★ | Réglages coupent la lecture, activités non expliquées | Corriger + consignes |
| rythme | latin-percussions | 🟢 | ★★ | Mobile illisible, notation x/0 inversée | Garder (moteur de référence) |
| micro | volume-tester | 🟠 | ★ | Mesure instantanée (rate les coups), pas de stop | Refaire sur module micro |
| micro | chord-recognition | 🔴 | ★ | Détection non fiable (cordes à vide = « PARFAIT ») | Refaire l'algorithme |
| micro | uku-hero | 🔴 | ★ | « Avance/retard » non implémenté, pas de clic | Refaire sur modules communs |
| uke | ukulele-cadences | 🟠 | ★★ | Pas d'audio (annoncé), import JSON fragile/XSS | Garder → manche commun |
| uke | ukulele-position-accord-mouvant | 🔴 | ★★ | Audio : hauteurs fausses | Corriger → manche commun |
| uke | ukulele-position-accord-pedago | 🟠 | ★★ | La forme se perd en changeant de corde | Corriger → manche commun |
| uke | ukulele-position-accord-quiz | 🔴 | ★★ | « Correction » parfois fausse, ReferenceError | Corriger → manche commun |
| uke | ukulele-chords-search | 🟠 | ★★ | Barrés jamais dessinés, décalage de case possible | Corriger |
| uke | uke-chord-advanced | 🔴 | – | Page vide en ligne (JS non publié), exemple faux | Retirer ou publier |
| théorie | modes_musicaux_interactifs | 🔴 | ★★ | Joue la mauvaise tonique ; « -3 Dièse » | Corriger |
| théorie | quiz-formule-accords | 🟠 | ★★ | Points accordés après erreur / double-clic | Corriger |
| entraînement | chord-change | 🟠 | ★★ | Diagrammes guitare faux (composant 4 cordes) | Corriger |
| entraînement | chord-ear-trainer | 🔴 | ★★ | Accords ABC faux (C, Cdim7, guitare C/Am) | Corriger en priorité |
| entraînement | blues-grids | 🟠 | ★★ | Pas de son ; grille ii-V-I = copie de I-IV-V | Corriger |
| songbook | songbookfx | 🟠 | ★★★ | Transposition en dièses → diagrammes « ? » | Corriger |
| annexe | index.html | 🟠 | – | Fonctionnalités jamais affichées | Corriger |
| annexe | privacy.html | 🔴 | – | Affirmations fausses pour le site | Réécrire |
| brouillon | deleteMe.html, *_local.html | – | – | Brouillons | Intégrer ou supprimer |

**Bilan : 3 🟢 · 16 🟠 · 10 🔴** (29 outils et pages, hors brouillons).

---

## 3. Problèmes transverses

### 3.1 Publication / dépôt
- **`.gitignore` exclut `js/*` et `css/*` sauf les fichiers contenant « fx »**, ainsi que tout `*_local*`. En ligne, ces fichiers répondent **404** : `css/bootstrap.min.css`, `css/bootstrap-icons(.min).css`, `css/abcjs-audio(.min).css`, `js/bootstrap.bundle.min.js`, `js/Tone.js`, `js/uke-chord.js`, `js/uke-chord-advanced.js`. Absents même en local : `js/abcjs-basic-min.js`, `js/popper.min.js`, `css/abcjs-audio.css`.
  - La plupart des pages ont un CDN en secours, donc l'impact réel est limité à : **uke-chord-advanced** (vide en ligne), **sample_json_abc** (CSS du lecteur), **abc-grid+diagrams hors github.io** (bascule sur les fichiers locaux), **chord-change** (icônes, compensé par le CDN).
  - → Nettoyer les références mortes (y compris celles en commentaire) et adopter une règle unique : *CDN épinglé* **ou** *fichier local publié*.
- **Versions non épinglées** : AlphaTab `@latest`, Chart.js sans version, `marked` sans version (index), Tailwind « play CDN » (non destiné à la production), Bootstrap **5.3.0-alpha1** (métronome).
- **Versions abcjs incohérentes** : CSS 6.6.3 avec JS 6.4.0 (editor-player, abc-grid, drum-licks), 6.2.2 ailleurs ; *chord-ear-trainer* charge abcjs **deux fois** ; *abc-grid+diagrams* utilise 6.4.0 en ligne et 6.6.3 en local.

### 3.2 Footer copié-collé
Dans la plupart des fichiers : lien vers `github.com/fxpar/abc-notation-artifacts` (mauvais dépôt), licence **CC BY-NC-SA** alors que le README dit **CC BY-NC**, `#currentYear` jamais rempli, classes Bootstrap utilisées dans des pages qui ne chargent pas Bootstrap.

### 3.3 README
- Libellés de liens erronés : l.46 et l.78 (« key-signatures-svg.html »), l.763 (« chord-recognition.html »).
- Lien cassé (404) : l.505, `.../blob/main/sample_json_abc` sans `.html`.
- Le « À faire » d'abc-grid+diagrams (lien avec la base d'accords) est déjà fait.
- Sections non homogènes : 7 « Fonctionnalités: », 10 « Paramètres: », 1 « Activités: », 1 tableau. Or **index.html ne détecte aucune de ces listes** (voir 4.5) → la page d'accueil n'affiche jamais les fonctionnalités.
- Plusieurs fonctionnalités annoncées n'existent pas (section 5).

### 3.4 Qualité de code récurrente
- `AudioContext` / `SynthController` recréés à chaque action sans fermer les précédents (convertisseur, mouvant, uku-hero, simpleAbc, editor-player).
- Micro jamais libéré (`getTracks().stop()` absent), aucune compensation de latence.
- `localStorage` sans `try/catch` (plante en navigation privée stricte).
- Commentaires HTML `<!-- -->` dans du JS/CSS (fragile).
- Gestion du thème en 3 variantes (`body.dark-mode`, `data-bs-theme`, non persistée), avec 2 clés différentes.
- Import JSON sans validation de schéma ; libellés injectés en `innerHTML` (XSS possible avec un fichier piégé dans *cadences*).

### 3.5 Pédagogie récurrente
- **Aucune consigne** « objectif / comment faire » dans la quasi-totalité des outils (exemple frappant : *drum-licks* « Activité 1 à 5 » sans description).
- Peu de **score, d'historique, de progression** ; feedback souvent binaire ou trompeur (« PARFAIT »).
- **FR/EN mélangés** (titres en anglais, interface en français, « Root »), tutoiement et vouvoiement mélangés.
- **Accessibilité** : `user-scalable=no` (quiz-formule, mouvant), pas de `<meta viewport>` (volume-tester, key-signatures), information portée par la couleur seule, pas de navigation clavier sur les manches, mise en page mobile difficile (latin-percussions).
- **Noms d'intervalles incohérents d'un outil à l'autre** pour un même demi-ton (6 = #4 / b5 ; 8 = b6 / #5).

### 3.6 Duplication

| Domaine | Copies existantes | Cible |
|---|---|---|
| Éditeur abc | abc-editeur-simple, abc-editor-player, simpleAbc | 1 éditeur + 1 gabarit dev |
| Grille abc | abc-grid, abc-grid+diagrams | 1 outil (option « sans diagrammes ») |
| Manche ukulélé | cadences, mouvant, pedago, quiz (≈300 lignes de CSS identiques, mêmes fonctions) | 1 composant `fretboard` + modes |
| Moteur de tempo | `setInterval`, `setTimeout`, Tone.Transport, scheduler lookahead, `%%MIDI drum` | 1 module `fx-clock` (base : latin-percussions) |
| Micro / détection | chord-recognition, uku-hero, volume-tester | 1 module `fx-mic` + `fx-chord-detect` |
| Bibliothèques d'accords | chord-library.js (= chord-libraryfx-short.js, identiques), chord-libraryfx(-moyen).js, ukulele.js, songbookfx-chords.js, bibliothèques inline | 1 source JSON + 1 composant diagramme 4/6 cordes |
| Footer / thème / i18n | presque tous les fichiers | 1 module `fx-common` |

> Astuce dépôt : nommer les modules partagés avec « fx » (ex. `js/fx-clock.js`) pour qu'ils passent le `.gitignore` actuel et soient publiés.

---

## 4. Analyse outil par outil

Format : **Fait** · **Fonctionne** · **Ne fonctionne pas** · **Pédagogie** · **Actions** (P1 bloquant / P2 important / P3 confort — effort S/M/L).

### 4.1 Partitions & notation abc

#### abc-editeur-simple.html — 🟠 ★★
- **Fait :** éditeur abc avec bibliothèque en localStorage, lecture, transposition, thème (abcjs 6.2.2, Bootstrap 5.3.0).
- **Fonctionne :** affichage, lecture avec curseur, transposition, ajout/renommage/suppression, thème persisté.
- **Ne fonctionne pas :**
  - swing : `updateSwingFromInput;` sans parenthèses (l.102) et `swing: 70` codé en dur (l.631) ;
  - tablature : `%%abc-tablature` n'existe pas dans abcjs (l.495) ;
  - métronome : motif 4 temps codé en dur, `beatsStr` inutilisé (l.468-475) ;
  - « Tempo ±5 bpm » absent ; `#midi-download` vide ;
  - re-rendu à chaque frappe, qui coupe la lecture ;
  - changement de morceau sans avertissement (modifications perdues).
- **Pédagogie :** panneau de debug visible par les élèves, console bavarde.
- **Actions :**
  - P1/S : réparer le swing, et retirer la tablature ou utiliser l'option `tablature` d'abcjs ;
  - P2/S : métronome qui suit `M:`/`L:`, rendu différé (debounce), masquer le debug ;
  - P3/S : boutons ±5 bpm.

#### abc-editor-player.html — 🟠 ★
- **Fait :** `ABCJS.Editor`, bibliothèque, import/export JSON, MIDI (CSS 6.6.3 / JS 6.4.0).
- **Fonctionne :** édition en direct, sauvegarde automatique, import/export, mélodie/accords muets, MIDI.
- **Ne fonctionne pas :**
  - swing, tablature, accordage et « défiler avec la musique » jamais lus par le code ;
  - mode jour/nuit absent (annoncé) ; pas de suppression de morceau ;
  - `ABCJS.Editor` et `SynthController` recréés à chaque chargement (écouteurs empilés, double lecture possible, l.657/665) ;
  - motifs de batterie faux en 3/4, 5/4 et 6/8 (l.440-445) ;
  - directives métronome injectées dans le code de l'élève puis sauvegardées.
- **Pédagogie :** morceau par défaut purement technique, barre de navigation qui déborde sur mobile.
- **Actions :** P1/M : instancier l'éditeur une seule fois → puis **fusionner** dans l'éditeur simple (import/export, MIDI, mute).

#### simpleAbc.html — 🟢
- Gabarit minimal abcjs. Nouveau `SynthController` à chaque clic (l.138).
- **Action :** P3/S : sortir du catalogue public, garder comme référence pour les prompts IA.

#### abc-grid.html — 🟠 ★★
- **Fait :** grille texte → abc avec accompagnement (boom-chick, tango, arpèges).
- **Ne fonctionne pas :**
  - transposition audio probablement doublée (`%%MIDI transpose` + `midiTranspose`, l.297/317) ;
  - motifs gchord en 8 pas, inadaptés au 3/4 ;
  - `////` interprété comme un accord.
- **Action :** P1/S : un seul mécanisme de transposition, puis fusion dans abc-grid+diagrams.

#### abc-grid+diagrams.html — 🟠 ★★
- **Fait :** grille → diagrammes ukulélé/guitare + partition + audio, doigtés avec options, variantes ◀▶, impression, aide FR/EN.
- **Ne fonctionne pas :**
  - double transposition (l.1179/1198) ;
  - mesures x/8 deux fois trop longues (l.988, 1044) ;
  - l'exemple par défaut contient `% F6…` → accord nommé « % » (l.611) ;
  - choix de variante perdu (`window.chordVariantIndices` contre `let`, l.718) ;
  - doublons dans `uniqueChordsList` ;
  - attribut mal formé (l.1087) ; surbrillance désactivée par un commentaire HTML (l.137) ;
  - hors github.io, bascule sur des fichiers locaux non publiés.
- **Actions :**
  - P1/S : transposition et mesures x/8 ;
  - P2/S : variantes et exemple par défaut ;
  - P2/S : CDN par défaut.

#### sample_json_abc.html — 🔴 ★
- **Fait :** export JSON de boîte à rythmes → abc percussion.
- **Ne fonctionne pas :**
  - dièses écrits `C#` au lieu de `^C` (l.840-846), plusieurs instruments sur la même note ;
  - `%%percmap` sur une seule ligne avec des noms invalides → **sons de piano** (l.885-890) ;
  - barres de mesure tous les 4 pas en `L:1/16` ;
  - seul le premier motif est traité, chain/loops/swing ignorés ;
  - CSS du lecteur en 404.
- **Pédagogie :** la machine source n'est pas nommée, interface très technique.
- **Action :** P1/M : `^C`, une ligne `%%percmap` par instrument avec des noms General MIDI, barres tous les 16 pas, filtrage des pistes vides.

#### convertisseur-tab-bass-ukulele.html — 🔴 ★★
- **Fait :** tablature basse (frette.corde) → tablature ukulélé (AlphaTab) + abc.
- **Fonctionne :** calcul des hauteurs, rendu et lecture des deux portées, copie.
- **Ne fonctionne pas :**
  - **pas de bécarres** quand l'armure n'est pas C → notes fausses (ex. si naturel joué si♭ en Fa, l.220/348) ;
  - AlphaTab `@latest` ;
  - un `AudioContext` créé à chaque frappe ;
  - accordage ukulélé par défaut une octave trop bas, compensé par un `-12` (déroutant) ;
  - erreurs de saisie ignorées en silence ;
  - icône `bi` sans sa CSS.
- **Actions :**
  - P1/S : bécarres, épingler AlphaTab, un seul `AudioContext` ;
  - P2/S : messages d'erreur, accordage G4-C4-E4-A4 ;
  - P3/M : gestion du rythme (aujourd'hui tout est en noires).

#### key-signatures-svg.html — 🟢 ★★
- **Fonctionne :** les 5 clés, système avec accolade, couleur, mesure ouverte/fermée, téléchargement.
- **Ne fonctionne pas :** pas de `<meta viewport>` ; thème non persisté ; armure proposée sur la clé de percussion (sans sens musical) ; « Treble » en anglais.
- **Action :** P3/S : viewport, griser l'armure en percussion, export zip.

### 4.2 Rythme, métronome, micro

#### metronome-graduel.html — 🟠 ★
- **Fait :** métronome avec formules de progression (D/T, R/C/L), presets.
- **Fonctionne :** parseur de formule, presets, pause, mode nuit.
- **Ne fonctionne pas :**
  - **mode R ne revient pas au tempo de base** : `computeTempo` reçoit `currentTempo` (l.931) ;
  - horloge `setInterval` (l.1037) → jitter et dérive, coupures en arrière-plan ;
  - `AudioContext` recréé hors geste utilisateur (risque de silence sur iOS) ;
  - erreurs de formule signalées seulement dans la console ;
  - slider à 0 → 120 ;
  - Bootstrap en version alpha, Popper chargé deux fois.
- **Pédagogie :** syntaxe jargonneuse sans aperçu ; « Mesure x/y » affiche en réalité l'étape ; « C » désigne à la fois un mode et le tempo courant ; pas d'accent secondaire en 6/8.
- **Actions :**
  - P1/S : corriger R ;
  - P1/M : scheduler Web Audio avec lookahead ;
  - P2/S : erreurs de formule visibles ;
  - P2/M : **aperçu de la séquence de tempos** (gros gain pédagogique).

#### timing-trainer.html — 🟠 ★★
- **Fonctionne :** Tone.Transport, planification exacte, `pointerdown` et Espace.
- **Ne fonctionne pas :**
  - `Tone.now()` inclut le lookAhead → **biais ≈ +100 ms « en retard »** (l.318) ;
  - repliement sur un temps au lieu d'une mesure (l.334) ;
  - presets qui ne décochent pas les cases par défaut ; p7 absent ; p6 mal libellé ;
  - « masquer l'aide visuelle » et « demi-temps » annoncés mais absents.
- **Pédagogie :** pas de statistiques (moyenne, régularité), pas d'historique.
- **Actions :**
  - P1/S : `Tone.immediate()`, repliement sur la mesure, presets ;
  - P2/M : calibration de latence et statistiques de session.

#### drum-licks.html — 🟠 ★★
- **Fonctionne :** lots de licks, multivoix, curseur, MIDI, métronome.
- **Ne fonctionne pas :**
  - chaque réglage **coupe la lecture** et **écrase les modifications** de l'éditeur (l.823-839) ;
  - silences faux hors 4/4 en `L:1/8` (l.628) ;
  - vélocités `%%MIDI drum` erronées (l.650) ;
  - `%%score` en double.
- **Pédagogie :** **activités 1 à 5 sans aucune description** ; pas de décompte ; titre en anglais.
- **Actions :**
  - P1/S : consigne par activité ;
  - P2/M : préserver la lecture et les modifications ;
  - P2/S : silences calculés depuis `M:`/`L:` ;
  - P3/S : décompte.

#### latin-percussions.html — 🟢 ★★
- **Fonctionne :** **le seul vrai scheduler Web Audio** (l.409-421), avec `resume()` ; gestion complète des morceaux ; décalage de piste ; aide.
- **Ne fonctionne pas :**
  - « Pause » repart du pas 0 ;
  - les sons déjà programmés jouent encore après Stop ;
  - le gain du « rim » est écrasé (l.334/340) ;
  - cases d'environ 7 px sur mobile.
- **Pédagogie :** notation incohérente (`x` = silence, `0` = frappe dans les exemples, `.` dans les nouveaux morceaux) ; `o` et `0` confondables ; aucune explication du rôle de la clave ou du tumbao.
- **Actions :**
  - P2/M : mise en page mobile, notation unifiée, fiche par instrument ;
  - P3/S : vraie pause.

#### volume-tester.html — 🟠 ★
- **Ne fonctionne pas :**
  - mesure instantanée toutes les 100 ms au lieu du pic → les coups de strum sont manqués ;
  - échelle arbitraire (pas en dB) ;
  - ni stop ni nettoyage ;
  - Chart.js non épinglé ; pas de viewport.
- **Pédagogie :** la régularité n'est pas chiffrée.
- **Actions :**
  - P1/S : épingler Chart.js, ajouter le viewport ;
  - P1/M : pic par fenêtre, détection d'attaques et écart-type (« régularité : 87 % »).

#### chord-recognition.html — 🔴 ★
- **Ne fonctionne pas :**
  - test « bin > −54 dB à ±6 Hz » avec des bins de 11,7 Hz ;
  - seuil absolu qui dépend du micro ;
  - fréquences d'une octave trop grave pour un ukulélé ;
  - **aucun rejet des notes parasites** : gratter les cordes à vide valide C et Am ;
  - micro jamais libéré.
- **Pédagogie :** « PARFAIT » trompeur ; aucune indication de la corde fautive ; seulement 4 accords.
- **Action :** P1/L : chromagramme avec pics et rejet des notes hors accord, seuil relatif, calibration du bruit.

#### uku-hero.html — 🔴 ★
- **Ne fonctionne pas :**
  - « en avance / en retard » **non implémenté** ;
  - pas de clic ni de décompte ; 1 temps par accord ;
  - détection sur une seule trame (mêmes faux positifs que chord-recognition) ;
  - `<style>` en double ;
  - `AudioContext` et flux micro jamais fermés.
- **Action :** P1/M : clic, décompte, un accord par mesure ; P2/L : mesure de l'écart d'attaque avec compensation de latence.

### 4.3 Manche & accords ukulélé

#### ukulele-cadences.html — 🟠 ★★ *(modifications en cours non commitées : i18n des cadences + tableau des formules)*
- **Fonctionne :** calcul des degrés, pads racine/cadence, liste de positions, langue et thème persistés.
- **Ne fonctionne pas :**
  - **pas d'audio** alors que le README l'annonce ;
  - cadence andalouse « iv–III–II–I » : il faut ♭II (l.207/369) ;
  - import : position sans `snapshot` → TypeError (l.675), écrasement sans confirmation ;
  - `pos.label` injecté en `innerHTML` (XSS, l.627) ;
  - badges actifs figés alors que les inactifs sont recalculés ;
  - positions perdues au rechargement ;
  - icône `text-dark` invisible en mode sombre.
- **Pédagogie :** aucune consigne ; barré non découvrable (clic sur le fond de ligne) ; chiffres romains toujours en majuscules (pas de ii, vi) ; dièses uniquement ; racine de départ sur Fa#.
- **Actions :**
  - P1/S : valider l'import et échapper les libellés ;
  - P2/S : andalouse, persistance ;
  - P2/M : audio (ou retirer la promesse du README) ;
  - P3/S : aide.

#### ukulele-position-accord-mouvant.html — 🔴 ★★
- **Ne fonctionne pas :**
  - **audio faux** : fréquence relative à la racine au lieu de la case réelle (l.752-753) ; racine jouée même non sélectionnée ;
  - un `AudioContext` créé à chaque clic ;
  - le bouton FR/INT ne change que les cordes (tables d'intervalles identiques) ;
  - accordage non validé (NaN → plantage) ;
  - import incomplet (sillets) ;
  - `shiftColorsOnly` fusionne des notes en silence ;
  - pas de b6/b13 ; pas de numéros de case.
- **Pédagogie :** `user-scalable=no` ; couleur seule ; titre « V2.3 » ; aucune consigne.
- **Actions :** P1/S : formule audio ; P2/S : validation des entrées et notation.

#### ukulele-position-accord-pedago.html — 🟠 ★★
- **Ne fonctionne pas :**
  - **la forme n'est pas conservée en changeant de corde de référence** : l'état stocke un index de variante (l.1370, 1402-1414) ;
  - clé i18n `alert4Strings` absente (l.1040) ;
  - en-tête de cordes codé en dur ;
  - `updateUI` réinitialise le feedback et les noms de cordes ;
  - `touch-action:none` bloque le défilement tactile ;
  - titre initial « Majeur ➔ Mineur » (reste du quiz).
- **Actions :** P1/S : stocker le nom de l'intervalle plutôt que son index ; P2/S : en-tête dynamique ; P3/M : export/import.

#### ukulele-position-accord-quiz.html — 🔴 ★★ *(seul vrai « mode élève » de la série)*
- **Ne fonctionne pas :**
  - **la « Correction » peut être fausse** : notes de la formule pas toutes présentes, refusée par « Valider » (l.572-597) ;
  - second listener sur `btnNext` → `ReferenceError` à chaque clic (l.786) ;
  - +100 points en cliquant Correction puis Valider ;
  - aucune contrainte de jouabilité ; pas de corde muette ;
  - étiquettes d'intervalles approximatives (l.521, 535).
- **Pédagogie :** pas de consigne de départ ; score caché dans le tiroir et non persisté ; titre en anglais.
- **Actions :**
  - P1/M : correction par recherche exhaustive ;
  - P1/S : supprimer le listener mort ;
  - P2/S : pas de points après une correction, score visible.

#### ukulele-chords-search.html — 🟠 ★★
- **Fonctionne :** filtres multiples, tri, 2114 positions.
- **Ne fonctionne pas :**
  - **barrés jamais dessinés** : `barres.join("")` donne « 1 » au lieu d'une chaîne de 4 caractères (l.230) ;
  - décalage de case possible avec `baseFret-1` (l.227, à vérifier visuellement) ;
  - tri alphabétique des types ; Ctrl+clic inadapté au mobile ; types en anglais.
- **Actions :** P1/S : barrés ; P2/S : vérifier la position, tri musical, sélection tactile.

#### uke-chord-advanced.html (hors README) — 🔴
- Page vide en ligne (`js/uke-chord-advanced.js` non publié) ; double `<body>` ; l'exemple « Cmaj7 0000 » est un C6, avec des intervalles indiqués faux.
- **Action :** P2/S : publier le JS (renommé `*fx*`) et corriger l'exemple, ou retirer la page.

#### ukulele-chords-search_local.html, ukulele-chords-test_local.html
- Copies et brouillons non publiés, avec les mêmes bugs. **Action :** supprimer.

### 4.4 Théorie, entraînement, songbook

#### modes_musicaux_interactifs.html — 🔴 ★★
- **Fonctionne :** ordre des modes, gamme parente et altérations justes, rotation, bascule FR/INT.
- **Ne fonctionne pas :**
  - **l'audio joue depuis la tonique parente** : `intervals[0]` vaut toujours 0 (l.759) → « Ré dorien » sonne comme Do ionien ;
  - affichage « -3 Dièse » pour les bémols (l.594) ;
  - petites étiquettes (Fa), (Do) figées sur Do ;
  - bouton Audio sans effet ;
  - jamais Sol♭/Ré♭ ;
  - « sur » non traduit ;
  - classe `dark` forcée ; Tailwind play CDN.
- **Pédagogie :** aucune explication de la **note caractéristique** ni de la couleur des modes (c'est pourtant le cœur du sujet).
- **Actions :**
  - P1/S : tonique audio et libellé des bémols ;
  - P2/S : étiquettes dynamiques ;
  - P2/M : enharmonies, encadré « note caractéristique » ;
  - P3/M : mode quiz.

#### quiz-formule-accords.html — 🟠 ★★
- **Fonctionne :** formules justes, indice, série, thème.
- **Ne fonctionne pas :**
  - **+10 points même après une erreur**, et plusieurs fois en double-cliquant (l.760-766) ;
  - distracteurs ambigus (6/bb7, #11/b5) ;
  - footer sans Bootstrap ;
  - coquilles : « Répères », « 4 Familles » pour 5 lignes, « consonnat », « baisée ».
- **Pédagogie :** pas de bouton « suivant », pas de taux de réussite, pas de son ; « Root » en anglais ; `user-scalable=no`.
- **Actions :**
  - P1/S : verrouiller la réponse, ajouter un bouton suivant ;
  - P2/S : enharmonies acceptées ou expliquées ;
  - P2/M : score sur N questions ;
  - P3/S : intégrer le cours de `deleteMe.html`.

#### chord-change.html — 🟠 ★★
- **Fonctionne :** accords ukulélé justes, mesures à vide, modes de défilement.
- **Ne fonctionne pas :**
  - diagrammes guitare dessinés par un composant 4 cordes ;
  - `Bm` = `B` à la guitare ; conventions de frettes mélangées ;
  - doublons qui biaisent le tirage ;
  - liste perso mise en majuscules (« AM ») ;
  - BPM vide → `NaN` → `setInterval` emballé ;
  - une seule mesure à vide au lieu de 2 ;
  - icônes locales en 404 (compensées par le CDN).
- **Pédagogie :** titre en anglais, tutoiement et vouvoiement mélangés ; le README annonce des niveaux par défaut différents du code.
- **Actions :** P1/M : diagrammes 6 cordes ; P1/S : dédoublonner, corriger Bm ; P2/S : valider le BPM.

#### chord-ear-trainer.html — 🔴 ★★
- **Fonctionne :** enchaînement question / réponse, mélange aléatoire.
- **Ne fonctionne pas :**
  - **accords ABC faux** (vérifié) :
    - ukulélé C (`0003`) écrit `[G4c4e4g4]` « Sol Do Mi Sol » alors que la case 3 de la corde La donne Do ;
    - Cdim7 (`2323`) contient `^c` (Do#) au lieu de Do ;
    - guitare C contient un Si (= Cmaj7) ; guitare Am contient un Fa ;
  - chaque temps reçoit une ronde → l'audio dure 4× plus que prévu (l.444) ;
  - abcjs chargé deux fois ;
  - portée invisible en mode sombre ;
  - diagrammes guitare dans un composant 4 cordes.
- **Pédagogie :** pas de score, pas de bouton « réécouter » (que le feedback demande pourtant).
- **Actions :** P1/S : corriger tous les accords et les durées ; P2/M : score et réécoute ; P2/S : une seule version d'abcjs.

#### blues-grids.html — 🟠 ★★
- **Fonctionne :** degrés justes dans 7 tonalités, variantes, curseur visuel.
- **Ne fonctionne pas :**
  - **aucun son** (le README parle de métronome) ;
  - grille ii-V-I = copie de I-IV-V, avec les descriptions de I-IV-V ; I7 au lieu d'Imaj7 en jazz ;
  - diagrammes guitare en 4 cordes ;
  - guillemet parasite, `<script>` vide.
- **Actions :** P2/S : clic audio, grilles jazz correctes, textes dynamiques.

#### songbookfx.html (+ js/songbookfx*.js) — 🟠 ★★★
- **Fonctionne :** parsing ChordPro et « accords au-dessus », variantes, zoom, panneau redimensionnable, diagrammes ukulélé/guitare justes.
- **Ne fonctionne pas :**
  - **second gestionnaire « Enregistrer »** (`songbookfx.js` l.442) : faux message d'erreur et appels à des fonctions inexistantes (`parseChordPro`…) ;
  - **transposition toujours en dièses** alors que la base d'accords est en bémols → diagrammes « ? » (transposer l.19) ;
  - regex d'accords sans limite de mot (faux positifs) ;
  - le cache local masque les nouvelles chansons par défaut ;
  - tailles de police non sauvegardées ;
  - tags non recherchés (annoncé) ;
  - clic hors de la modale inopérant.
- **Actions :**
  - P1/S : supprimer le bloc l.410-469 ;
  - P1/M : dièses ou bémols selon la tonalité ;
  - P2/S : fusionner défauts et stockage local, recherche par tags ;
  - P3/M : export/import (déjà au « À faire » du README).

### 4.5 Pages annexes

#### index.html — 🟠
- **Fait :** page d'accueil qui construit des cartes en analysant README.md avec `marked`.
- **Ne fonctionne pas :**
  - **les fonctionnalités ne s'affichent jamais** (l.113) : la liste qui suit « Fonctionnalités: » est un jeton séparé, et « Paramètres: »/« Activités: » ne sont pas pris en compte ;
  - attribut mal fermé `class="small text-primary style="cursor:pointer;"` (l.143) ;
  - `marked` non épinglé ;
  - thème sombre forcé ; pas de recherche ni de filtre par famille ; privacy non lié.
- **Actions :** P2/S : détecter le paragraphe puis la liste suivante, épingler marked, corriger l'attribut ; P3/M : filtres par famille et par niveau.

#### privacy.html — 🔴
- Affirme « aucune donnée stockée » et « aucun appel réseau » : **faux pour le site** (localStorage, CDN, Google Fonts, soundfonts). Texte générique (pour une appli Android ?), lié nulle part.
- **Action :** P2/S : préciser le périmètre, réécrire, lier depuis l'index.

#### deleteMe.html (non suivi par git)
- Fragment de cours i18n (21 types d'accords, formules justes) qui recouvre le tiroir du quiz de formules. **Action :** P3/S : intégrer au quiz, puis supprimer.

---

## 5. Fonctionnalités annoncées dans le README mais absentes

| Outil | Annoncé | Réalité |
|---|---|---|
| abc-editeur-simple | Tempo ±5 bpm, swing | Absent / non branché |
| abc-editor-player | Mode jour/nuit, swing | Absent / non branché |
| timing-trainer | Masquer l'aide visuelle, demi-temps | Absents |
| uku-hero | En avance / en retard | Non implémenté |
| ukulele-cadences | Entendre l'accord | Aucun code audio |
| blues-grids | Métronome | Aucun son |
| songbookfx | Recherche par tags ; « 4 extraits » | Tags non recherchés ; 5 extraits |
| chord-change | Défaut Avancé + Intermédiaire | Code : Débutant + Intermédiaire |
| chord-ear-trainer | Deux mesures | Défaut 3 |
| ukulele-position-accord-pedago | #4/b5, racine orange | b5 seul, racine rouge/rose |
| abc-grid+diagrams | « À faire » : lien avec la base d'accords | Déjà fait |

→ Pour chaque ligne : **implémenter** ou **corriger le README**.

---

## 6. Plan d'action

Logique : *juste → fiable → mutualisé → fusionné → pédagogique*. Chaque phase rend la suivante moins coûteuse : inutile d'enrichir la pédagogie de 4 manches différents avant de les fusionner, mais inutile de fusionner du code musicalement faux.

### Phase 0 — Hygiène et publication (≈ 1 session, effort S)
- [ ] README : corriger les 4 liens (l.46, 78, 505, 763), décocher ou supprimer les « À faire » déjà faits, aligner les fonctionnalités annoncées (section 5).
- [ ] Uniformiser les en-têtes du README (« Fonctionnalités: » partout) **et** corriger la détection dans `index.html` + l'attribut l.143 + épingler `marked`.
- [ ] Footer : bon dépôt, licence unique (choisir CC BY-NC ou BY-NC-SA et l'appliquer partout), année remplie.
- [ ] Épingler les versions : AlphaTab, Chart.js, marked, Bootstrap (quitter l'alpha), Tailwind (build ou version fixe). Une seule version d'abcjs pour tout le site.
- [ ] Supprimer les références à des fichiers locaux non publiés ; décider du sort de `uke-chord-advanced`.
- [ ] Ranger : `deleteMe.html`, `*_local.html`, `SEQ-16_Settings_*.json`, `simpleAbc` hors catalogue.
- [ ] Réécrire `privacy.html` et la lier.
- [ ] Commiter les modifications en cours de `ukulele-cadences.html`.

### Phase 1 — Justesse musicale (≈ 1-2 sessions, surtout S) — **priorité pédagogique n°1**
- [ ] chord-ear-trainer : réécrire les ABC de tous les accords d'après les doigtés réels, durées.
- [ ] modes_musicaux_interactifs : tonique audio, libellé des bémols, étiquettes dynamiques.
- [ ] ukulele-position-accord-mouvant : formule de fréquence.
- [ ] ukulele-position-accord-quiz : génération et validation de la correction.
- [ ] ukulele-position-accord-pedago : conserver la forme en changeant de corde.
- [ ] convertisseur-tab-bass-ukulele : bécarres.
- [ ] songbookfx : dièses ou bémols selon la tonalité.
- [ ] ukulele-chords-search : barrés et position (vérifier visuellement).
- [ ] chord-change : Bm, doublons ; blues-grids : vraie grille ii-V-I ; cadences : andalouse ♭II.
- [ ] sample_json_abc : notation percussion valide.
- [ ] Harmoniser les noms d'intervalles (une table de référence unique, utilisée ensuite par tous).

### Phase 2 — Fiabilité fonctionnelle (≈ 2 sessions, S/M)
- [ ] Supprimer le code mort qui plante : songbook (2e « Enregistrer »), quiz-position (`btnNext`), drum-licks (`%%score` en double).
- [ ] Quiz : verrouiller les réponses, pas de points après erreur ou correction.
- [ ] metronome-graduel : mode R ; timing-trainer : `Tone.immediate()`, repliement, presets.
- [ ] drum-licks et éditeurs abc : ne plus couper la lecture ni écraser les modifications ; brancher ou retirer les contrôles morts (swing, tablature, scroll, bouton audio des modes).
- [ ] Transposition unique dans abc-grid et abc-grid+diagrams ; mesures x/8.
- [ ] Import JSON validé et libellés échappés (cadences, mouvant) ; `localStorage` en `try/catch`.
- [ ] Un seul `AudioContext` par page ; libérer le micro.

### Phase 3 — Mutualisation (≈ 3-4 sessions, M/L)
Modules partagés publiés grâce au « fx » dans le nom :
- [ ] `js/fx-common.js` : thème (une seule clé), footer, i18n FR/EN, utilitaires de stockage.
- [ ] `js/fx-clock.js` : scheduler lookahead (base : latin-percussions), accents, subdivisions, callbacks visuels → métronome, chord-change, blues-grids, uku-hero.
- [ ] `js/fx-mic.js` : permission, `resume()`, erreurs, `stop()`, calibration de latence.
- [ ] `js/fx-chords.js` : **une** base d'accords (JSON) + **un** composant diagramme 4 et 6 cordes, convention de `position` unique.
- [ ] `js/fx-fretboard.js` + CSS commun : le manche ukulélé (matrice, intervalles, audio juste, export JSON versionné).
- [ ] `js/fx-abc.js` : curseur, synthé, version abcjs unique.

### Phase 4 — Fusions (≈ 3 sessions, L)
- [ ] **Éditeur abc unique** = abc-editeur-simple + (import/export, MIDI, mute) d'abc-editor-player.
- [ ] **Grille unique** = abc-grid+diagrams avec option « sans diagrammes » ; abc-grid redirige vers elle.
- [ ] **Manche interactif unique** avec 4 modes : Explorer (pedago), Accord mouvant, Cadences, Quiz.
- [ ] **Outils micro** reconstruits sur `fx-mic` : volume (pic, régularité chiffrée), reconnaissance (chromagramme, rejet des notes hors accord), uku-hero (clic, décompte, écart d'attaque).
- [ ] Les anciennes URL restent en place avec une redirection, pour ne pas casser les liens partagés aux élèves.

### Phase 5 — Pédagogie (en continu, dès la phase 4)
- [ ] **Bloc « Objectif / Comment faire / Pour aller plus loin »** en tête de chaque outil (commencer par drum-licks, metronome-graduel, cadences, modes).
- [ ] Séparer **mode prof** (édition, presets) et **mode élève** (consigne, exercice, feedback) dans les outils de manche.
- [ ] **Score et progression persistés** (quiz formules, quiz position, ear-trainer, timing-trainer) : taux de réussite, série, historique simple.
- [ ] **Feedback exploitable** : corde fautive, écart en ms, note manquante ; bouton « réécouter » ; décompte avant chaque exercice.
- [ ] Contenu théorique ciblé : note caractéristique des modes, rôle clave/tumbao, explication des formules de métronome avec aperçu.
- [ ] Langue : interface entièrement FR (option EN), vouvoiement ou tutoiement choisi une fois pour toutes, titres traduits.
- [ ] Accessibilité : retirer `user-scalable=no`, ajouter le viewport partout, ne plus transmettre l'information par la seule couleur, clavier sur les manches, mise en page mobile (latin-percussions, editor-player).
- [ ] Page d'accueil : regroupement par famille (Partitions, Rythme, Manche, Théorie, Micro) et par niveau, parcours suggérés (« Débuter au ukulélé », « Travailler le rythme »).

### Ordre suggéré des premières sessions
1. **Phase 0** en entier : rapide, visible, et elle assainit la base.
2. **Phase 1 – chord-ear-trainer + modes + mouvant** : les trois erreurs les plus trompeuses pour un élève.
3. **Phase 1 – reste** + table d'intervalles commune.
4. **Phase 2 – quiz et songbook** : les outils les plus « élève ».
5. Ensuite, phases 3 → 4 famille par famille (commencer par le **manche ukulélé**, qui offre le plus de gain : 4 outils fusionnés en 1).
