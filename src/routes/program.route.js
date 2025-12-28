// IMPORTACIONES DE TERCEROS
const express = require("express");
const router = express.Router();

// IMPORTACIONES PROPIAS
const {  } = require("../controllers/program.controllers");
const { validarToken } = require("../middlewares/auth/validarToken");
const { verificarRol } = require("../middlewares/auth/verificarRol");

// RUTAS
router.get("/programar", [validarToken, verificarRol("program")], (req, res) => { res.send("Ruta pública"); });
router.get("/info", [validarToken, verificarRol("program")], (req, res) => { res.send("Ruta pública"); });

// EXPORTAR
module.exports = router;
