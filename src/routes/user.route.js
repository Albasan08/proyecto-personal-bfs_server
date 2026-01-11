// IMPORTACIONES DE TERCEROS
const express = require("express");
const router = express.Router();

// IMPORTACIONES PROPIAS
const { 
    obtenerInfoUserCompleta,
    crearNuevaReserva
 } = require("../controllers/user.controllers");
const { validarToken } = require("../middlewares/auth/validarToken");
const { verificarRol } = require("../middlewares/auth/verificarRol");

// RUTAS
router.get("/info", [
    validarToken, 
    verificarRol("user")
    ], obtenerInfoUserCompleta);

router.post("/:id/reserva", [
    validarToken, 
    verificarRol("user")
    ], crearNuevaReserva);

//router.get("/reserva", [validarToken, verificarRol("user")], (req, res) => { res.send("Ruta pública"); });
//router.get("/stripe", [validarToken, verificarRol("user")], (req, res) => { res.send("Ruta pública"); });

router.get("/confirmacion/reserva", [validarToken, verificarRol("user")]);

// EXPORTAR
module.exports = router;