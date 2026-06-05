import { state, navigate } from '../main.js';

export function renderLogin(container) {
    container.innerHTML = `
    <div class="flex-1 flex items-center justify-center p-6 bg-gray-100">
      <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-3xl font-bold text-center text-indigo-600 mb-2">&lt;/Riwi&gt;</h2>
        <p class="text-center text-gray-500 mb-6">Prueba de Desempeño - Gestión Interna</p>
        
        <form id="login-form" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input type="email" id="email" required autocomplete="username" class="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Contraseña</label>
            <input type="password" id="password" required autocomplete="current-password" class="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
          </div>
          <div id="error-message" class="text-red-500 text-sm hidden bg-red-50 p-2.5 rounded-lg border border-red-200"></div>
          <button type="submit" class="w-full bg-indigo-600 text-white p-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  `;

    const form = document.getElementById('login-form');
    const errorDiv = document.getElementById('error-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorDiv.classList.add('hidden');

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // Consumo de json-server para validar credenciales
            const response = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
            const users = await response.json();

            if (users.length > 0) {
                const user = users[0];
                state.user = user;
                localStorage.setItem('riwi_session', JSON.stringify(user)); // Persistencia de sesión
                navigate();
            } else {
                throw new Error('Credenciales incorrectas. Intente nuevamente.');
            }
        } catch (error) {
            errorDiv.innerText = error.message;
            errorDiv.classList.remove('hidden');
        }
    });
}