import { initializeEditPage, generateLastEdited } from "./views";
import { updateNote, removeNote } from "./notes";

const noteTitleInput = document.querySelector("#note-title");
const lastEditedSpan = document.querySelector("#last-edited");
const noteBodyInput = document.querySelector("#note-body");
const removeNoteButton = document.querySelector("#remove-note");
const noteId = location.hash.substring(1);

initializeEditPage(noteId);

noteTitleInput.addEventListener("input", e => {
  const note = updateNote(noteId, {
    title: e.target.value,
  });

  lastEditedSpan.textContent = generateLastEdited(note.updatedAt);
});

noteBodyInput.addEventListener("input", e => {
  const note = updateNote(noteId, {
    body: e.target.value,
  });

  lastEditedSpan.textContent = generateLastEdited(note.updatedAt);
});

removeNoteButton.addEventListener("click", e => {
  removeNote(noteId);
  location.assign("/");
});

window.addEventListener("storage", e => {
  if (e.key === "notes") {
    initializeEditPage(noteId);
  }
});
