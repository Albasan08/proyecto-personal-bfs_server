// IMPORTACIONES DE TERCEROS
const express = require("express");
const router = express.Router();

// IMPORTACIONES PROPIAS
const { 
    obtenerInfoGestorPorUid,
    programarExperienciaId,
    bloquearProgramacion
    } = require("../controllers/program.controllers");
const { obtenerExperienciaPorId } = require("../controllers/admin.controllers")
const { validarToken } = require("../middlewares/auth/validarToken");
const { verificarRol } = require("../middlewares/auth/verificarRol");

// RUTAS
router.get("/programar/:id", [
    validarToken, 
    verificarRol("program")
    ], obtenerExperienciaPorId);

router.post("/programar/:id", [
    validarToken, 
    verificarRol("program")
    ], programarExperienciaId);

router.post("/programar/bloquear", [
    validarToken, 
    verificarRol("program")
    ], bloquearProgramacion);

router.get("/info", [
    validarToken, 
    verificarRol("program")
    ], obtenerInfoGestorPorUid);

// EXPORTAR
module.exports = router;