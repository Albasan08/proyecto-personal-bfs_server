// IMPORTACIONES DE TERCEROS
const express = require("express");
const router = express.Router();

// IMPORTACIONES PROPIAS
const { } = require("../controllers/admin.controllers");
const { validarToken } = require("../middlewares/auth/validarToken");
const { verificarRol } = require("../middlewares/auth/verificarRol");

// RUTAS
router.get("", [validarToken, verificarRol("admin")], (req, res) => { res.send("Ruta pública"); });
router.get("/:id", [validarToken, verificarRol("admin")], (req, res) => { res.send("Ruta pública"); });
router.get("/crear", [validarToken, verificarRol("admin")], (req, res) => { res.send("Ruta pública"); });
router.get("editar/:id", [validarToken, verificarRol("admin")], (req, res) => { res.send("Ruta pública"); });
router.get("/gestion-reserva", [validarToken, verificarRol("admin")], (req, res) => { res.send("Ruta pública"); });
router.get("/info", [validarToken, verificarRol("admin")], (req, res) => { res.send("Ruta pública"); });

// EXPORTAR
module.exports = router;
