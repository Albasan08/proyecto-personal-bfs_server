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