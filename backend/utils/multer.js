const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, path.join(__dirname, '..', 'uploads'));
     },
     filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const nombreUnico = `${Date.now()}-${file.originalname}`;
          cb(null, nombreUnico);
     }
});

// Filtro opcional: solo imágenes
const fileFilter = (req, file, cb) => {
     if (file.mimetype.startsWith('image/')) {
          cb(null, true);
     } else {
          cb(new Error('Solo se permiten imágenes'), false);
     }
};

module.exports = multer({ storage, fileFilter });
