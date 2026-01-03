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
    obtenerTodasExperiencias
} = require("../controllers/admin.controllers");
const upload = require("../middlewares/admin/uploadImage");
const { 
    validarFormularioCrear,
    validarFormularioEditar
} = require("../validators/admin.validator");
const { validarImagenMulter } = require("../middlewares/admin/imagenMulter");

// RUTAS
router.get("", [
    validarToken, 
    verificarRol("admin")], obtenerTodasExperiencias); // ruta experiencias
//router.get("/:id", [validarToken, verificarRol("admin")], (req, res) => { res.send("Ruta pública"); });

router.post("/crear", [
    validarToken, 
    verificarRol("admin"), 
    upload.single("imagen_expe"),
    validarImagenMulter,
    validarFormularioCrear
    ], crearExperienciaAdmin);

router.get("/editar/:id", [
    validarToken, 
    verificarRol("admin"), 
    ], obtenerExperienciaPorId);

router.put("/editar/:id", [
    validarToken, 
    verificarRol("admin"),
    upload.single("imagen_expe"),
    validarFormularioEditar
    ], editarExperienciaPorId);

router.delete("/eliminar/:id", [
    validarToken, 
    verificarRol("admin"),
    ], eliminarExperienciaPorId);

//router.get("/gestion-reserva", [validarToken, verificarRol("admin")], (req, res) => { res.send("Ruta pública"); });
//router.get("/info", [validarToken, verificarRol("admin")], (req, res) => { res.send("Ruta pública"); });

// EXPORTAR
module.exports = router;
