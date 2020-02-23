import { getTodos, removeTodo, saveTodos, toggleTodo } from './todos';
import { getFilters } from './filters';

// Render application todos based on filters
const renderTodos = () => {
  const todoEl = document.querySelector('#todos');
  const { searchText, hideCompleted } = getFilters();
  const filteredTodos = getTodos().filter((todo) => {
    const searchTextMatch = todo.text.toLowerCase().includes(searchText.toLowerCase());
    const hideCompletedMatch = !hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  todoEl.innerHTML = '';
  
  todoEl.appendChild(generateSummaryDOM(incompleteTodos));
  
  if (filteredTodos.length > 0) {
    filteredTodos.forEach((todo, index) => {
      todoEl.appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageEl = document.createElement('p');
    messageEl.classList.add('empty-message');
    messageEl.textContent = 'There are no to-dos to show';
    todoEl.appendChild(messageEl);
  }
}

// generateTodoDOM
// Arguments: todo
// Return value: the todo element

// Get the DOM elements for an individual todo
const generateTodoDOM = (todo) => {
  const todoEl = document.createElement('label');
  const containerEl = document.createElement('div');
  const checkbox = document.createElement('input')
  const todoText = document.createElement('span');
  const removeButton = document.createElement('button');

  // Setup complete todo checkbox
  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = todo.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener('change', (e) => {
    toggleTodo(todo.id);
    renderTodos();
  });

  // Set up todo text
  todoText.textContent = todo.text;
  containerEl.appendChild(todoText);

  // Setup container
  todoEl.classList.add('list-item');
  containerEl.classList.add('list-item__container');
  todoEl.appendChild(containerEl);

  // Setup remove todo button
  removeButton.textContent = 'Remove';
  removeButton.classList.add('button', 'button--text');
  todoEl.appendChild(removeButton);
  removeButton.addEventListener('click', (e) => {
    removeTodo(todo.id);
    renderTodos();
  });
  return todoEl;
}

// generateSummaryDOM
// Arguments: incompletedTodos
// Return value: the summary element

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement('h2');
  const plural = incompleteTodos.length === 1 ? '' : 's';
  summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`;


  summary.classList.add('list-title');
  
  return summary;
}

// Make sure to set up the exports
export { renderTodos, generateSummaryDOM, generateTodoDOM }