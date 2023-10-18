const express = require('express');

const { nuevoRegistro, obtenerRestaurantes, inicioSesion, desactivarCuentaRestaurante, actualizarContrasenaRestaurante, todosActivosRestaurantes, todosInactivosRestaurantes } = require("../handlers/restauranteHandler.js")

const restauranteRouter = express.Router();

restauranteRouter.post('/registro', nuevoRegistro);
restauranteRouter.get('/todos', obtenerRestaurantes);
restauranteRouter.get('/sesion', inicioSesion);

restauranteRouter.patch('/desactivar', desactivarCuentaRestaurante);
restauranteRouter.patch('/contrasena', actualizarContrasenaRestaurante);

restauranteRouter.get('/activos', todosActivosRestaurantes);
restauranteRouter.get('/inactivos', todosInactivosRestaurantes);

module.exports = restauranteRouter;