// IMPORTACIONES DE TERCEROS
const express = require("express");
const router = express.Router();

// IMPORTACIONES PROPIAS
const {  } = require("../controllers/program.controllers");

// RUTAS
router.get("/programar");
router.get("/info");

// EXPORTAR
module.exports = router;
