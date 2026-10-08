/**
 * Módulo de Gestión de Notificaciones y Toasts
 */

function triggerSaveNotification() {
  const toast = document.getElementById('saveToast');
  if (toast) {
    toast.classList.remove('hidden');
    // Desplazar vista suavemente hacia la notificación si es necesario
    toast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function dismissToast() {
  const toast = document.getElementById('saveToast');
  if (toast) {
    toast.classList.add('hidden');
  }
}

function confirmReset() {
  const confirmacion = window.confirm(
    '¿Está seguro de descartar los cambios no guardados en la edición fonográfica?'
  );
  if (confirmacion) {
    window.location.reload();
  }
}