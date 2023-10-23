const { Router } = require('express');
const express = require("express");

const clienterouter = require("./clienteRouter");
const restauranteRouter = require("./restauranteRouter");
const platilloRouter = require("./platilloRouter")
const reviewRouter = require("./reviewRouter")
const marcaRouter = require("./marcaRouter")
const carritoDeComprasRouter = require("./carritoDeComprasRouter")

const router = Router();
router.use(express.json());

router.use("/cliente", clienterouter);
router.use("/restaurante", restauranteRouter);
router.use("/platillo", platilloRouter)
router.use("/review", reviewRouter)
router.use("/marca", marcaRouter)
router.use("/carro", carritoDeComprasRouter)




module.exports = router;