import { setFilters } from "./filters.js";
import { createTodo, loadTodos } from "./todos.js";
import { renderTodos } from "./views.js";

const filterInput = document.querySelector("#filter-todos");
const hideCompletedCheckbox = document.querySelector("#id-hideCompleted");
const form = document.querySelector("#form");

loadTodos();
renderTodos(); // first render

// Listen for filter Input value and filter
filterInput.addEventListener("input", e => {
  setFilters({
    searchText: e.target.value,
  });
  renderTodos();
});

// Create Todo and save in localStorage
form.addEventListener("submit", e => {
  const text = e.target.elements.text.value.trim();
  e.preventDefault();

  if (text.length > 0) {
    createTodo(text);
    renderTodos();
    e.target.elements.text.value = "";
  } else {
    alert("Please enter a valid text for your todo.");
  }
});

const hideCompleted = () => {
  setFilters({
    hideCompleted: hideCompletedCheckbox.checked,
  });
  renderTodos();
};

// listen to checkbox event, atualize filters
document.addEventListener("DOMContentLoaded", hideCompleted);
hideCompletedCheckbox.addEventListener("change", hideCompleted);

window.addEventListener("storage", e => {
  if (e.key === "todos") {
    loadTodos();
    renderTodos();
  }
});
