// File: backend/modules/usuarios/usuarios.controller.js 
const model = require('./usuarios.model');
const bcrypt = require('bcryptjs');

// Registro de usuario
const registrarUsuario = async (req, res) => {
     const { name, identification, email, phone, role, password } = req.body;

     if (!name || !identification || !email || !phone || !role || !password) {
          return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
     }

     try {
          const existe = await model.usuarioExiste(identification, email);
          if (existe) {
               return res.status(400).json({ message: 'El usuario ya existe' });
          }

          await model.crearUsuario({ name, identification, email, phone, role, password });
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

          req.session.usuario = {
               id: user.id,
               email: user.email,
               nombre: user.nombre,
               cargo: user.cargo,
               permiso: user.permiso,
          };

          res.status(200).json({ message: 'Inicio de sesión exitoso', user: req.session.usuario });
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

// Obtener usuarios (protegida)
const listarUsuarios = async (req, res) => {
     try {
          const usuarios = await model.obtenerUsuarios();
          res.status(200).json(usuarios);
     } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Error al obtener usuarios' });
     }
};

module.exports = {
     registrarUsuario,
     login,
     validarSesion,
     logout,
     listarUsuarios,
};
