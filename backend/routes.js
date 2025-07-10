// backend/routes.js
const express = require('express');
const router = express.Router();

// Importar rutas de módulos
router.use('/usuarios', require('./modules/usuarios/usuarios.routes'));

// Aquí irán los demás: inventarios, salud, etc.

module.exports = router;
