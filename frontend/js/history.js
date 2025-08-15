document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('barylis-token');
  const headers = { 'x-auth-token': token };

  const paymentsList = document.getElementById('payments-list');
  const dailyTotalEl = document.getElementById('daily-total');

  try {
    const res = await fetch(`${API_URL}/payments/today`, { headers });
    const payments = await res.json();

    if (payments.length === 0) {
      paymentsList.innerHTML = '<p>No hay pagos registrados hoy.</p>';
      return;
    }

    let dailyTotal = 0;
    paymentsList.innerHTML = payments
      .map((payment) => {
        dailyTotal += payment.total;
        const paymentTime = new Date(payment.date).toLocaleTimeString();
        return `
                <div class="payment-record">
                    <p><strong>Total: $${payment.total.toFixed(
                      2
                    )}</strong> - ${paymentTime}</p>
                    <p>Métodos: ${payment.paymentMethods
                      .map((pm) => `${pm.method} ($${pm.amount.toFixed(2)})`)
                      .join(', ')}</p>
                </div>
            `;
      })
      .join('');

    dailyTotalEl.textContent = `$${dailyTotal.toFixed(2)}`;
  } catch (error) {
    console.error(error);
    paymentsList.innerHTML = '<p>Error al cargar el historial de pagos.</p>';
  }
});
