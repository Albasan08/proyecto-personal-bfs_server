// IMPORTACIONES DE TERCEROS
const jwt = require("jsonwebtoken");

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

    /*try {

        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const tokenData = {
            uid: payload.uid,
            nombre: payload.nombre,
        };

        req.tokenData = tokenData;

        // Pasar al siguiente middleware
        next();

    } catch(error) {

        console.log(error);
        return res.status(401).json({
            ok: false,
            mensaje: "Token no válido"
        });

    };*/
}

module.exports = { validarToken }