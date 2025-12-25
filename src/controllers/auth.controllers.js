
const crearUsuarioNuevo = (req, res) => {
    
    console.log(req.body);
    const { uid_user, nombre_user, apellido_user, email_user, contrasenia_user, provincia_user, rol_user } = req.body
    console.log(rol_user, "DESDE EL FRONT");
   
    try {

        res.status(201).json({
            ok: true,
            mensaje: "Usuario creado correctamente"
        })

    } catch(error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: "Error al crear el usuario"
        })

    }
}

module.exports = {
    crearUsuarioNuevo
}