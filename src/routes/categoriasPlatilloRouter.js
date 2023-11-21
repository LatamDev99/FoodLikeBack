const express = require('express');

const {todasLasCategorias,agregarCategoria, cambiarCategoria, borrarCategoria  } = require("../handlers/categoriasPlatilloHandler.js")

const categoriasPlatilloRouter = express.Router();

categoriasPlatilloRouter.get('/todos', todasLasCategorias);

categoriasPlatilloRouter.post('/agregar', agregarCategoria);

categoriasPlatilloRouter.patch('/cambiarcategoria', cambiarCategoria)

categoriasPlatilloRouter.delete('/borrarcategoria/:id', borrarCategoria)


module.exports = categoriasPlatilloRouter;