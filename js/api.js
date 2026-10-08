/**
 * Servicio centralizado de comunicación con la API de Palmeras en la Mancha Records
 */
const API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://127.0.0.1:8000/api/v1'
  : 'https://palmeras-records-api.onrender.com/api/v1';

const ApiService = {
  // --- Filiales / Sucursales ---
  async getFiliales() {
    try {
      const response = await fetch(`${API_BASE_URL}/branches/`);
      if (!response.ok) throw new Error('Error al obtener filiales');
      return await response.json();
    } catch (error) {
      console.warn('API error /branches/:', error);
      return [];
    }
  },

  async saveFilial(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/branches/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Error al guardar filial');
      return await response.json();
    } catch (error) {
      console.warn('API error saveFilial:', error);
      return data;
    }
  },

  // --- Álbumes ---
  async getAlbums(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.title) params.append('title', filters.title);
      if (filters.artist) params.append('artist', filters.artist);
      if (filters.genre) params.append('genre', filters.genre);
      if (filters.label_id) params.append('label_id', filters.label_id);

      const url = `${API_BASE_URL}/albums/${params.toString() ? '?' + params.toString() : ''}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al obtener álbumes');
      return await response.json();
    } catch (error) {
      console.warn('API error getAlbums:', error);
      return [];
    }
  },

  async getAlbum(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/albums/${id}`);
      if (!response.ok) throw new Error('Error al obtener álbum');
      return await response.json();
    } catch (error) {
      console.warn(`API error getAlbum(${id}):`, error);
      return null;
    }
  },

  // --- Discográficas ---
  async getRecordLabels() {
    try {
      const response = await fetch(`${API_BASE_URL}/record-labels/`);
      if (!response.ok) throw new Error('Error al obtener discográficas');
      return await response.json();
    } catch (error) {
      console.warn('API error getRecordLabels:', error);
      return [];
    }
  },

  // --- Formatos ---
  async getFormats() {
    try {
      const response = await fetch(`${API_BASE_URL}/formats/`);
      if (!response.ok) throw new Error('Error al obtener formatos');
      return await response.json();
    } catch (error) {
      console.warn('API error getFormats:', error);
      return [];
    }
  }
};