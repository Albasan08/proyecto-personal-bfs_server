//IMPORTACIONES DE TERCEROS

// IMPORTACIONES PROPIAS
const { pool } = require("../config/dbConnect");
const { queries } = require("../db/queries");

const crearExperienciaAdmin = async (req, res) => {
    // Conexión a la BBDD
    let client;
    // Datos
    let result;

    const { nombre_expe, desc_corta_expe, desc_larga_expe, duracion_expe, precio_expe, personas_max_expe } = req.body
    //console.log(nombre_expe);
    const imagen_expe = req.file ? req.file.filename : null;
    try {
        // Conectar a la BBDD
        client = await pool.connect();
        // Comprobar que la experiencia existe
        const experienciaExiste = await client.query(queries.experienciaExiste, [nombre_expe]);
        // Si la experiencia existe - error
        if(experienciaExiste.rows.length > 0) {
            return res.status(400).json({
                ok: false, 
                error: [
                    {mensaje: "No se puede crear la experiencia porque ya existe"}
                ]
            });
        };
        // Si no existe la experiencia - crearla
        result = await client.query(queries.experienciaCrear, [nombre_expe, desc_corta_expe, desc_larga_expe, imagen_expe, duracion_expe, precio_expe, personas_max_expe]);
        //console.log(result);
        return res.status(201).json({
            ok: true,
            mensaje: "Experiencia creada correctamente",
            data: result.rows[0]
        });

    } catch(error) {
        
        console.log(error);
        return res.status(500).json({
            ok: false,
            error: [
                {mensaje: "Error, contacte con el administrador"}
            ]
        })
    } finally {

        client.release();

    };
};

const obtenerExperienciaPorId = async (req, res) => {
    // Conexión con BBDD
    let client;
    //Datos
    let result;
    // Obtener id de params
    const { id } = req.params;
    //console.log(id); 
    try {
        //Conectar con BBDD
        client = await pool.connect();
        // Comprobar que la experiencia existe por su ID
        result = await client.query(queries.obtenerExperienciaPorId, [id]);
        //console.log(result);
        // Si no encuentra la experiencia - error
        if(result.rows.length === 0) {

            return res.status(404).json({
                ok: false,
                error: [
                    {mensaje: "No se ha encontrado la experiencia"}
                ]
            });
        };
        // Obtener toda la info de la experiencia
        const { nombre_expe, desc_corta_expe, desc_larga_expe, imagen_expe, duracion_expe, precio_expe, personas_max_expe } = result.rows[0];

        return res.status(200).json({
            ok: true,
            mensaje: "Experiencia encontrada correctamente",
            data: {
                nombre_expe,
                desc_corta_expe,
                desc_larga_expe,
                imagen_expe,
                duracion_expe,
                precio_expe,
                personas_max_expe,
            }
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

};

const obtenerTodasExperiencias = async (req, res) => {
    // Conexión a BBDD
    let client;
    // Datos
    let result;

    try {
        // Conectar a la BBDD
        client = await pool.connect();

        result = await client.query(queries.obtenerTodasExperiencias);
        // Si no encuentra - error
        if(result.rows.length === 0) {

            return res.status(404).json({
                ok: false,
                error: [
                    {mensaje: "No se han encontrado las experiencias"}
                ]
            });
        };

        return res.status(200).json({
            ok: true,
            mensaje: "Experiencias encontradas correctamente",
            data: result.rows
        })

    } catch(error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            error: [
                {mensaje: "Error, contacte con el administrador"}
            ]
        })

    } finally {

        client.release();

    };

};

const editarExperienciaPorId = async (req, res) => {
    // Conexión a BBDD
    let client;
    // Datos
    let result;
    // Capturar id
    const { id } = req.params;
    //console.log(id);
    try {

        client = await pool.connect();
        //Comprobar si la experiencia existe, si no existe - Error
        const experienciaExiste = await client.query(queries.obtenerExperienciaPorId, [id]);
        //console.log(experienciaExiste);
        if(!id || experienciaExiste.rows.length === 0) {
            return res.status(404).json({
                ok: false,
                error: [
                    {mensaje: "No se ha encontrado la experiencia"}
                ]
            })
        };
        // Obtener info del body
        const { nombre_expe, desc_corta_expe, desc_larga_expe, duracion_expe, precio_expe, personas_max_expe } = req.body;
        //console.log(nombre_expe);
        const imagenActual = experienciaExiste.rows[0].imagen_expe; 
        const nuevaImagen = req.file ? req.file.filename : imagenActual;

        result = await client.query(queries.actualizarExperinciaPorId, [nombre_expe, desc_corta_expe, desc_larga_expe, nuevaImagen, duracion_expe, precio_expe, personas_max_expe, id]);

        return res.status(200).json({
            ok: true,
            mensaje: "Experiencia modificada correctamente",
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

const eliminarExperienciaPorId = async (req, res) => {
    // Conexión a BBDD
    let client;
    // Datos
    let result;
    // Capturar id
    const { id } = req.params;
    //console.log(id);
    try {

        client = await pool.connect();
        //Comprobar si la experiencia existe, si no existe - Error
        const experienciaExiste = await client.query(queries.obtenerExperienciaPorId, [id]);
        //console.log(experienciaExiste);
        if(!id || experienciaExiste.rows.length === 0) {
            return res.status(404).json({
                ok: false,
                error: [
                    {mensaje: "No se ha encontrado la experiencia"}
                ]
            })
        };
        // Si existe - Eliminar
        result = await client.query(queries.eliminarExperienciaporId, [id]);

        return res.status(200).json({
            ok: true,
            mensaje: "Experiencia eliminada correctamente"
            // data: result.rows[0]
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

const obtenerInfoAdminPorUid = async (req, res) => {
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

const obtenerTodasReservasAdmin = async (req, res) => {
    // Conexión a BBDD
    let client;
    // Datos
    let result;

    try {

        client = await pool.connect();
        //Comprobar si las reservas, si no existe - Error
        result = await client.query(queries.reservasExisten);
        //console.log(experienciaExiste);
        if(result.rows.length === 0) {
            return res.status(404).json({
                ok: false,
                error: [
                    {mensaje: "No se han encontrado las reservas"}
                ]
            })
        };

        return res.status(200).json({
            ok: true,
            mensaje: "Reservas encontradas correctamente",
            data: result.rows
        });

    } catch(error) {
        
        console.log(error)
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

const gestionReservasAdmin = async (req, res) => {
    // Conexión a BBDD
    let client;
    // Datos
    let result;

    const { id } = req.params; 
    const { estado_reserva } = req.body;

    try {

        client = await pool.connect();
        //Comprobar si las reservas, si no existe - Error
        const ReservaExiste = await client.query(queries.ReservaExiste, [id]);
        console.log(ReservaExiste)
        if(ReservaExiste.rows.length === 0) {
            return res.status(404).json({
                ok: false,
                error: [
                    {mensaje: "No se ha encontrado la reserva"}
                ]
            })
        };

        result = await client.query(queries.gestionarEstadoReserva, [estado_reserva, id]);

        return res.status(200).json({
            ok: true,
            mensaje: "Estado de la reserva actualizada correctamente",
            data: result.rows[0]
        });

    } catch(error) {
        
        console.log(error)
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

// EXPORTAR
module.exports = {
    crearExperienciaAdmin,
    obtenerExperienciaPorId,
    editarExperienciaPorId,
    eliminarExperienciaPorId,
    obtenerTodasExperiencias,
    obtenerInfoAdminPorUid,
    obtenerTodasReservasAdmin,
    gestionReservasAdmin
}

