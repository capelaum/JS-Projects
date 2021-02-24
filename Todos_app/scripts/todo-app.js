"use strict";

let todos = getSavedTodos();

const filters = {
  searchText: "",
  hideCompleted: false,
};

const filterInput = document.querySelector("#filter-todos");
const todosListElement = document.getElementById("todos");
const hideCompletedcheckbox = document.querySelector("#id-hideCompleted");
const form = document.querySelector("#form");

renderTodos(todos, filters); // first render

// Listen for filter Input value and filter
filterInput.addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

// Create Todo and save in localStorage
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.target.elements.text.value.trim();

  if(text !== "") {
    todos.push({
      id: uuidv4(),
      text,
      completed: false,
    });
    
    saveTodos(todos);
    renderTodos(todos, filters);
    e.target.elements.text.value = "";
  } else {
    alert('Please enter a valid text for your todo.');
  }
});

const hideCompleted = () => {
  filters.hideCompleted = hideCompletedcheckbox.checked;
  renderTodos(todos, filters);
};

// listen to checkbox event, atualize filters
document.addEventListener("DOMContentLoaded", hideCompleted);
hideCompletedcheckbox.addEventListener("change", hideCompleted);
