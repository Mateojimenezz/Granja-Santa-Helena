// backend/modules/usuarios/granjas.routes.js
const express = require('express');
const router = express.Router();
const granjasController = require('./granjas.controller');

router.get('/', granjasController.obtenerGranjas); // GET /api/usuarios/granjas
router.get('/:usuarioId', granjasController.obtenerGranjasPorUsuario); // GET /api/usuarios/granjas/:usuarioId
router.post('/', granjasController.crearGranja); // POST /api/usuarios/granjas

module.exports = router;
