const noteInput = document.getElementById('note-input');
const saveBtn = document.getElementById('save-btn');
const clearBtn = document.getElementById('clear-btn');
const themeBtn = document.getElementById('theme-btn');
const notesList = document.getElementById('notes-list');
const searchInput = document.getElementById('search-input');
const notification = document.getElementById('notification');

let notes = JSON.parse(localStorage.getItem('notes')) || [];
let darkMode = JSON.parse(localStorage.getItem('darkMode')) || false;

// 💬 Notification visuelle
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 2000);
}

// 📋 Copier une note
function copierNote(texte) {
    navigator.clipboard.writeText(texte);
    showNotification("📋 Note copiée !");
}

// 🗑️ Supprimer une note
function supprimerNote(index) {
    if (confirm("Supprimer cette note ?")) {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        afficherNotes();
        showNotification("🗑️ Note supprimée !");
    }
}

// 🗂️ Afficher les notes
function afficherNotes(filtre = "") {
    notesList.innerHTML = '';
    notes
        .filter(note => note.texte.toLowerCase().includes(filtre.toLowerCase()))
        .forEach((note, index) => {
            const li = document.createElement('li');

            const textDiv = document.createElement('div');
            textDiv.classList.add('note-text');
            textDiv.textContent = note.texte;

            const dateDiv = document.createElement('div');
            dateDiv.classList.add('note-date');
            dateDiv.textContent = "🕒 " + note.date;

            const btnDiv = document.createElement('div');
            btnDiv.classList.add('note-buttons');

            const copyBtn = document.createElement('button');
            copyBtn.innerHTML = "📋";
            copyBtn.addEventListener('click', () => copierNote(note.texte));

            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = "❌";
            deleteBtn.addEventListener('click', () => supprimerNote(index));

            btnDiv.append(copyBtn, deleteBtn);
            li.append(textDiv, dateDiv, btnDiv);
            notesList.appendChild(li);
        });
}

// 💾 Sauvegarder une nouvelle note
function sauvegarderNote() {
    const texte = noteInput.value.trim();
    if (texte) {
        const nouvelleNote = {
            texte,
            date: new Date().toLocaleString()
        };
        notes.push(nouvelleNote);
        localStorage.setItem('notes', JSON.stringify(notes));
        noteInput.value = '';
        afficherNotes();
        showNotification("✅ Note ajoutée !");
    }
}

// 🗑️ Supprimer toutes les notes
function toutSupprimer() {
    if (confirm("Supprimer TOUTES les notes ?")) {
        notes = [];
        localStorage.setItem('notes', JSON.stringify(notes));
        afficherNotes();
        showNotification("🧹 Toutes les notes ont été supprimées !");
    }
}

// 🌙 Changer le thème
function changerTheme() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    themeBtn.textContent = darkMode ? "☀️ Mode clair" : "🌙 Mode sombre";
}

// 🔍 Recherche en direct
searchInput.addEventListener('input', e => afficherNotes(e.target.value));

// ⚡ Événements
saveBtn.addEventListener('click', sauvegarderNote);
clearBtn.addEventListener('click', toutSupprimer);
themeBtn.addEventListener('click', changerTheme);

// 🔄 Initialisation
document.body.classList.toggle('dark-mode', darkMode);
themeBtn.textContent = darkMode ? "☀️ Mode clair" : "🌙 Mode sombre";
afficherNotes();
