
const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { crearCategoria,
        obtenerCategorias,
        obtenerCategoria, 
        actualizarCategoria,
        borrarCategoria} = require('../controllers/categorias');
const { existecategoriaPorId } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares/validar-roles');


const router = Router();

/**
 * {{utl}}/api/categorias
 */

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias); 

// Obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existecategoriaPorId),   
    validarCampos
], obtenerCategoria);



// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);



router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existecategoriaPorId),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarCategoria);


router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existecategoriaPorId),
    validarCampos   
], borrarCategoria );





module.exports = router;