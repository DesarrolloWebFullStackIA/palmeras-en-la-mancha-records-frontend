/**
 * Controlador para la interfaz por Pestañas (Single Page Application)
 */
const UIController = {
  toast: document.getElementById('toast-feedback'),
  toastMsg: document.getElementById('toast-message'),

  /**
   * Cambia de pestaña según el ID del target
   */
  switchTab(targetId) {
    // 1. Ocultar todas las secciones y quitar estado activo de la navegación
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-tab-btn').forEach(btn => btn.classList.remove('active'));

    // 2. Activar la sección requerida
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // 3. Resaltar botón de la barra superior si coincide
    const activeHeaderBtn = document.querySelector(`.nav-tab-btn[data-target="${targetId}"]`);
    if (activeHeaderBtn) {
      activeHeaderBtn.classList.add('active');
    }

    // Subir scroll al cambiar de pestaña
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  /**
   * Abre la pestaña de Edición cargando datos de la filial seleccionada
   */
  loadBranchIntoForm(branchData) {
    document.getElementById('editor-page-title').textContent = branchData.name 
      ? `Editar: ${branchData.name}` 
      : 'Nueva Filial';

    document.getElementById('form-branch-name').value = branchData.name || '';
    document.getElementById('form-branch-address').value = branchData.address || '';
    document.getElementById('form-branch-manager').value = branchData.manager || '';
    document.getElementById('form-branch-capacity').value = branchData.capacity || '';
    document.getElementById('form-branch-notes').value = branchData.notes || '';

    this.switchTab('view-editor');
  },

  /**
   * Abre la pestaña de Transferencia fijando la sede origen
   */
  loadTransferOrigin(originName) {
    if (originName) {
      const select = document.getElementById('transfer-origin');
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === originName) {
          select.selectedIndex = i;
          break;
        }
      }
    }
    this.switchTab('view-transfer');
  },

  /**
   * Muestra notificaciones tipo Toast
   */
  showToast(message) {
    this.toastMsg.textContent = message;
    this.toast.classList.remove('hidden');
    setTimeout(() => {
      this.toast.classList.add('hidden');
    }, 3500);
  },

  /**
   * Registra una fila dinámica en la bitácora de la pestaña principal
   */
  appendTransferToTable(data) {
    const tbody = document.getElementById('transfer-table-body');
    const tr = document.createElement('tr');

    const randomId = 'TRF-2025-' + Math.floor(100 + Math.random() * 900);
    tr.innerHTML = `
      <td class="col-code">${randomId}</td>
      <td class="col-highlight">${data.origen}</td>
      <td>${data.destino}</td>
      <td class="col-muted">${data.contenido}</td>
      <td class="col-bold">${data.unidades} u.</td>
      <td><span class="badge badge-info"><span class="material-symbols-outlined">local_shipping</span> En Tránsito</span></td>
      <td class="text-right col-muted">Ahora mismo</td>
    `;

    tbody.prepend(tr);
  }
};