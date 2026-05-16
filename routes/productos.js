
const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { crearProducto,
        obtenerProductos,
        obtenerProducto, 
        actualizarProducto,
        borrarProducto} = require('../controllers/productos');
const { existeproductoPorId } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares/validar-roles');


const router = Router();

/**
 * {{utl}}/api/productos
 */

// Obtener todas las productos - publico
router.get('/', obtenerProductos); 

// Obtener una producto por id - publico
router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeproductoPorId),   
    validarCampos
], obtenerProducto);



// Crear producto - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,

    check('nombre', 'El nombre es obligatorio')
        .not()
        .isEmpty(),

    check('categoria', 'La categoria es obligatoria')
        .isMongoId(),

    validarCampos

], crearProducto);



router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeproductoPorId),    
    validarCampos
], actualizarProducto);


router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeproductoPorId),
    validarCampos   
], borrarProducto );





module.exports = router;