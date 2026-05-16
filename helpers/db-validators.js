const Categoria = require('../models/categoria');
const Producto = require('../models/producto');
const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });

    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

const emailExiste = async(correo = '') => {

    const existeEmail = await Usuario.findOne({ correo });

    if (existeEmail) {
        throw new Error(`El correo ${correo} ya está registrado en la BD`);
    }
}

const existeUsuarioPorId = async(id = '') => {

    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {
        throw new Error(`El usuario con ID ${id} no está registrado en la BD`);
    }
}

const existecategoriaPorId = async(id = '') => {

    const existeCategoria = await Categoria.findById(id);

    if (!existeCategoria) {
        throw new Error(`La categoria con ID ${id} no está registrada en la BD`);
    }
}

const existeproductoPorId = async(id = '') => {

    const existeProducto = await Producto.findById(id);

    if (!existeProducto) {
        throw new Error(`El producto con ID ${id} no está registrado en la BD`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existecategoriaPorId,
    existeproductoPorId
}