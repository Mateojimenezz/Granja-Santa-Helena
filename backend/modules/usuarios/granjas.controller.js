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
     try {
          const nueva = await Granja.crear(req.body);
          res.status(201).json(nueva);
     } catch (error) {
          res.status(500).json({ message: 'Error al crear la granja', error });
     }
};
