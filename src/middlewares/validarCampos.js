// IMPORTACIONES DE TERCEROS
const { validationResult } = require("express-validator");

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
