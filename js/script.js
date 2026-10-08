console.log("SCRIPT.JS cargado correctamente.");

// Detección automática del entorno: local (FastAPI) o producción (Render)
const API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://127.0.0.1:8000/api/v1'
    : 'https://palmeras-records-api.onrender.com/api/v1';


// ===============================
// HELPER: Form Data Builder
// ===============================
function toFormData(data) {
    if (data instanceof FormData) return data;
    const formData = new FormData();
    for (const key in data) {
        if (data[key] !== undefined && data[key] !== null) {
            formData.append(key, data[key]);
        }
    }
    return formData;
}


// ===============================
// API: ALBUMS
// ===============================

async function getAlbums(filters = {}) {
    try {
        const params = new URLSearchParams();
        if (filters.title) params.append('title', filters.title);
        if (filters.artist) params.append('artist', filters.artist);
        if (filters.genre) params.append('genre', filters.genre);
        if (filters.label_id) params.append('label_id', filters.label_id);

        const url = `${API_BASE_URL}/albums/${params.toString() ? '?' + params.toString() : ''}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al obtener álbumes:', error);
        return [];
    }
}

async function getAlbum(albumId) {
    try {
        const response = await fetch(`${API_BASE_URL}/albums/${albumId}`);

        if (!response.ok) {
            throw new Error('Error al obtener el álbum');
        }

        return await response.json();
    } catch (error) {
        console.error('Error getAlbum:', error);
        return null;
    }
}

async function createAlbum(albumData) {
    try {
        const body = toFormData(albumData);
        const response = await fetch(`${API_BASE_URL}/albums/`, {
            method: 'POST',
            body: body
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.detail || 'Error al crear el álbum');
        }

        return await response.json();
    } catch (error) {
        console.error('Error createAlbum:', error);
        alert(error.message || 'No se pudo crear el álbum.');
        return null;
    }
}

async function updateAlbum(albumId, albumData) {
    try {
        const body = toFormData(albumData);
        const response = await fetch(`${API_BASE_URL}/albums/${albumId}`, {
            method: 'PUT',
            body: body
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.detail || 'Error al actualizar el álbum');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updateAlbum:', error);
        alert(error.message || 'No se pudo actualizar el álbum.');
        return null;
    }
}

async function deleteAlbum(albumId) {
    if (!confirm('¿Estás seguro de que deseas eliminar este álbum?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/albums/${albumId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el álbum');
        }

        alert('Álbum eliminado correctamente.');

        // Si estamos en la página del catálogo, recargar lista
        if (typeof loadAlbums === 'function') {
            await loadAlbums();
        } else {
            window.location.reload();
        }
    } catch (error) {
        console.error('Error deleteAlbum:', error);
        alert('No se pudo eliminar el álbum.');
    }
}


// ===============================
// API: RECORD LABELS (DISCOGRÁFICAS)
// ===============================

async function getRecordLabels() {
    try {
        const response = await fetch(`${API_BASE_URL}/record-labels/`);
        if (!response.ok) throw new Error('Error al obtener discográficas');
        return await response.json();
    } catch (error) {
        console.error('Error getRecordLabels:', error);
        return [];
    }
}


// ===============================
// NAVIGATION
// ===============================

function goToCreatePage() {
    const isSubfolder = window.location.pathname.includes('/html/');
    window.location.href = isSubfolder ? 'album.html' : 'html/album.html';
}

function goToEditPage(albumId) {
    const isSubfolder = window.location.pathname.includes('/html/');
    const base = isSubfolder ? 'album.html' : 'html/album.html';
    window.location.href = `${base}?id=${albumId}`;
}

function goToMainMenu() {
    const isSubfolder = window.location.pathname.includes('/html/');
    window.location.href = isSubfolder ? '../index.html' : 'index.html';
}