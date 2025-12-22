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

// EXPORTAR CONEXIÓN
module.exports = { pool };