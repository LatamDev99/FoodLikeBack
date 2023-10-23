const express = require('express');

const {  agregarPlatilloCarrito,todosCarros  } = require("../handlers/carroDeComprasHandler.js")

const carroDeCompras = express.Router();

carroDeCompras.patch('/platillo', agregarPlatilloCarrito);
carroDeCompras.get('/todos', todosCarros);

module.exports = carroDeCompras;