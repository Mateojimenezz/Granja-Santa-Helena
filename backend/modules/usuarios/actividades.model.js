// backend/modules/usuarios/actividades.model.js
const db = require('../../config/db.promise');

const registrarActividad = async (usuario, actividad) => {
     const sql = 'INSERT INTO actividades (usuario, actividad) VALUES (?, ?)';
     await db.query(sql, [usuario, actividad]);
};

const obtenerActividades = async () => {
     const [rows] = await db.query('SELECT * FROM actividades ORDER BY fecha DESC');
     return rows;
};

module.exports = {
     registrarActividad,
     obtenerActividades
};
