// IMPORTACIONES DE TERCEROS
const multer = require("multer"); 
const path = require("path");

/**
 * Configuración de almacenamiento de las imágenes gestionadas por Multer (ruta donde se guardan y nombre)
 */
const almacenamiento = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "public/uploads/experiencias"); // Carpeta donde se va a guardar la imagen
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Se renombra con la fecha actual para evitar duplicados
    }

});

/**
 * Función que filtra las extensiones de las imágenes
* @param {Object} res Objeto de respuesta: permite devolver status, json...
 * @param {Archive} file 
 * @param {Function} cb callback para aceptar o rechazar el archivo
 */
const filtrarExtensiones = (req, file, cb) => {

    const permitido = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    if(permitido.includes(file.mimetype)) cb(null, true); // Acepta
    else cb(new Error("Error, formato no permitido"), false); // Rechaza

}

const upload = multer({
    storage: almacenamiento,
    fileFilter: filtrarExtensiones
});

module.exports = upload;