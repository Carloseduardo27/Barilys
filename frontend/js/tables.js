document.addEventListener('DOMContentLoaded', () => {
  const tablesGrid = document.getElementById('tables-grid');
  const token = localStorage.getItem('barylis-token');

  const fetchTables = async () => {
    try {
      const response = await fetch(`${API_URL}/tables`, {
        headers: { 'x-auth-token': token },
      });
      if (!response.ok) throw new Error('No se pudo cargar las mesas');

      const tables = await response.json();
      renderTables(tables);
    } catch (error) {
      console.error(error);
      tablesGrid.innerHTML = '<p>Error al cargar las mesas.</p>';
    }
  };

  const renderTables = (tables) => {
    tablesGrid.innerHTML = '';
    if (tables.length === 0) {
      tablesGrid.innerHTML =
        '<p>No hay mesas creadas. Ve a la sección de Administración.</p>';
      return;
    }
    tables.forEach((table) => {
      const tableCard = document.createElement('div');
      tableCard.className = `table-card ${
        table.hasActiveOrder ? 'active' : ''
      }`;
      tableCard.innerHTML = `
                <h3>${table.name}</h3>
                <span>${
                  table.hasActiveOrder ? 'Con orden activa' : 'Sin orden activa'
                }</span>
            `;
      tableCard.addEventListener('click', () => {
        // Guardar la info de la mesa para usarla en la página de menú
        localStorage.setItem(
          'selectedTable',
          JSON.stringify({ id: table._id, name: table.name })
        );
        window.location.href = 'menu.html';
      });
      tablesGrid.appendChild(tableCard);
    });
  };

  fetchTables();
});
