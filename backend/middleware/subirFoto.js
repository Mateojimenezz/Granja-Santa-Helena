const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, 'uploads/');
     },
     filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const nombre = `${Date.now()}${ext}`;
          cb(null, nombre);
     }
});

const subirFoto = multer({ storage });
module.exports = subirFoto;
