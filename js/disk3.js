document.addEventListener('DOMContentLoaded', () => {
    
    // Elementos de la interfaz
    const searchInput = document.getElementById('search-input');
    const filterSede = document.getElementById('filter-sede');
    const btnReset = document.querySelector('.btn-icon-reset');
    const cards = document.querySelectorAll('.company-card');

    // Función de filtrado combinado
    function filterDashboard() {
        const searchText = searchInput.value.toLowerCase().trim();
        const selectedSede = filterSede.value.toLowerCase();

        cards.forEach(card => {
            const cardName = card.getAttribute('data-name') || '';
            const cardSede = card.getAttribute('data-sede') || '';
            
            // Evaluar condiciones
            const matchesSearch = cardName.includes(searchText);
            const matchesSede = selectedSede === '' || cardSede === selectedSede;

            // Mostrar u ocultar la tarjeta según coincida
            if (matchesSearch && matchesSede) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Eventos en tiempo real
    searchInput.addEventListener('input', filterDashboard);
    filterSede.addEventListener('change', filterDashboard);

    // Botón de resetear filtros
    btnReset.addEventListener('click', () => {
        searchInput.value = '';
        filterSede.value = '';
        filterDashboard();
    });
});

// Acción de simulación para los botones de Lanzamientos
function viewReleases(companyName) {
    alert(`Abriendo el histórico completo de matrices y lanzamientos de: ${companyName}`);
}
