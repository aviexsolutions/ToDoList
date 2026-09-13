const API_BASE = 'https://jsonplaceholder.typicode.com';
let users = [];
let currentUserId = null;

// DOM Elements
const userSelect = document.getElementById('userSelect');
const todoList = document.getElementById('todoList');
const selectedUserName = document.getElementById('selectedUserName');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const remainingTasks = document.getElementById('remainingTasks');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
});

// Load users from API
async function loadUsers() {
    try {
        const response = await fetch(`${API_BASE}/users`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        users = await response.json();
        
        // Populate the select dropdown
        userSelect.innerHTML = '';
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;
            userSelect.appendChild(option);
        });
        
        // Set first user as default and load their todos
        if (users.length > 0) {
            userSelect.value = users[0].id;
            loadTodos(users[0].id);
        }
    } catch (error) {
        console.error('Error loading users:', error);
        userSelect.innerHTML = '<option>Error loading users</option>';
    }
}

// Load todos for selected user
async function loadTodos(userId) {
    currentUserId = userId;
    const user = users.find(u => u.id == userId);
    
    if (!user) return;
    
    selectedUserName.textContent = user.name;
    todoList.innerHTML = '<li class="loading">Loading to-do items...</li>';
    
    try {
        const response = await fetch(`${API_BASE}/todos?userId=${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const todos = await response.json();
        
        displayTodos(todos);
        updateStats(todos);
    } catch (error) {
        console.error('Error loading todos:', error);
        todoList.innerHTML = `<div class="error">Error loading to-do items. Please try again.</div>`;
    }
}

// Display todos in the list
function displayTodos(todos) {
    if (todos.length === 0) {
        todoList.innerHTML = '<li class="loading">No tasks for this user.</li>';
        return;
    }
    
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed');
            updateStats(todos);
        });
        
        const todoText = document.createElement('span');
        todoText.className = 'todo-text';
        todoText.textContent = todo.title;
        
        const status = document.createElement('span');
        status.className = `todo-status ${todo.completed ? 'completed' : 'pending'}`;
        status.textContent = todo.completed ? 'Completed' : 'Pending';
        
        li.appendChild(checkbox);
        li.appendChild(todoText);
        li.appendChild(status);
        todoList.appendChild(li);
    });
}

// Update task statistics
function updateStats(todos) {
    const completed = todos.filter(t => t.completed).length;
    const total = todos.length;
    const remaining = total - completed;
    
    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    remainingTasks.textContent = remaining;
}

// Event listener for user selection
userSelect.addEventListener('change', (e) => {
    const userId = e.target.value;
    if (userId) {
        loadTodos(userId);
    }
});
