const modalChannel = new BroadcastChannel('kanban_modal_channel');

// Guardar referencia a la tarea recibida para conservar el ID si es una edición
let currentTaskId = null;

document.addEventListener('DOMContentLoaded', () => {
  // 1. Avisar a la pestaña principal que el modal ya cargó y puede recibir datos
  modalChannel.postMessage({ type: 'MODAL_READY' });

  // 2. Evento para guardar el formulario
  const form = document.getElementById('modalForm'); // Cambia por el ID de tu <form>
  if (form) {
    form.addEventListener('submit', manejarEnvioFormulario);
  }

  // 3. Evento para el botón de cancelar / cerrar
  const btnCancelar = document.getElementById('btnCancelar'); // Opcional: ID de tu botón cancelar
  if (btnCancelar) {
    btnCancelar.addEventListener('click', () => {
      window.close();
    });
  }
});

// Escuchar los datos iniciales que envía main.js
modalChannel.onmessage = (event) => {
  const { type, payload } = event.data;

  if (type === 'INIT_DATA' && payload) {
    currentTaskId = payload.id || null;
    
    // Rellenar los campos del formulario con los datos recibidos
    document.getElementById('taskTitle').value = payload.title || '';
    document.getElementById('taskDescription').value = payload.description || '';
    document.getElementById('taskStatus').value = payload.status || 'todo';
    // Rellena aquí los demás campos según tu HTML...
  }
};

// Función para procesar y enviar los cambios a main.js
function manejarEnvioFormulario(e) {
  e.preventDefault();

  const formData = {
    id: currentTaskId, // Preserva el ID si existe
    title: document.getElementById('taskTitle').value,
    description: document.getElementById('taskDescription').value,
    status: document.getElementById('taskStatus').value,
    // Agrega aquí los campos adicionales que maneje tu formulario
  };

  // Enviar los datos capturados a la pestaña principal
  modalChannel.postMessage({
    type: 'SAVE_DATA',
    payload: formData
  });

  // Cerrar la pestaña actual automáticamente
  window.close();
}