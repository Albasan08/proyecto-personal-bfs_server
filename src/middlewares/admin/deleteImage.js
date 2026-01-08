// IMPORTACIONES DE TERCEROS
const multer = require("multer"); 
const path = require("path");

const eliminarImagen = (req, res, next) => {

    try {

        const imagenAEliminar = req.experiencia.imagen_expe;

        const ruta = path(process.cwd(), "public/uploads/experiencias", imagenAEliminar);
        // Si existe foto - Eliminar
        if (fs.existsSync(ruta)) { 
            fs.unlinkSync(ruta); 
        } 
        
        next();

    } catch(error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: "Error, contacte con el administrador"
        });

    };

};

module.exports = eliminarImagen;