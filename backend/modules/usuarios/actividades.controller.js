// backend/modules/usuarios/actividades.controller.js
const model = require('./actividades.model');

const listarActividades = async (req, res) => {
     const usuario = req.session.usuario;

     // Validar si hay sesión activa y si tiene permiso de Administrador
     if (!usuario || usuario.cargo !== 'Administrador' || usuario.permiso !== 'Permitido') {
          return res.status(403).json({ message: 'Acceso denegado' });
     }

     try {
          const actividades = await model.obtenerActividades();

          const actividadesFormateadas = actividades.map(act => ({
               fecha: act.fecha,
               usuario: act.usuario,
               actividad: act.actividad
          }));


          res.status(200).json(actividadesFormateadas);
     } catch (error) {
          console.error('Error al obtener actividades:', error);
          res.status(500).json({ message: 'Error en el servidor' });
     }
};

module.exports = {
     listarActividades,
     registrarActividad: model.registrarActividad
};
