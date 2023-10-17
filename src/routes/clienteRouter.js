const express = require('express');
const {nuevoRegistro, obtenerClientes, inicioSesion} = require("../handlers/clienteHandler.js")

const clienterouter = express.Router();

clienterouter.post('/registro', nuevoRegistro);
clienterouter.get('/todos', obtenerClientes);
clienterouter.get('/sesion', inicioSesion);

module.exports = clienterouter;
