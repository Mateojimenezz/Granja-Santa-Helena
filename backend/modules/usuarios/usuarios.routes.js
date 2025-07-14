const express = require('express');
const router = express.Router();
const ctrl = require('./usuarios.controller');
const granjasRoutes = require('./granjas.routes');

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

// Rutas de granjas
router.use('/granjas', granjasRoutes); // ✅ Montaje de subrutas /api/usuarios/granjas

module.exports = router;
