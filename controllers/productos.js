const { response } = require("express");
const Producto = require("../models/producto");


// obtenerProductos - paginado - total - populate
const obtenerProductos = async(req, res=response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    });
}


// obtenerProducto - populate {  }

const obtenerProducto = async(req, res=response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id)
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre');

    res.json(producto);
}




const crearProducto = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const productoDB = await Producto.findOne({ nombre });

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        });
    }

    // Generar data a guardar
    const data = {
        nombre,
        categoria: req.body.categoria,
        usuario: req.usuario._id,
        precio: req.body.precio,
        descripcion: req.body.descripcion
    };

    const producto = new Producto(data);

    await producto.save();

    res.status(201).json(producto);
}


// actualizarProducto

const actualizarProducto = async(req, res=response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(
        id,
        data,
        { new: true }
    );

    res.json(producto);
}


// borrarProducto - estado: false

const borrarProducto = async(req, res=response) => {

    const { id } = req.params;

    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(productoBorrado);
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
};
    

