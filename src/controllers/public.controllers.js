// IMPORTACIONES PROPIAS
const { queries } = require("../db/queries");
const { pool } = require("../config/dbConnect");

const obtenerTodaInfoExperiencia = async (req, res) => {
    let client;

    const { id } = req.params;

    try {

        client = await pool.connect();
        // 1. Obtener info de la experiencia
        const infoExperiencia = await client.query(queries.obtenerExperienciaPorId, [id]);
        //Si hay algún error - error
        if(infoExperiencia.rows.length === 0) {

            return res.status(404).json({
                ok: false,
                mensaje: "No se ha encontrado la experiencia"
            });

        };
        // Obtener programación
        const programacionExperiencia = await client.query(queries.obtenerProgramacionId, [id]);

        return res.status(200).json({
            ok: true,
            mensaje: "Experiencia encontrada de forma correcta",
            data: {
                experiencia: infoExperiencia.rows[0],
                programacion: programacionExperiencia.rows
            }
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
    obtenerTodaInfoExperiencia
}