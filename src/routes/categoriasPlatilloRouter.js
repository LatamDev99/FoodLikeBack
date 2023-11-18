const express = require('express');

const {todasLasCategorias,agregarCategoria, cambiarCategoria  } = require("../handlers/categoriasPlatilloHandler.js")

const categoriasPlatilloRouter = express.Router();

categoriasPlatilloRouter.get('/todos', todasLasCategorias);

categoriasPlatilloRouter.post('/agregar', agregarCategoria);

categoriasPlatilloRouter.patch('/cambiarcategoria', cambiarCategoria)


module.exports = categoriasPlatilloRouter;