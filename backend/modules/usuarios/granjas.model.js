// backend/modules/usuarios/granjas.model.js
const db = require('../../config/db');

const Granja = {
     obtenerTodas: () => {
          return new Promise((resolve, reject) => {
               db.query('SELECT * FROM granjas', (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
               });
          });
     },

     obtenerPorUsuarioId: (usuarioId) => {
          return new Promise((resolve, reject) => {
               db.query('SELECT * FROM granjas WHERE usuario_id = ?', [usuarioId], (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
               });
          });
     },

     crear: ({ nombre, ubicacion, usuario_id }) => {
          return new Promise((resolve, reject) => {
               db.query(
                    'INSERT INTO granjas (nombre, ubicacion, usuario_id) VALUES (?, ?, ?)',
                    [nombre, ubicacion, usuario_id],
                    (err, result) => {
                         if (err) return reject(err);
                         resolve({ id: result.insertId, nombre, ubicacion, usuario_id });
                    }
               );
          });
     }
};

module.exports = Granja;
