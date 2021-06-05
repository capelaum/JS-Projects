import { getFilters } from "./filters";
import { sortNotes, getNotes } from "./notes";

const renderNotes = () => {
  const notesList = document.querySelector("#notes");
  const filters = getFilters();

  const notes = sortNotes(filters.sortBy);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  notesList.innerHTML = "";

  if (filteredNotes.length > 0) {
    // insert filtered notes in the html document
    filteredNotes.forEach(note => {
      const noteElement = generateNoteDOM(note);
      notesList.appendChild(noteElement);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No notes to show 😑";
    emptyMessage.classList.add("empty-message");
    notesList.appendChild(emptyMessage);
  }
};

const generateNoteDOM = note => {
  const noteElement = document.createElement("a");
  const noteText = document.createElement("p");
  const statusElement = document.createElement("p");

  // Setup the note title
  if (note.title.length > 0) {
    noteText.textContent = note.title;
  } else {
    noteText.textContent = "Unnamed note";
  }
  noteText.classList.add("list-item__title");
  noteElement.appendChild(noteText);

  // Setup Note link
  noteElement.setAttribute("href", `./edit.html#${note.id}`);
  noteElement.classList.add("list-item");

  // Setup the status message
  statusElement.textContent = generateLastEdited(note.updatedAt);
  statusElement.classList.add("list-item__subtitle");
  noteElement.appendChild(statusElement);

  return noteElement;
};

const initializeEditPage = noteId => {
  const noteTitleInput = document.querySelector("#note-title");
  const lastEditedSpan = document.querySelector("#last-edited");
  const noteBodyInput = document.querySelector("#note-body");

  const notes = getNotes();
  const note = notes.find(note => note.id === noteId);

  if (!note) {
    console.log("REDIRECT");
    location.assign("/");
  }

  noteTitleInput.value = note.title;
  noteBodyInput.value = note.body;
  lastEditedSpan.textContent = generateLastEdited(note.updatedAt);
};

// generate the last edited message
const generateLastEdited = timestamp => {
  let updatedAt = new Date(timestamp);
  let updatedAtDate = updatedAt.toLocaleDateString("pt-br"); // 15 de janeiro de 2021
  let updatedAtTime = `${updatedAt.getHours()}:${updatedAt.getMinutes()}:${updatedAt.getSeconds()}`;

  return `Last Edited: ${updatedAtDate} às ${updatedAtTime}`;
};

export { renderNotes, generateNoteDOM, generateLastEdited, initializeEditPage };
