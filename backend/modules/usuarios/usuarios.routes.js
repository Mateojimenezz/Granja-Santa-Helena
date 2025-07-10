
// backend/modules/usuarios/usuarios.routes.js
// Este archivo define las rutas para el módulo de usuarios.

const express = require('express');
const router = express.Router();
const ctrl = require('./usuarios.controller');

const verificarAdministrador = (req, res, next) => {
     if (!req.session?.usuario || req.session.usuario.permiso !== 'permitido') {
          return res.status(403).json({ mensaje: 'Acceso denegado: no tienes permiso' });
     }
     next();
};

router.post('/', ctrl.registrarUsuario);
router.post('/login', ctrl.login);
router.post('/logout', ctrl.logout);
router.get('/sesion', ctrl.validarSesion);
router.get('/', verificarAdministrador, ctrl.listarUsuarios);

module.exports = router;
