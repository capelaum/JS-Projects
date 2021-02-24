"use strict";

// Fetch existing todos from local storage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");

  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (error) {
    return [];
  }
};

// Save todos to local storage
const saveTodos = todos => localStorage.setItem("todos", JSON.stringify(todos));

// Render application todos
const renderTodos = todos => {
  const filteredTodos = todos.filter(filterTodo);
  const incompleteTodos = todos.filter(todo => !todo.completed);

  todosListElement.innerHTML = ""; // reset

  generateSummaryDOM(incompleteTodos);

  if (filteredTodos.length > 0) {
    filteredTodos.forEach(generateTodoDOM);
  } else {
    const messageElement = document.createElement("p");
    messageElement.classList.add("empty-message");
    messageElement.textContent = "No to-dos to show";
    todosListElement.appendChild(messageElement);
  }
};

// Filter todos with filters properties
const filterTodo = todo => {
  const searchTextMatch = todo.text
    .toLowerCase()
    .includes(filters.searchText.toLowerCase());

  // Only if both false -> true
  const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
  return searchTextMatch && hideCompletedMatch;
};

// Get the DOM elements for list summary
const generateSummaryDOM = incompleteTodos => {
  const summary = document.createElement("h2");
  summary.classList.add("list-title");

  const plural = incompleteTodos.length === 1 ? "" : "s";

  summary.textContent = `You have ${incompleteTodos.length} todo${plural} left.`;
  todosListElement.appendChild(summary);
};

// Get the DOM elements for an individual note
const generateTodoDOM = todo => {
  const containerELement = document.createElement("div");
  containerELement.classList.add("list-item__container");

  const todoElement = document.createElement("label");
  todoElement.classList.add("list-item");

  // Setup checkbox
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // Setup todo text
  const todoText = document.createElement("span");
  todoText.textContent = todo.text;
  todoText.classList.add(`id-${todo.id}`);

  // Setup remove button
  const removeButton = document.createElement("button");
  removeButton.textContent = "remove";
  removeButton.classList.add("button", "button-text");
  removeButton.addEventListener("click", () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  containerELement.appendChild(checkbox);
  containerELement.appendChild(todoText);
  todoElement.appendChild(containerELement);
  todoElement.appendChild(removeButton);

  todosListElement.appendChild(todoElement);
};

// Toggle the completed value for a given todo
const toggleTodo = id => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) todo.completed = !todo.completed;
};

// Remove Todo by ID
const removeTodo = id => {
  if (confirm("Are You sure?")) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) todos.splice(todoIndex, 1);
  }
  console.log(todos);
};
