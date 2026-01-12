// IMPORTACIONES DE TERCEROS
const bcrypt = require("bcrypt");

// IMPORTACIONES PROPIAS
const { queries } = require("../db/queries");
const { pool } = require("../config/dbConnect");

/**
 * Función que crea usuarios en la BBDD
 * @param {Object} req Objeto de petición: contiene body, params, headers...
 * @param {Object} res Objeto de respuesta: permite devolver status, json...
 */
const crearUsuarioNuevo = async (req, res) => {
    // Recoger datos del body
    const { uid_user, nombre_user, apellido_user, email_user, contrasenia_user, contrasenia_user2, provincia_user, rol_user, token } = req.body
        
    try {
        // Encriptar contraseña para guardarla encriptada en la BBDD
        const contraseniaEncriptada = bcrypt.hashSync(contrasenia_user, 10);

        const result = await pool.query(queries.crearUsuario, [uid_user, nombre_user, apellido_user, email_user, contraseniaEncriptada, provincia_user, rol_user])
        // Manejar token en cookies
        res.cookie("token", token, {
            maxAge: 12 * 60 * 60 * 1000,
        });
        // Guardar el rol en las cookies
        res.cookie("rol", rol_user, {
            maxAge: 12 * 60 * 60 * 1000,
        });
        // Guardar uid en cookies
        res.cookie("uid_user", uid_user, {
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

/**
 * Función que inicia sesión de los usuarios a través de email y contraseña
 * @param {Object} req Objeto de petición: contiene body, params, headers...
 * @param {Object} res Objeto de respuesta: permite devolver status, json...
 * @returns Cookies de rol, token e uid
 */
const loginUsuario = async (req, res) => {
    // Recoger datos del body
    const { email_user, token, uid_user } = req.body
    
    try {

        const result = await pool.query(queries.encontrarUsuarioPorEmail, [email_user]);

        const user = result.rows[0]
        // Manejar token en cookies
        res.cookie("token", token, {
            maxAge: 12 * 60 * 60 * 1000,
        });
        // Obtener el rol a través de la BBDD
        const rolUser = await pool.query(queries.encontrarRolPorId, [uid_user]);
        
        const rol = rolUser.rows[0].rol_user;
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

/**
 * Función que cierra la sesión del usuario
 * @param {Object} req Objeto de petición: contiene body, params, headers...
 * @param {Object} res Objeto de respuesta: permite devolver status, json...
 * @returns Limpia las cookies guardadas 
 */
const logOutUsuario = async (req, res) => {
    // Borrar cookies
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

/**
 *  Función que redirige a los usuarios en función del rol guardado en las cookies
 * @param {Object} req Objeto de petición: contiene body, params, headers...
 * @param {Object} res Objeto de respuesta: permite devolver status, json...
 * @returns Redirigir usuarios a diferentes páginas
 */
const redirigirUserPorRol = (req, res) => {

    try {
        // Obtener rol por cookies
        const rol = req.cookies.rol
        
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
