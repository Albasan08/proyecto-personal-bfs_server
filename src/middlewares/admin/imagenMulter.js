/**
 * Middleware para validar la imagen desde multer
 * @param {Object} req Objeto de petición: contiene body, params, headers...
 * @param {Object} res Objeto de respuesta: permite devolver status, json...
 * @param {Function} next Función para pasar al siguiente middleware/controlador.
 * @returns Si hay algún error en el formulario - Array de errores / Si todo es correcto - No devuelve nada 
 */
const validarImagenMulter = (req, res, next) => {

    if (!req.file) {
        return res.status(400).json({
            ok: false,
            error: [
                {mensaje: "El campo de la imagen es obligatoria"}
            ]
        })
    };

    next();

};

// EXPORTAR
module.exports = {
    validarImagenMulter
}