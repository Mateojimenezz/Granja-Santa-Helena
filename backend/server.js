// backend/server.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();

// ✅ Middleware CORS con cookies permitidas
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:127.0.1:5500'],
  credentials: true
}));


// ✅ Middlewares para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Servir imágenes estáticas desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Configuración de sesiones
app.use(session({
  secret: 'mi_clave_secreta',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000,       // 1 hora
    secure: false,
    sameSite: 'lax'
  }
}));

// ✅ Rutas de la API
app.use('/api', routes);

// ✅ Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor en ejecución: http://localhost:${PORT}`);
});
