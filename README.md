# Outils musicaux

Liste de petits outils pour aider à travailler un instrument ou à éditer ses partitions. Certains outils sont basés sur la "notation abc" pour la musique. 

## Quiz position des accord ukulélé

* 🚀 Tester l'application : [Ouvrir l'outil (Démo interactive)](https://fxpar.github.io/abc-notation-artifacts/ukulele-position-accord-quiz.html)
* 📄 Code source : [metronome-graduel.html](https://github.com/fxpar/abc-notation-artifacts/blob/main/ukulele-position-accord-quiz.html)


**Tester vos connaissances pour passer d'une forme d'accord à une autre. **

Librairies utilisées: 
* aucune


## Quiz formules d'accord

* 🚀 Tester l'application : [Ouvrir l'outil (Démo interactive)](https://fxpar.github.io/abc-notation-artifacts/quiz-formule-accords.html)
* 📄 Code source : [metronome-graduel.html](https://github.com/fxpar/abc-notation-artifacts/blob/main/quiz-formule-accords.html)


**Questions à trou sur les formules d'accord. Ex: m7: R-b3-5-?**

Librairies utilisées: 
* aucune



## Moteur de recherche d'accord de ukulele

* 🚀 Tester l'application : [Ouvrir l'outil (Démo interactive)](https://fxpar.github.io/abc-notation-artifacts/ukulele-chords-search.html)
* 📄 Code source : [metronome-graduel.html](https://github.com/fxpar/abc-notation-artifacts/blob/main/ukulele-chords-search.html)


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

## Grille de blues trainer

* 🚀 Tester l'application : [Ouvrir l'outil (Démo interactive)](https://fxpar.github.io/abc-notation-artifacts/blues-grids.html)
* 📄 Code source : [metronome-graduel.html](https://github.com/fxpar/abc-notation-artifacts/blob/main/blues-grids.html)


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

## Chord change trainer

* 🚀 Tester l'application : [Ouvrir l'outil (Démo interactive)](https://fxpar.github.io/abc-notation-artifacts/chord-change.html)
* 📄 Code source : [metronome-graduel.html](https://github.com/fxpar/abc-notation-artifacts/blob/main/chord-change.html)


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

## Ear chord trainer

* 🚀 Tester l'application : [Ouvrir l'outil (Démo interactive)](https://fxpar.github.io/abc-notation-artifacts/chord-ear-trainer.html)
* 📄 Code source : [metronome-graduel.html](https://github.com/fxpar/abc-notation-artifacts/blob/main/chord-ear-trainer.html)


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


## Grid creation

* 🚀 Tester l'application : [Ouvrir l'outil (Démo interactive)](https://fxpar.github.io/abc-notation-artifacts/abc-grid.html)
* 📄 Code source : [metronome-graduel.html](https://github.com/fxpar/abc-notation-artifacts/blob/main/abc-grid.html)



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


##  Abc editor player

* 🚀 Tester l'application : [Ouvrir l'outil (Démo interactive)](https://fxpar.github.io/abc-notation-artifacts/abc-editor-player.html)
* 📄 Code source : [metronome-graduel.html](https://github.com/fxpar/abc-notation-artifacts/blob/main/abc-editor-player.html)



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


## Metronome graduel

* 🚀 Tester l'application : [Ouvrir l'outil (Démo interactive)](https://fxpar.github.io/abc-notation-artifacts/metronome-graduel.html)
* 📄 Code source : [metronome-graduel.html](https://github.com/fxpar/abc-notation-artifacts/blob/main/metronome-graduel.html)


https://github.com/fxpar/abc-notation-artifacts/blob/main/metronome-graduel.html

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


# Code source

Le code de ces outils est disponible sur Github:

 [https://github.com/fxpar/abc-notation-artifacts](https://github.com/fxpar/abc-notation-artifacts)

# Licence

 Shield: [![CC BY-NC 4.0][cc-by-nc-shield]][cc-by-nc]

This work is licensed under a
[Creative Commons Attribution-NonCommercial 4.0 International License][cc-by-nc].

[![CC BY-NC 4.0][cc-by-nc-image]][cc-by-nc]

[cc-by-nc]: https://creativecommons.org/licenses/by-nc/4.0/
[cc-by-nc-image]: https://licensebuttons.net/l/by-nc/4.0/88x31.png
[cc-by-nc-shield]: https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg