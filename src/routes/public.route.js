// IMPORTACIONES DE TERCEROS
const express = require("express");
const router = express.Router();

// IMPORTACIONES PROPIAS
const { 
    obtenerTodasExperiencias,
} = require("../controllers/admin.controllers");

const {
    obtenerTodaInfoExperiencia 
} = require("../controllers/public.controllers");

// RUTAS
router.get("", obtenerTodasExperiencias);
router.get("/:id", obtenerTodaInfoExperiencia);

// EXPORTAR
module.exports = router;
