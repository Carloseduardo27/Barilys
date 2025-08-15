document.addEventListener('DOMContentLoaded', async () => {
  const selectedTable = JSON.parse(localStorage.getItem('selectedTable'));
  if (!selectedTable) {
    window.location.href = 'tables.html';
    return;
  }

  const token = localStorage.getItem('barylis-token');
  const headers = { 'Content-Type': 'application/json', 'x-auth-token': token };

  document.getElementById(
    'menu-title'
  ).textContent = `Menú para ${selectedTable.name}`;

  let currentOrder;

  const menuContainer = document.getElementById('menu-items-container');
  const orderList = document.getElementById('order-items-list');
  const orderTotal = document.getElementById('order-total');

  // --- Cargar Menú y Orden ---
  const fetchMenuAndOrder = async () => {
    try {
      // Cargar Menú
      const menuRes = await fetch(`${API_URL}/menu`, { headers });
      const menuItems = await menuRes.json();
      renderMenu(menuItems);

      // Cargar o crear orden activa para la mesa
      const orderRes = await fetch(
        `${API_URL}/orders/table/${selectedTable.id}`,
        { headers }
      );
      currentOrder = await orderRes.json();
      renderOrder(currentOrder);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderMenu = (items) => {
    const groupedByCategory = items.reduce((acc, item) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    }, {});

    menuContainer.innerHTML = Object.keys(groupedByCategory)
      .map(
        (category) => `
            <div class="menu-category">
                <h2>${category}</h2>
                ${groupedByCategory[category]
                  .map(
                    (item) => `
                    <div class="menu-item">
                        <h3>${item.name} <span>$${item.price.toFixed(
                      2
                    )}</span></h3>
                        <p>${item.ingredients || ''}</p>
                        <button class="btn btn-primary" onclick="addItemToOrder('${
                          item._id
                        }')">Añadir a la Orden</button>
                    </div>
                `
                  )
                  .join('')}
            </div>
        `
      )
      .join('');
  };

  const renderOrder = (order) => {
    currentOrder = order;
    if (order.items.length === 0) {
      orderList.innerHTML = '<p>No hay artículos en la orden.</p>';
    } else {
      orderList.innerHTML = order.items
        .map(
          (item) => `
                <div class="order-item">
                    <span>${item.name}</span>
                    <span>$${item.price.toFixed(2)}</span>
                </div>
            `
        )
        .join('');
    }
    orderTotal.textContent = `$${order.total.toFixed(2)}`;
  };

  // --- Acciones de la Orden ---
  window.addItemToOrder = async (menuItemId) => {
    const res = await fetch(`${API_URL}/orders/${currentOrder._id}/add`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ menuItemId }),
    });
    const updatedOrder = await res.json();
    renderOrder(updatedOrder);
  };

  document
    .getElementById('clear-order-btn')
    .addEventListener('click', async () => {
      if (!currentOrder || currentOrder.items.length === 0) return;
      if (confirm('¿Deseas vaciar la orden actual?')) {
        const res = await fetch(`${API_URL}/orders/${currentOrder._id}/clear`, {
          method: 'POST',
          headers,
        });
        const updatedOrder = await res.json();
        renderOrder(updatedOrder);
      }
    });

  document
    .getElementById('process-payment-btn')
    .addEventListener('click', () => {
      if (!currentOrder || currentOrder.items.length === 0) {
        alert('No hay artículos en la orden para procesar el pago.');
        return;
      }
      localStorage.setItem('currentOrder', JSON.stringify(currentOrder));
      window.location.href = 'payment.html';
    });

  fetchMenuAndOrder();
});
