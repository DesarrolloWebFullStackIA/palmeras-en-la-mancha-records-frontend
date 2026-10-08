//connectedCallback es un metodo de web component, se ejecuta automaticamente cuando carga la web

class headerComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <header class="main-header">
    <div class="header-container">

      <div class="brand-group">
        <div class="brand-logo-wrapper">
          <img
            alt="Emblema oficial de Palmeras en la Mancha Records"
            class="brand-logo"
            src="../img/logo.png"
          />

          <div class="brand-text">
            <span class="brand-title">Palmeras en la Mancha Records</span>
          </div>
        </div>
      </div>

      <div class="header-divider">
        <nav class="nav-tabs" id="navTabs">
          <a class="nav-link" href="../index.html">Catálogo</a>
          <a class="nav-link" href="filiales.html">Filiales</a>
          <a class="nav-link" href="discograficas.html">Discográficas &amp; Productoras</a>
          <a class="nav-link active" href="ediciones-albumes.html">Ediciones de Álbumes</a>
        </nav>
      </div>

      <div class="header-actions">
        <div class="select-wrapper">
          <select class="branch-select">
            <option value="toledo">Sucursal Central - Toledo</option>
            <option value="albacete">Filial Albacete</option>
            <option value="ciudad-real">Filial Ciudad Real</option>
          </select>

          <span class="material-symbols-outlined select-arrow">expand_more</span>
        </div>
      </div>

    </div>
  </header>
        `
  }
}

class footerComponent extends HTMLElement{
    connectedCallback(){
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
        `
    }
}

//Para definir el nombre al componente y que salte el callback
customElements.define('header-component', headerComponent);
customElements.define('footer-component', footerComponent);