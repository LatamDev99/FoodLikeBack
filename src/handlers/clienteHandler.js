const {
    registro,
    todosClientes,
    sesion,
    desactivarCliente,
    activosClientes,
    inactivosClientes,
    cambiarContrasena,
    checkToken,
    generarToken,
    verificarToken
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
    try {
        let cliente = await sesion(req.body)
        res.status(200).json(cliente)
    } catch (error) {
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
};

const verificarCorreo = async (req, res) => {
    try {
        let status = await checkToken(req.query.token);
        res.status(200).json(status)
    } catch (error) {
        res.status(400).json(error)
    }
};

const crearToken = async (req, res) => {
    try {
        const email = req.query.email
        const status = await generarToken(email);
        if(status !== 400 && status !== 404){
            res.status(200).json("correo enviado")
        }else if(status === 404){
            res.status(404).json("no existe este usuario")
        }else{
            res.status(400).json("error")
        }
    } catch (error) {
        res.status(400).json(error)
    }
};

const recuperarContrasena = async (req, res) => {
    try {
        const token = req.query.token
        const nuevaContrasena = req.query.contrasena
        const status = await verificarToken(token, nuevaContrasena);
        console.log(status);
        if(status ===  200){
            res.status(200).json("contasena actualizada")
        }else if(status === 404){
            res.status(404).json("token invalido")
        }else if(status === 498){
            res.status(498).json("token vencido")
        }
    } catch (error) {
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
    actualizarContrasena,
    verificarCorreo,
    crearToken,
    recuperarContrasena
}