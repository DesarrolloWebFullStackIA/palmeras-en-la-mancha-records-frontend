// connectedCallback es un metodo de web component, se ejecuta automaticamente cuando carga la web

class headerComponent extends HTMLElement {
  connectedCallback() {
    const isRoot = !window.location.pathname.includes('/html/');
    const logoSrc = isRoot ? 'img/logo.png' : '../img/logo.png';
    const catalogHref = isRoot ? 'index.html' : '../index.html';
    const filialesHref = isRoot ? 'html/filiales.html' : 'filiales.html';
    const discograficasHref = isRoot ? 'html/discograficas.html' : 'discograficas.html';
    const edicionesHref = isRoot ? 'html/ediciones-albumes.html' : 'ediciones-albumes.html';

    const path = window.location.pathname;
    const isCat = isRoot || path.endsWith('index.html');
    const isFil = path.includes('filiales.html');
    const isDisc = path.includes('discograficas.html');
    const isEdic = path.includes('ediciones-albumes.html') || path.includes('album.html');

  this.innerHTML =  `
  <header class="main-header">
    <div class="header-container">

      <div class="brand-group">
        <a href="${catalogHref}" class="brand-logo-wrapper" style="text-decoration: none; color: inherit; display: flex; align-items: center; gap: 12px;">
          <img
            alt="Emblema oficial de Palmeras en la Mancha Records"
            class="brand-logo"
            src="${logoSrc}"
          />
          <div class="brand-text">
            <span class="brand-title">Palmeras en la Mancha Records</span>
          </div>
        </a>
      </div>

      <div class="header-divider">
        <nav class="nav-tabs" id="navTabs">
          <a class="nav-link ${isCat ? 'active' : ''}" href="${catalogHref}">Catálogo</a>
          <a class="nav-link ${isFil ? 'active' : ''}" href="${filialesHref}">Filiales</a>
          <a class="nav-link ${isDisc ? 'active' : ''}" href="${discograficasHref}">Discográficas &amp; Productoras</a>
          <a class="nav-link ${isEdic ? 'active' : ''}" href="${edicionesHref}">Ediciones de Álbumes</a>
        </nav>
      </div>

      <div class="header-actions">

        <div class="select-wrapper hidden md:block">
          <select class="branch-select">
            <option value="toledo">Sucursal Central - Toledo</option>
            <option value="albacete">Filial Albacete</option>
            <option value="ciudad-real">Filial Ciudad Real</option>
          </select>
          <span class="material-symbols-outlined select-arrow">expand_more</span>
        </div>

        <button
          id="menuButton"
          onclick="toggleMobileMenu()"
          class="block md:hidden p-2 text-gray-700"
          type="button"
        >
          <span class="material-symbols-outlined">menu</span>
        </button>

      </div>

    </div>

    <div id="mobileMenu" class="hidden md:hidden flex-col border-t border-gray-200 bg-white">

      <a href="${catalogHref}" class="block px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100">
        Catálogo
      </a>

      <a href="${filialesHref}" class="block px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100">
        Filiales
      </a>

      <a href="${discograficasHref}" class="block px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100">
        Discográficas &amp; Productoras
      </a>

      <a href="${edicionesHref}" class="block px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100">
        Ediciones de Álbumes
      </a>

    </div>

  </header>
`;
  }
}

class footerComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="main-footer">
        <div class="footer-container">
          <div class="footer-brand">
            <span class="footer-title">Palmeras en la Mancha</span>
            <span class="footer-divider">|</span>
            <span class="footer-subtitle">
              Sistema de Inventario &amp; Gestión Musical
            </span>
          </div>

          <div class="footer-sync">
            <span class="pulse-dot"></span>
            <span>Cloudinary CDN Sync Active</span>
          </div>

          <div class="footer-copy">
            © 2026 Palmeras en la Mancha Records. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    `;
  }
}

// Para definir el nombre al componente y que salte el callback
if (!customElements.get('header-component')) {
  customElements.define('header-component', headerComponent);
}

if (!customElements.get('footer-component')) {
  customElements.define('footer-component', footerComponent);
}
