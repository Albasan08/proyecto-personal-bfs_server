// IMPORTACIONES DE TERCEROS
const { check } = require("express-validator");

/**
 * Validaciones de express-validator para validar el formulario de Crear experiencia
 */
const validarFormularioCrear = [

    check("nombre_expe")
        .notEmpty().withMessage("El campo del nombre no puede estar vacío")
        .isLength({ min: 3}).withMessage("El campo del nombre debe tener al menos 3 caracteres"),

    check("duracion_expe")
        .notEmpty().withMessage("El campo de la duración no puede estar vacío")
        .isNumeric().withMessage("El campo de la duración no puede tener letras u otros símbolos")
        .isLength({ max: 3 }).withMessage("El campo del máximo de persona no puede tener más de 2 cifras"),

    check("precio_expe")
        .notEmpty().withMessage("El campo del precio no puede estar vacío")
        .isNumeric().withMessage("El campo del precio no puede tener letras u otros símbolos")
        .isLength({ max: 3 }).withMessage("El campo del precio no puede tener más de 3 cifras"),
    
    check("personas_max_expe")
        .notEmpty().withMessage("El campo del máximo de personas no puede estar vacío")
        .isNumeric().withMessage("El campo del máximo de personas no puede tener letras ni símbolos")
        .isLength({ max: 2 }).withMessage("El campo del máximo de personas no puede tener más de 2 cifras")

]

/**
 * Validaciones de express-validator para validar el formulario de Editar experiencia
 */
const validarFormularioEditar = [

    check("nombre_expe")
        .optional() // Si el campo llega se valida, sino no se valida pero no da error
        .notEmpty().withMessage("El campo del nombre no puede estar vacío")
        .isLength({ min: 3}).withMessage("El campo del nombre debe tener al menos 3 caracteres"),

    check("duracion_expe")
        .optional()
        .notEmpty().withMessage("El campo de la duración no puede estar vacío")
        .isNumeric().withMessage("El campo de la duración no puede tener letras u otros símbolos")
        .isLength({ max: 3 }).withMessage("El campo del precio no puede tener más de 3 cifras"),

    check("precio_expe")
        .optional()
        .notEmpty().withMessage("El campo del precio no puede estar vacío")
        .isNumeric().withMessage("El campo del precio no puede tener letras u otros símbolos")
        .isLength({ max: 3 }).withMessage("El campo del precio no puede tener más de 3 cifras"),

    check("personas_max_expe")
        .optional()
        .notEmpty().withMessage("El campo del máximo de personas no puede estar vacío")
        .isNumeric().withMessage("El campo del máximo de personas no puede tener letras ni símbolos")
        .isLength({ max: 2 }).withMessage("El campo del máximo de personas no puede tener más de 2 cifras")

]

module.exports = {
    validarFormularioCrear,
    validarFormularioEditar
}