const express = require('express');
const {
    nuevoRegistro,
    obtenerClientes,
    inicioSesion,
    desactivarCuentaCliente,
    todosActivosClientes,
    todosInactivosClientes,
    actualizarContrasena,
    verificarCorreo
} = require("../handlers/clienteHandler.js")

const clienterouter = express.Router();

clienterouter.get('/verificarCorreo', verificarCorreo);
clienterouter.post('/registro', nuevoRegistro);
clienterouter.get('/todos', obtenerClientes);
clienterouter.post('/sesion', inicioSesion);
clienterouter.patch('/desactivar', desactivarCuentaCliente);
clienterouter.get('/activos', todosActivosClientes);
clienterouter.get('/inactivos', todosInactivosClientes);
clienterouter.patch('/contrasena', actualizarContrasena);

module.exports = clienterouter;