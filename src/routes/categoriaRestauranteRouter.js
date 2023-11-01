const express = require('express');

const {todasLasCategorias,agregarCategoria,
    eliminarCategoria  } = require("../handlers/categoriaRestauranteHandler")

const catergoriasRestauranteRouter = express.Router();

catergoriasRestauranteRouter.get('/todos', todasLasCategorias);
catergoriasRestauranteRouter.post('/agregar', agregarCategoria);

catergoriasRestauranteRouter.delete('/eliminar', eliminarCategoria);


module.exports = catergoriasRestauranteRouter;