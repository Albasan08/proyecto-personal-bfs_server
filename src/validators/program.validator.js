// EXPORTACIONES DE TERCEROS
const { check } = require("express-validator");

const validarFormularioProgramar = [

    check("fechas") 
        .isArray({ min: 1 }).withMessage("Debe de haber al menos una fecha seleccionada"),
        
    check("rangos") 
        .isArray({ min: 1 }).withMessage("Debe de haber al menos un rango de horario seleccionado")
        
]

module.exports = {
    validarFormularioProgramar
}