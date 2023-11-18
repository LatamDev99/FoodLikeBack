const express = require('express');
const {
    nuevoRegistro,
    obtenerClientes,
    inicioSesion,
    desactivarCuentaCliente,
    todosActivosClientes,
    todosInactivosClientes,
    actualizarContrasena,
    verificarCorreo,
    crearToken,
    recuperarContrasena
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
clienterouter.post('/crearToken', crearToken);
clienterouter.patch('/recuperarContrasena', recuperarContrasena)

module.exports = clienterouter;