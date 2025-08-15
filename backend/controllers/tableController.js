const Table = require('../models/Table');

// Obtener todas las mesas
exports.getTables = async (req, res) => {
  try {
    const tables = await Table.find().sort({ name: 1 });
    res.json(tables);
  } catch (err) {
    res.status(500).send('Error del servidor');
  }
};

// Añadir una nueva mesa
exports.addTable = async (req, res) => {
  const { name } = req.body;
  try {
    const newTable = new Table({ name });
    await newTable.save();
    res.json(newTable);
  } catch (err) {
    res.status(500).send('Error del servidor');
  }
};

// Eliminar una mesa
/*exports.deleteTable = async (req, res) => {
  try {
    await Table.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Mesa eliminada' });
  } catch (err) {
    res.status(500).send('Error del servidor');
  }
};*/

// Eliminar una mesa
exports.deleteTable = async (req, res) => {
  try {
    await Table.findByIdAndDelete(req.params.id); // <--- Línea corregida
    res.json({ msg: 'Mesa eliminada' });
  } catch (err) {
    res.status(500).send('Error del servidor');
  }
};
