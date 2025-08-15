# Barylis - Sistema de Gestión para Restaurantes y Bares 🍽️🍹
Barylis es un sistema completo de gestión para restaurantes y bares que facilita el manejo de mesas, órdenes, menú y pagos con soporte para múltiples monedas.

## Características Principales

- **Autenticación Segura** 🔒  
  Sistema de login con JWT y contraseñas encriptadas.

- **Gestión de Mesas** 🪑  
  - Visualización de estado (activo/libre)
  - Creación/eliminación de mesas

- **Menú Digital** 📱  
  - Categorización de productos
  - Gestión completa (CRUD) de artículos

- **Sistema de Órdenes** 📝  
  - Órdenes por mesa
  - Cálculo automático de totales
  - Vaciar órdenes con un clic

- **Múltiples Métodos de Pago** 💳  
  - Efectivo (Bs/$)
  - Punto de venta
  - Pago móvil
  - Conversión automática de divisas (USD ↔ VES)

- **Reportes Diarios** 📊  
  - Historial de pagos
  - Totales por día

## Tecnologías Utilizadas

### Backend
- **Node.js** + **Express** - Servidor API REST
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - Modelado de datos
- **JWT** - Autenticación
- **Bcrypt** - Encriptación de contraseñas

### Frontend
- HTML5 + CSS3 moderno (con variables CSS)
- JavaScript Vanilla (ES6+)
- Diseño completamente responsive

## 📦 Estructura del Proyecto

```
barilys/
├── backend/
│ ├── config/ # Configuración de DB
│ ├── controllers/ # Lógica de endpoints
│ ├── middleware/ # Autenticación
│ ├── models/ # Esquemas de MongoDB
│ ├── routes/ # Definición de rutas
│ ├── server.js # Punto de entrada
│ └── .env # Variables de entorno
└── frontend/
    ├── css/ # Estilos globales
    ├── js/ # Lógica frontend por página
    └── *.html # Vistas de la aplicación
```

## 🛠️ Requisitos e Instalación

1. **Requisitos previos**:
   - Node.js (v14+)
   - MongoDB (local o Atlas)
   - Navegador moderno

2. **Instalación**:
   ```bash
   # Clonar repositorio
   git clone https://github.com/tu-usuario/barylis.git
   cd barylis/backend

   # Instalar dependencias
   npm install

   # Configurar variables de entorno (copiar .env.example)
   cp .env.example .env

   # Iniciar servidor
   npm start
   ```

3. **Credenciales iniciales**:
   - Email: `carlosperez@gmail.com`
   - Contraseña: `carlos123`


## 📌 Roadmap

- [ ] Implementar sistema de impresión de tickets
- [ ] Añadir gráficos estadísticos
- [ ] Soporte para múltiples usuarios con roles
- [ ] Versión móvil nativa (React Native)

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Sigue estos pasos:

1. Haz fork del proyecto
2. Crea tu rama (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

MIT © [Carlos Eduardo Perez]
