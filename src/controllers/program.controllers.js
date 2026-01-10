// IMPORTACIONES PROPIAS
const { pool } = require("../config/dbConnect");
const { queries } = require("../db/queries");

const obtenerInfoGestorPorUid = async (req, res) => {
    // Conexión a BBDD
    let client;
    // Datos
    let result;

    try {

        const uid_user = req.cookies.uid_user
        //console.log(uid_user);
        // Si hay algún error - error
        if(!uid_user) {

            return res.status(400).json({
                ok: false,
                mensaje: "No se ha encontrado ningún uid_user"
            });

        };

        client = await pool.connect();

        result = await client.query(queries.obtenerInfoAdminUid, [uid_user]);
        //Por si acaso - error
        if(result.rows.length === 0) {

            return res.status(404).json({
                ok: false,
                mensaje: "No existe el usuario con ese uid"
            });

        }

        return res.status(200).json({
            ok: true,
            mensaje: "Información del usuario encontrada correctamente",
            data: result.rows[0]
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

const programarExperienciaId = async (req, res) => {
    // Conexión a BBDD
    let client;
    // Datos
    let result;
    // Obtener id de params
    const { id } = req.params;
    const { fechas, rangos } = req.body;
    console.log(req.body)
    try {
        // Conectar a la BBDD
        client = await pool.connect(); 
        // Si la experiencia no existe - Error 
        const experienciaExiste = await client.query( queries.experienciaExisteId, [id] ); 
        
        if (experienciaExiste.rows.length === 0) { 

            return res.status(404).json({ 
                ok: false, 
                mensaje: "No se ha encontrado la experiencia" 
            }); 

        } 
        // Insertar horarios nuevos SIEMPRE 
        const horariosIds = []; 
        
        for (const rango of rangos) { 

            const insertarHorario = await client.query( queries.insertarHorario, [rango.inicio, rango.fin] ); 
            horariosIds.push(insertarHorario.rows[0].id_hor); 

        };
        // Insertar programación nueva SIEMPRE 
        for (const id_hor of horariosIds) { 

            result = await client.query( queries.programarExperienciaId, [id, fechas, id_hor] ); 
        };
        
        return res.status(201).json({ 
            ok: true, 
            mensaje: "Programación añadida correctamente", 
            data: result.rows 
        });

    } catch(error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            return: "Error, contacte con el administrador"
        })

    } finally {

        client.release();

    }
}

const bloquearProgramacion = async (req, res) => {
    // Conexión a BBDD
    let client;
    // Datos
    let result;

    const { fecha_bloqueada, razon_bloqueo } = req.body;

    try {

        client = await pool.connect();
        // Si la fecha ya está bloqueada - No bloquear
        const existeFechaBloqueada = await client.query(queries.obtenerFechasBloqueadas, [fecha_bloqueada]);
        //console.log(existeFechaBloqueada);
        if(existeFechaBloqueada.lenght > 0) {

            return res.status(400).json({
                ok: false,
                mensaje: "No se puede bloquear la fecha ${fechasCoinciden.join(', ')} porque ya está bloqueada"
            });

        };
        // Si la fecha no está bloqueada - Bloquear
        result = await client.query(queries.bloquearFechas, [fecha_bloqueada, razon_bloqueo]);
        console.log(result)
        return res.status(200).json({
            ok: true,
            mensaje: "Programación bloqueada de forma correcta",
            //data:
        });

    } catch(error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: "Error, contacte con el administrador"
        });

    } finally {

        client.release();

    }
}

module.exports = {
    obtenerInfoGestorPorUid,
    programarExperienciaId,
    bloquearProgramacion
}