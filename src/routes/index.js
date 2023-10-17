const { Router } = require('express');
const express = require("express");

const clienterouter = require("./clienteRouter")
const restauranteRouter = require("./restauranteRouter")

const router = Router();
router.use(express.json());
router.use("/cliente", clienterouter);
router.use("/restaurante", restauranteRouter);

module.exports = router;