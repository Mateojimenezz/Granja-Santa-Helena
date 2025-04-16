// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', (req, res) => {
  const { usuario, contraseña } = req.body;
  // Aquí validarías contra una base de datos o archivo JSON
  if (usuario === 'admin' && contraseña === '1234') {
    res.json({ mensaje: 'Login exitoso' });
  } else {
    res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }
});

router.post('/login', authController.login);
module.exports = router;

