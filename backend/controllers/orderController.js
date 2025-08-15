const Order = require('../models/Order');
const Table = require('../models/Table');
const MenuItem = require('../models/MenuItem');

// Obtener la orden activa de una mesa
exports.getActiveOrderForTable = async (req, res) => {
  try {
    let order = await Order.findOne({
      table: req.params.tableId,
      isPaid: false,
    }).populate('items.menuItem');

    if (!order) {
      // Si no hay orden, creamos una nueva vacía
      order = new Order({
        table: req.params.tableId,
        items: [],
        total: 0,
      });
      await order.save();
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

// Añadir un artículo a la orden
exports.addItemToOrder = async (req, res) => {
  const { menuItemId } = req.body;
  try {
    let order = await Order.findById(req.params.orderId);
    const menuItem = await MenuItem.findById(menuItemId);

    if (!order || !menuItem) {
      return res.status(404).json({ msg: 'Orden o artículo no encontrado' });
    }

    order.items.push({
      menuItem: menuItemId,
      name: menuItem.name,
      price: menuItem.price,
    });

    // Recalcular total
    order.total = order.items.reduce((acc, item) => acc + item.price, 0);
    await order.save();

    // Marcar la mesa como con orden activa
    await Table.findByIdAndUpdate(order.table, { hasActiveOrder: true });

    // Populate para devolver la info completa
    await order.populate('items.menuItem');
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

// Limpiar una orden
exports.clearOrder = async (req, res) => {
  try {
    let order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ msg: 'Orden no encontrada' });
    }

    order.items = [];
    order.total = 0;
    await order.save();

    // Marcar la mesa como libre
    await Table.findByIdAndUpdate(order.table, { hasActiveOrder: false });

    await order.populate('items.menuItem');
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};
