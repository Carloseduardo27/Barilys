const MenuItem = require('../models/MenuItem');

// Obtener todos los artículos del menú
exports.getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).send('Error del servidor');
  }
};

// Añadir un nuevo artículo
exports.addMenuItem = async (req, res) => {
  const { name, price, ingredients, category } = req.body;
  try {
    const newItem = new MenuItem({ name, price, ingredients, category });
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).send('Error del servidor');
  }
};

// Actualizar un artículo
exports.updateMenuItem = async (req, res) => {
  const { name, price, ingredients, category } = req.body;
  try {
    let item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Artículo no encontrado' });

    item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { $set: { name, price, ingredients, category } },
      { new: true }
    );
    res.json(item);
  } catch (err) {
    res.status(500).send('Error del servidor');
  }
};


// Eliminar un artículo
exports.deleteMenuItem = async (req, res) => {
  try {
    let item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Artículo no encontrado' });

    await MenuItem.findByIdAndDelete(req.params.id); // <--- Línea corregida
    res.json({ msg: 'Artículo eliminado' });
  } catch (err) {
    res.status(500).send('Error del servidor');
  }
};
