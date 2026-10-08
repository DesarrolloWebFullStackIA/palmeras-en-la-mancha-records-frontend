/**
 * Servicio API centralizado para Palmeras en la Mancha Records
 * Conecta el frontend con la API FastAPI en local y en producción (Render).
 */

window.API_BASE_URL = window.API_BASE_URL || (
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://127.0.0.1:8000/api/v1'
        : 'https://palmeras-records-api.onrender.com/api/v1'
);

const api = {
    baseUrl: window.API_BASE_URL,

    // ==========================================
    // ÁLBUMES
    // ==========================================
    async getAlbums(filters = {}) {
        try {
            const params = new URLSearchParams();
            if (filters.title) params.append('title', filters.title);
            if (filters.artist) params.append('artist', filters.artist);
            if (filters.genre) params.append('genre', filters.genre);
            if (filters.label_id) params.append('label_id', filters.label_id);
            if (filters.branch_id) params.append('branch_id', filters.branch_id);
            if (filters.format_id) params.append('format_id', filters.format_id);

            const queryString = params.toString() ? `?${params.toString()}` : '';
            const res = await fetch(`${API_BASE_URL}/albums/${queryString}`);
            if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('Error al obtener álbumes:', err);
            return [];
        }
    },

    async getAlbum(id) {
        try {
            const res = await fetch(`${API_BASE_URL}/albums/${id}`);
            if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error(`Error al obtener álbum #${id}:`, err);
            return null;
        }
    },

    async createAlbum(formData) {
        try {
            const res = await fetch(`${API_BASE_URL}/albums/`, {
                method: 'POST',
                body: formData,
            });
            if (!res.ok) {
                const errorData = await res.json().catch(() => null);
                throw new Error(errorData?.detail || `HTTP Error ${res.status}`);
            }
            return await res.json();
        } catch (err) {
            console.error('Error al crear álbum:', err);
            alert(`Error al crear álbum: ${err.message}`);
            return null;
        }
    },

    async updateAlbum(id, formData) {
        try {
            const res = await fetch(`${API_BASE_URL}/albums/${id}`, {
                method: 'PUT',
                body: formData,
            });
            if (!res.ok) {
                const errorData = await res.json().catch(() => null);
                throw new Error(errorData?.detail || `HTTP Error ${res.status}`);
            }
            return await res.json();
        } catch (err) {
            console.error(`Error al actualizar álbum #${id}:`, err);
            alert(`Error al actualizar álbum: ${err.message}`);
            return null;
        }
    },

    async deleteAlbum(id) {
        try {
            const res = await fetch(`${API_BASE_URL}/albums/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
            return true;
        } catch (err) {
            console.error(`Error al eliminar álbum #${id}:`, err);
            return false;
        }
    },

    // ==========================================
    // FILIALES (BRANCHES)
    // ==========================================
    async getBranches(includeAlbums = false) {
        try {
            const url = `${API_BASE_URL}/branches/?include_albums=${includeAlbums}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('Error al obtener filiales:', err);
            return [];
        }
    },

    async createBranch(data) {
        try {
            const res = await fetch(`${API_BASE_URL}/branches/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const errData = await res.json().catch(() => null);
                throw new Error(errData?.detail || `HTTP Error ${res.status}`);
            }
            return await res.json();
        } catch (err) {
            console.error('Error al crear filial:', err);
            alert(`Error al crear filial: ${err.message}`);
            return null;
        }
    },

    async deleteBranch(id) {
        try {
            const res = await fetch(`${API_BASE_URL}/branches/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
            return true;
        } catch (err) {
            console.error(`Error al eliminar filial #${id}:`, err);
            return false;
        }
    },

    // ==========================================
    // DISCOGRÁFICAS (RECORD LABELS)
    // ==========================================
    async getRecordLabels() {
        try {
            const res = await fetch(`${API_BASE_URL}/record-labels/`);
            if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('Error al obtener discográficas:', err);
            return [];
        }
    },

    async createRecordLabel(data) {
        try {
            const res = await fetch(`${API_BASE_URL}/record-labels/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const errData = await res.json().catch(() => null);
                throw new Error(errData?.detail || `HTTP Error ${res.status}`);
            }
            return await res.json();
        } catch (err) {
            console.error('Error al crear discográfica:', err);
            alert(`Error al crear discográfica: ${err.message}`);
            return null;
        }
    },

    async deleteRecordLabel(id) {
        try {
            const res = await fetch(`${API_BASE_URL}/record-labels/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
            return true;
        } catch (err) {
            console.error(`Error al eliminar discográfica #${id}:`, err);
            return false;
        }
    },

    // ==========================================
    // FORMATOS FÍSICOS
    // ==========================================
    async getFormats() {
        try {
            const res = await fetch(`${API_BASE_URL}/formats/`);
            if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('Error al obtener formatos:', err);
            return [];
        }
    },

    // ==========================================
    // EDICIONES DE ÁLBUMES (ALBUM FORMATS / STOCK)
    // ==========================================
    async getAlbumFormats() {
        try {
            const res = await fetch(`${API_BASE_URL}/album-formats/`);
            if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('Error al obtener ediciones de álbumes:', err);
            return [];
        }
    },

    async createAlbumFormat(data) {
        try {
            const res = await fetch(`${API_BASE_URL}/album-formats/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const errData = await res.json().catch(() => null);
                throw new Error(errData?.detail || `HTTP Error ${res.status}`);
            }
            return await res.json();
        } catch (err) {
            console.error('Error al crear edición:', err);
            alert(`Error al crear edición: ${err.message}`);
            return null;
        }
    },

    async deleteAlbumFormat(id) {
        try {
            const res = await fetch(`${API_BASE_URL}/album-formats/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
            return true;
        } catch (err) {
            console.error(`Error al eliminar edición #${id}:`, err);
            return false;
        }
    },
};

// Exportar globalmente para todos los scripts
window.api = api;