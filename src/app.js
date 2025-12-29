// IMPORTACIONES DE TERCEROS
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// IMPORTACIONES PROPIAS
const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('../api-docs/swagger.json');

const authRouter = require("./routes/auth.route");
const publicRouter = require("./routes/public.route");
const userRouter = require("./routes/user.route");
const adminRouter = require("./routes/admin.route");
const gestorprogramRouter = require("./routes/program.route")

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
app.use("/experiencias", publicRouter, userRouter, adminRouter);
app.use("/experiencias/:id", userRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("gestor", gestorprogramRouter);


//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// MIDDLEWARES

app.use(express.static(__dirname + "/../public"));

// LISTENER
app.listen(port, () => {
    console.log(`Servidor a la escucha del puerto ${port} `);
});