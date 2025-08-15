document.addEventListener('DOMContentLoaded', async () => {
  const selectedTable = JSON.parse(localStorage.getItem('selectedTable'));
  const currentOrder = JSON.parse(localStorage.getItem('currentOrder'));

  if (!selectedTable || !currentOrder) {
    window.location.href = 'tables.html';
    return;
  }

  const token = localStorage.getItem('barylis-token');
  const headers = { 'Content-Type': 'application/json', 'x-auth-token': token };

  let usdToVesRate = 0;

  // Elementos del DOM
  const paymentTitle = document.getElementById('payment-title');
  const totalUsdEl = document.getElementById('total-usd');
  const totalVesEl = document.getElementById('total-ves');
  const remainingUsdEl = document.getElementById('remaining-usd');
  const remainingVesEl = document.getElementById('remaining-ves');
  const paymentMethodsContainer = document.querySelector('.payment-methods');
  const addPaymentMethodBtn = document.getElementById('add-payment-method-btn');
  const paymentForm = document.getElementById('payment-form');

  // --- Cargar Tasa de Cambio y Configurar la Página ---
  const initializePaymentPage = async () => {
    try {
      const res = await fetch(`${API_URL}/rate`, { headers });
      const data = await res.json();
      usdToVesRate = data.rate;

      paymentTitle.textContent = `Procesar Pago para ${selectedTable.name}`;
      updateTotals();
      addPaymentMethod(); // Añadir el primer método de pago por defecto
    } catch (error) {
      console.error('Error al obtener la tasa de cambio:', error);
      alert('No se pudo obtener la tasa de cambio. Inténtalo de nuevo.');
      window.location.href = 'menu.html';
    }
  };

  const updateTotals = () => {
    const totalUSD = currentOrder.total;
    const totalVES = totalUSD * usdToVesRate;

    totalUsdEl.textContent = `$${totalUSD.toFixed(2)}`;
    totalVesEl.textContent = `Bs ${totalVES.toFixed(2)}`;

    updateRemaining();
  };

  // --- Lógica de Métodos de Pago ---
  const addPaymentMethod = () => {
    const div = document.createElement('div');
    div.className = 'payment-method-group';
    div.innerHTML = `
            <select class="payment-method-select">
                <option value="Dolares en Efectivo">Dólares en Efectivo</option>
                <option value="Bolivares en Efectivo">Bolívares en Efectivo</option>
                <option value="Punto de Venta">Punto de Venta</option>
                <option value="Pago Movil">Pago Móvil</option>
            </select>
            <input type="number" class="payment-amount-input" placeholder="Monto" step="0.01" required>
            <button type="button" class="btn btn-danger remove-method-btn">&times;</button>
        `;
    paymentMethodsContainer.appendChild(div);

    div.querySelector('.remove-method-btn').addEventListener('click', () => {
      div.remove();
      updateRemaining();
    });

    div
      .querySelector('.payment-amount-input')
      .addEventListener('input', updateRemaining);
    div
      .querySelector('.payment-method-select')
      .addEventListener('change', updateRemaining);
  };

  addPaymentMethodBtn.addEventListener('click', addPaymentMethod);

  const updateRemaining = () => {
    let totalPaidUSD = 0;
    const methodGroups = document.querySelectorAll('.payment-method-group');

    methodGroups.forEach((group) => {
      const amount =
        parseFloat(group.querySelector('.payment-amount-input').value) || 0;
      const method = group.querySelector('.payment-method-select').value;

      if (
        method === 'Bolivares en Efectivo' ||
        method === 'Punto de Venta' ||
        method === 'Pago Movil'
      ) {
        totalPaidUSD += amount / usdToVesRate;
      } else {
        // Dólares
        totalPaidUSD += amount;
      }
    });

    const remainingUSD = currentOrder.total - totalPaidUSD;
    const remainingVES = remainingUSD * usdToVesRate;

    remainingUsdEl.textContent = `$${remainingUSD.toFixed(2)}`;
    remainingVesEl.textContent = `Bs ${remainingVES.toFixed(2)}`;

    if (remainingUSD <= 0) {
      remainingUsdEl.style.color = 'var(--success-color)';
      remainingVesEl.style.color = 'var(--success-color)';
    } else {
      remainingUsdEl.style.color = 'var(--danger-color)';
      remainingVesEl.style.color = 'var(--danger-color)';
    }
  };

  // --- Procesar Pago ---
  paymentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const paymentMethods = [];
    document.querySelectorAll('.payment-method-group').forEach((group) => {
      paymentMethods.push({
        method: group.querySelector('.payment-method-select').value,
        amount:
          parseFloat(group.querySelector('.payment-amount-input').value) || 0,
      });
    });

    const totalPaid = paymentMethods.reduce((acc, pm) => {
      const amountInUSD =
        pm.method.includes('Bolivares') ||
        pm.method.includes('Punto') ||
        pm.method.includes('Pago')
          ? pm.amount / usdToVesRate
          : pm.amount;
      return acc + amountInUSD;
    }, 0);

    if (totalPaid < currentOrder.total) {
      alert('El monto pagado es menor al total de la orden.');
      return;
    }

    try {
      await fetch(`${API_URL}/payments`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          orderId: currentOrder._id,
          paymentMethods,
          total: currentOrder.total,
        }),
      });

      alert('¡Pago procesado exitosamente!');
      localStorage.removeItem('currentOrder');
      window.location.href = 'tables.html';
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert('Hubo un error al procesar el pago.');
    }
  });

  document.getElementById('back-to-menu-btn').addEventListener('click', () => {
    window.location.href = 'menu.html';
  });

  initializePaymentPage();
});
