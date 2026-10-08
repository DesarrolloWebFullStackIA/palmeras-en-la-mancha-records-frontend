/**
 * Componentes Web Unificados (Header & Footer) para Palmeras en la Mancha Records
 * Diseño moderno y 100% responsive basado en Tailwind CSS.
 */

class HeaderComponent extends HTMLElement {
    connectedCallback() {
        const isRoot = !window.location.pathname.includes('/html/');
        const prefix = isRoot ? 'html/' : '';
        const rootPrefix = isRoot ? '' : '../';

        const catalogHref = `${rootPrefix}index.html`;
        const filialesHref = `${prefix}filiales.html`;
        const discograficasHref = `${prefix}discograficas.html`;
        const edicionesHref = `${prefix}ediciones-albumes.html`;
        const logoSrc = `${rootPrefix}img/logo.png`;

        const path = window.location.pathname;
        const isCatalogo = isRoot || path.endsWith('index.html') || path.includes('album.html');
        const isFiliales = path.includes('filiales.html');
        const isDiscograficas = path.includes('discograficas.html');
        const isEdiciones = path.includes('ediciones-albumes.html');

        const activeClass = "px-4 py-2 text-sm font-semibold text-blue-700 bg-slate-100 rounded-lg transition";
        const inactiveClass = "px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition";

        this.innerHTML = `
        <header class="fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200 shadow-sm">
            <div class="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
                <a href="${catalogHref}" class="flex items-center gap-3 cursor-pointer select-none no-underline">
                    <div class="w-10 h-10 rounded-full overflow-hidden bg-slate-900 shrink-0 border border-slate-200 shadow-sm">
                        <img src="${logoSrc}" alt="Logo Palmeras en la Mancha" class="w-full h-full object-cover">
                    </div>
                    <div>
                        <div class="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                            Palmeras en la Mancha
                        </div>
                        <div class="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                            Vinyl Records & Archive Console
                        </div>
                    </div>
                </a>

                <!-- Navegación Escritorio -->
                <nav class="hidden md:flex items-center gap-1.5">
                    <a href="${catalogHref}" class="${isCatalogo ? activeClass : inactiveClass}">
                        Catálogo de Álbumes
                    </a>
                    <a href="${filialesHref}" class="${isFiliales ? activeClass : inactiveClass}">
                        Gestión de Filiales
                    </a>
                    <a href="${discograficasHref}" class="${isDiscograficas ? activeClass : inactiveClass}">
                        Discográficas & Productoras
                    </a>
                    <a href="${edicionesHref}" class="${isEdiciones ? activeClass : inactiveClass}">
                        Ediciones de Álbumes
                    </a>
                </nav>

                <!-- Botón Hamburguesa Móvil -->
                <button type="button" id="mobileMenuBtn" class="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none" aria-label="Abrir menú">
                    <span class="material-symbols-outlined text-2xl">menu</span>
                </button>
            </div>

            <!-- Menú Desplegable Móvil -->
            <div id="mobileMenuDropdown" class="hidden md:hidden border-t border-slate-100 bg-white px-6 py-4 space-y-2">
                <a href="${catalogHref}" class="block py-2 text-sm ${isCatalogo ? 'font-bold text-blue-600' : 'text-slate-600'}">Catálogo de Álbumes</a>
                <a href="${filialesHref}" class="block py-2 text-sm ${isFiliales ? 'font-bold text-blue-600' : 'text-slate-600'}">Gestión de Filiales</a>
                <a href="${discograficasHref}" class="block py-2 text-sm ${isDiscograficas ? 'font-bold text-blue-600' : 'text-slate-600'}">Discográficas & Productoras</a>
                <a href="${edicionesHref}" class="block py-2 text-sm ${isEdiciones ? 'font-bold text-blue-600' : 'text-slate-600'}">Ediciones de Álbumes</a>
            </div>
        </header>
        <div class="h-20"></div>
        `;

        // Toggle para el menú móvil
        const btn = this.querySelector('#mobileMenuBtn');
        const menu = this.querySelector('#mobileMenuDropdown');
        if (btn && menu) {
            btn.addEventListener('click', () => {
                menu.classList.toggle('hidden');
            });
        }
    }
}

class FooterComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="bg-white border-t border-slate-200 py-6 px-6 text-center text-xs text-slate-500 mt-auto">
            <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="flex items-center gap-2">
                    <span class="font-bold text-slate-700">Palmeras en la Mancha</span>
                    <span>|</span>
                    <span>Sistema de Inventario &amp; Gestión Musical</span>
                </div>
                <div class="flex items-center gap-2 text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Cloudinary CDN Sync Active</span>
                </div>
                <div class="text-[11px]">
                    &copy; 2026 Palmeras en la Mancha Records. Todos los derechos reservados.
                </div>
            </div>
        </footer>
        `;
    }
}

if (!customElements.get('header-component')) {
    customElements.define('header-component', HeaderComponent);
}

if (!customElements.get('footer-component')) {
    customElements.define('footer-component', FooterComponent);
}
