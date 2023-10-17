const { registro, todosClientes, sesion } = require("../controllers/clienteController");

const nuevoRegistro = async(req, res) => {
    try {
       let nuevoCliente = await registro(req.body)
       res.status(200).json(nuevoCliente)
    } catch (error) {
        res.status(400).json(error)
    }
}

const inicioSesion = async(req, res) => {
    try {
        let cliente = await sesion(req.body)
        res.status(200).json(cliente)
    } catch (error) {
        res.status(400).json(error)
    }
}

const obtenerClientes = async(req, res) => {
    let clientes = await todosClientes()
    res.status(200).json(clientes)
}
module.exports = {nuevoRegistro, obtenerClientes, inicioSesion}