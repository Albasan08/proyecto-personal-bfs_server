// IMPORTACIONES DE TERCEROS

// IMPORTACIONES PROPIAS
const { queries } = require("../db/queries");
const { pool } = require("../config/dbConnect")

const crearUsuarioNuevo = async (req, res) => {
    
        console.log(req.body);
        const { uid_user, nombre_user, apellido_user, email_user, contrasenia_user, contrasenia_user2, provincia_user, rol_user, token } = req.body
        console.log(rol_user, "DESDE EL FRONT");
    
    try {

        // Comprobar que contraseñas coinciden
        if(contrasenia_user !== contrasenia_user2) {
            return res.status(400).json({
                ok: false,
                mensaje: "Las contraseñas no coinciden"
            })
        } 

        // No hace falta comprobar que el usuario exista, lo hace firebase

        const result = await pool.query(queries.crearUsuario, [uid_user, nombre_user, apellido_user, email_user, contrasenia_user, provincia_user, rol_user])
        console.log("Usuario insertado en Postgres:", result.rows[0])

        // Manejar token en cookies

        res.status(201).json({
            ok: true,
            mensaje: "Usuario creado correctamente",
            user: result.rows[0]
        })

    } catch(error) {

        console.log(error.stack);
        res.status(500).json({
            ok: false,
            mensaje: "Error al crear el usuario"
        })

    }
}

module.exports = {
    crearUsuarioNuevo
}