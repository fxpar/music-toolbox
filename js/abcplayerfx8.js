document.addEventListener("DOMContentLoaded", function () {
  // 1. Injection du CSS corrigé (Barre de progression 100% + Menu + Navigation Tunebook)
  const style = document.createElement("style");
  style.innerHTML = `
    .abcjs-container { margin-bottom: 20px; width: 100%; }
    .abcjs-tunebook-nav { display: none; margin-bottom: 10px; align-items: center; gap: 8px; }
    .abcjs-tunebook-nav button { padding: 4px 10px; cursor: pointer; background: #f8f9fa; border: 1px solid #ced4da; border-radius: 3px; font-size: 13px; }
    .abcjs-tunebook-nav select { padding: 4px; flex: 1; max-width: 300px; border: 1px solid #ced4da; border-radius: 3px; font-size: 13px; }
    .abcjs-more-toggle { transition: all 0.2s ease; background: none; border: none; font-size: 20px; padding: 4px 12px; cursor: pointer; color: #6c757d; line-height: 1; }
    .abcjs-more-toggle:hover { color: #0056b3 !important; }
    .abcjs-audio-wrapper { display: flex; align-items: center; background: #f8f9fa; border: 1px solid #dee2e6; border-top: none; border-radius: 0 0 4px 4px; padding: 4px 8px; width: 100%; box-sizing: border-box; }
    .abcjs-audio-wrapper .abcjs-audio { flex: 1; width: 100%; }
    .abcjs-audio-wrapper .abcjs-inline-audio { display: flex !important; align-items: center !important; width: 100% !important; gap: 8px !important; }
    .abcjs-audio-wrapper .abcjs-midi-progress-background { flex: 1 !important; min-width: 50px !important; margin: 0 5px !important; }
    .abcjs-paper { transition: opacity 0.2s ease; cursor: pointer; width: 100%; }
    .abcjs-paper:hover { opacity: 0.85; }
    
    /* Style du panneau d'options */
    .abcjs-more-panel { display: none; background: #fff; border: 1px solid #dee2e6; border-top: none; padding: 15px; border-radius: 0 0 4px 4px; font-family: sans-serif; box-sizing: border-box; }
    .abcjs-control-row { display: flex; gap: 15px; align-items: flex-start; flex-wrap: wrap; margin-bottom: 12px; }
    .abcjs-control-item { display: flex; flex-direction: column; font-size: 13px; color: #333; }
    .abcjs-control-item label { font-weight: bold; margin-bottom: 4px; }
    .abcjs-control-item select, .abcjs-control-item input { padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 13px; }
    .abcjs-editor-item { display: flex; flex-direction: column; width: 100%; font-size: 13px; color: #333; margin-top: 10px; margin-bottom: 12px; }
    .abcjs-editor-item label { font-weight: bold; margin-bottom: 4px; }
    .abcjs-textarea-edit { width: 100%; height: 120px; font-family: monospace; font-size: 13px; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; resize: vertical; }
    .abcjs-btn-apply { background: #0073aa; color: white; border: none; padding: 7px 14px; border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold; transition: background 0.2s; }
    .abcjs-btn-apply:hover { background: #0056b3; }
    .abcjs-chord-diagrams { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 15px; justify-content: flex-start; align-items: flex-end; }
  `;
  document.head.appendChild(style);

  // 2. Définition de la classe du curseur d'animation
  function CursorControl(selectorId) {
    var self = this;
    self.onStart = function () {
      var svg = document.querySelector("#" + selectorId + " svg");
      if (!svg) return;
      var cursor = document.createElementNS("http://www.w3.org/2000/svg", "line");
      cursor.setAttribute("class", "abcjs-cursor");
      cursor.setAttributeNS(null, "x1", 0); cursor.setAttributeNS(null, "y1", 0);
      cursor.setAttributeNS(null, "x2", 0); cursor.setAttributeNS(null, "y2", 0);
      svg.appendChild(cursor);
    };
    self.beatSubdivisions = 2;
    self.onEvent = function (ev) {
      if (ev.measureStart && ev.left === null) return;
      var lastSelection = document.querySelectorAll("#" + selectorId + " svg .highlight");
      for (var k = 0; k < lastSelection.length; k++) { lastSelection[k].classList.remove("highlight"); }
      for (var i = 0; i < ev.elements.length; i++) {
        var note = ev.elements[i];
        for (var j = 0; j < note.length; j++) { note[j].classList.add("highlight"); }
      }
      var cursor = document.querySelector("#" + selectorId + " svg .abcjs-cursor");
      if (cursor) {
        cursor.setAttribute("x1", ev.left - 2); cursor.setAttribute("x2", ev.left - 2);
        cursor.setAttribute("y1", ev.top); cursor.setAttribute("y2", ev.top + ev.height);
      }
    };
    self.onFinished = function () {
      var els = document.querySelectorAll("#" + selectorId + " svg .highlight");
      for (var i = 0; i < els.length; i++) { els[i].classList.remove("highlight"); }
      var cursor = document.querySelector("#" + selectorId + " svg .abcjs-cursor");
      if (cursor) {
        cursor.setAttribute("x1", 0); cursor.setAttribute("x2", 0);
        cursor.setAttribute("y1", 0); cursor.setAttribute("y2", 0);
      }
    };
  }

  // Fonction de découpage Tunebook
  function parseAbcTunebook(abcText) {
    var rawTunes = abcText.split(/(?=\n\s*X:)/g);
    var parsed = [];
    rawTunes.forEach(function(tuneStr) {
      var trimmed = tuneStr.trim();
      if (trimmed.length > 0) {
        var titleMatch = trimmed.match(/^T:\s*(.+)$/m);
        var title = titleMatch ? titleMatch[1].trim() : "Morceau " + (parsed.length + 1);
        parsed.push({ abc: trimmed, title: title });
      }
    });
    return parsed;
  }

  // 3. Boucle sur les zones "abc_ex_"
  const textareas = document.querySelectorAll('textarea[id^="abc_ex_"]');

  textareas.forEach((textarea) => {
    const originalId = textarea.id;

    // Récupération des attributs
    const classPaper = textarea.getAttribute("class-paper") || "abcjs-paper";
    const classAudio = textarea.getAttribute("class-audio") || "abcjs-audio";
    const animateAttr = textarea.getAttribute("animate");
    const shouldAnimate = animateAttr !== "false";
    const showChordDiag = textarea.getAttribute("chord-diag") === "true";

    let editorOptions = {};
    const rawOptions = textarea.getAttribute("options");
    if (rawOptions) {
      try {
        editorOptions = new Function(`return ${rawOptions}`)();
      } catch (e) {
        console.error(`Erreur d'options sur #${originalId}:`, e);
      }
    }

    // Identifiants uniques pour l'interface
    const paperId = "paper_" + originalId;
    const audioId = "audio_" + originalId;
    const morePanelId = "more_" + originalId;
    const transId = "trans_" + originalId; 
    const chordsId = "chords_" + originalId;
    const swingId = "swing_" + originalId;
    const btnApplyId = "btn_" + originalId;
    const chordDiagId = "chord_diag_" + originalId;
    const navId = "nav_" + originalId;
    const prevId = "prev_" + originalId;
    const selectId = "select_" + originalId;
    const nextId = "next_" + originalId;

    // Sauvegarde du contenu initial brut pour analyse Tunebook
    const initialAbcContent = textarea.value;
    let tunesArray = parseAbcTunebook(initialAbcContent);
    let currentTuneIndex = 0;

    // Transformation du textarea
    textarea.className = "abcjs-textarea-edit";
    textarea.style.spellcheck = "false";

    // Création de la structure HTML injectée AUTOUR du textarea (sans doublon)
    const container = document.createElement("div");
    container.className = "abcjs-container";
    
    container.innerHTML = `
      <div id="${navId}" class="abcjs-tunebook-nav">
        <button id="${prevId}" type="button">◀ Précédent</button>
        <select id="${selectId}"></select>
        <button id="${nextId}" type="button">Suivant ▶</button>
      </div>
      ${showChordDiag ? `<div id="${chordDiagId}" class="abcjs-chord-diagrams"></div>` : ''}
      <div id="${paperId}" class="${classPaper}" title="Cliquez ici pour Play / Pause"></div>
      <div class="abcjs-audio-wrapper">
        <div id="${audioId}" class="${classAudio}"></div>
        <button class="abcjs-more-toggle" data-target="${morePanelId}">⋮</button>
      </div>
      <div id="${morePanelId}" class="abcjs-more-panel">
        <div class="abcjs-control-row">
          <div class="abcjs-control-item">
            <label>Transposition générale (demi-tons)</label>
            <input type="number" id="${transId}" value="0" min="-12" max="12" style="width:70px;">
          </div>
          <div class="abcjs-control-item">
            <label>Swing</label>
            <select id="${swingId}">
              <option value="0">Aucun</option>
              <option value="0.2">Léger</option>
              <option value="0.4">Standard</option>
              <option value="0.6">Prononcé</option>
            </select>
          </div>
          <div class="abcjs-control-item" style="flex-direction:row; gap:6px; margin-top:18px;">
            <input type="checkbox" id="${chordsId}">
            <label for="${chordsId}">Couper les accords</label>
          </div>
        </div>
        <div class="abcjs-editor-item">
          <label>Code ABC source (modifiable en direct)</label>
        </div>
        <button id="${btnApplyId}" class="abcjs-btn-apply" style="margin-top:10px;">Mettre à jour le morceau</button>
      </div>
    `;

    // Insertion du conteneur global à la place du textarea
    textarea.parentNode.insertBefore(container, textarea);
    container.querySelector(".abcjs-editor-item").appendChild(textarea);
    textarea.style.display = "block";

    // Si plusieurs morceaux, on initialise le premier dans le textarea
    if (tunesArray.length > 0) {
      textarea.value = tunesArray[0].abc;
    }

    // Gestion du bouton trois points
    const toggleBtn = container.querySelector(".abcjs-more-toggle");
    toggleBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const target = document.getElementById(this.getAttribute("data-target"));
      if (target) {
        if (target.style.display === "none" || target.style.display === "") {
          target.style.display = "block";
          this.textContent = "✕";
          this.style.color = "#0073aa";
        } else {
          target.style.display = "none";
          this.textContent = "⋮";
          this.style.color = "#6c757d";
        }
      }
    });

    // Configuration de l'animation du curseur
    var cursorControlInstance = shouldAnimate ? new CursorControl(paperId) : null;

    // INITIALISATION DE L'ÉDITEUR ABCJS
    var editor = new ABCJS.Editor(originalId, {
      canvas_id: paperId,
      abcjsParams: Object.assign({ responsive: "resize" }, editorOptions),
      synth: {
        el: "#" + audioId,
        cursorControl: cursorControlInstance,
        options: { displayLoop: true, displayRestart: true, displayPlay: true, displayProgress: true, displayWarp: true },
        synthParams: Object.assign({ chordsOff: false }, editorOptions)
      }
    });

    // Référencement global pour Master Control si besoin
    if (!window.abcEditors) window.abcEditors = [];
    window.abcEditors.push(editor);

    // Gestion de la navigation du Tunebook
    const navEl = document.getElementById(navId);
    const selectEl = document.getElementById(selectId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);

    function loadTune(index) {
      if (index < 0 || index >= tunesArray.length) return;
      currentTuneIndex = index;
      if (selectEl) selectEl.value = index;
      if (textarea) {
        textarea.value = tunesArray[index].abc;
        if (editor && typeof editor.paramChanged === "function") {
          editor.paramChanged(Object.assign({ responsive: "resize" }, editorOptions));
        }
      }
    }

    if (tunesArray.length > 1) {
      if (navEl) navEl.style.display = "flex";
      if (selectEl) {
        selectEl.innerHTML = "";
        tunesArray.forEach(function (item, idx) {
          var opt = document.createElement("option");
          opt.value = idx;
          opt.textContent = (idx + 1) + ". " + item.title;
          selectEl.appendChild(opt);
        });
      }
    } else {
      if (navEl) navEl.style.display = "none";
    }

    if (selectEl) {
      selectEl.addEventListener("change", function () {
        loadTune(parseInt(this.value, 10));
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        if (currentTuneIndex > 0) loadTune(currentTuneIndex - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        if (currentTuneIndex < tunesArray.length - 1) loadTune(currentTuneIndex + 1);
      });
    }

    // LOGIQUE DE MISE À JOUR VIA L'API DE L'ÉDITEUR (Bouton Appliquer)
    document.getElementById(btnApplyId).addEventListener("click", function () {
      const transposeValue = parseInt(document.getElementById(transId).value, 10) || 0;
      const swingValue = parseFloat(document.getElementById(swingId).value) || 0;
      const chordsOff = document.getElementById(chordsId).checked;

      var renderParams = Object.assign({}, editorOptions, {
        selectTypes: false,
        responsive: "resize",
        visualTranspose: transposeValue
      });
      editor.paramChanged(renderParams);

      var synthParams = Object.assign({}, editorOptions, {
        midiTranspose: transposeValue,
        chordsOff: chordsOff,
        swing: swingValue
      });
      editor.synthParamChanged(synthParams);
    });

    // Écouteur de clic sur la partition (Play / Pause direct)
    setTimeout(function () {
      const paperEl = document.getElementById(paperId);
      if (paperEl) {
        paperEl.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          if (editor && editor.synth && editor.synth.synthControl) {
            var controller = editor.synth.synthControl;
            if (controller.isPlaying) {
              controller.pause();
            } else {
              controller.play();
            }
          }
        }, true);
      }
    }, 1000);

  });
});