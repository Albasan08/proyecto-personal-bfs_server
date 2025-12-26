// IMPORTACIONES DE TERCEROS
const express = require("express");
const router = express.Router();

// IMPORTACIONES PROPIAS
const { crearUsuarioNuevo, loginUsuario, logOutUsuario } = require("../controllers/auth.controllers");

// RUTAS
router.post("/login", loginUsuario);
router.post("/register", crearUsuarioNuevo);
router.post("logout", logOutUsuario);

// EXPORTAR
module.exports = router;
