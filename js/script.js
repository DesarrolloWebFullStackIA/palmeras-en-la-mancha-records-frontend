console.log("SCRIPT.JS FOI CARREGADO");

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

async function getAlbums() {
    try {
        const response = await fetch(`${API_BASE_URL}/albums/`);

        if (!response.ok) {
            throw new Error('Error al obtener los álbumes');
        }

        const albums = await response.json();

        console.log('Álbumes recibidos:', albums);

        return albums;
    } catch (error) {
        console.error('Error:', error);
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
        console.error('Error:', error);
        return null;
    }
}


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


function switchView(viewName) {
    const catalog = document.getElementById('viewCatalog');
    const edit = document.getElementById('viewEditAlbum');

    if (!catalog || !edit) {
        return;
    }

    if (viewName === 'catalog') {
        catalog.classList.remove('hidden');
        edit.classList.add('hidden');

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    } else if (viewName === 'edit') {
        catalog.classList.add('hidden');
        edit.classList.remove('hidden');

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}



function goToCreatePage() {
    window.location.href = 'html/crear-album.html';
}

function goToEditPage(albumId) {
    window.location.href = `html/album.html?id=${albumId}`;
}

function openAlbum(albumId) {
    window.location.href = `html/album.html?id=${albumId}`;
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Frontend conectado con FastAPI');

    const albums = await getAlbums();

    console.log('Número de álbumes:', albums.length);
});

// Funções de Ação e Navegação com verificações de segurança

function voltarCatalogo() {
    console.log("Voltando para o catálogo principal...");
    alert("Navegando de volta ao Catálogo de Álbumes.");
}

function salvarAlteracoes() {
    console.log("Salvando alterações do álbum...");
    alert("¡Cambios guardados exitosamente!");
}

function subirCaratula() {
    const inputSimulado = document.createElement('input');
    inputSimulado.type = 'file';
    inputSimulado.accept = 'image/*';
    inputSimulado.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("Nova carátula selecionada:", file.name);
            alert(`Carátula seleccionada: ${file.name}`);
        }
    };
    inputSimulado.click();
}

function eliminarCaratula() {
    if (confirm("¿Estás segura de que deseas eliminar la carátula actual?")) {
        console.log("Carátula eliminada.");
        alert("Carátula eliminada correctamente.");
    }
}

function adicionarPista() {
    console.log("Adicionando nova pista ao tracklist...");
    alert("Funcionalidad para añadir una nueva pista al tracklist.");
}