// IMPORTACIONES DE TERCEROS
const express = require("express");
const router = express.Router();

// IMPORTACIONES PROPIAS
const { validarToken } = require("../middlewares/auth/validarToken");
const { verificarRol } = require("../middlewares/auth/verificarRol");

const { 
    crearExperienciaAdmin,
    obtenerExperienciaPorId,
    editarExperienciaPorId,
    eliminarExperienciaPorId,
    obtenerTodasExperiencias,
    obtenerInfoAdminPorUid,
    obtenerTodasReservasAdmin,
    gestionReservasAdmin
} = require("../controllers/admin.controllers");

const upload = require("../middlewares/admin/uploadImage");

const { 
    validarFormularioCrear,
    validarFormularioEditar
} = require("../validators/admin.validator");

const { validarImagenMulter } = require("../middlewares/admin/imagenMulter");

const { validarCampos } = require("../middlewares/validarCampos");

// RUTAS
router.get("", [
    validarToken, 
    verificarRol("admin")], obtenerTodasExperiencias); // ruta experiencias

router.post("/crear", [
    validarToken, 
    verificarRol("admin"), 
    upload.single("imagen_expe"),
    validarImagenMulter,
    validarFormularioCrear,
    validarCampos
    ], crearExperienciaAdmin);

router.get("/editar/:id", [
    validarToken, 
    verificarRol("admin"), 
    ], obtenerExperienciaPorId);

router.put("/editar/:id", [
    validarToken, 
    verificarRol("admin"),
    upload.single("imagen_expe"),
    validarFormularioEditar,
    validarCampos
    ], editarExperienciaPorId);

router.delete("/eliminar/:id", [
    validarToken, 
    verificarRol("admin"),
    ], eliminarExperienciaPorId);

router.get("/gestion-reserva", [
    validarToken, 
    verificarRol("admin")
], obtenerTodasReservasAdmin);

router.put("/gestion-reserva/:id", [
    validarToken, 
    verificarRol("admin")
], gestionReservasAdmin);

router.get("/info", [
    validarToken, 
    verificarRol("admin")
], obtenerInfoAdminPorUid);

// EXPORTAR
module.exports = router;