// IMPORTACIONES DE TERCEROS
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerUi = require('swagger-ui-express');

// IMPORTACIONES PROPIAS
//const swaggerDocument = require('../api-docs/swagger.json');

const authRouter = require("./routes/auth.route");
const publicRouter = require("./routes/public.route");
const userRouter = require("./routes/user.route");
const adminRouter = require("./routes/admin.route");
const gestorprogramRouter = require("./routes/program.route");

// IMPORTACIONES PROPIAS
const app = express();
const port = process.env.PORT || 3000;
require("./config/dbConnect");
const frontUri = `${process.env.FRONT_URI}`
const frontLocal = `${process.env.FRONTLOCAL}`
const serverUri = `${process.env.APIKEY_SERVER}`

// CORS
const whiteList = [frontUri, frontLocal, serverUri];
const corsOpciones = {
    origin: (origin, callback) => {
        //!origin para permitir las peticiones del Postman
        if (whiteList.includes(origin) || !origin) {
            //callback(error, allow)
            callback(null, true);
        } else {
            console.log('Origen no permitido por CORS:', origin);
            callback(new Error('Esta conexión no está permitida por CORS'));
        }
    },
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOpciones));
app.use(cookieParser());
app.use(express.json()); // Para JSON
app.use(express.urlencoded({ extended: true })); // Para formularios

// RUTAS
app.use("/auth", authRouter);
app.use("/experiencias", publicRouter, userRouter, adminRouter, gestorprogramRouter);
app.use("/experiencias/:id", userRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/gestor", gestorprogramRouter);

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// MIDDLEWARES

app.use(express.static(__dirname + "/../public"));

// LISTENER
app.listen(port, () => {
    console.log(`Servidor a la escucha del puerto ${port} `);
});