import { state, navigate } from '../main.js';

export async function renderDashboard(container) {
    const isManager = state.user.role === 'manager';

    // Realizar las consultas a la API en paralelo
    let projects = [];
    let users = [];
    try {
        const [resProj, resUsers] = await Promise.all([
            fetch('http://localhost:3000/projects'),
            fetch('http://localhost:3000/users')
        ]);
        projects = await resProj.json();
        users = await resUsers.json();
    } catch (error) {
        console.error('Error cargando los datos del servidor:', error);
    }

    // Filtrar según el rol (Collaborator solo ve lo suyo)
    const filteredProjects = isManager
        ? projects
        : projects.filter(p => p.assignedTo === state.user.id);

    // Cálculos para las métricas del Dashboard
    const total = filteredProjects.length;
    const active = filteredProjects.filter(p => p.status === 'In Progress').length;
    const completed = filteredProjects.filter(p => p.status === 'Completed').length;

    container.innerHTML = `
    <nav class="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div class="flex items-center gap-4">
        <span class="text-xl font-bold tracking-wider">&lt;/Riwi&gt; Dashboard</span>
        <span class="bg-indigo-500 text-xs px-2 py-1 rounded capitalize font-medium">${state.user.role}</span>
      </div>
      <div class="flex items-center gap-4">
        <span class="text-sm hidden sm:inline">Hola, <strong>${state.user.name}</strong></span>
        <button id="logout-btn" class="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg text-sm font-medium transition shadow">Cerrar Sesión</button>
      </div>
    </nav>

    <main class="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white p-5 rounded-xl shadow border border-gray-100 flex flex-col">
          <span class="text-gray-400 text-sm font-medium uppercase tracking-wider">${isManager ? 'Total Proyectos' : 'Mis Proyectos Asignados'}</span>
          <span class="text-3xl font-bold text-gray-800 mt-1">${total}</span>
        </div>
        <div class="bg-white p-5 rounded-xl shadow border border-gray-100 flex flex-col">
          <span class="text-gray-400 text-sm font-medium uppercase tracking-wider">En Progreso</span>
          <span class="text-3xl font-bold text-amber-500 mt-1">${active}</span>
        </div>
        <div class="bg-white p-5 rounded-xl shadow border border-gray-100 flex flex-col">
          <span class="text-gray-400 text-sm font-medium uppercase tracking-wider">Finalizados</span>
          <span class="text-3xl font-bold text-green-500 mt-1">${completed}</span>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
        <div>
          <h3 class="text-xl font-bold text-gray-800">Administración de Proyectos</h3>
          <p class="text-sm text-gray-500">Lista completa de registros en tiempo real</p>
        </div>
        ${isManager ? `<button id="btn-create" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition shadow">+ Crear Proyecto</button>` : ''}
      </div>

      <div class="bg-white rounded-xl shadow border border-gray-100 overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 text-gray-500 text-xs uppercase font-semibold border-b border-gray-100">
              <th class="p-4">Nombre</th>
              <th class="p-4">Descripción</th>
              <th class="p-4">Estado</th>
              <th class="p-4">Responsable</th>
              <th class="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm text-gray-700">
            ${filteredProjects.map(proj => {
        const assignedUser = users.find(u => u.id === Number(proj.assignedTo));
        return `
                <tr class="hover:bg-gray-50/70 transition">
                  <td class="p-4 font-semibold text-gray-900">${proj.name}</td>
                  <td class="p-4 max-w-xs truncate text-gray-500">${proj.description}</td>
                  <td class="p-4">
                    <span class="px-2.5 py-1 rounded-full text-xs font-semibold ${proj.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}">
                      ${proj.status}
                    </span>
                  </td>
                  <td class="p-4 text-gray-600 font-medium">${assignedUser ? assignedUser.name : 'No asignado'}</td>
                  <td class="p-4 text-right space-x-1 whitespace-nowrap">
                    <button data-id="${proj.id}" class="btn-edit bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 transition">
                      ${isManager ? 'Editar' : 'Cambiar Estado'}
                    </button>
                    ${isManager ? `<button data-id="${proj.id}" class="btn-delete bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-xs font-medium transition">Eliminar</button>` : ''}
                  </td>
                </tr>
              `;
    }).join('')}
            ${filteredProjects.length === 0 ? '<tr><td colspan="5" class="p-8 text-center text-gray-400">No hay proyectos disponibles.</td></tr>' : ''}
          </tbody>
        </table>
      </div>
    </main>

    <div id="modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 hidden z-50">
      <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
        <h4 id="modal-title" class="text-lg font-bold text-gray-900"></h4>
        <form id="modal-form" class="space-y-3">
          <input type="hidden" id="proj-id">
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Nombre del Proyecto</label>
            <input type="text" id="proj-name" required class="mt-1 w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm disabled:bg-gray-100">
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Descripción</label>
            <textarea id="proj-desc" required class="mt-1 w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm disabled:bg-gray-100" rows="3"></textarea>
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</label>
            <select id="proj-status" class="mt-1 w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Asignar Responsable</label>
            <select id="proj-assigned" class="mt-1 w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm disabled:bg-gray-100">
              ${users.filter(u => u.role === 'collaborator').map(u => `<option value="${u.id}">${u.name}</option>`).join('')}
            </select>
          </div>
          <div class="flex justify-end gap-2 pt-2">
            <button type="button" id="btn-close-modal" class="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 transition">Cancelar</button>
            <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  `;

    // --- CONTROLADORES DE EVENTOS ---

    // Logout Funcional
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('riwi_session');
        state.user = null;
        navigate();
    });

    // Referencias del modal
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalForm = document.getElementById('modal-form');
    const btnCloseModal = document.getElementById('btn-close-modal');

    const inputId = document.getElementById('proj-id');
    const inputName = document.getElementById('proj-name');
    const inputDesc = document.getElementById('proj-desc');
    const inputStatus = document.getElementById('proj-status');
    const inputAssigned = document.getElementById('proj-assigned');

    const closeModal = () => modal.classList.add('hidden');
    btnCloseModal.addEventListener('click', closeModal);

    // Apertura para Creación (Solo Managers)
    if (isManager) {
        document.getElementById('btn-create').addEventListener('click', () => {
            modalForm.reset();
            inputId.value = '';
            modalTitle.innerText = 'Crear Nuevo Proyecto';

            inputName.disabled = false;
            inputDesc.disabled = false;
            inputAssigned.disabled = false;

            modal.classList.remove('hidden');
        });
    }

    // Captura de eventos para Editar y Eliminar (Delegación de eventos en la tabla)
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.target.getAttribute('data-id');
            const targetProj = filteredProjects.find(p => p.id == id);

            modalForm.reset();
            modalTitle.innerText = isManager ? 'Editar Proyecto' : 'Actualizar Estado del Proyecto';

            inputId.value = targetProj.id;
            inputName.value = targetProj.name;
            inputDesc.value = targetProj.description;
            inputStatus.value = targetProj.status;
            inputAssigned.value = targetProj.assignedTo;

            // Restricciones severas por Rol (Collaborator solo altera el estado)
            if (!isManager) {
                inputName.disabled = true;
                inputDesc.disabled = true;
                inputAssigned.disabled = true;
            } else {
                inputName.disabled = false;
                inputDesc.disabled = false;
                inputAssigned.disabled = false;
            }

            modal.classList.remove('hidden');
        });
    });

    if (isManager) {
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                if (confirm('¿Está completamente seguro de eliminar este proyecto?')) {
                    const id = e.target.getAttribute('data-id');
                    await fetch(`http://localhost:3000/projects/${id}`, { method: 'DELETE' });
                    renderDashboard(container); // Re-renderizado reactivo local
                }
            });
        });
    }

    // Envío controlado del formulario (Soporta POST, PUT/PATCH según contexto)
    modalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = inputId.value;

        if (!id) {
            // Operación de Creación (POST)
            const newProj = {
                name: inputName.value,
                description: inputDesc.value,
                status: inputStatus.value,
                assignedTo: Number(inputAssigned.value),
                createdAt: new Date().toISOString().split('T')[0]
            };
            await fetch('http://localhost:3000/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProj)
            });
        } else {
            // Operación de Edición / Mutación
            const updateData = isManager ? {
                name: inputName.value,
                description: inputDesc.value,
                status: inputStatus.value,
                assignedTo: Number(inputAssigned.value)
            } : {
                status: inputStatus.value // El Collaborator solo envía el estado parcial
            };

            await fetch(`http://localhost:3000/projects/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            });
        }

        closeModal();
        renderDashboard(container);
    });
}