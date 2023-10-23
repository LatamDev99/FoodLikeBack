const express = require('express');

const {todasLasCategorias,agregarCategoria  } = require("../handlers/categoriasHandler.js")

const catergoriasRouter = express.Router();

catergoriasRouter.get('/todos', todasLasCategorias);
catergoriasRouter.post('/agregar', agregarCategoria);

// carroDeCompras.patch('/platillo', agregarPlatilloCarrito);
// carroDeCompras.patch('/platilloelim', eliminarPlatilloCarrito);


module.exports = catergoriasRouter;