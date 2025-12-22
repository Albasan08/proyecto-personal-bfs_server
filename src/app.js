// IMPORTACIONES DE TERCEROS
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('../api-docs/swagger.json');

// IMPORTACIONES PROPIAS
const app = express();
const port = process.env.PORT;
require("./config/dbConnect");

app.use(cors());
app.use(cookieParser());

// RUTAS

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// PARSEAR LOS DATOS DEL FORMULARIO REQ.BODY
app.use(express.urlencoded());

// MIDDLEWARES

// LISTENER
app.listen(port, () => {
    console.log(`Servidor a la escucha del puerto ${port} `);
});