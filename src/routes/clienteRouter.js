const express = require('express');
const {
    nuevoRegistro,
    obtenerClientes,
    inicioSesion,
    desactivarCuentaCliente,
    todosActivosClientes,
    todosInactivosClientes,
    actualizarContrasena
} = require("../handlers/clienteHandler.js")

const clienterouter = express.Router();

clienterouter.post('/registro', nuevoRegistro);
clienterouter.get('/todos', obtenerClientes);
clienterouter.get('/sesion', inicioSesion);
clienterouter.patch('/desactivar', desactivarCuentaCliente);
clienterouter.get('/activos', todosActivosClientes);
clienterouter.get('/inactivos', todosInactivosClientes);
clienterouter.patch('/contrasena', actualizarContrasena);

module.exports = clienterouter;