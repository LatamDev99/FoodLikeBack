const { registro, todosRestaurantes, sesion, restauranteDesAct, cambiarContrasena, activosRestaurantes, inactivosRestaurantes} = require("../controllers/restauranteController");

/* Nuevo registro de restaurante */

const nuevoRegistro = async(req, res) => {
    try {
       let nuevoRestaurante = await registro(req.body)
       res.status(200).json(nuevoRestaurante)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

/* Inicio sesión de restaurante */

const inicioSesion = async(req, res) => {
    try {
        let restaurante = await sesion(req.body)
        res.status(200).json(restaurante)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

/* Obtener todos los restaurantes */

const obtenerRestaurantes = async(req, res) => {
    let restaurante = await todosRestaurantes()
    res.status(200).json(restaurante)
}

/* Activar o desactivar un restaurante */

const desActCuentaRestaurante = async(req, res) => {
    try {
        let restaurante = await restauranteDesAct(req.body)
        res.status(200).json(restaurante)
    } catch (error) {
        res.status(400).json(error)
    }
}

/* Actualizar contraseña del restaurante */

const actualizarContrasenaRestaurante = async(req, res) => {
    try {
        let restaurante = await cambiarContrasena(req.body)
        res.status(200).json(restaurante)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

/* Todos los restaurantes activos */

const todosActivosRestaurantes = async(req, res) => {
    try {
        let restaurante = await activosRestaurantes();
        if (restaurante.length === 0) {
            res.status(400).json("No hay restaurantes activos");
        } else {
            res.status(200).json(restaurante);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

/* Todos los restaurantes inactivos */

const todosInactivosRestaurantes = async(req, res) => {
    try {
        let restaurantes = await inactivosRestaurantes();
        
        if (restaurantes.length === 0) {
            res.status(400).json("No hay restaurantes inactivos");
        } else {
            res.status(200).json(restaurantes);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}



module.exports = {
    nuevoRegistro, 
    obtenerRestaurantes, 
    inicioSesion,
    desActCuentaRestaurante, 
    actualizarContrasenaRestaurante, 
    todosActivosRestaurantes, 
    todosInactivosRestaurantes,

}