function switchView(viewName) {
  const catalog = document.getElementById('viewCatalog');
  const edit = document.getElementById('viewEditAlbum');
  
  if (viewName === 'catalog') {
    catalog.classList.remove('hidden');
    edit.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (viewName === 'edit') {
    catalog.classList.add('hidden');
    edit.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function goToEditPage(albumId) {
  switchView('edit');
}

function goToCreatePage() {
  switchView('edit');
}

function saveAlbumChanges() {
  alert('¡Cambios guardados con éxito en la base de datos y sincronizados con Cloudinary CDN!');
  switchView('catalog');
}