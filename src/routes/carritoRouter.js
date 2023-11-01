const express = require('express');
const {
    agregarPlatillo
} = require("../handlers/carritoHandler")


const carritoRouter = express.Router()

carritoRouter.post("/", agregarPlatillo)

module.exports = carritoRouter