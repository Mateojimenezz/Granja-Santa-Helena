// backend/modules/usuarios/granjas.model.js
const db = require('../../config/db');

const Granja = {
     // Obtener todas las granjas
     obtenerTodas: () => {
          return new Promise((resolve, reject) => {
               db.query('SELECT * FROM granjas', (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
               });
          });
     },

     // Obtener granjas por el ID del usuario
     obtenerPorUsuarioId: (usuarioId) => {
          return new Promise((resolve, reject) => {
               db.query(
                    'SELECT * FROM granjas WHERE id_usuario = ?',
                    [usuarioId],
                    (err, results) => {
                         if (err) return reject(err);
                         resolve(results);
                    }
               );
          });
     },

     // Crear nueva granja
     crear: ({ nombre, imagen, id_usuario }) => {
          return new Promise((resolve, reject) => {
               db.query(
                    'INSERT INTO granjas (nombre, imagen, id_usuario) VALUES (?, ?, ?)',
                    [nombre, imagen, id_usuario],
                    (err, result) => {
                         if (err) return reject(err);
                         resolve({ id: result.insertId, nombre, imagen, id_usuario });
                    }
               );
          });
     }
};

module.exports = Granja;
