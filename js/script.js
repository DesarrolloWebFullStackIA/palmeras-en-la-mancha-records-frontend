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


// ===============================
// CATALOG RENDERING & SEARCH
// ===============================

function renderAlbumCard(album) {
    const labelName = album.record_label?.name || 'Sello Independiente';
    const coverHtml = album.cover_image_url
        ? `<img src="${album.cover_image_url}" alt="${album.title}" class="w-full h-full object-cover rounded-xl">`
        : `
          <div class="w-4/5 aspect-square rounded-full bg-slate-900 flex items-center justify-center shadow-lg">
            <div class="w-20 h-20 rounded-full bg-blue-600 flex flex-col items-center justify-center text-white text-center">
              <span class="text-[8px] font-bold">PLM-${album.id}</span>
              <span class="material-symbols-outlined text-base">album</span>
              <span class="text-[7px]">33⅓ RPM</span>
            </div>
          </div>
        `;

    return `
      <article class="album-card bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between">
        <div>
          <div class="w-full aspect-square bg-slate-100 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden relative"
               onclick="goToEditPage(${album.id})">
            ${coverHtml}
            ${album.genre ? `<span class="absolute top-2 right-2 bg-slate-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">${album.genre}</span>` : ''}
          </div>

          <div class="mt-4">
            <h2 class="font-bold text-lg text-slate-900 truncate" title="${album.title}">
              ${album.title}
            </h2>
            <p class="text-sm text-slate-600 mt-0.5 truncate">
              ${album.artist}
            </p>
            <div class="flex items-center justify-between text-xs text-slate-500 mt-2">
              <span class="truncate">${labelName}</span>
              <span class="font-semibold text-slate-700">${album.release_year || ''}</span>
            </div>
          </div>
        </div>

        <div class="flex gap-2 mt-4 pt-3 border-t border-slate-100">
          <button type="button" onclick="goToEditPage(${album.id})"
            class="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition flex items-center justify-center gap-1.5 shadow-sm">
            <span class="material-symbols-outlined text-[16px]">edit</span>
            Editar
          </button>
          <button type="button" onclick="deleteAlbum(${album.id})"
            class="py-2 px-3 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-lg text-sm font-semibold transition flex items-center justify-center"
            title="Eliminar álbum">
            <span class="material-symbols-outlined text-[16px]">delete</span>
          </button>
        </div>
      </article>
    `;
}

async function loadAlbums(query = '') {
    const grid = document.getElementById('albumsCatalogGrid');
    if (!grid) return;

    grid.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-500">
            <span class="material-symbols-outlined text-4xl animate-spin text-blue-600">progress_activity</span>
            <p class="mt-2 text-sm font-medium">Cargando catálogo musical...</p>
        </div>
    `;

    const filters = {};
    if (query && query.trim()) {
        filters.title = query.trim();
    }

    const albums = await getAlbums(filters);

    if (!albums || albums.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-16 text-center text-slate-400 bg-white border border-dashed border-slate-300 rounded-2xl p-8">
                <span class="material-symbols-outlined text-5xl text-slate-300">library_music</span>
                <h3 class="text-base font-bold text-slate-700 mt-2">No se encontraron álbumes</h3>
                <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    ${query ? `No hay resultados para "${query}".` : 'El catálogo está vacío actualmente.'}
                </p>
                <button type="button" onclick="goToCreatePage()"
                    class="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition inline-flex items-center gap-1.5 shadow-sm">
                    <span class="material-symbols-outlined text-[16px]">add_circle</span>
                    Añadir Nuevo Álbum
                </button>
            </div>
        `;
        return;
    }

    grid.innerHTML = albums.map(renderAlbumCard).join('');
}

function setupCatalogSearch() {
    const searchInput = document.getElementById('catalogSearchInput');
    if (!searchInput) return;

    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            loadAlbums(e.target.value);
        }, 300);
    });
}

// ===============================
// ALBUM FORM & CLOUDINARY UPLOAD
// ===============================

let selectedCoverFile = null;

function triggerCoverUpload() {
    const fileInput = document.getElementById('coverFileInput');
    if (fileInput) fileInput.click();
}

function handleCoverFileSelected(event) {
    const file = event.target.files[0];
    if (!file) return;

    selectedCoverFile = file;

    const previewImg = document.getElementById('coverPreviewImg');
    const defaultPlaceholder = document.getElementById('coverDefaultPlaceholder');

    if (previewImg && defaultPlaceholder) {
        previewImg.src = URL.createObjectURL(file);
        previewImg.classList.remove('hidden');
        defaultPlaceholder.classList.add('hidden');
    }
}

function removeCover() {
    selectedCoverFile = null;
    const fileInput = document.getElementById('coverFileInput');
    if (fileInput) fileInput.value = '';

    const previewImg = document.getElementById('coverPreviewImg');
    const defaultPlaceholder = document.getElementById('coverDefaultPlaceholder');

    if (previewImg && defaultPlaceholder) {
        previewImg.src = '';
        previewImg.classList.add('hidden');
        defaultPlaceholder.classList.remove('hidden');
    }
}

async function populateRecordLabelsDropdown(selectedId = null) {
    const select = document.getElementById('labelId');
    if (!select) return;

    const labels = await getRecordLabels();
    if (!labels || labels.length === 0) {
        select.innerHTML = '<option value="">Sin discográficas registradas</option>';
        return;
    }

    select.innerHTML = `
        <option value="">Selecciona una discográfica...</option>
        ${labels.map(l => `<option value="${l.id}" ${Number(selectedId) === Number(l.id) ? 'selected' : ''}>${l.name} (${l.country || 'N/A'})</option>`).join('')}
    `;
}

async function initAlbumForm() {
    const titleEl = document.getElementById('albumTitle');
    if (!titleEl) return; // No estamos en la página de formulario

    const params = new URLSearchParams(window.location.search);
    const albumId = params.get('id');

    if (albumId) {
        // Modo Edición
        document.getElementById('albumPageTitle').textContent = 'Cargando Álbum...';
        const album = await getAlbum(albumId);

        if (!album) {
            alert('No se pudo encontrar el álbum solicitado.');
            goToMainMenu();
            return;
        }

        document.getElementById('albumPageTitle').textContent = `Editar Álbum: ${album.title}`;
        document.getElementById('albumBadge').textContent = 'Edición Fonográfica Oficial';
        document.getElementById('btnSaveAlbum').innerHTML = '💾 Guardar Cambios';
        document.getElementById('albumIdDisplay').textContent = `PLM-LP-${album.id}`;

        // Rellenar campos
        document.getElementById('albumTitle').value = album.title || '';
        document.getElementById('artist').value = album.artist || '';
        document.getElementById('genre').value = album.genre || '';
        document.getElementById('releaseYear').value = album.release_year || '';

        // Cargar discográficas y preseleccionar la actual
        await populateRecordLabelsDropdown(album.label_id);

        // Previsualización de carátula
        const previewImg = document.getElementById('coverPreviewImg');
        const defaultPlaceholder = document.getElementById('coverDefaultPlaceholder');
        if (album.cover_image_url && previewImg && defaultPlaceholder) {
            previewImg.src = album.cover_image_url;
            previewImg.classList.remove('hidden');
            defaultPlaceholder.classList.add('hidden');
        } else if (defaultPlaceholder) {
            document.getElementById('coverPreviewTitle').textContent = album.title;
            document.getElementById('coverPreviewArtist').textContent = album.artist;
        }
    } else {
        // Modo Creación
        document.getElementById('albumPageTitle').textContent = 'Nuevo Álbum / Lanzamiento';
        document.getElementById('albumBadge').textContent = 'Alta en Catálogo';
        document.getElementById('btnSaveAlbum').innerHTML = '✨ Crear Álbum';
        document.getElementById('albumIdDisplay').textContent = 'PLM-NUEVO';

        await populateRecordLabelsDropdown();
    }
}

async function saveChanges() {
    const params = new URLSearchParams(window.location.search);
    const albumId = params.get('id');

    const title = document.getElementById('albumTitle')?.value.trim();
    const artist = document.getElementById('artist')?.value.trim();
    const labelId = document.getElementById('labelId')?.value;
    const genre = document.getElementById('genre')?.value.trim();
    const releaseYear = document.getElementById('releaseYear')?.value.trim();

    if (!title || !artist || !labelId || !releaseYear) {
        alert('Por favor completa todos los campos obligatorios (*): Título, Artista, Discográfica y Año.');
        return;
    }

    const saveBtn = document.getElementById('btnSaveAlbum');
    if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.innerHTML = '⏳ Guardando...';
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('label_id', labelId);
    formData.append('release_year', releaseYear);
    if (genre) formData.append('genre', genre);
    if (selectedCoverFile) formData.append('image', selectedCoverFile);

    let result;
    if (albumId) {
        result = await updateAlbum(albumId, formData);
    } else {
        result = await createAlbum(formData);
    }

    if (result) {
        alert(albumId ? '¡Álbum actualizado con éxito!' : '¡Álbum creado con éxito!');
        goToMainMenu();
    } else if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = albumId ? '💾 Guardar Cambios' : '✨ Crear Álbum';
    }
}

// Inicialización automática
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('albumsCatalogGrid')) {
        loadAlbums();
        setupCatalogSearch();
    }
    if (document.getElementById('albumTitle')) {
        initAlbumForm();
    }
    initAdvancedFilters();
});

// ===============================
// ADVANCED FILTER ENGINE (Axios)
// ===============================
function getFilterParams() {
    const read = (id) => document.getElementById(id)?.value?.trim() ?? '';
    const genericSearch = read('catalogSearchInput');
    const dedicatedArtist = read('filterArtistInput') || read('filterArtist');
    const dedicatedTitle = read('filterTitleInput') || read('filterTitle');

    return {
        artist: dedicatedArtist || (dedicatedTitle ? '' : genericSearch),
        title: dedicatedTitle || genericSearch,
        label_id: read('filterLabelId') || read('filterLabel'),
        branch_id: read('filterBranchId') || read('filterBranch'),
        format_id: read('filterFormatId') || read('filterFormat')
    };
}

function buildAlbumsQueryString(filters) {
    const params = new URLSearchParams();
    if (filters.artist) params.append('artist', filters.artist);
    if (filters.title) params.append('title', filters.title);
    if (filters.label_id) params.append('label_id', filters.label_id);
    if (filters.branch_id) params.append('branch_id', filters.branch_id);
    if (filters.format_id) params.append('format_id', filters.format_id);
    const serialized = params.toString();
    return serialized ? `?${serialized}` : '';
}

function ensureAxiosClient() {
    if (window.axios) return Promise.resolve(true);
    return new Promise((resolve, reject) => {
        const tag = document.createElement('script');
        tag.src = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';
        tag.onload = () => resolve(true);
        tag.onerror = () => reject(new Error('Axios CDN failed'));
        document.head.appendChild(tag);
    });
}

function normalizeAlbumList(payload) {
    if (Array.isArray(payload)) return payload;
    if (payload && typeof payload === 'object') {
        return payload.items ?? payload.data ?? payload.results ?? [];
    }
    return [];
}

function renderFilterEmpty(grid, message) {
    grid.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-400 bg-white border border-dashed border-slate-300 rounded-2xl p-8">
            <span class="material-symbols-outlined text-5xl text-slate-300">search_off</span>
            <h3 class="text-base font-bold text-slate-700 mt-2">${message}</h3>
            <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Prueba con otros términos o limpia los filtros.</p>
            <button type="button" onclick="clearAlbumFilters()"
                class="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition">Limpiar filtros</button>
        </div>`;
}

async function fetchFilteredAlbums() {
    const grid = document.getElementById('albumsCatalogGrid');
    if (!grid) return;

    const queryString = buildAlbumsQueryString(getFilterParams());

    try {
        await ensureAxiosClient();
    } catch (_) {
        return loadAlbums();
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/albums/${queryString}`, { timeout: 10000 });
        const albums = normalizeAlbumList(response.data);

        if (!albums.length) {
            renderFilterEmpty(grid, 'No se encontraron álbumes con los filtros seleccionados.');
            return;
        }

        grid.innerHTML = typeof renderAlbumCard === 'function'
            ? albums.map(renderAlbumCard).join('')
            : '';
    } catch (error) {
        console.error('fetchFilteredAlbums failed:', error);
        if (error.response && error.response.status === 404) {
            renderFilterEmpty(grid, 'No se encontraron álbumes con los filtros seleccionados.');
        } else {
            renderFilterEmpty(grid, 'No se pudo conectar con el catálogo. Inténtalo de nuevo.');
        }
    }
}

function clearAlbumFilters() {
    ['catalogSearchInput', 'filterArtistInput', 'filterTitleInput', 'filterLabelId', 'filterBranchId', 'filterFormatId', 'filterLabel', 'filterBranch', 'filterFormat']
        .forEach((id) => { const el = document.getElementById(id); if (el) el.value = ''; });
    fetchFilteredAlbums();
}

let advancedFilterDebounceTimer;

function initAdvancedFilters() {
    if (!document.getElementById('albumsCatalogGrid')) return;

    const searchInput = document.getElementById('catalogSearchInput');
    if (searchInput && !searchInput.dataset.advancedBound) {
        const freshInput = searchInput.cloneNode(true);
        freshInput.dataset.advancedBound = 'true';
        searchInput.replaceWith(freshInput);
        freshInput.addEventListener('input', () => {
            clearTimeout(advancedFilterDebounceTimer);
            advancedFilterDebounceTimer = setTimeout(fetchFilteredAlbums, 300);
        });
    }

    ['filterArtistInput', 'filterTitleInput', 'filterArtist', 'filterTitle'].forEach((id) => {
        const el = document.getElementById(id);
        if (el && !el.dataset.advancedBound) {
            el.dataset.advancedBound = 'true';
            el.addEventListener('input', () => {
                clearTimeout(advancedFilterDebounceTimer);
                advancedFilterDebounceTimer = setTimeout(fetchFilteredAlbums, 300);
            });
        }
    });

    ['filterLabelId', 'filterBranchId', 'filterFormatId', 'filterLabel', 'filterBranch', 'filterFormat'].forEach((id) => {
        const el = document.getElementById(id);
        if (el && !el.dataset.advancedBound) {
            el.dataset.advancedBound = 'true';
            el.addEventListener('change', fetchFilteredAlbums);
        }
    });
}
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.classList.add('flex');
    } else {
        menu.classList.remove('flex');
        menu.classList.add('hidden');
    }
}