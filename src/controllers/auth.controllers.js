// IMPORTACIONES DE TERCEROS
const bcrypt = require("bcrypt");

// IMPORTACIONES PROPIAS
const { queries } = require("../db/queries");
const { pool } = require("../config/dbConnect");

const crearUsuarioNuevo = async (req, res) => {
        //console.log(req.body);
        const { uid_user, nombre_user, apellido_user, email_user, contrasenia_user, contrasenia_user2, provincia_user, rol_user, token } = req.body
        //console.log(rol_user, "DESDE EL FRONT");
    try {
        // Encriptar contraseña para guardarla encriptada en la BBDD
        const contraseniaEncriptada = bcrypt.hashSync(contrasenia_user, 10);
        //console.log(contraseniaEncriptada)

        const result = await pool.query(queries.crearUsuario, [uid_user, nombre_user, apellido_user, email_user, contraseniaEncriptada, provincia_user, rol_user])
        //console.log("Usuario insertado en Postgres:", result.rows[0])

        // Manejar token en cookies
        res.cookie("token", token, {
            maxAge: 12 * 60 * 60 * 1000,
        });

        // Guardar el rol en las cookies para después poder utilizarlo
        res.cookie("rol", rol_user, {
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
    const { email_user, token, uid_user } = req.body
    //console.log(token)
    try {

        const result = await pool.query(queries.encontrarUsuarioPorEmail, [email_user]);
        //console.log(result);

        const user = result.rows[0]

        // Manejar token en cookies
        res.cookie("token", token, {
            maxAge: 12 * 60 * 60 * 1000,
        });
        //console.log(token)
        // Obtener el rol a través de la BBDD
        const rolUser = await pool.query(queries.encontrarRolPorId, [uid_user]);
        //console.log(rolUser)
        const rol = rolUser.rows[0].rol_user;
        //console.log(rol);
        // Guardar el rol en las cookies para después poder utilizarlo
        res.cookie("rol", rol, {
            maxAge: 12 * 60 * 60 * 1000,
        });
        //Guardar uid en cookies
        res.cookie("uid_user", uid_user, {
            maxAge: 12 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            ok: true,
            mensaje: "El usuario ha iniciado sesión de forma correcta"
        })

    } catch(error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: "Error, consulte con el administrador"
        })
    }
}

const logOutUsuario = async (req, res) => {
    //console.log("ENTRANDO A LOGOUT USUARIO EN BACK")
    // Borrar cookies con token y rol
    res.clearCookie("token", {
        secure: false, 
        sameSite: "lax", 
        path: "/"
    });

    res.clearCookie("rol", {
        secure: false, 
        sameSite: "lax", 
        path: "/"
    });

    return res.status(200).json({
        ok: true,
        mensaje: "Sesión cerrada correctamente",
        redirect: "/experiencias"
    });

}

const redirigirUserPorRol = (req, res) => {

    try {

        const rol = req.cookies.rol
        //console.log(rol);
        const redirigirSegunRol = {
            admin: "/admin/info",
            user: "/user/info",
            program: "/gestor/info"
        };
        // Si hay rol redirigir, sino ir a experiencias
        const redirect = redirigirSegunRol[rol] || "/experiencias";

        return res.status(200).json({
            ok: true,
            mensaje: "Usuario redirigido de forma correcta",
            rol,
            redirect
        });

    } catch(error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: "Error al redirigir al usuario"
        });

    };
}


module.exports = {
    crearUsuarioNuevo,
    loginUsuario,
    logOutUsuario,
    redirigirUserPorRol
}
