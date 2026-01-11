// IMPORTACIONES PROPIAS
const { queries } = require("../db/queries");
const { pool } = require("../config/dbConnect");

const obtenerInfoUserCompleta = async (req, res) => {
    // Conexión a BBDD
    let client;

    try {

        const uid_user = req.cookies.uid_user; 
        
        if (!uid_user) { 

            return res.status(400).json({ 
                ok: false, 
                mensaje: "No se ha encontrado ningún uid_user" 
            }); 

        }
        
        client = await pool.connect(); 
        // 1. Info usuario 
        const infoUser = await client.query(queries.obtenerInfoAdminUid, [uid_user]); 
        const email_user = infoUser.rows[0].email_user; 
        // 2. Reservas usuario 
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

const crearNuevaReserva = async (req, res) => {
    // Conexión a BBDD
    let client;
    let result;

    const { email_user, id_experience, fecha_reserva, horario_reserva, personas_reserva, estado_reserva } = req.body;

    try {

        client = await pool.connect(); 

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