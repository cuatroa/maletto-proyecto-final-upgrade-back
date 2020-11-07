//se ha de instalar el npm install --save multer => Esto nos va a ayudar a subir fotos al servidor
const multer = require('multer');

//Se llama al modulo nativo de node -- path
const path = require('path');

//Estructura para guardar las img--- se invoca al multer para exportar las img -- indicando como se va ha guardar (storage) & filtro para imagenes a aceptar (fileFilter)
/**
 * 1º line = se crea una constante que almacenará en la función "diskStorage" lo que middleware necesita para saber donde guarda la img
 * 2º line = invocamos a la función "filename" -- Que dará el nombre a nuestra img
 * 3º line = se genera una ruta para almacenar los archivos
 */
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    /**
     *  cb = es la función que se utiliza para la devolución de llamada del midleware para la img que acepta 2 parámetros
     * se da nombre a la img --> fecha de subida -- + la extensión del archivo(png/jpg)..
     */
    cb(null, Date.now() + path.extname(file.originalname));
  },
  destination: (req, file, cb) => {
    /**
     * path.join(_dirname) => dónde estamos ejecutando la petición - dirname () --- y se añade dónde se almacenaran las imagenes que se subirán
     */
    cb(null, path.join(__dirname, '../public/uploads'));
  }
});

/**
 * Creamos un filtro para que los usuarios solo puedan subir imágenes al servidor y no de archivos de texto o canciones.
 * Se genera una lista de archivos permitidos e invocaremos al callback
 */
const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
  if (!VALID_FILE_TYPES.includes(file.mimetype)) {
    cb(new Error('Invalid file type'));
  } else {
    cb(null, true);
  }
}
// //se invoca al multer para exportar las img -- indicando como se va ha guardar (storage) & filtro para imagenes a aceptar (fileFilter)
const upload = multer({
  storage,
  fileFilter,
});

module.exports = { upload: upload };
