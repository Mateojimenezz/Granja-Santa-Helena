// backend/routes.js
const express = require('express');
const router = express.Router();

// Rutas de módulos
router.use('/usuarios', require('./modules/usuarios/usuarios.routes'));
router.use('/granjas', require('./modules/usuarios/granjas.routes'));

module.exports = router;
