// IMPORTACIONES PROPIAS
const { queries } = require("../db/queries");
const { pool } = require("../config/dbConnect");

/**
 * Función que devuelve la información de la tabla users y la tabla reservas por uid
 * @param {Object} req Objeto de petición: contiene body, params, headers...
 * @param {Object} res Objeto de respuesta: permite devolver status, json...
 * @returns Objeto con la información del usuario con rol user y sus reservas
 */
const obtenerInfoUserCompleta = async (req, res) => {
    // Conexión a BBDD
    let client;

    try {
        // Recoger uid mediante cookies
        const uid_user = req.cookies.uid_user; 
        // Si no existe usuario con ese uid - Error
        if (!uid_user) { 

            return res.status(400).json({ 
                ok: false, 
                mensaje: "No se ha encontrado ningún uid_user" 
            }); 

        }
        
        client = await pool.connect(); 
        // 1. Recoger info usuario
        const infoUser = await client.query(queries.obtenerInfoAdminUid, [uid_user]); 
        // Recoger email para obtener sus reservas
        const email_user = infoUser.rows[0].email_user; 
        // 2. Recoger reservas según email usuario
        const reservas = await client.query(queries.obtenerReservasPorEmail, [email_user]); 
        
        return res.status(200).json({ 
            ok: true, 
            mensaje: "Datos obtenidos correctamente", 
            data: { usuario: infoUser.rows[0], reservas: reservas.rows } 
        });

    } catch(error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: "Error, contacte con el administrador"
        });
    
    } finally {

        client.release();

    };
};

/**
 * Función que crea una nueva reserva por usuario con rol user
 * @param {Object} req Objeto de petición: contiene body, params, headers...
 * @param {Object} res Objeto de respuesta: permite devolver status, json...
 * @returns La información con la nueva reserva
 */
const crearNuevaReserva = async (req, res) => {
    // Conexión a BBDD
    let client;
    // Resultado
    let result;
    // Propiedades del body
    const { email_user, id_experience, fecha_reserva, horario_reserva, personas_reserva, estado_reserva } = req.body;

    try {

        client = await pool.connect(); 
        // Crear reserva - No se comprueba ya que en un futuro se puede repetir la reserva con las mismas características
        result = await client.query(queries.crearReservaUser, [email_user, id_experience, fecha_reserva, horario_reserva, personas_reserva, estado_reserva])

        return res.status(201).json({
            ok: true,
            mensaje: "Reserva guardada de forma correcta",
            data: result.rows[0]
        });

    } catch(error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: "Error, contacte con el administrador"
        })

    } finally {

        client.release();

    }

}

module.exports =  {
    obtenerInfoUserCompleta,
    crearNuevaReserva
}