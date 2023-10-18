const express = require('express');
const {
    postPlatillo
} = require ("../handlers/platilloHandler")

const platilloRouter = express.Router();

platilloRouter.post("/", postPlatillo)

module.exports = platilloRouter