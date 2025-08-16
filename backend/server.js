// Cargar variables de entorno
require('dotenv').config({ path: './backend/.env' });
const path = require('path');// nuevo 
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const createAdminUser = require('./models/User'); // Importamos la función

const app = express();

// Conectar a la Base de Datos
connectDB();

// Crear usuario administrador si no existe
createAdminUser();

// Middlewares
app.use(cors()); // Permite la comunicación entre el frontend y el backend
app.use(express.json()); // Permite al servidor entender JSON
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Rutas de la API
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tables', require('./routes/tableRoutes'));
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/rate', require('./routes/rateRoutes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
