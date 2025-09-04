// Get references to HTML elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

// Array to store todos
let todos = [];

// Function to add a new todo
function addTodo() {
    const todoText = todoInput.value.trim();
    
    // Check if input is not empty
    if (todoText === '') {
        alert('Please enter a todo item!');
        return;
    }
    
    // Create new todo object
    const newTodo = {
        id: Date.now(), // Simple ID using timestamp
        text: todoText,
        completed: false
    };
    
    // Add to todos array
    todos.push(newTodo);
    
    // Clear input field
    todoInput.value = '';
    
    // Update the display
    displayTodos();
}

// Function to display all todos
function displayTodos() {
    // Clear the current list
    todoList.innerHTML = '';
    
    // If no todos, show empty message
    if (todos.length === 0) {
        todoList.innerHTML = '<li class="empty-message">No todos yet. Add one above!</li>';
        return;
    }
    
    // Create HTML for each todo
    todos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';
        
        // Add completed class if todo is completed
        if (todo.completed) {
            todoItem.classList.add('completed');
        }
        
        todoItem.innerHTML = `
            <span class="todo-text">${todo.text}</span>
            <div class="todo-buttons">
                <button class="complete-btn" onclick="toggleTodo(${todo.id})">
                    ${todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">
                    Delete
                </button>
            </div>
        `;
        
        todoList.appendChild(todoItem);
    });
}

// Function to toggle todo completion status
function toggleTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        displayTodos();
    }
}

// Function to delete a todo
function deleteTodo(id) {
    if (confirm('Are you sure you want to delete this todo?')) {
        todos = todos.filter(todo => todo.id !== id);
        displayTodos();
    }
}

// Event listeners
addBtn.addEventListener('click', addTodo);

// Add todo when Enter key is pressed
todoInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

// Initialize the display
displayTodos();