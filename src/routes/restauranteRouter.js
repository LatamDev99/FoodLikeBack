const express = require('express');

const { nuevoRegistro, 
    obtenerRestaurantes, 
    inicioSesion, 
    desActCuentaRestaurante, 
    actualizarContrasenaRestaurante, 
    todosActivosRestaurantes, 
    todosInactivosRestaurantes,
    actualizarDatos,
    restauranteClienteHandler
} = require("../handlers/restauranteHandler.js")

const restauranteRouter = express.Router();

restauranteRouter.post('/registro', nuevoRegistro);
restauranteRouter.post('/sesion', inicioSesion);

restauranteRouter.get('/todos', obtenerRestaurantes);

restauranteRouter.post('/restauranteId', restauranteClienteHandler);

restauranteRouter.get('/activos', todosActivosRestaurantes);
restauranteRouter.get('/inactivos', todosInactivosRestaurantes);

restauranteRouter.patch('/desact', desActCuentaRestaurante);
restauranteRouter.patch('/contrasena', actualizarContrasenaRestaurante);
restauranteRouter.patch('/actualizar', actualizarDatos);






module.exports = restauranteRouter;