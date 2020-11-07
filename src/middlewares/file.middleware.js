const path = require('path');
const multer = require('multer');

// Importaremos las librerías necesarias para la nueva función
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

const upload = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public/uploads'));
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!VALID_FILE_TYPES.includes(file.mimetype)) {
      cb(new Error('Invalid file type'));
    } else {
      cb(null, true);
    }
  },
});

// Ahora tenemos un nuevo middleware de subida de archivos
const uploadToCloudinary = async (req, res, next) => {
	if (req.file) {
		const filePath = req.file.path;
    const image = await cloudinary.uploader.upload(filePath);

		// Borramos el archivo local
    await fs.unlinkSync(filePath);
	
		// Añadimos la propiedad file_url a nuestro Request
    req.file_url = image.secure_url;
		return next();
  } else {
    return next();
  }
};

module.exports = { upload: upload, uploadToCloudinary };