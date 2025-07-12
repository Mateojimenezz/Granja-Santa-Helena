// backend/middleware/authController.js
const db = require('../config/db');

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Correo y contraseña requeridos' });
  }

  const query = 'SELECT ID, Nombre, Email, Cargo, permiso FROM usuarios WHERE Email = ? AND contrasena = ?';

  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("❌ Error en la base de datos:", err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (results.length > 0) {
      const user = results[0];
      console.log("🧪 Usuario autenticado:", user);

      // Guardar en sesión
      req.session.usuario = {
        id: user.ID,
        nombre: user.Nombre,
        email: user.Email,
        cargo: user.Cargo,
        permiso: user.permiso
      };

      // Respuesta al frontend
      res.json({
        message: 'Inicio de sesión exitoso',
        usuario: req.session.usuario
      });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  });
};
