//IMPORTACIONES DE TERCEROS
const fs = require("fs"); 
const path = require("path");

// IMPORTACIONES PROPIAS
const { pool } = require("../config/dbConnect");
const { queries } = require("../db/queries");

/**
 * Función que crea una experiencia
 * @param {Object} req Objeto de petición: contiene body, params, headers...
 * @param {Object} res Objeto de respuesta: permite devolver status, json...
 * @returns Datos de la experiencia 
 */
const crearExperienciaAdmin = async (req, res) => {
    // Conexión a la BBDD
    let client;
    // Datos
    let result;
    // Recoger propiedades del body
    const { nombre_expe, desc_corta_expe, desc_larga_expe, duracion_expe, precio_expe, personas_max_expe } = req.body
    // Si se añade una imagen coger la imagen, sino null para que no de error al dar undefined
    const imagen_expe = req.file ? req.file.filename : null;

    try {

        client = await pool.connect();

        const experienciaExiste = await client.query(queries.experienciaExiste, [nombre_expe]);
        // Si la experiencia existe - error
        if(experienciaExiste.rows.length > 0) {
            return res.status(400).json({
                ok: false, 
                mensaje: "No se puede crear la experiencia porque ya existe"
            });
        };
        // Si no existe la experiencia - crearla
        result = await client.query(queries.experienciaCrear, [nombre_expe, desc_corta_expe, desc_larga_expe, imagen_expe, duracion_expe, precio_expe, personas_max_expe]);
   
        return res.status(201).json({
            ok: true,
            mensaje: "Experiencia creada correctamente",
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

/**
 * Función que obtiene la info de la experiencia por ID
 * @param {Object} req Objeto de petición: contiene body, params, headers...
 * @param {Object} res Objeto de respuesta: permite devolver status, json...
 * @returns Datos de la experiencia por ID
 */
const obtenerExperienciaPorId = async (req, res) => {
    // Conexión con BBDD
    let client;
    //Datos
    let result;
    // Obtener id de params
    const { id } = req.params;

    try {
  
        client = await pool.connect();
        // Comprobar que la experiencia existe por su ID
        result = await client.query(queries.obtenerExperienciaPorId, [id]);
        // Si no encuentra la experiencia - error
        if(result.rows.length === 0) {

            return res.status(404).json({
                ok: false,
                mensaje: "No se ha encontrado la experiencia"
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
            mensaje: "Error, contacte con el administrador"
        });

    } finally {

        client.release();

    }

};

/**
 * Función que obtiene toda la información de todas la experiencias
 * @param {Object} req Objeto de petición: contiene body, params, headers...
 * @param {Object} res Objeto de respuesta: permite devolver status, json...
 * @returns Información de todas las experiencias
 */
const obtenerTodasExperiencias = async (req, res) => {
    // Conexión a BBDD
    let client;
    // Datos
    let result;

    try {

        client = await pool.connect();

        result = await client.query(queries.obtenerTodasExperiencias);
        // Si no encuentra - error
        if(result.rows.length === 0) {

            return res.status(404).json({
                ok: false,
                mensaje: "No se han encontrado las experiencias"
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
            mensaje: "Error, contacte con el administrador"
        });

    } finally {

        client.release();

    };
};

/**
 * Función que edita una experiencia por su ID
 * @param {Object} req Objeto de petición: contiene body, params, headers...
 * @param {Object} res Objeto de respuesta: permite devolver status, json...
 * @returns Información de la experiencia editada
 */
const editarExperienciaPorId = async (req, res) => {
    // Conexión a BBDD
    let client;
    // Datos
    let result;
    // Capturar id
    const { id } = req.params;
    // Obtener info del body
    const { nombre_expe, desc_corta_expe, desc_larga_expe, duracion_expe, precio_expe, personas_max_expe } = req.body;

    try {

        client = await pool.connect();
        //Comprobar si la experiencia existe, si no existe - Error
        const experienciaExiste = await client.query(queries.obtenerExperienciaPorId, [id]);
 
        if(!id || experienciaExiste.rows.length === 0) {

            return res.status(404).json({
                ok: false,
                mensaje: "No se ha encontrado la experiencia"
            });

        };
        // Gestión de la imagen
        const imagenActual = experienciaExiste.rows[0].imagen_expe; 
        // Si existe una nueva imagen - Añadirla, sino dejar la anterior
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
            mensaje: "Error, contacte con el administrador"
        });

    } finally {

        client.release();

    };
};

/**
 * Función que elimina una experiencia por su id
 * @param {Object} req Objeto de petición: contiene body, params, headers...
 * @param {Object} res Objeto de respuesta: permite devolver status, json...
 * @returns Mensaje de la experiencia eliminada
 */
const eliminarExperienciaPorId = async (req, res) => {
    // Conexión a BBDD
    let client;
    // Datos
    let result;
    // Capturar id
    const { id } = req.params;

    try {

        client = await pool.connect();
        //Comprobar si la experiencia existe, si no existe - Error
        const experienciaExiste = await client.query(queries.obtenerExperienciaPorId, [id]);
 
        if(!id || experienciaExiste.rows.length === 0) {

            return res.status(404).json({
                ok: false,
                mensaje: "No se ha encontrado la experiencia"
            });

        };
        // Eliminar imagen de la carpeta uploads
        const imagenAEliminar = experienciaExiste.rows[0].imagen_expe; 
        // Current Wordking Directory (carpeta raíz desde donde se ejecuta el servidor)
        const rutaImagen = path.join(process.cwd(), "public", "uploads", "experiencias", imagenAEliminar); 
        // Si la experiencia tiene imagen - Borrarla
        if (fs.existsSync(rutaImagen)) { 

            fs.unlinkSync(rutaImagen); 
        };
        //Eliminar experiencia de tabla experiencia
        result = await client.query(queries.eliminarExperienciaporId, [id]);

        return res.status(200).json({
            ok: true,
            mensaje: "Experiencia eliminada correctamente"
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
 * Función que obtiene toda la info del usuario por su uid
 * @param {Object} req Objeto de petición: contiene body, params, headers...
 * @param {Object} res Objeto de respuesta: permite devolver status, json...
 * @returns Información del usuario
 */
const obtenerInfoAdminPorUid = async (req, res) => {
    // Conexión a BBDD
    let client;
    // Datos
    let result;

    try {
        // Recoger uid de cookies
        const uid_user = req.cookies.uid_user
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

        };

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

/**
 * Función que obtiene todas las reservas
 * @param {Object} req Objeto de petición: contiene body, params, headers...
 * @param {Object} res Objeto de respuesta: permite devolver status, json...
 * @returns Datos de todas las reservas
 */
const obtenerTodasReservasAdmin = async (req, res) => {
    // Conexión a BBDD
    let client;
    // Datos
    let result;

    try {

        client = await pool.connect();
        //Comprobar si las reservas, si no existe - Error
        result = await client.query(queries.reservasExisten);

        if(result.rows.length === 0) {

            return res.status(404).json({
                ok: false,
                mensaje: "No se han encontrado las reservas"
            });

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
            mensaje: "Error, contacte con el administrador"
        });

    } finally {

        client.release();
    };

};

/**
 * Función que cambia el estado de las reservas
 * @param {Object} req Objeto de petición: contiene body, params, headers...
 * @param {Object} res Objeto de respuesta: permite devolver status, json...
 * @returns Información de la reserva cambiada
 */
const gestionReservasAdmin = async (req, res) => {
    // Conexión a BBDD
    let client;
    // Datos
    let result;
    // Recoger id de params
    const { id } = req.params; 
    // Recoger datos del body
    const { estado_reserva } = req.body;

    try {

        client = await pool.connect();
        //Comprobar si las reservas, si no existe - Error
        const ReservaExiste = await client.query(queries.ReservaExiste, [id]);
  
        if(ReservaExiste.rows.length === 0) {

            return res.status(404).json({
                ok: false,
                mensaje: "No se ha encontrado la reserva"
            });

        };
        // Cambiar el estado de la reserva
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
            mensaje: "Error, contacte con el administrador"
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

