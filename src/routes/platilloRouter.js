const express = require('express');
const {
    postPlatillo,
    patchPlatillo, 
    getPlatillosRestaurante
} = require ("../handlers/platilloHandler")

const platilloRouter = express.Router();

platilloRouter.post("/", postPlatillo)
platilloRouter.patch("/", patchPlatillo)
platilloRouter.get("/:id", getPlatillosRestaurante)

module.exports = platilloRouter