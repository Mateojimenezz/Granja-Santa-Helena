// File: backend/modules/usuarios/usuarios.controller.js 
const model = require('./usuarios.model');
const bcrypt = require('bcryptjs');

// Registro de usuario
const registrarUsuario = async (req, res) => {
     const { name, identification, email, phone, password } = req.body;

     if (!name || !identification || !email || !phone || !password) {
          return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
     }

     try {
          const existe = await model.usuarioExiste(identification, email);
          if (existe) {
               return res.status(400).json({ message: 'El usuario ya existe' });
          }

          // 🚫 Asignación forzada desde el backend
          const cargo = 'Usuario';
          const permiso = 'Denegado';

          await model.crearUsuario({ name, identification, email, phone, cargo, password, permiso });
          res.status(201).json({ message: 'Usuario registrado correctamente' });
     } catch (err) {
          console.error('Error registro:', err);
          res.status(500).json({ message: 'Error en el registro' });
     }
};


// Login
const login = async (req, res) => {
     const { email, password } = req.body;
     if (!email || !password) return res.status(400).json({ message: 'Correo y contraseña requeridos' });

     try {
          const user = await model.buscarPorEmail(email);
          if (!user) return res.status(400).json({ message: 'Correo o contraseña incorrectos' });

          const match = await bcrypt.compare(password, user.contrasena);
          if (!match) return res.status(400).json({ message: 'Correo o contraseña incorrectos' });

          // 🚫 Validar permiso
          if (user.permiso !== 'Permitido') {
               return res.status(403).json({ message: 'Acceso denegado. Usuario no autorizado.' });
          }

          // ✅ Aquí ajustamos los campos correctamente
          const datosUsuario = {
               id: user.ID,
               email: user.Email,
               nombre: user.Nombre,
               cargo: user.Cargo,
               permiso: user.permiso
          };

          req.session.usuario = datosUsuario;

          res.status(200).json({ message: 'Inicio de sesión exitoso', user: datosUsuario });
     } catch (err) {
          console.error('Error login:', err);
          res.status(500).json({ message: 'Error en el servidor' });
     }
};

// Validar sesión
const validarSesion = (req, res) => {
     if (req.session && req.session.usuario) {
          return res.status(200).json({ sesionActiva: true, usuario: req.session.usuario });
     }
     res.status(401).json({ sesionActiva: false });
};

// Logout
const logout = (req, res) => {
     req.session.destroy(err => {
          if (err) return res.status(500).json({ message: 'Error al cerrar sesión' });
          res.clearCookie('connect.sid');
          res.status(200).json({ message: 'Sesión cerrada exitosamente' });
     });
};

// Obtener usuarios (protegida solo para administradores con permiso)
const listarUsuarios = async (req, res) => {
     const usuario = req.session.usuario;

     if (!usuario || usuario.cargo !== 'Administrador' || usuario.permiso !== 'Permitido') {
          return res.status(403).json({ message: 'Acceso denegado' });
     }

     try {
          const usuarios = await model.obtenerUsuarios();
          res.status(200).json(usuarios);
     } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Error al obtener usuarios' });
     }
};

// ✅ Agregado: Actualizar rol o permiso
const actualizarUsuario = async (req, res) => {
     const { id } = req.params;
     const { cargo, permiso } = req.body;

     if (!cargo || !permiso) {
          return res.status(400).json({ message: 'Cargo y permiso son requeridos.' });
     }

     try {
          await model.actualizarUsuario(id, cargo, permiso);
          res.status(200).json({ message: 'Usuario actualizado correctamente.' });
     } catch (err) {
          console.error('Error al actualizar usuario:', err);
          res.status(500).json({ message: 'Error al actualizar usuario.' });
     }
};

module.exports = {
     registrarUsuario,
     login,
     validarSesion,
     logout,
     listarUsuarios,
     actualizarUsuario
};
