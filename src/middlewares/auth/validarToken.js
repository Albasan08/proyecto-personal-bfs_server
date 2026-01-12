/**
 * Middleware para validar el token desde las cookies (gestionado por firebase)
 * @param {Object} req Objeto de petición: contiene body, params, headers...
 * @param {Object} res Objeto de respuesta: permite devolver status, json...
 * @param {Function} next Función para pasar al siguiente middleware/controlador.
 * @returns Si hay algún error en el formulario - Error / Si todo es correcto - No devuelve nada 
 */
const validarToken = (req, res, next) => {
    // Si el token viene de las cookies o desde el header
    const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    // Si no hay token en la petición, parar
    if(!token) {
        return res.status(401).json({
            ok: false,
            mensaje: "Error, no hay token en la petición"
        })
    }

    next();

}

module.exports = { validarToken }