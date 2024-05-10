// Load notes from localStorage
let notes = JSON.parse(localStorage.getItem('notes')) || [];

const noteForm = document.getElementById('noteForm');
const usernameInput = document.getElementById('usernameInput');
const titleInput = document.getElementById('titleInput');
const noteInput = document.getElementById('noteInput');
const noteList = document.getElementById('noteList');

// Function to save notes to localStorage
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to render notes
function renderNotes() {
    noteList.innerHTML = '';
    notes.forEach((note, index) => {
        const noteItem = document.createElement('div');
        noteItem.className = 'bg-gray-100 p-4 rounded-lg';
        noteItem.innerHTML = `
            <h3 class="font-bold mb-2">${note.title}</h3>
            <p class="text-sm text-gray-500 mb-2">By: ${note.username}</p>
            <p class="text-gray-700 text-md my-8 border-2 font-semibold p-3 rounded-lg">${note.content}</p>
            <button data-index="${index}" class="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded my-4 w-full">Delete</button>
        `;
        noteList.appendChild(noteItem);

        // Add event listener for delete button
        noteItem.querySelector('button').addEventListener('click', (e) => {
            const indexToDelete = parseInt(e.target.getAttribute('data-index'));
            notes.splice(indexToDelete, 1);
            saveNotes();
            renderNotes();
        });
    });
}

// Initial rendering of notes
renderNotes();

// Add event listener for note form submission
noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const title = titleInput.value.trim();
    const content = noteInput.value.trim();
    if (username !== '' && title !== '' && content !== '') {
        const newNote = { username, title, content };
        notes.push(newNote);
        saveNotes();
        usernameInput.value = '';
        titleInput.value = '';
        noteInput.value = '';
        renderNotes();
    } else {
        alert('Please fill in all fields.');
    }
});