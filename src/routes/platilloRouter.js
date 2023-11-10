const express = require('express');
const {
    postPlatillo,
    patchPlatillo, 
    getPlatillosRestaurante,
    todosLosPlatillos
} = require ("../handlers/platilloHandler")

const platilloRouter = express.Router();


platilloRouter.get("/todos", todosLosPlatillos)
platilloRouter.post("/restaurante", getPlatillosRestaurante)

platilloRouter.post("/", postPlatillo)
platilloRouter.patch("/", patchPlatillo)

module.exports = platilloRouter