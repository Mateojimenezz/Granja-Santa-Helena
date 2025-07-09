// server.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./db');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configuración CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const allowedOrigins = ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost'];
    if (!allowedOrigins.includes(origin)) {
      const msg = 'El CORS no está permitido para este origen.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'assets/img')); // Carpeta donde se guardan las imágenes
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// Servir carpeta de imágenes como pública
app.use("/uploads", express.static(path.join(__dirname, "assets/img")));


// Middleware para configurar sesión
app.use(session({
  secret: 'mi_clave_secreta',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000, // 1 hora en milisegundos
    secure: false,   // en producción, usa true si usas HTTPS
    sameSite: 'lax'
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

// Middleware para verificar sesión y permisos de administrador
function verificarSesion(req, res, next) {
  if (req.session && req.session.usuario && req.session.usuario.permiso === 'Administrador') {
    next(); // Autorizado
  } else {
    res.status(403).json({ mensaje: 'No autorizado' });
  }
}
// Ruta para validar si hay sesión activa
app.get('/api/sesion', (req, res) => {
  if (req.session && req.session.email) {
    res.status(200).json({
      sesionActiva: true,
      usuario: {
        email: req.session.email,
        cargo: req.session.cargo,
        permiso: req.session.permiso
      }
    });
  } else {
    res.status(401).json({ sesionActiva: false });
  }
});

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('❌ Faltan datos en login:', { email, password });
    return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
  }

  console.log('📥 Intento de login:', { email });

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('❌ Error en la consulta login:', err);
      return res.status(500).json({ message: 'Error en la base de datos' });
    }

    if (results.length === 0) {
      console.log('❌ Usuario no encontrado:', email);
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    const user = results[0];

    bcrypt.compare(password, user.contrasena, (err, isMatch) => {
      if (err) {
        console.error('❌ Error al comparar contraseña:', err);
        return res.status(500).json({ message: 'Error al verificar contraseña' });
      }

      if (!isMatch) {
        console.log('❌ Contraseña incorrecta para:', email);
        return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
      }

      console.log('✅ Usuario autenticado:', { Usuario: user.Nombre, Id: user.Identificacion });

      // ✅ Guardar toda la info bajo session.usuario
      req.session.usuario = {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        cargo: user.cargo,
        permiso: user.permiso
      };

      res.status(200).json({
        message: 'Inicio de sesión exitoso',
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          cargo: user.cargo,
          permiso: user.permiso
        }
      });
    });
  });
});


// Ruta para cerrar sesión
app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('❌ Error al cerrar sesión:', err);
      return res.status(500).json({ message: 'Error al cerrar sesión' });
    }
    console.log('✅ Sesión cerrada exitosamente');
    res.clearCookie('connect.sid'); // limpia la cookie de sesión
    res.set('Cache-Control', 'no-store');
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
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

// Ruta para registrar granja
app.post("/api/granjas", upload.single("imagen"), (req, res) => {
  const { nombre } = req.body;
  const imagen = req.file;

  if (!nombre || !imagen) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const rutaImagen = `/uploads/${imagen.filename}`;
  const sql = "INSERT INTO granjas (nombre, imagen) VALUES (?, ?)";

  db.query(sql, [nombre, rutaImagen], (err, result) => {
    if (err) {
      console.error("Error DB:", err);
      return res.status(500).json({ error: "Error al guardar" });
    }

    res.status(200).json({ mensaje: "Granja registrada" });
  });
});

// Ruta para obtener todas las granjas
app.get("/api/granjas", (req, res) => {
  const sql = "SELECT * FROM granjas";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener granjas:", err);
      return res.status(500).json({ error: "Error al obtener las granjas" });
    }

    // Opcional: puedes agregarle la URL completa a la imagen si es necesario
    const granjas = results.map(g => ({
      ...g,
      imagen: `http://localhost:3000${g.imagen}` // esto asume que estás sirviendo /uploads correctamente
    }));

    res.status(200).json(granjas);
  });
});


// Ruta para guardar datos del inventario de alimentos;

app.post("/api/inventario", (req, res) => {
  const datos = req.body;

  if (!Array.isArray(datos) || datos.length === 0) {
    return res.status(400).json({ message: "Se requiere un arreglo de datos." });
  }

  // Validación
  for (const item of datos) {
    const {
      categoria,
      tipo,
      cantidad,
      fecha_entrada,
      proveedor,
      lote,
      fecha_vencimiento,
      responsable,
      estado,
    } = item;

    if (
      !categoria || !tipo || cantidad == null || !fecha_entrada ||
      !proveedor || !lote || !fecha_vencimiento || !responsable || !estado
    ) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }
  }

  // Transformar los datos para la inserción
  const values = datos.map(item => [
    item.categoria,
    item.tipo,
    item.cantidad,
    item.fecha_entrada,
    item.proveedor,
    item.lote,
    item.fecha_vencimiento,
    item.responsable,
    item.estado
  ]);

  const sql = `
    INSERT INTO inventario_alimentos 
    (categoria, tipo, cantidad, fecha_entrada, proveedor, lote, fecha_vencimiento, responsable, estado)
    VALUES ?
  `;

  console.log("Consulta SQL:", sql);
  console.log("Valores a insertar:", values);

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error("❌ Error al insertar datos:", err);
      return res.status(500).json({ message: "Error al guardar en la base de datos." });
    }
    console.log("✅ Inserción exitosa:", result);
    res.status(200).json({ message: "Datos guardados correctamente.", filas_insertadas: result.affectedRows });
  });
});


app.put("/api/inventario/:id", (req, res) => {
  const id = req.params.id;
  const {
    categoria,
    tipo,
    cantidad,
    fecha_entrada,
    proveedor,
    lote,
    fecha_vencimiento,
    responsable,
    estado,
  } = req.body;

  if (
    !categoria || !tipo || cantidad == null || !fecha_entrada ||
    !proveedor || !lote || !fecha_vencimiento || !responsable || !estado
  ) {
    return res.status(400).json({ message: "Todos los campos son obligatorios para la actualización." });
  }

  const sql = `
    UPDATE inventario_alimentos 
    SET categoria = ?, tipo = ?, cantidad = ?, fecha_entrada = ?, proveedor = ?, lote = ?, 
        fecha_vencimiento = ?, responsable = ?, estado = ?
    WHERE id = ?
  `;

  const values = [
    categoria,
    tipo,
    cantidad,
    fecha_entrada,
    proveedor,
    lote,
    fecha_vencimiento,
    responsable,
    estado,
    id
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ Error al actualizar datos:", err);
      return res.status(500).json({ message: "Error al actualizar en la base de datos." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Elemento no encontrado para actualizar." });
    }

    console.log("✅ Actualización exitosa:", result);
    res.status(200).json({ message: "Elemento actualizado correctamente." });
  });
});

// Middleware para verificar si el usuario es administrador
function verificarAdministrador(req, res, next) {
  console.log('Sesión actual:', req.session);

  if (!req.session || !req.session.usuario || req.session.usuario.permiso !== 'permitido') {
    return res.status(403).json({ mensaje: 'Acceso denegado: no tienes permiso' });
  }
  next();
}


// Ruta protegida para obtener todos los usuarios
app.get('/api/usuarios', verificarAdministrador, (req, res) => {
  db.query(
    'SELECT id, nombre, identificacion, email, telefono, cargo, permiso FROM usuarios',
    (err, results) => {
      if (err) {
        console.error('❌ Error al obtener usuarios:', err);
        return res.status(500).json({ message: 'Error al obtener usuarios' });
      }
      res.json(results); // Devuelve el array de usuarios
    }
  );
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
