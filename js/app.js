/**
 * Inicialización global y mapeo de eventos
 */
document.addEventListener('DOMContentLoaded', () => {

  // Evento global para botones navegadores de pestañas (.nav-tab-btn y .nav-trigger)
  document.querySelectorAll('.nav-tab-btn, .nav-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget.dataset.target;
      if (target) {
        UIController.switchTab(target);
      }
    });
  });

  // Botón "+ Nueva Filial" en la vista principal
  const newBranchBtn = document.getElementById('btn-new-branch');
  if (newBranchBtn) {
    newBranchBtn.addEventListener('click', () => {
      UIController.loadBranchIntoForm({
        name: '',
        address: '',
        manager: '',
        capacity: '',
        notes: ''
      });
    });
  }

  // Eventos de botones "Editar en Pestaña" dentro de cada tarjeta
  document.querySelectorAll('.btn-edit-tab').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const ds = e.currentTarget.dataset;
      UIController.loadBranchIntoForm({
        name: ds.name,
        address: ds.address,
        manager: ds.manager,
        capacity: ds.capacity,
        notes: ds.notes
      });
    });
  });

  // Eventos de botones "Transferencia de Stock" dentro de cada tarjeta
  document.querySelectorAll('.btn-transfer-tab').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const origin = e.currentTarget.dataset.origin;
      UIController.loadTransferOrigin(origin);
    });
  });

  // Formulario de Edición de Sede
  document.getElementById('branch-edit-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      nombre: document.getElementById('form-branch-name').value,
      direccion: document.getElementById('form-branch-address').value,
      gerente: document.getElementById('form-branch-manager').value,
      capacidad: document.getElementById('form-branch-capacity').value,
      notes: document.getElementById('form-branch-notes').value
    };

    await ApiService.saveFilial(formData);
    UIController.showToast('Sede guardada con éxito. Datos sincronizados.');
    UIController.switchTab('view-dashboard');
  });

  // Formulario de Transferencia de Stock
  document.getElementById('transfer-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const transferData = {
      origen: document.getElementById('transfer-origin').value,
      destino: document.getElementById('transfer-target').value,
      contenido: document.getElementById('transfer-format').value,
      unidades: document.getElementById('transfer-amount').value,
      urgencia: document.getElementById('transfer-urgency').value
    };

    await ApiService.createTransfer(transferData);
    UIController.appendTransferToTable(transferData);
    UIController.showToast('Orden de traspaso registrada en la bitácora principal.');
    UIController.switchTab('view-dashboard');
  });

});

/**
 * Módulo Principal / Inicializador de la Aplicación
 */

function switchView(viewName) {
  console.log(`Navegando hacia la vista: ${viewName}`);
  // Lógica para alternar vistas en SPAs o redirecciones
}

document.addEventListener('DOMContentLoaded', function () {
  // Inicializar cálculo de stock en carga inicial
  if (typeof recalcTotalStock === 'function') {
    recalcTotalStock();
  }

  // Escuchadores dinámicos
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
});