// IMPORTACIONES DE TERCEROS
const multer = require("multer"); 
const path = require("path");

/**
 * Middleware para eliminar las imágenes de multer cuando se elimina una experiencia
 * @param {Object} req Objeto de petición: contiene body, params, headers...
 * @param {Object} res Objeto de respuesta: permite devolver status, json...
 * @param {Function} next Función para pasar al siguiente middleware/controlador.
 * @returns Si hay algún error en el formulario - Error / Si todo es correcto - No devuelve nada 
 */
const eliminarImagen = (req, res, next) => {

    try {

        const imagenAEliminar = req.experiencia.imagen_expe;

        const ruta = path(process.cwd(), "public/uploads/experiencias", imagenAEliminar);
        // Si existe foto - Eliminar
        if (fs.existsSync(ruta)) { 
            fs.unlinkSync(ruta); 
        } 
        
        next();

    } catch(error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: "Error, contacte con el administrador"
        });

    };

};

module.exports = eliminarImagen;