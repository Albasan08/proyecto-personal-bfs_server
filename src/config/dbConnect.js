// IMPORTACIONES DE TERCEROS
const pg = require("pg");
const { Pool } = pg;

// IMPORTACIONES PROPIAS
const connectionString = process.env.DB_URI;

// CONEXIÓN A LA BBDD
const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

// PRUEBA PARA CONFIRMAR
const pruebaConexionBBDD = async () => {
    const result = await pool.query('SELECT * FROM users');
    console.log(result.rows);
};


pruebaConexionBBDD();

// EXPORTAR CONEXIÓN
module.exports = pool;