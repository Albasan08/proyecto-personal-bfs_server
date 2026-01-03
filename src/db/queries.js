const queries = {

    // Queries auth
    crearUsuario:
        "INSERT INTO users(uid_user, nombre_user, apellido_user, email_user, contrasenia_user, provincia_user, rol_user) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING uid_user, email_user",
    
    encontrarUsuarioPorEmail:
        "SELECT * FROM users WHERE email_user=$1",

    encontrarRolPorId:
        "SELECT rol_user FROM users WHERE uid_user=$1",
    // Fin quieries auth

    // Queries admin experiencias
    experienciaExiste:
        "SELECT * FROM experiences WHERE nombre_expe=$1",

    experienciaCrear:
        "INSERT INTO experiences(nombre_expe, desc_corta_expe, desc_larga_expe, imagen_expe, duracion_expe, precio_expe, personas_max_expe) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING nombre_expe, desc_corta_expe, desc_larga_expe, imagen_expe, duracion_expe, precio_expe, personas_max_expe",

    obtenerExperienciaPorId:
        "SELECT * FROM experiences WHERE id_expe=$1",

    actualizarExperinciaPorId:
        "UPDATE experiences SET nombre_expe = $1, desc_corta_expe = $2, desc_larga_expe = $3, imagen_expe = $4, duracion_expe = $5, precio_expe = $6, personas_max_expe = $7 WHERE id_expe = $8 RETURNING nombre_expe, desc_corta_expe, desc_larga_expe, imagen_expe, duracion_expe, precio_expe, personas_max_expe",

    eliminarExperienciaporId:
        "DELETE FROM experiences WHERE id_expe = $1",

    obtenerTodasExperiencias:
        "SELECT * FROM experiences",
    
    obtenerInfoAdminUid:
        "SELECT * FROM users WHERE uid_user=$1"
}

module.exports = { queries }