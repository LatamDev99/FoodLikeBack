const express = require('express');

const {  registrarPlatillo,todosCarros  } = require("../handlers/carroDeComprasHandler.js")

const carroDeCompras = express.Router();

carroDeCompras.patch('/platillo', registrarPlatillo);
carroDeCompras.get('/todos', todosCarros);

module.exports = carroDeCompras;