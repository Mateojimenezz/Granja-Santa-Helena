// backend/controllers/authController.js
const db = require('../config/db');

exports.login = (req, res) => {
  const { usuario, contraseña } = req.body;

  const query = 'SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?';
  db.query(query, [usuario, contraseña], (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error en el servidor' });

    if (results.length > 0) {
      res.json({ mensaje: 'Login exitoso', usuario: results[0] });
    } else {
      res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
  });
};
