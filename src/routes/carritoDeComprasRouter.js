const express = require('express');

const {  agregarPlatilloCarrito,todosCarros,eliminarPlatilloCarrito  } = require("../handlers/carroDeComprasHandler.js")

const carroDeCompras = express.Router();

carroDeCompras.get('/todos', todosCarros);

carroDeCompras.patch('/platillo', agregarPlatilloCarrito);
carroDeCompras.patch('/platilloelim', eliminarPlatilloCarrito);



module.exports = carroDeCompras;