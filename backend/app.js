// backend/modules/usuarios/perfil.model.js
const db = require('../../config/db');

// Actualizar perfil del usuario
const actualizarPerfil = (id, { nombre, telefono, password, foto }) => {
     return new Promise((resolve, reject) => {
          let campos = [];
          let valores = [];
          if (nombre) {
               campos.push('Nombre = ?');
               valores.push(nombre);
          }
          if (telefono) {
               campos.push('Telefono = ?');
               valores.push(telefono);
          }
          if (password) {
               campos.push('contrasena = ?'); // minúsculas
               valores.push(password);
          }
          if (foto) {
               campos.push('foto = ?'); // minúsculas
               valores.push(foto);
          }
          if (campos.length === 0) {
               // Log para depuración
               console.log('No hay campos para actualizar');
               return reject(new Error('No hay campos para actualizar'));
          }
          valores.push(id);
          const query = `UPDATE usuarios SET ${campos.join(', ')} WHERE ID = ?`;
          // Log para depuración
          console.log('Ejecutando query:', query, 'con valores:', valores);
          db.query(query, valores, (err, result) => {
               if (err) {
                    console.error('Error en la consulta UPDATE:', err);
                    return reject(err);
               }
               // Log para depuración
               console.log('Resultado de UPDATE:', result);
               resolve(result);
          });
     });
};

// Obtener perfil del usuario (sin exponer la contraseña)
const obtenerPerfil = (id) => {
     return new Promise((resolve, reject) => {
          db.query(
               'SELECT ID as id, Nombre as nombre, Identificacion as identificacion, Email as email, Telefono as telefono, Cargo as cargo, foto FROM usuarios WHERE ID = ?',
               [id],
               (err, results) => {
                    if (err) return reject(err);
                    resolve(results[0]);
               }
          );
     });
};

module.exports = {
     actualizarPerfil,
     obtenerPerfil
};