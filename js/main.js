import { initSearch } from './search.js';
import { initStockActions } from './stock.js';

document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initStockActions();
});

// Nombre de canal único para la comunicación
const modalChannel = new BroadcastChannel('kanban_modal_channel');

// Variable auxiliar para saber qué tarea o datos se están editando
let tareaEnEdicion = null;

// Escuchar los mensajes que vienen de la pestaña del modal
modalChannel.onmessage = (event) => {
  const { type, payload } = event.data;

  // La nueva pestaña nos avisa que ya cargó el DOM y está lista
  if (type === 'MODAL_READY') {
    modalChannel.postMessage({
      type: 'INIT_DATA',
      payload: tareaEnEdicion
    });
  }

  // La nueva pestaña guardó los datos
  if (type === 'SAVE_DATA') {
    guardarTareaEnPrincipal(payload);
  }
};

// Función para abrir la pestaña del modal
function abrirModalEnPestana(datosTarea = null) {
  // Guardamos la tarea que queremos pasar (null si es una nueva tarea)
  tareaEnEdicion = datosTarea;
  
  // Abre el nuevo archivo HTML en una pestaña nueva
  window.open('modal.html', '_blank');
}

// Función para actualizar la UI y estado de tu app principal
function guardarTareaEnPrincipal(data) {
  if (data.id) {
    // Lógica para ACTUALIZAR tarea existente
    console.log('Actualizando tarea:', data);
  } else {
    // Lógica para CREAR nueva tarea
    console.log('Creando nueva tarea:', data);
  }
}