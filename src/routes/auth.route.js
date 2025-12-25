// IMPORTACIONES DE TERCEROS
const express = require("express");
const router = express.Router();

// IMPORTACIONES PROPIAS
const { crearUsuarioNuevo } = require("../controllers/auth.controllers")

// RUTAS
//router.get("/login"/* Pendiente array middleware y funciones extras*/);
router.post("/register", /* Penndiente middlewares*/ crearUsuarioNuevo);

// EXPORTAR
module.exports = router;