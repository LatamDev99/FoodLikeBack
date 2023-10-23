const express = require('express');

const {todasLasCategorias,agregarCategoria  } = require("../handlers/categoriasPlatilloHandler.js")

const categoriasPlatilloRouter = express.Router();

categoriasPlatilloRouter.get('/todos', todasLasCategorias);
categoriasPlatilloRouter.post('/agregar', agregarCategoria);


module.exports = categoriasPlatilloRouter;