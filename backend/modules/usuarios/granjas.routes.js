// backend/modules/usuarios/granjas.routes.js
const express = require('express');
const router = express.Router();
const granjasController = require('./granjas.controller');
const upload = require('../../utils/multer');
const verificarAutenticado = require('../../middleware/verificarAutenticado'); 

// GET todas las granjas
router.get('/', granjasController.obtenerGranjas);

// GET granjas por usuario
router.get('/:usuarioId', granjasController.obtenerGranjasPorUsuario);

// POST crear granja (protegido + subida de imagen)
router.post('/', verificarAutenticado, upload.single('imagen'), granjasController.crearGranja);

module.exports = router;
