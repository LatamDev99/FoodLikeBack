const express = require('express');

const { nuevoRegistro, 
    obtenerRestaurantes, 
    inicioSesion, 
    desActCuentaRestaurante, 
    actualizarContrasenaRestaurante, 
    todosActivosRestaurantes, 
    todosInactivosRestaurantes 
} = require("../handlers/restauranteHandler.js")

const restauranteRouter = express.Router();

restauranteRouter.post('/registro', nuevoRegistro);

restauranteRouter.get('/todos', obtenerRestaurantes);
restauranteRouter.get('/sesion', inicioSesion);
restauranteRouter.get('/activos', todosActivosRestaurantes);
restauranteRouter.get('/inactivos', todosInactivosRestaurantes);

restauranteRouter.patch('/desact', desActCuentaRestaurante);
restauranteRouter.patch('/contrasena', actualizarContrasenaRestaurante);


module.exports = restauranteRouter;