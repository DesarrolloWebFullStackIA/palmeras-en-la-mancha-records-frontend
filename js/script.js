console.log("SCRIPT.JS FOI CARREGADO");

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';


// ===============================
// GET ALBUM
// ===============================

async function getAlbum(albumId) {
    try {
        const response = await fetch(`${API_BASE_URL}/albums/${albumId}`);

        if (!response.ok) {
            throw new Error('Error al obtener el álbum');
        }

        return await response.json();

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}


// ===============================
// CREATE ALBUM
// ===============================

async function createAlbum(albumData) {
    try {
        const response = await fetch(`${API_BASE_URL}/albums/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(albumData)
        });

        if (!response.ok) {
            throw new Error('Error al crear el álbum');
        }

        return await response.json();

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}


// ===============================
// UPDATE ALBUM
// ===============================

async function updateAlbum(albumId, albumData) {
    try {
        const response = await fetch(`${API_BASE_URL}/albums/${albumId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(albumData)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el álbum');
        }

        return await response.json();

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}


// ===============================
// DELETE ALBUM
// ===============================

async function deleteAlbum(albumId) {

    if (!confirm('¿Estás segura de que deseas eliminar este álbum?')) {
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

        window.location.reload();

    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo eliminar el álbum.');
    }
}


// ===============================
// NAVIGATION
// ===============================

function goToCreatePage() {
    window.location.href = 'html/crear-album.html';
}


function goToEditPage(albumId) {
    window.location.href = `html/album.html?id=${albumId}`;
}


function openAlbum(albumId) {
    goToEditPage(albumId);
}


function goToMainMenu() {
    window.location.href = '../index.html';
}


// ===============================
// SAVE CHANGES
// ===============================

async function saveChanges() {

    const params = new URLSearchParams(window.location.search);
    const albumId = params.get('id');

    if (!albumId) {
        alert('No se encontró el ID del álbum.');
        return;
    }

    const albumData = {
        title: document.getElementById('albumTitle')?.value,
        artist: document.getElementById('artist')?.value,
        genre: document.getElementById('genre')?.value,
        release_year: Number(
            document.getElementById('releaseYear')?.value
        )
    };

    const updatedAlbum = await updateAlbum(albumId, albumData);

    if (updatedAlbum) {
        alert('¡Cambios guardados exitosamente!');
        window.location.href = '../index.html';
    }
}



function uploadCover() {

    const fileInput = document.createElement('input');

    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = (event) => {

        const file = event.target.files[0];

        if (file) {
            console.log('New cover selected:', file.name);
            alert(`Carátula seleccionada: ${file.name}`);
        }
    };

    fileInput.click();
}


function deleteCover() {

    if (confirm('¿Estás segura de que deseas eliminar la carátula actual?')) {
        console.log('Cover deleted.');
        alert('Carátula eliminada correctamente.');
    }
}