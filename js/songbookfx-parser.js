const Parser = {
    // Liste des notes pour la transposition (Gamme Chromatique)
    notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],

    // Regex pour détecter un accord (ex: Am7, F#m, Bb/D)
    chordRegex: /[A-G][b#]?(?:m|maj|min|aug|dim|sus|add|[\d])*(?:\/[A-G][b#]?)?/g,

    parse(text) {
        const lines = text.split('\n');
        let output = [];

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];

            // 1. Détection format ChordPro : [Am]
            if (line.includes('[') && line.includes(']')) {
                line = line.replace(/\[([^\]]+)\]/g, (match, chord, offset) => {
                    const charAfter = line[offset + match.length];
                    // Si suivi d'un espace ou fin de ligne, on le met "inline" pour éviter les chevauchements
                    if (!charAfter || charAfter === ' ' || charAfter === '\t') {
                        return `<span class="chord" data-chord="${chord}">${chord}</span>`;
                    }
                    return `<span class="chord" data-chord="${chord}"></span>`;
                });
                output.push(`<div class="song-line">${line}</div>`);
            } 
            // 2. Détection format "Accords au-dessus"
            else if (this.isChordLine(line)) {
                let nextLine = lines[i + 1] || "";
                // Si la ligne suivante est aussi une ligne d'accords, on traite celle-ci seule
                if (this.isChordLine(nextLine)) {
                    output.push(this.wrapChordsInLine(line));
                } else {
                    // On fusionne la ligne d'accords avec la ligne de texte
                    output.push(this.mergeLines(line, nextLine));
                    i++; // Sauter la ligne de texte car elle est consommée
                }
            } 
            // 3. Texte simple
            else {
                output.push(`<div class="song-line">${line}</div>`);
            }
        }
        return output.join('');
    },

    // Vérifie si une ligne ne contient presque que des accords
    isChordLine(line) {
        if (!line.trim()) return false;
        // On retire les accords du texte
        const words = line.trim().split(/\s+/);
        const chords = line.match(this.chordRegex) || [];
        // Si le nombre de "mots" correspond à peu près au nombre d'accords
        return chords.length > 0 && (chords.length / words.length) > 0.7;
    },

    // CORRECTION : Transforme les accords d'une ligne seule en spans avec texte
    wrapChordsInLine(line) {
        const wrapped = line.replace(this.chordRegex, (chord) => {
            return `<span class="chord" data-chord="${chord}">${chord}</span>`;
        });
        return `<div class="chord-only-line">${wrapped}</div>`;
    },

    // CORRECTION : Fusionne une ligne d'accords avec une ligne de texte
    mergeLines(chordLine, textLine) {
        let result = "";
        let lastIdx = 0;
        let match;

        this.chordRegex.lastIndex = 0;

        while ((match = this.chordRegex.exec(chordLine)) !== null) {
            const pos = match.index;
            const chord = match[0];

            // Si la ligne de texte est plus courte que la position de l'accord, on complète avec des espaces
            if (textLine.length < pos) {
                textLine = textLine.padEnd(pos, ' ');
            }

            result += textLine.substring(lastIdx, pos);
            result += `<span class="chord" data-chord="${chord}"></span>`;
            
            lastIdx = pos;
        }
        result += textLine.substring(lastIdx);
        return `<div class="song-line">${result}</div>`;
    }
};