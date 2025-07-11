// backend/middleware/authController.js
const db = require('../config/db');

exports.login = (req, res) => {
  const { usuario, contrasena } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = ? AND contrasena = ?';
  db.query(query, [usuario, contrasena], (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error en el servidor' });

    if (results.length > 0) {
      const user = results[0];

      // Guardar en sesión los datos importantes
      req.session.usuario = {
        id: user.ID,
        nombre: user.Nombre,
        email: user.Email,
        cargo: user.Cargo,     
        permiso: user.permiso   
      };

      // Enviar los datos también al frontend
      res.json({
        mensaje: 'Login exitoso',
        usuario: req.session.usuario
      });
    } else {
      res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
  });
};
