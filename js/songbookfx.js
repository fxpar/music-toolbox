// --- État de l'application ---
let songs = JSON.parse(localStorage.getItem('chordflow_songs')) || myDefaultSongs;
let settings = JSON.parse(localStorage.getItem('chordflow_settings')) || {
    lyricsSize: 1.1,
    chordSize: 0.9,
    diagramSize: 1.0, // Zoom par défaut des diagrammes
    sidebarRightWidth: 220,
    sidebarLeftVisible: true
};

// Tri initial
songs.sort((a, b) => a.title.localeCompare(b.title));

let globalTranspose = 0;
let chordVariantIndices = {};

// --- Éléments DOM ---
const themeToggle = document.getElementById('theme-toggle');
const importBtn = document.getElementById('import-btn');
const importModal = document.getElementById('import-modal');
const closeModal = document.getElementById('close-modal');
const saveSongBtn = document.getElementById('save-song');
const songList = document.getElementById('song-list');
const songContent = document.getElementById('song-content');
const searchBar = document.getElementById('search-bar');
const clearSearchBtn = document.getElementById('clear-search');

const lyricsSizeUp = document.getElementById('lyrics-size-up');
const lyricsSizeDown = document.getElementById('lyrics-size-down');
const lyricsSizeVal = document.getElementById('lyrics-size-val');
const chordSizeUp = document.getElementById('chord-size-up');
const chordSizeDown = document.getElementById('chord-size-down');
const chordSizeVal = document.getElementById('chord-size-val');

const transposeValDisplay = document.getElementById('transpose-val');
const btnUp = document.getElementById('transpose-up');
const btnDown = document.getElementById('transpose-down');
const instrumentSelect = document.getElementById('instrument-select');
const chordPanel = document.querySelector('.chord-panel');
const resizer = document.getElementById('chord-resizer');
const menuToggle = document.getElementById('menu-toggle');
const optionsToggle = document.getElementById('options-toggle');
const closeOptions = document.getElementById('close-options');
const optionsPanel = document.getElementById('options-panel');
const mainContainer = document.querySelector('.main-container');

// Nouveaux contrôles de zoom diagrammes
const diagramZoomUp = document.getElementById('diagram-zoom-up');
const diagramZoomDown = document.getElementById('diagram-zoom-down');

// --- 1. Gestion du Thème ---
themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    themeToggle.textContent = isDark ? '🌙 Mode Nuit' : '☀️ Mode Clair';
    localStorage.setItem('chordflow_theme', newTheme);
});

if (localStorage.getItem('chordflow_theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️ Mode Clair';
}

// --- 2. Gestion des Panels (Burger & Options) ---
menuToggle.addEventListener('click', () => {
    settings.sidebarLeftVisible = !settings.sidebarLeftVisible;
    updateSidebarLeftUI();
    localStorage.setItem('chordflow_settings', JSON.stringify(settings));
});

optionsToggle.addEventListener('click', () => {
    optionsPanel.classList.toggle('open');
});

closeOptions.addEventListener('click', () => {
    optionsPanel.classList.remove('open');
});

function updateSidebarLeftUI() {
    if (settings.sidebarLeftVisible) {
        mainContainer.classList.remove('sidebar-hidden');
    } else {
        mainContainer.classList.add('sidebar-hidden');
    }
}

// --- 3. Gestion du Resizer (Vanilla JS) ---
var isResizing = false;

function startResizing() {
    isResizing = true;
    document.body.classList.add('is-resizing');
}

resizer.addEventListener('mousedown', function(e) {
    startResizing();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResizing);
});

resizer.addEventListener('touchstart', function(e) {
    startResizing();
    // passive: false est requis pour que preventDefault() fonctionne sur mobile
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', stopResizing);
});

function handleMouseMove(e) {
    if (!isResizing) return;

    var clientX = e.clientX;
    var newWidth = window.innerWidth - clientX;
    var maxWidth = window.innerWidth / 3;

    if (newWidth < 40) newWidth = 0;
    if (newWidth > maxWidth) newWidth = maxWidth;

    settings.sidebarRightWidth = newWidth;
    updateSidebarUI();
}

function handleTouchMove(e) {
    if (!isResizing) return;
    if (e.touches.length > 0) {
        e.preventDefault(); // Empêche le défilement pendant le redimensionnement
        handleMouseMove(e.touches[0]);
    }
}

function stopResizing() {
    if (!isResizing) return;
    isResizing = false;
    document.body.classList.remove('is-resizing');
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResizing);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', stopResizing);
    localStorage.setItem('chordflow_settings', JSON.stringify(settings));
}

function updateSidebarUI() {
    const width = settings.sidebarRightWidth;
    document.documentElement.style.setProperty('--chord-panel-width', `${width}px`);

    if (width === 0) {
        chordPanel.classList.add('is-collapsed');
    } else {
        chordPanel.classList.remove('is-collapsed');
    }
}

// --- 4. Gestion des Paramètres ---
function applySettings() {
    document.documentElement.style.setProperty('--lyrics-font-size', `${settings.lyricsSize}rem`);
    document.documentElement.style.setProperty('--chord-font-size', `${settings.chordSize}rem`);

    lyricsSizeVal.textContent = `${settings.lyricsSize.toFixed(1)}rem`;
    chordSizeVal.textContent = `${settings.chordSize.toFixed(1)}rem`;

    updateSidebarUI();
    updateSidebarLeftUI();
}

lyricsSizeUp.addEventListener('click', () => {
    settings.lyricsSize = Math.min(3, settings.lyricsSize + 0.1);
    applySettings();
});
lyricsSizeDown.addEventListener('click', () => {
    settings.lyricsSize = Math.max(0.5, settings.lyricsSize - 0.1);
    applySettings();
});

chordSizeUp.addEventListener('click', () => {
    settings.chordSize = Math.min(2, settings.chordSize + 0.1);
    applySettings();
});
chordSizeDown.addEventListener('click', () => {
    settings.chordSize = Math.max(0.4, settings.chordSize - 0.1);
    applySettings();
});

// Zoom diagrammes
diagramZoomUp.addEventListener('click', () => {
    settings.diagramSize = Math.min(2.0, settings.diagramSize + 0.1);
    refreshDiagrams();
    localStorage.setItem('chordflow_settings', JSON.stringify(settings));
});
diagramZoomDown.addEventListener('click', () => {
    settings.diagramSize = Math.max(0.3, settings.diagramSize - 0.1);
    refreshDiagrams();
    localStorage.setItem('chordflow_settings', JSON.stringify(settings));
});

function refreshDiagrams() {
    const chordElements = document.querySelectorAll('.chord');
    const uniqueChords = Array.from(new Set(Array.from(chordElements).map(el => el.getAttribute('data-chord'))));
    renderAllDiagrams(uniqueChords);
}

// --- 5. Gestion de la Modal & Importation ---
importBtn.addEventListener('click', () => importModal.style.display = 'flex');
closeModal.addEventListener('click', () => importModal.style.display = 'none');

saveSongBtn.addEventListener('click', () => {
    const rawText = document.getElementById('import-text').value;
    if (!rawText.trim()) return;

    const lines = rawText.split('\n');
    const newSong = {
        id: Date.now(),
        title: lines[0].replace(/#/g, '').trim() || "Sans titre",
        author: "Inconnu",
        content: rawText,
        tags: []
    };

    songs.push(newSong);
    songs.sort((a, b) => a.title.localeCompare(b.title));
    localStorage.setItem('chordflow_songs', JSON.stringify(songs));
    renderLibrary();
    importModal.style.display = 'none';
    document.getElementById('import-text').value = '';
});

// --- 6. Affichage de la Bibliothèque ---
function renderLibrary(filterText = '') {
    songList.innerHTML = '';
    const filteredSongs = songs.filter(song => {
        const searchStr = `${song.title} ${song.author} ${song.content}`.toLowerCase();
        return searchStr.includes(filterText.toLowerCase());
    });

    filteredSongs.forEach(song => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${song.title}</strong><br><small style="opacity:0.7">${song.author}</small>`;
        li.addEventListener('click', () => {
            document.querySelectorAll('#song-list li').forEach(el => el.classList.remove('active'));
            li.classList.add('active');
            loadSong(song);
        });
        songList.appendChild(li);
    });

    if (filteredSongs.length === 0) {
        songList.innerHTML = '<li style="text-align:center; opacity:0.5; cursor:default;">Aucun résultat</li>';
    }
}

searchBar.addEventListener('input', (e) => {
    renderLibrary(e.target.value);
});

clearSearchBtn.addEventListener('click', () => {
    searchBar.value = '';
    renderLibrary('');
});

// --- 7. Chargement d'une Chanson ---
function loadSong(song) {
    document.getElementById('display-title').textContent = song.title;
    document.getElementById('display-author').textContent = song.author;
    
    const htmlOutput = Parser.parse(song.content);
    songContent.innerHTML = htmlOutput;
    
    const chordElements = document.querySelectorAll('.chord');
    const uniqueChords = [];
    chordElements.forEach(el => {
        const name = el.getAttribute('data-chord');
        if (!uniqueChords.includes(name)) uniqueChords.push(name);
    });

    chordVariantIndices = {};
    renderAllDiagrams(uniqueChords);
    attachChordEvents();

    globalTranspose = 0;
    updateTransposeUI();
}

function attachChordEvents() {
    document.querySelectorAll('.chord').forEach(chordEl => {
        chordEl.addEventListener('click', (e) => {
            const chordName = e.target.getAttribute('data-chord');

            if (settings.sidebarRightWidth === 0) {
                settings.sidebarRightWidth = 220;
                updateSidebarUI();
            }

            displayChordDiagram(chordName);
        });
    });
}

// --- 8. Transposition ---
btnUp.addEventListener('click', () => {
    Transposer.transposeAll(1);
    globalTranspose++;
    updateTransposeUI();
});

btnDown.addEventListener('click', () => {
    Transposer.transposeAll(-1);
    globalTranspose--;
    updateTransposeUI();
});

function updateTransposeUI() {
    const prefix = globalTranspose > 0 ? "+" : "";
    transposeValDisplay.textContent = `Ton : ${prefix}${globalTranspose}`;
}

instrumentSelect.addEventListener('change', () => {
    refreshDiagrams();
});

// --- 9. Diagrammes d'accords ---
function renderAllDiagrams(chordList) {
    const container = document.getElementById('chord-diagrams-container');
    const instrument = instrumentSelect.value;
    container.innerHTML = '';

    if (chordList.length === 0) {
        container.innerHTML = '<p style="text-align:center; opacity:0.5; margin-top:20px;">Aucun accord</p>';
        return;
    }

    chordList.forEach(chordName => {
        const variants = (chordDatabase[instrument] && chordDatabase[instrument][chordName]) ? chordDatabase[instrument][chordName] : [];

        if (chordVariantIndices[chordName] === undefined) chordVariantIndices[chordName] = 0;
        let currentIndex = chordVariantIndices[chordName];
        if (currentIndex >= variants.length) currentIndex = 0;

        const section = document.createElement('div');
        section.className = 'chord-section';

        const header = document.createElement('div');
        header.className = 'chord-title-header';

        const btnPrev = document.createElement('button');
        btnPrev.innerHTML = '◀';
        btnPrev.style.visibility = variants.length > 1 ? 'visible' : 'hidden';
        btnPrev.onclick = () => changeVariant(chordName, -1);

        const title = document.createElement('h4');
        title.textContent = chordName;

        const btnNext = document.createElement('button');
        btnNext.innerHTML = '▶';
        btnNext.style.visibility = variants.length > 1 ? 'visible' : 'hidden';
        btnNext.onclick = () => changeVariant(chordName, 1);

        header.appendChild(btnPrev);
        header.appendChild(title);
        header.appendChild(btnNext);
        section.appendChild(header);

        if (variants.length > 0) {
            const data = variants[currentIndex];
            const chordEl = document.createElement('uke-chord');
            chordEl.setAttribute('name', data.name);
            chordEl.setAttribute('frets', data.frets);
            chordEl.setAttribute('fingers', data.fingers);
            chordEl.setAttribute('position', data.position);
            chordEl.setAttribute('sub', data.sub);
            chordEl.setAttribute('length', data.length || "5");
            chordEl.setAttribute('size', settings.diagramSize); // Application du zoom
            section.appendChild(chordEl);
        } else {
            section.innerHTML += '<div style="opacity:0.3; font-style:italic;">?</div>';
        }
        
        container.appendChild(section);
    });
}

function changeVariant(chordName, direction) {
    const instrument = instrumentSelect.value;
    const variants = chordDatabase[instrument][chordName];
    if (!variants) return;

    let newIndex = (chordVariantIndices[chordName] || 0) + direction;
    if (newIndex < 0) newIndex = variants.length - 1;
    if (newIndex >= variants.length) newIndex = 0;

    chordVariantIndices[chordName] = newIndex;

    const uniqueChords = Array.from(new Set(Array.from(document.querySelectorAll('.chord')).map(el => el.getAttribute('data-chord'))));
    renderAllDiagrams(uniqueChords);
}

function displayChordDiagram(chordName) {
    const titles = document.querySelectorAll('.chord-title-header h4');
    for (let h4 of titles) {
        if (h4.textContent === chordName) {
            h4.parentElement.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
    }
}




		// Éléments du DOM
		//const importModal = document.getElementById('import-modal');
		const quickAddBtn = document.getElementById('quick-add-btn');
		//const importBtn = document.getElementById('import-btn'); // Bouton dans les paramètres
		const closeModalBtn = document.getElementById('close-modal');
		//const saveSongBtn = document.getElementById('save-song');
		const importTextArea = document.getElementById('import-text');

		// Fonction pour ouvrir la modale
		function openImportModal() {
			importTextArea.value = '';
			importModal.classList.add('active');
			// Ferme le panneau d'options sur mobile si ouvert
			document.getElementById('options-panel')?.classList.remove('active');
		}

		// Fonction pour fermer la modale
		function closeImportModal() {
			importModal.classList.remove('active');
		}

		// Listeners d'ouverture / fermeture
		quickAddBtn?.addEventListener('click', openImportModal);
		importBtn?.addEventListener('click', openImportModal);
		closeModalBtn?.addEventListener('click', closeImportModal);

		// Fermer en cliquant à l'extérieur de la modale
		importModal?.addEventListener('click', (e) => {
			if (e.target === importModal) closeImportModal();
		});

		// Traitement et enregistrement de la chanson
		saveSongBtn?.addEventListener('click', () => {
			const rawText = importTextArea.value.trim();
			
			if (!rawText) {
				alert('Veuillez coller le texte de la chanson.');
				return;
			}

			// Utilisation de ton parseur existant (ajuste le nom de la fonction si besoin)
			// On suppose que parseChordPro prend le texte brut et retourne un objet chanson
			const newSong = parseChordPro(rawText); 

			if (newSong) {
				// Ajout à la liste globale des chansons (ex: songsData ou window.songs)
				songsData.push(newSong);

				// Sauvegarde locale optionnelle pour garder la chanson après rechargement
				localStorage.setItem('my_custom_songs', JSON.stringify(songsData));

				// Mettre à jour l'affichage de la liste et charger la chanson
				renderSongList(); // Ta fonction de rendu de la sidebar
				loadSong(newSong); // Ta fonction d'affichage de la chanson
				
				closeImportModal();
			} else {
				alert('Erreur lors de l\'analyse du texte. Vérifiez le format.');
			}
		});




// Initialisation
applySettings();
renderLibrary();
if (songs.length > 0) {
    loadSong(songs[0]);
    var listItems = document.querySelectorAll('#song-list li');
    if (listItems.length > 0) {
        listItems[0].classList.add('active');
    }
}
