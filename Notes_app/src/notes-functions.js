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

// Sort notes by one of the three options
const sortNotes = (notes, sortBy) => {
  if (sortBy === "byEdited") {
    return notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) return -1;
      if (a.updatedAt < b.updatedAt) return 1;
      if (a.updatedAt === b.updatedAt) return 0;
    });
  }

  if (sortBy === "byCreated") {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) return -1;
      if (a.createdAt < b.createdAt) return 1;
      if (a.createdAt === b.createdAt) return 0;
    });
  }

  if (sortBy === "alphabetical") {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
      if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
      if (a.title.toLowerCase() === b.title.toLowerCase()) return 0;
    });
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

const removeNote = id => {
  if (confirm("Are You sure?")) {
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex !== -1) notes.splice(noteIndex, 1);
  }

  console.log(notes);
};

// generate the last edited message
const generateLastEdited = timestamp => {
  let updatedAt = new Date(timestamp);
  let updatedAtDate = updatedAt.toLocaleDateString("pt-br"); // 15 de janeiro de 2021
  let updatedAtTime = `${updatedAt.getHours()}:${updatedAt.getMinutes()}:${updatedAt.getSeconds()}`;

  return `Last Edited: ${updatedAtDate} às ${updatedAtTime}`;
};
