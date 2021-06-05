"use strict";

const noteTitleInput = document.querySelector("#note-title");
const lastEditedSpan = document.querySelector("#last-edited");
const noteBodyInput = document.querySelector("#note-body");
const removeNoteButton = document.querySelector("#remove-note");

const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find((note) => note.id === noteId);

if (!note) {
  console.log("REDIRECT");
  location.assign("./index.html");
}

noteTitleInput.value = note.title;
noteBodyInput.value = note.body;
lastEditedSpan.textContent = generateLastEdited(note.updatedAt);

noteTitleInput.addEventListener("input", (e) => {
  note.title = e.target.value;
  note.updatedAt = new Date().getTime();
  lastEditedSpan.textContent = generateLastEdited(note.updatedAt);

  saveNotes(notes);
});

noteBodyInput.addEventListener("input", (e) => {
  note.body = e.target.value;
  note.updatedAt = new Date().getTime();
  lastEditedSpan.textContent = generateLastEdited(note.updatedAt);

  saveNotes(notes);
});

removeNoteButton.addEventListener("click", (e) => {
  removeNote(noteId);
  saveNotes(notes);
  location.assign("./index.html");
});

window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    let note = notes.find((note) => note.id === noteId);

    if (!note) {
      console.log("REDIRECT");
      location.assign("./index.html");
    }

    noteTitleInput.value = note.title;
    noteBodyInput.value = note.body;
    lastEditedSpan.textContent = generateLastEdited(note.updatedAt);
  }
});
