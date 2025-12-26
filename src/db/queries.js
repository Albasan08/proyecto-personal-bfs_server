const queries = {
    // Queries auth
    crearUsuario:
        "INSERT INTO users(uid_user, nombre_user, apellido_user, email_user, contrasenia_user, provincia_user, rol_user) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING uid_user, email_user",
    
    encontrarUsuarioPorEmail:
        "SELECT * FROM users WHERE email_user=$1"
    
        // Fin quieries auth
}

module.exports = { queries }