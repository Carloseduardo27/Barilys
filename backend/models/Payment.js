const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
  total: {
    type: Number,
    required: true,
  },
  paymentMethods: [
    {
      method: String, // 'Efectivo Bolivares', 'Efectivo Dolares', 'Punto de Venta', 'Pago Movil'
      amount: Number,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Payment', PaymentSchema);
