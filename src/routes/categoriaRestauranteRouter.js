const express = require('express');

const {todasLasCategorias,agregarCategoria  } = require("../handlers/categoriaRestauranteHandler")

const catergoriasRestauranteRouter = express.Router();

catergoriasRestauranteRouter.get('/todos', todasLasCategorias);
catergoriasRestauranteRouter.post('/agregar', agregarCategoria);



module.exports = catergoriasRestauranteRouter;