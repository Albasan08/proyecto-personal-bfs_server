// IMPORTACIONES DE TERCEROS
const express = require("express");
const router = express.Router();

// IMPORTACIONES PROPIAS
const { } = require("../controllers/public.controllers");

// RUTAS
router.get("", (req, res) => { res.send("Ruta pública"); });
router.get("/:id", (req, res) => { res.send("Ruta pública"); });

// EXPORTAR
module.exports = router;
