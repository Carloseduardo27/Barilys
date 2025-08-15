const Payment = require('../models/Payment');
const Order = require('../models/Order');
const Table = require('../models/Table');

// Procesar un pago
exports.processPayment = async (req, res) => {
  const { orderId, paymentMethods, total } = req.body;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ msg: 'Orden no encontrada' });
    }

    // Crear el registro de pago
    const newPayment = new Payment({
      order: orderId,
      total,
      paymentMethods,
    });
    await newPayment.save();

    // Actualizar la orden a 'pagada'
    order.isPaid = true;
    await order.save();

    // Actualizar el estado de la mesa a 'sin orden activa'
    await Table.findByIdAndUpdate(order.table, { hasActiveOrder: false });

    res.json({ msg: 'Pago procesado exitosamente' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

// Obtener historial de pagos del día
exports.getDailyPayments = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const payments = await Payment.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    });
    res.json(payments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};
