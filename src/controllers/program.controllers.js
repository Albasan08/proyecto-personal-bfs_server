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
                error: [
                    {mensaje: "No se ha encontrado ningún uid_user"}
                ]
            });
        };

        client = await pool.connect();

        result = await client.query(queries.obtenerInfoAdminUid, [uid_user]);
        //Por si acaso - error
        if(result.rows.length === 0) {

            return res.status(404).json({
                ok: false,
                error: [
                    {mensaje: "No existe el usuario con ese uid"}
                ]
            })

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
            error: [
                {mensaje: "Error, contacte con el administrador"}
            ]
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
    //console.log(id); 
    try {
        // Conectar a la BBDD
        client = await pool.connect();
        // Comprobar que experiencia existe
        const experienciaExiste = await client.query(queries.experienciaExiste, [id]);
        // Si la experiencia no existe - Error
        if(experienciaExiste.rows.length === 0) {

            return res.status(404).json({
                ok: false,
                error: [
                    {mensaje: "No se ha encontrado la experiencia"}
                ]
            });

        };

        result = await client.query(queries.programarExperienciaId);


    } catch(error) {

    } finally {

        client.release();

    }
}

const bloquearProgramacion = async (req, res) => {
    // Conexión a BBDD
    let client;
    // Datos
    let result;

    try {

        return res.status(200).json({
            ok: true,
            mensaje: "Programación bloqueada de forma correcta"
        });

    } catch(error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            error: [
                {mensaje: "Error, contacte con el administrador"}
            ]
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