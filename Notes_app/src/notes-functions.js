"use strict";

// Save todos to local storage

// Render app notes
const renderNotes = (notes, filters) => {
  notes = sortNotes(notes, filters.sortBy);

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

// Generate the DOM Structure for a note
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

// generate the last edited message
const generateLastEdited = timestamp => {
  let updatedAt = new Date(timestamp);
  let updatedAtDate = updatedAt.toLocaleDateString("pt-br"); // 15 de janeiro de 2021
  let updatedAtTime = `${updatedAt.getHours()}:${updatedAt.getMinutes()}:${updatedAt.getSeconds()}`;

  return `Last Edited: ${updatedAtDate} às ${updatedAtTime}`;
};
