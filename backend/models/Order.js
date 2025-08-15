const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
    required: true,
  },
  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: Number, // Guardamos el precio al momento de añadir
      name: String,
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', OrderSchema);
