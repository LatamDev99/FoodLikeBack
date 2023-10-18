const express = require('express');
const {
    postPlatillo,
    patchPlatillo
} = require ("../handlers/platilloHandler")

const platilloRouter = express.Router();

platilloRouter.post("/", postPlatillo)
platilloRouter.patch("/", patchPlatillo)

module.exports = platilloRouter