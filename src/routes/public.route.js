// IMPORTACIONES DE TERCEROS
const express = require("express");
const router = express.Router();

// IMPORTACIONES PROPIAS
const { 
    obtenerTodasExperiencias,
    obtenerExperienciaPorId
} = require("../controllers/admin.controllers");

// RUTAS
router.get("", obtenerTodasExperiencias);
router.get("/:id", obtenerExperienciaPorId);

// EXPORTAR
module.exports = router;
