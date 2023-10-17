const { Router } = require('express');
const express = require("express");

const clienterouter = require("./clienteRouter")

const router = Router();
router.use(express.json());
router.use("/cliente", clienterouter);

module.exports = router;