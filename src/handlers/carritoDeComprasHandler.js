const {
    todosCarritos,
    agregarPlatillosAlCarrito,
    eliminarPlatillodelCarrito,
    obtenerCarritoPorId,
} = require("../controllers/carritoDeComprasController");

/* Función para agregar platillos al Carrito */
 
const agregarPlatilloCarrito = async(req, res) => {
    try {
        let review = await agregarPlatillosAlCarrito(req.body)

        res.status(200).json(review)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}



//////////////////////




const eliminarPlatilloCarrito = async(req, res) => {
    try {
        let review = await eliminarPlatillodelCarrito(req.body)

        res.status(200).json(review)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}


/* Función para traer a todos los carros */

const todosCarros = async(req, res) => {
    try {
        let review = await todosCarritos()
        res.status(200).json(review)
    } catch (error) {
        res.status(400).json(error)
    }
}

/* Función para buscar Carrito por Id */ 

const buscarCarroId = async(req, res) => {

    try {
        let review = await obtenerCarritoPorId(req.body)

        res.status(200).json(review)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

module.exports = {
    agregarPlatilloCarrito,
    todosCarros,
    eliminarPlatilloCarrito,
    buscarCarroId
}
