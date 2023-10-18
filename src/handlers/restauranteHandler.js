const { registro, todosRestaurantes, sesion } = require("../controllers/restauranteController");

const nuevoRegistro = async(req, res) => {
    try {
       let nuevoRestaurante = await registro(req.body)
       res.status(200).json(nuevoRestaurante)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

const inicioSesion = async(req, res) => {
    try {
        let restaurante = await sesion(req.body)
        res.status(200).json(restaurante)
    } catch (error) {
        res.status(400).json(error)
    }
}

const obtenerRestaurantes = async(req, res) => {
    let restaurante = await todosRestaurantes()
    res.status(200).json(restaurante)
}

module.exports = {
    nuevoRegistro, 
    obtenerRestaurantes, 
    inicioSesion
}