const express = require('express');

const {todasLasCategorias,agregarCategoria, cambiarCategoria, borrarCategoria, cambiarNombreCategoria, traerCategoriaPlatillo  } = require("../handlers/categoriasPlatilloHandler.js")

const categoriasPlatilloRouter = express.Router();

categoriasPlatilloRouter.get('/todos', todasLasCategorias);
categoriasPlatilloRouter.post('/traercategoriarestaurante', traerCategoriaPlatillo);



categoriasPlatilloRouter.post('/agregar', agregarCategoria);

categoriasPlatilloRouter.patch('/cambiarcategoria', cambiarCategoria)

categoriasPlatilloRouter.delete('/borrarcategoria/:id', borrarCategoria)

categoriasPlatilloRouter.patch('/cambiarnombrecategoria', cambiarNombreCategoria)


module.exports = categoriasPlatilloRouter;