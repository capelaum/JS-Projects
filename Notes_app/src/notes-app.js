"use strict";

let notes = getSavedNotes();

const filters = {
  searchText: "",
  sortBy: "byEdited",
};

const createNoteButton = document.querySelector("#create-note");
const filterInput = document.querySelector("#search-text");
const selectFilter = document.getElementById("filter-by");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event - render notes for the first time
  document.addEventListener("DOMContentLoaded", renderNotes(notes, filters));

  // Create Note and store in localStorage
  createNoteButton.addEventListener("click", e => {
    localStorage.setItem("notes", JSON.stringify(notes));
    location.assign(`./edit.html#${noteId}`);

    saveNotes(notes);
    renderNotes(notes, filters);
  });

  // Filter tasks event
  filterInput.addEventListener("input", e => {
    filters.searchText = e.target.value;
    renderNotes(notes, filters);
  });

  selectFilter.addEventListener("change", e => {
    filters.sortBy = e.target.value;
    renderNotes(notes, filters);
  });
}

window.addEventListener("storage", e => {
  console.log("window changed!");
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    renderNotes(notes, filters);
  }
});
