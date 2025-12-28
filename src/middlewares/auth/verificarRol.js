const verificarRol = (...rolesPermitidos) => { // Desde las rutas
    return (req, res, next) => {
        // Requerir el uid para después obtener el rol
        const rol = req.cookies.rol;
        console.log(rol, "DESDE MIDDLEWARE ROLES");

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