const API_URL = 'https://barilys.onrender.com/api';

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

// --- LÓGICA DEL MODAL PERSONALIZADO ---

// Obtenemos las referencias a los elementos del modal una sola vez
const modal = document.getElementById('custom-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const confirmBtn = document.getElementById('modal-confirm-btn');
const cancelBtn = document.getElementById('modal-cancel-btn');

let onConfirmCallback = null;
let onCancelCallback = null;

// Función para mostrar un modal de confirmación (con dos botones)
function showConfirmModal(title, message, onConfirm, onCancel) {
  if (!modal) return; // Si no hay modal en la página, no hacer nada

  modalTitle.textContent = title;
  modalMessage.textContent = message;
  onConfirmCallback = onConfirm;
  onCancelCallback = onCancel;

  confirmBtn.textContent = 'Aceptar';
  confirmBtn.style.display = 'inline-block';
  cancelBtn.style.display = 'inline-block';
  
  modal.classList.remove('hidden');
  // Re-añadimos la clase para que el navegador fuerce la animación
  setTimeout(() => modal.classList.remove('hidden'), 0);
}

// Función para mostrar un modal de alerta (con un solo botón)
function showAlertModal(title, message, onOk) {
  if (!modal) return;

  modalTitle.textContent = title;
  modalMessage.textContent = message;
  onConfirmCallback = onOk;

  confirmBtn.textContent = 'Entendido';
  confirmBtn.style.display = 'inline-block';
  cancelBtn.style.display = 'none'; // Ocultamos el botón de cancelar

  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.remove('hidden'), 0);
}

function hideModal() {
  if (!modal) return;
  modal.classList.add('hidden');
  // Limpiamos los callbacks para evitar ejecuciones accidentales
  onConfirmCallback = null;
  onCancelCallback = null;
}

// Event Listeners para los botones
if (modal) {
    confirmBtn.addEventListener('click', () => {
        if (typeof onConfirmCallback === 'function') {
            onConfirmCallback();
        }
        hideModal();
    });

    cancelBtn.addEventListener('click', () => {
        if (typeof onCancelCallback === 'function') {
            onCancelCallback();
        }
        hideModal();
    });
}
