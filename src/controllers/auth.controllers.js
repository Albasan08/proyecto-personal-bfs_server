// IMPORTACIONES DE TERCEROS
const bcrypt = require("bcrypt");

// IMPORTACIONES PROPIAS
const { queries } = require("../db/queries");
const { pool } = require("../config/dbConnect")

const crearUsuarioNuevo = async (req, res) => {
        //console.log(req.body);
        const { uid_user, nombre_user, apellido_user, email_user, contrasenia_user, contrasenia_user2, provincia_user, rol_user, token } = req.body
        //console.log(rol_user, "DESDE EL FRONT");
    
    try {

        // No hace falta comprobar que el usuario exista, lo hace firebase

        // Encriptar contraseña para guardarla encriptada en la BBDD
        const contraseniaEncriptada = bcrypt.hashSync(contrasenia_user, 10);
        console.log(contraseniaEncriptada)

        const result = await pool.query(queries.crearUsuario, [uid_user, nombre_user, apellido_user, email_user, contraseniaEncriptada, provincia_user, rol_user])
        //console.log("Usuario insertado en Postgres:", result.rows[0])

        // Manejar token en cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 12 * 60 * 60 * 1000,
        });

        res.status(201).json({
            ok: true,
            mensaje: "Usuario creado correctamente",
            user: result.rows[0]
        })

    } catch(error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: "Error, consulte con el administrador"
        });

    }
}

const loginUsuario = async (req, res) => {

    //console.log(req.body)
    const { email_user, token } = req.body

    try {

        // Firebase comprueba que exista el usuario o no 
        const result = await pool.query(queries.encontrarUsuarioPorEmail, [email_user]);
        //console.log(result);

        const user = result.rows[0]

        // Manejar token en cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 12 * 60 * 60 * 1000,
        });
        console.log(token)

        return res.status(200).json({
            ok: true,
            mensaje: "El usuario ha iniciado sesión de forma correcta"
        })

    } catch(error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: "Error, consulte con el administrador"
        })
    }
}

const logOutUsuario = async (req, res) => {
    // Borrar cookies con token
    res.clearCookie("token", {
        httpOnly: true,
        secure: true
    });

    return res.status(200).json({
        ok: true,
        mensaje: "Sesión cerrada correctamente"
    });

}

module.exports = {
    crearUsuarioNuevo,
    loginUsuario,
    logOutUsuario
}
