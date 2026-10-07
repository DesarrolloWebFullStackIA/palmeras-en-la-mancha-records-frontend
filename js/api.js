/**
 * Servicio de comunicación con json-server
 */
const API_BASE_URL = 'http://localhost:3000';

const ApiService = {
  /**
   * Obtiene la lista de filiales
   */
  async getFiliales() {
    try {
      const response = await fetch(`${API_BASE_URL}/filiales`);
      if (!response.ok) throw new Error('Error al obtener filiales');
      return await response.json();
    } catch (error) {
      console.warn('API Offline: Usando datos estáticos de respaldo', error);
      return [];
    }
  },

  /**
   * Guarda o actualiza los datos de una filial
   */
  async saveFilial(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/filiales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      console.warn('Simulando guardado local offline', error);
      return data;
    }
  },

  /**
   * Registra una nueva transferencia de stock
   */
  async createTransfer(transferData) {
    try {
      const response = await fetch(`${API_BASE_URL}/transferencias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transferData)
      });
      return await response.json();
    } catch (error) {
      console.warn('Simulando registro local offline', error);
      return transferData;
    }
  }
};