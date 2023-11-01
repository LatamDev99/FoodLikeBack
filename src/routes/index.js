const { Router } = require('express');
const express = require("express");

const clienterouter = require("./clienteRouter");
const restauranteRouter = require("./restauranteRouter");
const platilloRouter = require("./platilloRouter")
const reviewRouter = require("./reviewRouter")
const marcaRouter = require("./marcaRouter")
const carritoRouter = require("./carritoRouter")
const carritoDeComprasRouter = require("./carritoDeComprasRouter")
const categoriasPlatilloRouter = require("./categoriasPlatilloRouter")
const catergoriasRestauranteRouter = require("./categoriaRestauranteRouter")

const router = Router();
router.use(express.json());


router.use("/restaurante", restauranteRouter);
router.use("/platillo", platilloRouter);
router.use("/cliente", clienterouter);
router.use("/carrito", carritoRouter);
router.use("/review", reviewRouter);
router.use("/marca", marcaRouter);
router.use("/platillo", platilloRouter)
router.use("/review", reviewRouter)
router.use("/marca", marcaRouter)
router.use("/carro", carritoDeComprasRouter)
router.use("/categoriaPlatillo", categoriasPlatilloRouter)
router.use("/categoriaRestaurante", catergoriasRestauranteRouter)





module.exports = router;