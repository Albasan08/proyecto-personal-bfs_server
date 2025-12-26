// IMPORTACIONES DE TERCEROS
const express = require("express");
const router = express.Router();

// IMPORTACIONES PROPIAS
const { } = require("../controllers/program.controllers");

// RUTAS
router.get("");
router.get("/:id");
router.get("/crear");
router.get("editar/:id");
router.get("/gestion-reserva");
router.get("/info");

// EXPORTAR
module.exports = router;
