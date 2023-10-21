const express = require('express');

const {
    nuevoRegistro,
    inicioSesion,
    desactivarCuentaMarca,
    todasMarcas,
    todosActivosMarcas,
    todosInactivosMarcas,
    actualizarContrasena,
    asociarRestauranteNuevo,
    obtenerMarcaPorId
} = require("../handlers/marcaHandler.js")

const marcaRouter = express.Router();

marcaRouter.post("/registro", nuevoRegistro);
marcaRouter.get("/sesion", inicioSesion);
marcaRouter.get("/obtener", obtenerMarcaPorId)
marcaRouter.get("/todos", todasMarcas);
marcaRouter.get("/activos", todosActivosMarcas);
marcaRouter.get("/inactivos", todosInactivosMarcas);
marcaRouter.patch("/desact", desactivarCuentaMarca);
marcaRouter.patch("/contrasena", actualizarContrasena);
marcaRouter.post("/asociar", asociarRestauranteNuevo);

module.exports = marcaRouter