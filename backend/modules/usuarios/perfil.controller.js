// backend/modules/usuarios/perfil.controller.js
const model = require('./perfil.model');
const bcrypt = require('bcryptjs');

// Actualizar perfil del usuario autenticado
const actualizarPerfil = async (req, res) => {
     const userId = req.session?.usuario?.id;
     if (!userId) {
          return res.status(401).json({ message: 'No autenticado' });
     }

     console.log('Body recibido en PUT /perfil:', req.body);

     let { nombre, telefono, password, foto, cargo, permiso } = req.body;

     if (!req.body || Object.keys(req.body).length === 0) {
          console.log('Body vacío recibido en PUT /perfil:', req.body);
          return res.status(400).json({ message: 'No enviaste ningún dato para actualizar', body: req.body });
     }

     if (typeof nombre === 'string' && nombre.trim() === '') nombre = undefined;
     if (typeof telefono === 'string' && telefono.trim() === '') telefono = undefined;
     if (typeof password === 'string' && password.trim() === '') password = undefined;
     if (typeof foto === 'string' && (foto.trim() === '' || !foto.startsWith('data:image/'))) foto = undefined;
     if (typeof cargo === 'string' && cargo.trim() === '') cargo = undefined;
     if (typeof permiso === 'string' && permiso.trim() === '') permiso = undefined;

     const datosActualizar = {};
     if (nombre) datosActualizar.nombre = nombre;
     if (telefono) datosActualizar.telefono = telefono;
     if (password) datosActualizar.password = await bcrypt.hash(password, 10);
     if (foto) datosActualizar.foto = foto;
     if (cargo) datosActualizar.cargo = cargo;
     if (permiso) datosActualizar.permiso = permiso;

     console.log('Campos que se enviarán al modelo:', datosActualizar);

     if (Object.keys(datosActualizar).length === 0) {
          console.log('No hay datos válidos para actualizar:', req.body);
          return res.status(400).json({ message: 'No hay datos válidos para actualizar', body: req.body });
     }

     try {
          await model.actualizarPerfil(userId, datosActualizar);
          res.status(200).json({ message: 'Perfil actualizado correctamente' });
     } catch (err) {
          console.error('Error al actualizar perfil:', err, 'Datos:', datosActualizar);
          res.status(500).json({ message: 'Error al actualizar perfil', error: err.message });
     }
};

// Obtener perfil del usuario autenticado
const obtenerPerfil = async (req, res) => {
     const userId = req.session?.usuario?.id;
     if (!userId) {
          return res.status(401).json({ message: 'No autenticado' });
     }
     try {
          const perfil = await model.obtenerPerfil(userId);
          res.status(200).json(perfil);
     } catch (err) {
          console.error('Error al obtener perfil:', err);
          res.status(500).json({ message: 'Error al obtener perfil' });
     }
};

module.exports = {
     actualizarPerfil,
     obtenerPerfil
};
