// IMPORTACIONES DE TERCEROS
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('../api-docs/swagger.json');

const authRouter = require("./routes/auth.route");

// IMPORTACIONES PROPIAS
const app = express();
const port = process.env.PORT;
require("./config/dbConnect");

app.use(cors({ 
    origin: process.env.FRONT_URI,
    credentials: true}));
app.use(cookieParser());
app.use(express.json()); // Para JSON
app.use(express.urlencoded({ extended: true })); // Para formularios

// RUTAS
app.use("/auth", authRouter);

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// MIDDLEWARES

// LISTENER
app.listen(port, () => {
    console.log(`Servidor a la escucha del puerto ${port} `);
});