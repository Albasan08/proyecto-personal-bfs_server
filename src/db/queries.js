/**
 * Objeto que contiene todas las queries usadas para gestionar la BBDD
 */
const queries = {

    // Queries auth
    crearUsuario:
        "INSERT INTO users(uid_user, nombre_user, apellido_user, email_user, contrasenia_user, provincia_user, rol_user) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING uid_user, email_user",
    
    encontrarUsuarioPorEmail:
        "SELECT * FROM users WHERE email_user=$1",

    encontrarRolPorId:
        "SELECT rol_user FROM users WHERE uid_user=$1",
    // Fin quieries auth

    // Queries admin
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
        "SELECT * FROM users WHERE uid_user=$1",

    reservasExisten:
        "SELECT * FROM reservations",

    ReservaExiste:
        "SELECT * FROM reservations WHERE id_reserva = $1",

    gestionarEstadoReserva:
        "UPDATE reservations SET estado_reserva = $1 WHERE id_reserva = $2 RETURNING *",
    // Fin queries admin

    // Queries gestor program
    obtenerFechasBloqueadas:
        "SELECT * FROM blocks WHERE fecha_bloqueada && $1::date[]", // Para comparar varías fechas a la vez(array)
    
    bloquearFechas:
        "INSERT INTO blocks(fecha_bloqueada, razon_bloqueo) VALUES($1, $2) RETURNING fecha_bloqueada, razon_bloqueo",

    programarExperienciaId:
        "WITH inserted AS ( INSERT INTO schedules (id_experience, fechas_program, id_horario_program) VALUES ($1, $2, $3) RETURNING id_program, id_experience, fechas_program, id_horario_program ) SELECT i.id_program, i.id_experience, i.fechas_program, i.id_horario_program, t.hora_inicio, t.hora_fin FROM inserted i JOIN timetables t ON t.id_hor = i.id_horario_program;",

    experienciaExisteId:
        "SELECT * FROM experiences WHERE id_expe=$1",

    insertarHorario:
        "INSERT INTO timetables (hora_inicio, hora_fin) VALUES ($1, $2) RETURNING id_hor;",

    experienciaYaProgramada:
        "SELECT * FROM schedules WHERE id_experience = $1",
    // Fin queries gestor program

    // Queries user
    obtenerReservasPorEmail:
        "SELECT r.*, e.nombre_expe FROM reservations r JOIN experiences e ON r.id_experience = e.id_expe WHERE r.email_user = $1;",

    obtenerProgramacionId:
        "SELECT s.id_program, s.id_experience, s.fechas_program, s.fechas_bloqueada, t.id_hor, t.hora_inicio, t.hora_fin, t.hora_inicio_bloqueada, t.hora_fin_bloqueada FROM schedules s LEFT JOIN timetables t ON s.id_horario_program = t.id_hor WHERE s.id_experience = $1;",

    crearReservaUser: 
        "INSERT INTO reservations (email_user, id_experience, fecha_reserva, horario_reserva, personas_reserva, estado_reserva) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"
    // Fin queries user
}

module.exports = { queries }