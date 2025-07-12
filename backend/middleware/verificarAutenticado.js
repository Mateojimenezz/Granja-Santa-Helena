//backend/middleware/verificarAutenticado.js
// Middleware para verificar si el usuario está autenticado
module.exports = (req, res, next) => {
     if (!req.session?.usuario) {
          return res.status(401).json({ mensaje: 'No autorizado: inicia sesión primero' });
     }
     next();
};
