/**
 * Middleware que gestiona los roles en las rutas
 * @param  {array} rolesPermitidos Array de roles permitidos
 * @returns Si el rol no es el permitido - Error / Si el rol está permitido pasa al siguiente middleware/controlador
 */
const verificarRol = (...rolesPermitidos) => { // Desde las rutas

    return (req, res, next) => {
        // Requerir el uid para después obtener el rol
        const rol = req.cookies.rol;
        // Si no hay rol parar
        if(!rol) {

            return res.status(401).json({
                ok: false,
                mensaje: "Error, no hay rol"
            });

        };
        // Si el error de las rutas no corresponde parar
        if(!rolesPermitidos.includes(rol)) {

            return res.status(401).json({
                ok: false,
                mensaje: "Error, rol no permitido"
            });

        };

        next();

    };

}

module.exports = { verificarRol }