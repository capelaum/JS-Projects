import { createNote } from "./notes";
import { setFilters } from "./filters";
import { renderNotes } from "./views";

const createNoteButton = document.querySelector("#create-note");
const filterInput = document.querySelector("#search-text");
const selectFilter = document.getElementById("filter-by");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", renderNotes());

  createNoteButton.addEventListener("click", e => {
    const noteId = createNote();
    location.assign(`./edit.html#${noteId}`);
  });

  filterInput.addEventListener("input", e => {
    setFilters({
      searchText: e.target.value,
    });
    renderNotes();
  });

  selectFilter.addEventListener("change", e => {
    setFilters({
      sortBy: e.target.value,
    });
    renderNotes();
  });
}

window.addEventListener("storage", e => {
  if (e.key === "notes") {
    renderNotes();
  }
});
