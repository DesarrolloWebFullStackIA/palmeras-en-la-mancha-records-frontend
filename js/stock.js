export function initStockActions() {
  document.addEventListener('click', (e) => {
    const target = e.target.closest('button');
    if (!target) return;

    if (target.classList.contains('btn-adjust-stock')) {
      const newQty = prompt('Introduzca nuevo ajuste de existencias físicas para este lote:');
      if (newQty !== null && !isNaN(newQty)) {
        alert(`Inventario actualizado a ${newQty} unidades en el registro central.`);
      }
    }

    if (target.classList.contains('btn-factory-sheet')) {
      alert('Descargando especificación técnica de prensado (DMM Cut Sheet & Stamper ID)...');
    }
  });
}