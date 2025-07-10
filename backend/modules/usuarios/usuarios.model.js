// backend/modules/usuarios/usuarios.model.js
// Este archivo define el modelo de datos y las operaciones relacionadas con los usuarios.
const db = require('../../config/db');
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
const crearUsuario = async ({ name, identification, email, phone, role, password }) => {
     const hashedPassword = await bcrypt.hash(password, 10);

     return new Promise((resolve, reject) => {
          const query = `
      INSERT INTO usuarios (nombre, identificacion, email, telefono, cargo, contrasena)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
          db.query(query, [name, identification, email, phone, role, hashedPassword], (err, result) => {
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

module.exports = {
     buscarPorEmail,
     crearUsuario,
     usuarioExiste,
     obtenerUsuarios,
};

