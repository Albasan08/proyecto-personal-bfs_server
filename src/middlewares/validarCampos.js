// IMPORTACIONES DE TERCEROS
const { validationResult } = require("express-validator");

/**
 * Middleware para validar campos enviados desde formularios
 * @param {Object} req Objeto de petición: contiene body, params, headers...
 * @param {Object} res Objeto de respuesta: permite devolver status, json...
 * @param {Function} next Función para pasar al siguiente middleware/controlador.
 * @returns Si hay algún error en el formulario - Array de errores / Si todo es correcto - No devuelve nada 
 */
const validarCampos = (req, res, next) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {

        return res.status(400).json({
            ok: false,
            //convierte los errores en array
            errores: errores.array().map(error => error.mensaje)
        });
        
    }

    next();

};

// EXPORTAR FUNCIONES
module.exports = { validarCampos };