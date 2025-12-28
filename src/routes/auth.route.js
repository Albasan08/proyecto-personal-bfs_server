// IMPORTACIONES DE TERCEROS
const express = require("express");
const router = express.Router();

// IMPORTACIONES PROPIAS
const { crearUsuarioNuevo, loginUsuario, logOutUsuario, redirigirUserPorRol } = require("../controllers/auth.controllers");
const { validarToken } = require("../middlewares/auth/validarToken");
const { verificarRol } = require("../middlewares/auth/verificarRol");

// RUTAS
router.post("/login", loginUsuario);
router.post("/register", crearUsuarioNuevo);
router.post("/logout", [validarToken, verificarRol("admin", "user", "program")], logOutUsuario);
router.get("/redirigir", redirigirUserPorRol);

// EXPORTAR
module.exports = router;
