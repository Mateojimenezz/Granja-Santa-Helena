// backend/modules/usuarios/granjas.controller.js
const Granja = require('./granjas.model');

exports.obtenerGranjas = async (req, res) => {
     try {
          const granjas = await Granja.obtenerTodas();
          res.json(granjas);
     } catch (error) {
          res.status(500).json({ message: 'Error al obtener granjas', error });
     }
};

exports.obtenerGranjasPorUsuario = async (req, res) => {
     const { usuarioId } = req.params;
     try {
          const granjas = await Granja.obtenerPorUsuarioId(usuarioId);
          res.json(granjas);
     } catch (error) {
          res.status(500).json({ message: 'Error al obtener granjas del usuario', error });
     }
};

exports.crearGranja = async (req, res) => {
     console.log("🧪 SESIÓN EN CREAR GRANJA:", req.session.usuario);
     try {
          const { nombre } = req.body;

          // ✅ Asegúrate de que el usuario esté autenticado
          if (!req.session?.usuario?.id) {
               return res.status(401).json({ message: 'No autenticado' });
          }

          // ✅ URL de imagen
          let imagenUrl = null;
          if (req.file) {
               imagenUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
          }

          // ✅ Crear la nueva granja asociada al usuario autenticado
          const nueva = await Granja.crear({
               nombre,
               imagen: imagenUrl,
               id_usuario: req.session.usuario.id,
          });

          res.status(201).json(nueva);
     } catch (error) {
          console.error('Error al crear granja:', error);
          res.status(500).json({ message: 'Error al crear la granja', error });
     }
};
