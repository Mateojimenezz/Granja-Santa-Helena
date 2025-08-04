// File: backend/modules/usuarios/usuarios.routes.js
const express = require('express');
const router = express.Router();
const ctrl = require('./usuarios.controller');
const granjasRoutes = require('./granjas.routes');
const actividadesController = require('./actividades.controller');
const perfilCtrl = require('./perfil.controller');
const verificarAutenticado = require('../../middleware/verificarAutenticado'); // Agregar esta línea



const verificarAdministrador = (req, res, next) => {
     if (!req.session?.usuario || req.session.usuario.permiso !== 'Permitido' || req.session.usuario.cargo !== 'Administrador') {
          return res.status(403).json({ mensaje: 'Acceso denegado: no tienes permiso' });
     }
     next();
};

// Rutas de usuarios
router.post('/', ctrl.registrarUsuario);
router.post('/login', ctrl.login);
router.post('/logout', ctrl.logout);
router.get('/sesion', ctrl.validarSesion);
router.get('/', verificarAdministrador, ctrl.listarUsuarios);
router.put('/:id', verificarAdministrador, ctrl.actualizarUsuario);
router.get('/actividades', verificarAdministrador, actividadesController.listarActividades);
router.get('/perfil', verificarAutenticado, perfilCtrl.obtenerPerfil);
router.put('/perfil', verificarAutenticado, perfilCtrl.actualizarPerfil);
router.use('/granjas', granjasRoutes); // obtener rutas de granjas



module.exports = router;
