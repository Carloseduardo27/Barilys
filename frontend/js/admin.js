document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('barylis-token');

  // Forms
  const addTableForm = document.getElementById('add-table-form');
  const addMenuItemForm = document.getElementById('add-menu-item-form');

  // Lists
  const tablesList = document.getElementById('tables-list');
  const menuItemsList = document.getElementById('menu-items-list');

  const headers = { 'Content-Type': 'application/json', 'x-auth-token': token };

  // --- MESAS ---
  const fetchTables = async () => {
    const res = await fetch(`${API_URL}/tables`, { headers });
    const tables = await res.json();
    tablesList.innerHTML = tables
      .map(
        (table) => `
            <li>
                <span>${table.name}</span>
                <div class="item-actions">
                    <button class="btn btn-danger" onclick="deleteTable('${table._id}')">Eliminar</button>
                </div>
            </li>
        `
      )
      .join('');
  };

  addTableForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('table-name').value;
    await fetch(`${API_URL}/tables`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name }),
    });
    addTableForm.reset();
    fetchTables();
  });

  
  window.deleteTable = async (id) => {
    showConfirmModal(
      'Eliminar Mesa',
      '¿Estás seguro de que quieres eliminar esta mesa?',
      async () => {
        await fetch(`${API_URL}/tables/${id}`, { method: 'DELETE', headers });
        fetchTables();
      }
    );
  };


  // --- MENÚ ---
  const fetchMenuItems = async () => {
    const res = await fetch(`${API_URL}/menu`, { headers });
    const items = await res.json();
    menuItemsList.innerHTML = items
      .map(
        (item) => `
             <li>
                <div class="item-info">
                    <strong>${item.name} - $${item.price.toFixed(2)}</strong>
                    <small>Categoría: ${item.category}</small>
                </div>
                <div class="item-actions">
                    <button class="btn btn-secondary" onclick="editMenuItem('${
                      item._id
                    }', '${item.name}', ${item.price}, '${
          item.ingredients
        }', '${item.category}')">Editar</button>
                    <button class="btn btn-danger" onclick="deleteMenuItem('${
                      item._id
                    }')">Eliminar</button>
                </div>
            </li>
        `
      )
      .join('');
  };

  addMenuItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('menu-item-id').value;
    const name = document.getElementById('item-name').value;
    const price = document.getElementById('item-price').value;
    const ingredients = document.getElementById('item-ingredients').value;
    const category = document.getElementById('item-category').value;

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/menu/${id}` : `${API_URL}/menu`;

    await fetch(url, {
      method,
      headers,
      body: JSON.stringify({ name, price, ingredients, category }),
    });

    addMenuItemForm.reset();
    document.getElementById('menu-item-id').value = '';
    addMenuItemForm.querySelector('button').textContent = 'Añadir Artículo';
    fetchMenuItems();
  });

  window.editMenuItem = (id, name, price, ingredients, category) => {
    document.getElementById('menu-item-id').value = id;
    document.getElementById('item-name').value = name;
    document.getElementById('item-price').value = price;
    document.getElementById('item-ingredients').value = ingredients;
    document.getElementById('item-category').value = category;
    addMenuItemForm.querySelector('button').textContent = 'Actualizar Artículo';
    window.scrollTo(0, 0); // Scroll to top to see the form
  };

 
  window.deleteMenuItem = async (id) => {
    showConfirmModal(
      'Eliminar Artículo',
      '¿Estás seguro de que quieres eliminar este artículo?',
      async () => {
        await fetch(`${API_URL}/menu/${id}`, { method: 'DELETE', headers });
        fetchMenuItems();
      }
    );
  };

  // Initial fetch
  fetchTables();
  fetchMenuItems();
});
