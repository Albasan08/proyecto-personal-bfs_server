// IMPORTACIONES DE TERCEROS
const express = require("express");
const router = express.Router();

// IMPORTACIONES PROPIAS
const { 
    obtenerInfoGestorPorUid,
    programarExperienciaId,
    } = require("../controllers/program.controllers");
const { validarToken } = require("../middlewares/auth/validarToken");
const { verificarRol } = require("../middlewares/auth/verificarRol");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarFormularioProgramar } = require("../validators/program.validator")

// RUTAS
/* router.post("/programar/bloquear", [
    validarToken, 
    verificarRol("program")
    ], bloquearProgramacion);*/

router.put("/programar/:id", [
    validarToken, 
    verificarRol("program"),
    validarFormularioProgramar,
    validarCampos
    ], programarExperienciaId);

router.get("/info", [
    validarToken, 
    verificarRol("program")
    ], obtenerInfoGestorPorUid);

// EXPORTAR
module.exports = router;