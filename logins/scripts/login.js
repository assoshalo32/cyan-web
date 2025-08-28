let users = [];

function register() {
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const password = document.getElementById('reg-password').value;
    const errorDiv = document.getElementById('reg-error');

    if (!username || !email || !phone || !password) {
        errorDiv.textContent = 'All fields are required.';
        errorDiv.classList.add('show');
        return;
    }

    const userExists = users.some(user => 
        user.username === username || user.email === email || user.phone === phone
    );

    if (userExists) {
        errorDiv.textContent = 'Username, email, or phone number already exists.';
        errorDiv.classList.add('show');
        return;
    }

    const user = { username, email, phone, password };
    users.push(user);
    saveUsersToJSON();
    errorDiv.classList.remove('show');
    alert('Registration successful! Please login.');
    showLogin();
}

function login() {
    const identifier = document.getElementById('login-identifier').value;
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');

    const user = users.find(user => 
        user.username === identifier || user.email === identifier || user.phone === identifier
    );

    if (!user) {
        errorDiv.textContent = 'User not found.';
        errorDiv.classList.add('show');
        return;
    }

    if (user.password !== password) {
        errorDiv.textContent = 'Incorrect password.';
        errorDiv.classList.add('show');
        return;
    }

    errorDiv.classList.remove('show');
    alert('Login successful!');
}

function saveUsersToJSON() {
    const data = JSON.stringify(users, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.json';
    a.click();
    URL.revokeObjectURL(url);
}

function showLogin() {
    const registerPage = document.getElementById('register-page');
    const loginPage = document.getElementById('login-page');
    const backButton = document.getElementById('back-button');

    registerPage.style.display = 'none';
    loginPage.style.display = 'block';
    
    // Reset and trigger back button animation
    backButton.style.display = 'none';
    backButton.classList.remove('slide-in-button');
    void backButton.offsetWidth; // Force reflow to restart animation
    backButton.style.display = 'block';
    backButton.classList.add('slide-in-button');
}

function showRegister() {
    const loginPage = document.getElementById('login-page');
    const registerPage = document.getElementById('register-page');
    const backButton = document.getElementById('back-button');

    loginPage.style.display = 'none';
    registerPage.style.display = 'block';
    
    // Reset and trigger back button animation
    backButton.style.display = 'none';
    backButton.classList.remove('slide-in-button');
    void backButton.offsetWidth; // Force reflow to restart animation
    backButton.style.display = 'block';
    backButton.classList.add('slide-in-button');
}