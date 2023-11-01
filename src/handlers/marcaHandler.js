const {
    registro,
    todosMarcas,
    sesion,
    desactivarMarca,
    activosMarca,
    inactivosMarca,
    cambiarContrasena,
    asociarRestaurante,
    marcaPorId
} = require("../controllers/marcaController.js")
/*
Funcion handler para nuevo registro de marca
*/
const nuevoRegistro = async (req, res) => {
    try {
        let nuevaMarca = await registro(req.body)
        res.status(200).json(nuevaMarca)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}
/*
Funcion handler para inicio de sesion de marca
*/
const inicioSesion = async (req, res) => {
    try {
        let marca = await sesion(req.body)
        res.status(200).json(marca)
    } catch (error) {
        res.status(400).json(error)
    }
}
/*
Funcion handler para para obtener una marca por id
*/
const obtenerMarcaPorId = async (req, res) => {
    const {id} = req.body
    try {
        let marca = await marcaPorId(id)
        res.status(200).json(marca)
    } catch (error) {
        res.status(400).json(error)
    }
}
/*
Funcion handler para cancelar cuenta de marca
*/
const desactivarCuentaMarca = async (req, res) => {
    try {
        let marca = await desactivarMarca(req.body)
        res.status(200).json(marca)
    } catch (error) {
        res.status(400).json(error)
    }
}
/*
Funcion handler para obtener todos las marcas
*/
const todasMarcas = async (req, res) => {
    try {
        let marcas = await todosMarcas()
        res.status(200).json(marcas)
    } catch (error) {
        res.status(400).json(error)
    }
}
/*
Funcion handler para obtener todas las marcas activas
*/
const todosActivosMarcas = async (req, res) => {
    try {
        let marcas = await activosMarca()
        res.status(200).json(marcas)
    } catch (error) {
        res.status(400).json(error)
    }
}
/*
Funcion handler para obtener todas las marcas inactivas
*/
const todosInactivosMarcas = async (req, res) => {
    try {
        let marcas = await inactivosMarca()
        res.status(200).json(marcas)
    } catch (error) {
        res.status(400).json(error)
    }
}
/*
Funcion handler para cambiar contraseña
*/
const actualizarContrasena = async (req, res) => {
    try {
        let marca = await cambiarContrasena(req.body)
        res.status(200).json(marca)
    } catch (error) {
        res.status(400).json(error)
    }
}
/*
Funcion handler para asociar un restaurante a una marca
*/
const asociarRestauranteNuevo = async (req, res) => {
    const {marcaId, restauranteId} = req.body

    try {
        let marca = await asociarRestaurante(marcaId, restauranteId)
        res.status(200).json(marca)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

module.exports = {
    nuevoRegistro,
    inicioSesion,
    desactivarCuentaMarca,
    todasMarcas,
    todosActivosMarcas,
    todosInactivosMarcas,
    actualizarContrasena,
    asociarRestauranteNuevo,
    obtenerMarcaPorId
}