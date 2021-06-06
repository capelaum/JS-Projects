import { v4 as uuidv4 } from "uuid";

let todos = [];

// Fetch existing todos from local storage
const loadTodos = () => {
  const todosJSON = localStorage.getItem("todos");

  try {
    todos = todosJSON ? JSON.parse(todosJSON) : [];
  } catch (error) {
    todos = [];
  }
};

const saveTodos = todos => localStorage.setItem("todos", JSON.stringify(todos));
const getTodos = () => todos;

const createTodo = text => {
  todos.push({
    id: uuidv4(),
    text,
    completed: false,
  });

  saveTodos(todos);
};

const removeTodo = id => {
  if (confirm("Are You sure?")) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
      saveTodos(todos);
    }
  }
};

const toggleTodo = id => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos(todos);
  }
};

export { loadTodos, getTodos, createTodo, removeTodo, toggleTodo };
