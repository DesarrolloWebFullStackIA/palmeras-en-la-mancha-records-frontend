/**
 * Módulo de Cálculo de Stock en Red
 */

function recalcTotalStock() {
  const stockToledo = parseInt(document.getElementById('stockToledo')?.value, 10) || 0;
  const stockAlbacete = parseInt(document.getElementById('stockAlbacete')?.value, 10) || 0;
  const stockCiudadReal = parseInt(document.getElementById('stockCiudadReal')?.value, 10) || 0;

  const total = stockToledo + stockAlbacete + stockCiudadReal;

  const totalCounterEl = document.getElementById('totalStockCounter');
  if (totalCounterEl) {
    totalCounterEl.textContent = total;
  }
}