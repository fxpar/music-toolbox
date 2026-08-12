const Transposer = {
    // Gammes chromatiques (12 demi-tons)
    sharps: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    flats:  ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'],

    // Fonction pour transposer un seul accord (ex: "F#m7" + 1 -> "Gm7")
    transposeChord(chordName, steps) {
        return chordName.replace(/[A-G][b#]?/g, (match) => {
            // 1. Trouver l'index de la note actuelle
            let index = this.sharps.indexOf(match);
            if (index === -1) index = this.flats.indexOf(match);
            if (index === -1) return match; // Sécurité

            // 2. Calculer le nouvel index
            let newIndex = (index + steps) % 12;
            if (newIndex < 0) newIndex += 12;

            // 3. Choisir entre dièse et bémol (simplifié ici en sharps)
            return this.sharps[newIndex];
        });
    },

    // Fonction globale pour transposer tous les éléments de la page
    // transposer.js

    // ... (votre fonction transposeChord reste identique)

    transposeAll(steps) {
        const chordElements = document.querySelectorAll('.chord');
        chordElements.forEach(el => {
            const currentChord = el.getAttribute('data-chord');
            const newChord = this.transposeChord(currentChord, steps);
            
            // CORRECTIF : On met à jour uniquement l'attribut. 
            // Le CSS (content: attr(data-chord)) s'occupera de l'affichage.
            el.setAttribute('data-chord', newChord);
            
            // On s'assure que l'intérieur du span reste bien vide
            el.textContent = ""; 
        });

        // APRÈS la transposition, on rafraîchit les diagrammes à droite
        const uniqueChords = Array.from(new Set(
            Array.from(document.querySelectorAll('.chord'))
                 .map(el => el.getAttribute('data-chord'))
        ));
        
        if (typeof renderAllDiagrams === 'function') {
            renderAllDiagrams(uniqueChords);
        }
    }
};