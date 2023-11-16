const express = require('express');
const {
    postPlatillo,
    patchPlatillo, 
    getPlatillosRestaurante,
    todosLosPlatillos,
    eliminarPlatillo
} = require ("../handlers/platilloHandler")

const platilloRouter = express.Router();


platilloRouter.get("/todos", todosLosPlatillos)
platilloRouter.post("/restaurante", getPlatillosRestaurante)

platilloRouter.post("/", postPlatillo)
platilloRouter.patch("/", patchPlatillo)

platilloRouter.delete('/eliminar/:id', eliminarPlatillo);

module.exports = platilloRouter