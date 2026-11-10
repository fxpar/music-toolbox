const Transposer = {
    // Gammes chromatiques (12 demi-tons)
    sharps: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    flats:  ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'],

    // Orthographe usuelle selon la tonalité (index = demi-ton de la tonique)
    // Majeur : bémols pour F, Bb, Eb, Ab, Db (+ C, neutre : bémols car Bb/Eb/Ab
    // empruntés y sont fréquents et la base de diagrammes est en bémols).
    // F#/Gb (6) : dièses (F#).
    majorUsesFlats: [true, true, false, true, false, true, false, false, true, false, true, false],
    // Mineur : bémols pour Cm, Dm, Ebm, Fm, Gm, Bbm (+ Am, relatif de C) ;
    // dièses pour C#m, Em, F#m, G#m, Bm.
    minorUsesFlats: [true, false, true, true, false, true, false, true, false, true, true, false],

    // Tonalité courante du morceau affiché, ex. { root: 7, minor: false } (= G)
    currentKey: null,

    noteIndex(note) {
        let index = this.sharps.indexOf(note);
        if (index === -1) index = this.flats.indexOf(note);
        return index;
    },

    // Découpe "F#m7/C#" -> { root: "F#", suffix: "m7", bass: "C#" } (null si pas un accord)
    splitChord(chordName) {
        const m = /^([A-G][b#]?)([^\/]*)(?:\/([A-G][b#]?))?$/.exec(chordName || '');
        if (!m) return null;
        return { root: m[1], suffix: m[2], bass: m[3] || '' };
    },

    // Tonalité { root, minor } d'après un nom d'accord ou de tonalité ("Am", "Bb", "F#m7")
    keyFromChord(chordName) {
        const parts = this.splitChord((chordName || '').replace(/\s+/g, ''));
        if (!parts) return null;
        const root = this.noteIndex(parts.root);
        if (root === -1) return null;
        const s = parts.suffix;
        const minor = (s.indexOf('min') === 0) || (s.charAt(0) === 'm' && s.indexOf('maj') !== 0) || s.charAt(0) === '-';
        return { root: root, minor: minor };
    },

    // Tonalité d'un morceau : directive ChordPro {key: X} si présente, sinon 1er accord
    detectKey(content, firstChord) {
        const m = /\{\s*key\s*:\s*([^}]+)\}/i.exec(content || '');
        let key = m ? this.keyFromChord(m[1].trim()) : null;
        if (!key && firstChord) key = this.keyFromChord(firstChord);
        return key;
    },

    setKey(content, firstChord) {
        this.currentKey = this.detectKey(content, firstChord);
    },

    useFlatsForKey(key) {
        if (!key) return false;
        return key.minor ? this.minorUsesFlats[key.root] : this.majorUsesFlats[key.root];
    },

    transposeNote(note, steps, useFlats) {
        const index = this.noteIndex(note);
        if (index === -1) return note; // Sécurité
        let newIndex = (index + steps) % 12;
        if (newIndex < 0) newIndex += 12;
        return useFlats ? this.flats[newIndex] : this.sharps[newIndex];
    },

    // Fonction pour transposer un seul accord (ex: "F#m7" + 1 -> "Gm7", "D/F#" + 1 -> "Eb/G")
    // useFlats : true = bémols, false = dièses, absent = d'après la tonalité courante transposée
    transposeChord(chordName, steps, useFlats) {
        if (useFlats === undefined) {
            useFlats = this.useFlatsForKey(this.shiftKey(this.currentKey, steps));
        }
        const parts = this.splitChord(chordName);
        if (!parts) return chordName; // pas un accord reconnu : inchangé
        let result = this.transposeNote(parts.root, steps, useFlats) + parts.suffix;
        if (parts.bass) result += '/' + this.transposeNote(parts.bass, steps, useFlats);
        return result;
    },

    shiftKey(key, steps) {
        if (!key) return null;
        let root = (key.root + steps) % 12;
        if (root < 0) root += 12;
        return { root: root, minor: key.minor };
    },

    // Nom enharmonique (A#<->Bb, C#<->Db, D#<->Eb, F#<->Gb, G#<->Ab), basse comprise.
    // Renvoie null si rien à changer.
    enharmonic(chordName) {
        const parts = this.splitChord(chordName);
        if (!parts) return null;
        const self = this;
        const swap = function (note) {
            if (note.length < 2) return note;
            const i = self.noteIndex(note);
            if (i === -1) return note;
            return note.charAt(1) === '#' ? self.flats[i] : self.sharps[i];
        };
        const res = swap(parts.root) + parts.suffix + (parts.bass ? '/' + swap(parts.bass) : '');
        return res === chordName ? null : res;
    },

    // Fonction globale pour transposer tous les éléments de la page
    transposeAll(steps) {
        // Tonalité inconnue : on prend le 1er accord affiché
        if (!this.currentKey) {
            const first = document.querySelector('.chord');
            if (first) this.currentKey = this.keyFromChord(first.getAttribute('data-chord'));
        }
        const newKey = this.shiftKey(this.currentKey, steps);
        const useFlats = this.useFlatsForKey(newKey);
        this.currentKey = newKey;

        const chordElements = document.querySelectorAll('.chord');
        chordElements.forEach(el => {
            const currentChord = el.getAttribute('data-chord');
            const newChord = this.transposeChord(currentChord, steps, useFlats);

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
