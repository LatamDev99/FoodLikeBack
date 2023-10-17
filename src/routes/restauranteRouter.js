const express = require('express');

const { nuevoRegistro, obtenerRestaurantes, inicioSesion    } = require("../handlers/restauranteHandler.js")

const restauranteRouter = express.Router();

restauranteRouter.post('/registro', nuevoRegistro);
restauranteRouter.get('/todos', obtenerRestaurantes);
restauranteRouter.get('/sesion', inicioSesion);

module.exports = restauranteRouter;