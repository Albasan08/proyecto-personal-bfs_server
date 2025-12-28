// IMPORTACIONES DE TERCEROS
const express = require("express");
const router = express.Router();

// IMPORTACIONES PROPIAS
const {  } = require("../controllers/user.controllers");
const { validarToken } = require("../middlewares/auth/validarToken");
const { verificarRol } = require("../middlewares/auth/verificarRol");

// RUTAS
router.get("", [validarToken, verificarRol("user")], (req, res) => { res.send("Ruta pública"); });
router.get("/:id", [validarToken, verificarRol("user")], (req, res) => { res.send("Ruta pública"); });
router.get("/reserva", [validarToken, verificarRol("user")], (req, res) => { res.send("Ruta pública"); });
router.get("/stripe", [validarToken, verificarRol("user")], (req, res) => { res.send("Ruta pública"); });
router.get("/confirmacion", [validarToken, verificarRol("user")], (req, res) => { res.send("Ruta pública"); });
router.get("/info", [validarToken, verificarRol("user")], (req, res) => { res.send("Ruta pública"); });

// EXPORTAR
module.exports = router;
