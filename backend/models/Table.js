const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  hasActiveOrder: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Table', TableSchema);
