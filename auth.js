// auth.js - Simple localStorage-based authentication

// Save user credentials to localStorage
function registerUser(username, password) {
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  if (users[username]) return false; // User exists
  users[username] = { password };
  localStorage.setItem('users', JSON.stringify(users));
  return true;
}

// Authenticate user
function loginUser(username, password) {
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  if (users[username] && users[username].password === password) {
    localStorage.setItem('currentUser', username);
    return true;
  }
  return false;
}

// Logout user
function logoutUser() {
  localStorage.removeItem('currentUser');
}

// Get current logged-in user
function getCurrentUser() {
  return localStorage.getItem('currentUser');
}

// Save tasks for a user
function saveUserTasks(tasks) {
  const user = getCurrentUser();
  if (!user) return;
  localStorage.setItem('tasks_' + user, JSON.stringify(tasks));
}

// Load tasks for a user
function loadUserTasks() {
  const user = getCurrentUser();
  if (!user) return [];
  return JSON.parse(localStorage.getItem('tasks_' + user) || '[]');
}

// Export functions for use in other modules
export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  saveUserTasks,
  loadUserTasks
};
