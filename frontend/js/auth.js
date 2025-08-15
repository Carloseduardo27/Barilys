const API_URL = 'http://localhost:3000/api';

// Verificar si el usuario está autenticado en cada página protegida
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('barylis-token');
  const isLoginPage =
    window.location.pathname.endsWith('index.html') ||
    window.location.pathname === '/';

  if (!token && !isLoginPage) {
    window.location.href = 'index.html';
  } else if (token && isLoginPage) {
    window.location.href = 'tables.html';
  }

  const logoutButton = document.getElementById('logout-btn');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('barylis-token');
      window.location.href = 'index.html';
    });
  }
});

// Lógica del formulario de login
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    try {
      const response = await fetch(`${API_URL}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Error al iniciar sesión');
      }

      localStorage.setItem('barylis-token', data.token);
      window.location.href = 'tables.html';
    } catch (error) {
      errorMessage.textContent = error.message;
    }
  });
}
