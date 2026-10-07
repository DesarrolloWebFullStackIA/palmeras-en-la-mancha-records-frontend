const API_URL = 'http://localhost:3000/ediciones';

export async function getEdiciones() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al obtener ediciones');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}

export async function createEdicion(data) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Error al crear edición');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function updateStockApi(id, newStock) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stockRestante: newStock })
    });
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}