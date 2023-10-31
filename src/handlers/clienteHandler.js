const {
    registro,
    todosClientes,
    sesion,
    desactivarCliente,
    activosClientes,
    inactivosClientes,
    cambiarContrasena
} = require("../controllers/clienteController");
/*
Funcion handler para nuevo registro de cliente
*/
const nuevoRegistro = async (req, res) => {
    try {
        let nuevoCliente = await registro(req.body)
        res.status(200).json(nuevoCliente)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}
/*
Funcion handler para inicio de sesion de cliente
*/
const inicioSesion = async (req, res) => {
    console.log(req.body);
    try {
        let cliente = await sesion(req.body)
        res.status(200).json(cliente)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}
/*
Funcion handler para cancelar cuenta de cliente
*/
const desactivarCuentaCliente = async (req, res) => {
    try {
        let cliente = await desactivarCliente(req.body)
        res.status(200).json(cliente)
    } catch (error) {
        res.status(400).json(error)
    }
}
/*
Funcion handler para obtener todos los clientes
*/
const obtenerClientes = async (req, res) => {
    try {
        let clientes = await todosClientes()
        res.status(200).json(clientes)
    } catch (error) {
        res.status(400).json(error)
    }
}
/*
Funcion handler para obtener todos los clientes activos
*/
const todosActivosClientes = async (req, res) => {
    try {
        let clientes = await activosClientes();
        if (clientes.length === 0) {
            res.status(400).json("No hay clientes activos");
        } else {
            res.status(200).json(clientes);
        }
    } catch (error) {
        res.status(500).json(error); // Manejar errores internos del servidor
    }
}
/*
Funcion handler para obtener todos los clientes inactivos
*/
const todosInactivosClientes = async (req, res) => {
    try {
        let clientes = await inactivosClientes();
        if (clientes.length === 0) {
            res.status(400).json("No hay clientes inactivos");
        } else {
            res.status(200).json(clientes);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}
/*
Funcion handler para cambiar contraseña
*/
const actualizarContrasena = async (req, res) => {
    try {
        let cliente = await cambiarContrasena(req.body)
        res.status(200).json(cliente)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}
module.exports = {
    nuevoRegistro,
    obtenerClientes,
    inicioSesion,
    desactivarCuentaCliente,
    todosActivosClientes,
    todosInactivosClientes,
    actualizarContrasena
}