const { Router } = require('express');
const express = require("express");

const clienterouter = require("./clienteRouter");
const restauranteRouter = require("./restauranteRouter");
const platilloRouter = require("./platilloRouter")
const reviewRouter = require("./reviewRouter")
const marcaRouter = require("./marcaRouter")

const categoriasPlatilloRouter = require("./categoriasPlatilloRouter")
const catergoriasRestauranteRouter = require("./categoriaRestauranteRouter")

const likeRouter = require("./likeRouter")

const carritoRouter = require("./carritoDeComprasRouter")

const router = Router();
router.use(express.json());


router.use("/restaurante", restauranteRouter);
router.use("/platillo", platilloRouter);
router.use("/cliente", clienterouter);
router.use("/review", reviewRouter);
router.use("/marca", marcaRouter);
router.use("/platillo", platilloRouter)
router.use("/review", reviewRouter)
router.use("/marca", marcaRouter)

router.use("/categoriaplatillo", categoriasPlatilloRouter)
router.use("/categoriarestaurante", catergoriasRestauranteRouter)


router.use("/carritodecompras", carritoRouter);
router.use("/like", likeRouter);





module.exports = router;