// server.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./db'); // Asegúrate que este módulo exporta conexión MySQL correctamente
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configuración CORS
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    const allowedOrigins = ['http://localhost:5500', 'http://127.0.0.1:5500'];
    if (!allowedOrigins.includes(origin)) {
      const msg = 'El CORS no está permitido para este origen.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Configuración de sesiones
app.use(session({
  secret: 'mi_clave_secreta',  // Mejor poner en .env
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,   // En producción usa true con HTTPS
    sameSite: 'lax'  // Ajusta según tus necesidades
  }
}));

// Registro de usuario
app.post('/api/usuarios', (req, res) => {
  const { name, identification, email, phone, role, password } = req.body;

  if (!name || !identification || !email || !phone || !role || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  const checkUserQuery = `SELECT * FROM usuarios WHERE identificacion = ? OR email = ?`;
  db.query(checkUserQuery, [identification, email], (err, results) => {
    if (err) {
      console.error('Error al verificar usuario:', err);
      return res.status(500).json({ message: 'Error al verificar el usuario.' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'El usuario con esa identificación o correo ya existe.' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error al encriptar contraseña:', err);
        return res.status(500).json({ message: 'Error al encriptar la contraseña' });
      }

      const insertQuery = `INSERT INTO usuarios (nombre, identificacion, email, telefono, cargo, contrasena) 
                           VALUES (?, ?, ?, ?, ?, ?)`;

      db.query(insertQuery, [name, identification, email, phone, role, hashedPassword], (err, result) => {
        if (err) {
          console.error('Error al registrar usuario:', err);
          return res.status(500).json({ message: 'Error al registrar el usuario' });
        }
        res.status(201).json({ message: 'Usuario registrado correctamente' });
      });
    });
  });
});

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Correo y contraseña son requeridos' });

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error en la consulta login:', err);
      return res.status(500).json({ message: 'Error en la base de datos' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    const user = results[0];
    bcrypt.compare(password, user.contrasena, (err, isMatch) => {
      if (err) {
        console.error('Error al comparar contraseña:', err);
        return res.status(500).json({ message: 'Error al verificar contraseña' });
      }

      if (!isMatch) {
        return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
      }

      // Guardar info en la sesión
      req.session.userId = user.id;
      req.session.email = user.email;
      res.status(200).json({ 
        message: 'Inicio de sesión exitoso', 
        user: { id: user.id, nombre: user.nombre, email: user.email } 
      });
    });
  });
});

// Ruta para cerrar sesión
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      return res.status(500).send('No se pudo cerrar sesión');
    }
    res.clearCookie("connect.sid"); 
    res.redirect("/login.html");  // Ajusta si es necesario
  });
});

// Ruta para recuperar contraseña
app.post('/api/recuperar', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Correo requerido" });
  }

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error en consulta recuperación:', err);
      return res.status(500).json({ success: false, message: "Error en la base de datos" });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Correo no registrado" });
    }

    const token = uuidv4();
    const expiracion = new Date(Date.now() + 3600000); // 1 hora

    db.query('UPDATE usuarios SET reset_token = ?, reset_expires = ? WHERE email = ?', [token, expiracion, email], (err2) => {
      if (err2) {
        console.error('Error guardando token:', err2);
        return res.status(500).json({ success: false, message: "Error al guardar token" });
      }

      const resetUrl = `http://localhost:5500/reset-password.html?token=${token}`;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Recuperación de contraseña',
        html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
               <a href="${resetUrl}">${resetUrl}</a>
               <p>Este enlace expira en 1 hora.</p>`
      };

      transporter.sendMail(mailOptions, (err3, info) => {
        if (err3) {
          console.error('Error al enviar correo:', err3);
          return res.status(500).json({ success: false, message: "Error al enviar el correo" });
        }

        res.status(200).json({ success: true, message: "Correo enviado con instrucciones" });
      });
    });
  });
});

// Ruta para guardar datos del inventario de alimentos 
app.post('/api/inventario', (req, res) => {
  const { nombre, descripcion, cantidad, ubicacion } = req.body;

  if (!nombre || !descripcion || !cantidad || !ubicacion) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  const insertQuery = `INSERT INTO inventario (nombre, descripcion, cantidad, ubicacion) VALUES (?, ?, ?, ?)`;

  db.query(insertQuery, [nombre, descripcion, cantidad, ubicacion], (err, result) => {
    if (err) {
      console.error('Error al guardar inventario:', err);
      return res.status(500).json({ message: 'Error al guardar los datos del inventario.' });
    }

    res.status(201).json({ message: 'Inventario registrado correctamente.' });
  });
});

// Ruta base
app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi API!');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
