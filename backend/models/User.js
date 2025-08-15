const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Encriptar contraseña antes de guardar
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', UserSchema);

// Función para crear el usuario admin al iniciar
const createAdminUser = async () => {
  try {
    const userExists = await User.findOne({ email: 'carlosperez@gmail.com' });
    if (!userExists) {
      const adminUser = new User({
        email: 'carlosperez@gmail.com',
        password: 'carlos123',
      });
      await adminUser.save();
      console.log('Usuario administrador creado.');
    } else {
      console.log('Usuario administrador ya existe.');
    }
  } catch (error) {
    console.error('Error al crear el usuario administrador:', error);
  }
};

module.exports = createAdminUser; // Exportamos la función
// También exportamos el modelo por si se necesita en otro lugar
module.exports.User = User;
