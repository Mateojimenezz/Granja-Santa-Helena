require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const routes = require('./routes');
const app = express();

// Middlewares globales
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "assets/img")));
app.use(session({
  secret: 'mi_clave_secreta',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000, secure: false, sameSite: 'lax' }
}));

// Rutas
app.use('/api', routes);

// Inicio
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor en http://localhost:${PORT}`));
