// backend/app.js
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
// Puedes seguir agregando más rutas según necesites

module.exports = app;
