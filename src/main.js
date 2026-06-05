import { renderLogin } from './views/login.js';
import { renderDashboard } from './views/dashboard.js';

// Estado global de la sesión
export const state = {
    user: JSON.parse(localStorage.getItem('riwi_session')) || null
};

// Enrutador dinámico que protege las vistas de la SPA
export function navigate() {
    const app = document.getElementById('app');
    app.innerHTML = ''; // Limpieza del contenedor principal (comportamiento SPA)

    if (!state.user) {
        renderLogin(app);
    } else {
        renderDashboard(app);
    }
}

// Inicializar la aplicación al cargar el documento
document.addEventListener('DOMContentLoaded', navigate);