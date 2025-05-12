// server.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // Para encriptar la contraseña
const db = require('./db'); // Conexión a la base de datos
require('dotenv').config(); // Cargar variables de entorno

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta para registrar un usuario
app.post('/api/usuarios', (req, res) => {
  const { name, identification, email, phone, role, password } = req.body;

  // Validar que todos los campos sean enviados
  if (!name || !identification || !email || !phone || !role || !password) {
    return res.status(400).send('Todos los campos son obligatorios.');
  }

  // Validar si la identificación o el correo ya están registrados
  const checkUserQuery = `SELECT * FROM usuarios WHERE identificacion = ? OR email = ?`;
  
  db.query(checkUserQuery, [identification, email], (err, results) => {
    if (err) {
      console.error('Error al verificar la existencia del usuario:', err);
      return res.status(500).send('Error al verificar el usuario.');
    }

    // Si ya existe un usuario con esa identificación o correo
    if (results.length > 0) {
      return res.status(400).send('El usuario con esa identificación o correo ya existe.');
    }

    // Encriptación de la contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error al encriptar la contraseña:', err);
        return res.status(500).send('Error al encriptar la contraseña');
      }

      // Consulta SQL para insertar los datos en la base de datos
      const query = `INSERT INTO usuarios (nombre, identificacion, email, telefono, cargo, contrasena) 
                     VALUES (?, ?, ?, ?, ?, ?)`;

      db.query(query, [name, identification, email, phone, role, hashedPassword], (err, result) => {
        if (err) {
          console.error('Error al registrar el usuario:', err);
          return res.status(500).send('Error al registrar el usuario');
        }
        console.log("Usuario registrado correctamente:", result);
        res.status(200).send('Usuario registrado correctamente');
      });
    });
  });
});

//////////////////// Ruta para iniciar sesión

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  console.log("Recibiendo solicitud de login con:", { email, password });

  // Verificar si los datos son correctos
  if (!email || !password) {
    return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
  }

  // Verificar si el correo existe
  const checkUserQuery = `SELECT * FROM usuarios WHERE email = ?`;

  db.query(checkUserQuery, [email], (err, results) => {
    if (err) {
      console.error('Error al verificar el usuario:', err);
      return res.status(500).json({ message: 'Error al verificar el usuario' });
    }

    // Si no hay resultados (el usuario no existe)
    if (results.length === 0) {
      console.log("Usuario no encontrado");
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    const user = results[0];
    console.log("Usuario encontrado:", user);

    // Verificar si la contraseña almacenada está vacía o mal definida
    if (!user.contrasena) {
      console.log("Contraseña en la base de datos está vacía");
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    console.log("Contraseña almacenada en la base de datos:", user.contrasena);

    // Verificar si la contraseña es correcta
    bcrypt.compare(password, user.contrasena, (err, isMatch) => {
      if (err) {
        console.error('Error al comparar las contraseñas:', err);
        return res.status(500).json({ message: 'Error al comparar las contraseñas' });
      }
    
      console.log("Contraseña proporcionada:", password);
      console.log("Contraseña almacenada en la base de datos:", user.contrasena);
    
      if (!isMatch) {
        console.log("Contraseña incorrecta");
        return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
      }
    
      // Si la contraseña es correcta, iniciar sesión
      console.log("Inicio de sesión exitoso");
      return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    });    
  });
});

// Verificar si entre al puerto 3000
app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi API!');
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
