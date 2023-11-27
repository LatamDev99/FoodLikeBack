const express = require('express');
const {
    agregarPlatilloCarrito,
    todosCarros,
    eliminarPlatilloCarrito,
    buscarCarroId
} = require("../handlers/carritoDeComprasHandler")


const carritoRouter = express.Router()

carritoRouter.get("/todos", todosCarros)
carritoRouter.post("/agregarplatillosalcarrito", agregarPlatilloCarrito)

module.exports = carritoRouter