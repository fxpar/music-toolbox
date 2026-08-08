# Outils musicaux

Liste de petits outils pour aider à travailler un instrument ou à éditer ses partitions. Certains outils sont basés sur la "notation abc" pour la musique. 

---

## Entrainement rythme batterie

* 🚀 Tester l'application : [Ouvrir l'outil (Démo interactive)](https://fxpar.github.io/music-toolbox/drum-licks.html)
* 📄 Code source : [drum-licks.html](https://github.com/fxpar/music-toolbox/blob/main/drum-licks.html)



**Plusieurs activité ludiques pour s'entrainer au rythme à partir d'un choix de "licks" (petits exercices).**

Activités:
* Charger des licks ou choisir un rythme dans la liste existante
* Activité 1: jouer le rythme, varier les tempos, mettre en boucle
* Activité 2: jouer le rythme 4 fois avec une fin (boucle possible)
* Activité 3: jouer le rythme sans le curseur ni la partition (masquée)
* Activité 4: jouer le rythme pendant les mesures silencieuses et retomber sur le bon rythme au retour de la musique.
* Activité 5: alterne avec le rythme précédent

Librairies utilisées: 
* abcjs Paul Rosen
* bootstrap

Code créé par IA (Gemini), et prompté par moi 😉

Licence: CC BY-NC 4.0

---

## Grille d'accords avec diagrammes

* 🚀 Tester l'application : [Ouvrir l'outil (Démo interactive)](https://fxpar.github.io/music-toolbox/abc-grid+diagrams.html)
* 📄 Code source : [abc-grid+diagrams.html](https://github.com/fxpar/music-toolbox/blob/main/abc-grid+diagrams.html)



**Création rapide d'une grille de blues partition et audio et diagrammes d'accords, à partir d'une liste ecrite d'accord avec numéro de tablature. Créé principalement pour transcrire les morceaux de blues des méthodes tablatures en diagramme et pouvoir accélérer le tempo.**

Paramètres:
* Saisie des noms d'accords
* Saisie avec numérotation
* Réutilisation des numérotations précédente pour un accord
* Calcul des décalages à partir d'une position sur le manche (10 en position 8 devient 3)
* Mode Jour / Nuit

A faire:
* [ ] Lié à la base de données des accords pour simplifier la saisie

Librairies utilisées: 
* [uke chord](https://github.com/pianosnake/uke-chord)(MIT Licence)
* abcjs Paul Rosen
* bootstrap

Code créé par IA (Gemini), et prompté par moi 😉

Licence: CC BY-NC 4.0


---

## Quiz position des accord ukulélé

* 🚀 Tester l'application : [Ouvrir l'outil (Démo interactive)](https://fxpar.github.io/music-toolbox/ukulele-position-accord-quiz.html)
* 📄 Code source : [ukulele-position-accord-quiz.html](https://github.com/fxpar/music-toolbox/blob/main/ukulele-position-accord-quiz.html)


**Tester vos connaissances pour passer d'une forme d'accord à une autre. **

Librairies utilisées: 
* aucune


## Quiz formules d'accord

* 🚀 Tester l'application : [Ouvrir l'outil (Démo interactive)](https://fxpar.github.io/music-toolbox/quiz-formule-accords.html)
* 📄 Code source : [quiz-formule-accords.html](https://github.com/fxpar/music-toolbox/blob/main/quiz-formule-accords.html)


**Questions à trou sur les formules d'accord. Ex: m7: R-b3-5-?**

Librairies utilisées: 
* aucune

---


## Moteur de recherche d'accord de ukulele

* 🚀 Tester l'application : [Ouvrir l'outil (Démo interactive)](https://fxpar.github.io/music-toolbox/ukulele-chords-search.html)
* 📄 Code source : [ukulele-chords-search.html](https://github.com/fxpar/music-toolbox/blob/main/ukulele-chords-search.html)


**Plus de 2000 position d'accord en schéma. Filtrable par fondamentale, par type d'accord et par position.**

Paramètres: 
* choix de la fondamentatle (multi select)
* choix du type d'accord (plus de 40, multi select)
* choix de la position (de 1 à 4, multi select)
* Triable par Gamme ou par type d'accord
* Mode jour / nuit

Librairies utilisées: 
* [uke chord](https://github.com/pianosnake/uke-chord)(MIT Licence)
* [chord-db](https://github.com/tombatossals/chords-db) (MIT licence) 
* bootstrap

Code créé par IA (Gemini), et prompté par moi 😉
Licence: CC BY-NC 4.0

---

## Grille de blues trainer

* 🚀 Tester l'application : [Ouvrir l'outil (Démo interactive)](https://fxpar.github.io/music-toolbox/blues-grids.html)
* 📄 Code source : [blues-grids.html](https://github.com/fxpar/music-toolbox/blob/main/blues-grids.html)


**Entrainement au changement sur des grilles de blues pour ukulélé ou guitare. 4 grilles proposée, de simple à complexe. On voit le schéma de chaque accord et le métronome glisse de schéma en schéma.**

Paramètres: 
* choix de l'instrument (défaut ukulélé)
* choix du type de grille (défaut I-IV-V)
* choix de la gamme (défaut A)
* vitesse du tempo (défaut 100 bpm)
* marche / Arrêt (boucle infinie)
* Mode Jour / Nuit

Librairies utilisées: 
* pianosnake uke chord
* bootstrap

Code créé par IA (Gemini), et prompté par moi 😉
Licence: CC BY-NC 4.0


---


## Chord change trainer

* 🚀 Tester l'application : [Ouvrir l'outil (Démo interactive)](https://fxpar.github.io/music-toolbox/chord-change.html)
* 📄 Code source : [chord-change.html](https://github.com/fxpar/music-toolbox/blob/main/chord-change.html)


**Entrainement au changement d'accords pour ukulélé ou guitare. On voit le prochain accord pour se préparer, et on entend le métronome.**

Paramètres: 
* choix de l'instrument (défaut ukulélé)
* choix de la catégorie / Niveau des questions (Défaut Avancé et Intermédiaire)
* vitesse du tempo (défaut 80 bpm, mesure de 4 temps)
* Défilement aléatoire ou dans l'ordre (défaut aléatoire)
* durée de l'exercice (défaut boucle infinie)
* Mode Jour / Nuit

L'outil n'identifie pas si l'accord est bien joué ou non. 

Librairies utilisées: 
* pianosnake uke chord
* bootstrap

Code créé par IA (Gemini, je crois), et prompté par moi 😉
Licence: CC BY-NC 4.0

---


## Ear chord trainer

* 🚀 Tester l'application : [Ouvrir l'outil (Démo interactive)](https://fxpar.github.io/music-toolbox/chord-ear-trainer.html)
* 📄 Code source : [chord-ear-trainer.html](https://github.com/fxpar/music-toolbox/blob/main/chord-ear-trainer.html)


**Entrainement à la reconnaissance d'accord. L'accord est joué sur deux mesure. La réponse est affichée avec les notes sur la portée, le nom des notes et le schéma d'accord pour ukulélé ou guitare. L'audio continue durant deux mesures pour bien assosier la réponse au son.**

Paramètres:
* choix de l'instrument pour le schéma d'accord
* catégorie / Niveau des questions
* durée des mesures pour la question et pour la réponse
* choix du tempo (défaut 100 bpm sur des mesures à 4 temps)
* afficher / Masquer le nom des notes
* durée de l'exercice (défaut: boucle infinie)
* Mode Jour / Nuit

Librairies utilisées: 
* pianosnake uke chord
* abcjs Paul Rosen
* bootstrap

Code créé par IA (Gemini), et prompté par moi 😉

Licence: CC BY-NC 4.0

---


## Grid creation

* 🚀 Tester l'application : [Ouvrir l'outil (Démo interactive)](https://fxpar.github.io/music-toolbox/abc-grid.html)
* 📄 Code source : [abc-grid.html](https://github.com/fxpar/music-toolbox/blob/main/abc-grid.html)



**Création rapide d'un accompagnement à partir d'une liste ecrite d'accord (sous forme de grille écrite en texte). On tape la série d'accords et on obtient les accords sous forme de partition et d'audio. Possibilité de jouer en boucle.**

Paramètres:
* Différents mode de jeux de l'accompagnement
  * Boom chick (défaut)
  * Tango
  * Arpèges
* Mesure à 4 temps / 3 temps
* Mode Jour / Nuit


À faire:
* [ ] Autoriser les mesures composées de plusieurs accords.
* [ ] Autoriser les schémas personnalisés de rythme de l'accompagnement
* [ ] Tester le mode "chordgrid" pour afficher la grille
* [ ] Exporter l'abc transposé

Librairies utilisées: 
* abcjs Paul Rosen
* bootstrap

Code créé par IA (Gemini, je crois), et prompté par moi 😉

Licence: CC BY-NC 4.0

---

##  Abc editor player

* 🚀 Tester l'application : [Ouvrir l'outil (Démo interactive)](https://fxpar.github.io/music-toolbox/abc-editor-player.html)
* 📄 Code source : [abc-editor-player.html](https://github.com/fxpar/music-toolbox/blob/main/abc-editor-player.html)



**Première version d'un éditeur abc notation. Visualisation de la partition et création de l'audio. Plus de paramètres sont disponibles en cliquant sur les "⁝" à la fin de la barre du player, notamment pour la transposition.**

Fonctionnalités:
* Visualisation de la partition
* Jeu de l'Audio
* Chargement / Export d'une bibliothèque de morceaux
* Renommer un morceau de la bibliothèque
* Transposition
* Augmentation du swing
* Jouer / Taire les accords d'accompagnement
* Jouer / Taire la mélodie
* Activer le métronome (rythme, nombre de mesures)
* Mode Jour / Nuit

À faire: 
* [ ] Ajouter les tablatures avec l'accordement
* [ ] Export en midi
* [ ] Amélioration de l'éditeur (propositions contextualisées)

Librairies utilisées: 
* abcjs Paul Rosen
* bootstrap

Code créé par IA (Gemini), et prompté par moi 😉

Licence: CC BY-NC 4.0

---


## Metronome graduel

* 🚀 Tester l'application : [Ouvrir l'outil (Démo interactive)](https://fxpar.github.io/music-toolbox/metronome-graduel.html)
* 📄 Code source : [metronome-graduel.html](https://github.com/fxpar/music-toolbox/blob/main/metronome-graduel.html)


https://github.com/fxpar/music-toolbox/blob/main/metronome-graduel.html

**Un métronome "geek" pour s'entrainer en accélérant (ou en décélérant), soit de manière simple, soit en utilisant des formules complexes: rester 3 mesures au même tempo, accélerer de 5bpm les 4 suivantes, revenir à un rythme intermédiaire...**


|Fonctionnalité|Statut|
|---|---|
|Métronome simple (formule vide)|✅|
|Progression personnalisée (R / C / L)|✅|
|Visualisation des beats avec temps fort|✅|
|Audio différencié (aigu/grave)|✅|
|Presets cards + boutons rapides|✅|
|Mode nuit avec sauvegarde|✅|
|Curseur de tempo|✅|
|Responsive mobile/desktop|✅|
|Icônes Bootstrap modernes|✅|

Librairies utilisées: 
* bootstrap
* boostrap-icons
* popper (l'outil d'affichage d'aide de bootstrap)

Code créé par IA (Deepseek), et prompté par moi 😉
Licence: CC BY-NC 4.0

---


# Code source

Le code de ces outils est disponible sur Github:

 [https://github.com/fxpar/music-toolbox](https://github.com/fxpar/music-toolbox)

# Licence

 Shield: [![CC BY-NC 4.0][cc-by-nc-shield]][cc-by-nc]

This work is licensed under a
[Creative Commons Attribution-NonCommercial 4.0 International License][cc-by-nc].

[![CC BY-NC 4.0][cc-by-nc-image]][cc-by-nc]

[cc-by-nc]: https://creativecommons.org/licenses/by-nc/4.0/
[cc-by-nc-image]: https://licensebuttons.net/l/by-nc/4.0/88x31.png
[cc-by-nc-shield]: https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg