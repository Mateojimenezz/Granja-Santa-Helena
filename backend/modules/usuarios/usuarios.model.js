// backend/modules/usuarios/usuarios.model.js
// Este archivo define el modelo de datos y las operaciones relacionadas con los usuarios.
const db = require('../../config/db');
const pool = require('../../config/db');
const bcrypt = require('bcryptjs');

// Buscar usuario por email
const buscarPorEmail = (email) => {
     return new Promise((resolve, reject) => {
          db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
               if (err) return reject(err);
               resolve(results[0]);
          });
     });
};

// Crear nuevo usuario
const crearUsuario = async ({ name, identification, email, phone, cargo, password, permiso }) => {
     const hashedPassword = await bcrypt.hash(password, 10);

     return new Promise((resolve, reject) => {
          const query = `
            INSERT INTO usuarios (nombre, identificacion, email, telefono, cargo, contrasena, permiso)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
          db.query(query, [name, identification, email, phone, cargo, hashedPassword, permiso], (err, result) => {
               if (err) return reject(err);
               resolve(result.insertId);
          });
     });
};


// Verificar si ya existe usuario
const usuarioExiste = (identification, email) => {
     return new Promise((resolve, reject) => {
          db.query('SELECT * FROM usuarios WHERE identificacion = ? OR email = ?', [identification, email], (err, results) => {
               if (err) return reject(err);
               resolve(results.length > 0);
          });
     });
};

// Listar usuarios
const obtenerUsuarios = () => {
     return new Promise((resolve, reject) => {
          db.query(
               'SELECT id, nombre, identificacion, email, telefono, cargo, permiso FROM usuarios',
               (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
               }
          );
     });
};

// Actualizar cargo y permiso
const actualizarUsuario = (id, cargo, permiso) => {
     return new Promise((resolve, reject) => {
          const query = `
               UPDATE usuarios 
               SET cargo = ?, permiso = ? 
               WHERE id = ?
          `;
          db.query(query, [cargo, permiso, id], (err, result) => {
               if (err) return reject(err);
               resolve(result);
          });
     });
};


module.exports = {
     buscarPorEmail,
     crearUsuario,
     usuarioExiste,
     obtenerUsuarios,
     actualizarUsuario,

};

