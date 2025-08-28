const SUPABASE_URL = 'https://mzuueravpxofrxlgngiy.supabase.co'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16dXVlcmF2cHhvZnJ4bGduZ2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMzUxNjgsImV4cCI6MjA3MTkxMTE2OH0.G6y-RoKohJQkfQ9jSvFK_mh5VfpALwJ98Dve91qQxAs'; // Replace with your Anon Key (public)

// Initialize Supabase client (for client-side session management)
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function register(event) {
    event.preventDefault();
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

    try {
        const response = await fetch('/.netlify/functions/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, phone, password })
        });

        const result = await response.json();

        if (response.ok) {
            await supabase.auth.setSession({
                access_token: result.session.access_token,
                refresh_token: result.session.refresh_token
            });
            alert('Registration successful! Redirecting to dashboard.');
            window.location.href = 'dashboard.html';
        } else {
            errorDiv.textContent = result.error || 'Registration failed.';
            errorDiv.classList.add('show');
        }
    } catch (error) {
        errorDiv.textContent = 'Network error. Please try again.';
        errorDiv.classList.add('show');
        console.error('Register error:', error);
    }
}

async function login(event) {
    event.preventDefault();
    const identifier = document.getElementById('login-identifier').value;
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');

    if (!identifier || !password) {
        errorDiv.textContent = 'Identifier and password are required.';
        errorDiv.classList.add('show');
        return;
    }

    try {
        const response = await fetch('/.netlify/functions/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, password })
        });

        const result = await response.json();

        if (response.ok) {
            await supabase.auth.setSession({
                access_token: result.session.access_token,
                refresh_token: result.session.refresh_token
            });
            alert('Login successful! Redirecting to dashboard.');
            window.location.href = 'dashboard.html';
        } else {
            errorDiv.textContent = result.error || 'Login failed.';
            errorDiv.classList.add('show');
        }
    } catch (error) {
        errorDiv.textContent = 'Network error. Please try again.';
        errorDiv.classList.add('show');
        console.error('Login error:', error);
    }
}

// Attach event listeners
document.getElementById('register-form').addEventListener('submit', register);
document.getElementById('login-form').addEventListener('submit', login);

function showLogin() {
    const registerPage = document.getElementById('register-page');
    const loginPage = document.getElementById('login-page');
    const backButton = document.getElementById('back-button');

    registerPage.style.display = 'none';
    loginPage.style.display = 'block';
    
    backButton.style.display = 'none';
    backButton.classList.remove('slide-in-button');
    void backButton.offsetWidth;
    backButton.style.display = 'block';
    backButton.classList.add('slide-in-button');
}

function showRegister() {
    const loginPage = document.getElementById('login-page');
    const registerPage = document.getElementById('register-page');
    const backButton = document.getElementById('back-button');

    loginPage.style.display = 'none';
    registerPage.style.display = 'block';
    
    backButton.style.display = 'none';
    backButton.classList.remove('slide-in-button');
    void backButton.offsetWidth;
    backButton.style.display = 'block';
    backButton.classList.add('slide-in-button');
}