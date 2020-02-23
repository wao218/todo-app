import uuidv4 from 'uuid/v4';
let todos = [];

// Fetch existing todos from localStorage
const loadTodos = () => {
  const todosJSON = localStorage.getItem('todos');
  try {
    todos =  todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    todos = [];
  }
}

// Save todos to localStorage
const saveTodos = () => {
  localStorage.setItem('todos',JSON.stringify(todos));
}

// getTodos
// Arguments: none
// Return value: todos array
const getTodos = () => todos;

// createTodo
// Arguments: todo text
// Return value: none
const createTodo = (text) => {
  const id = uuidv4();
    todos.push({
      id: id,
      text: text,
      completed: false
    });
    saveTodos();
}

// removeTodo
// Arguments: id of todo to remove
// Return value: none
const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex > -1) {
      todos.splice(todoIndex, 1);
      saveTodos();
    }
}

// toggleTodo
// Arguments: id of todo to toggle
// Return value: none
const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);

  if ( todo) {
    todo.completed = !todo.completed;
    saveTodos(); 
  }
}

loadTodos();

// Make sure to call loadTodos and setup the exports
export { getTodos, createTodo, removeTodo, toggleTodo, loadTodos }