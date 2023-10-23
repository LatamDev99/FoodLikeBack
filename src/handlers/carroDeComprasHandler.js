const {
    todosCarritos,
    agregarPlatillosAlCarrito
} = require("../controllers/carrosController");

/* Función para crear nuevos carritos */
 
const agregarPlatilloCarrito = async(req, res) => {
    try {
        let review = await agregarPlatillosAlCarrito(req.body)

        res.status(200).json(review)
    } catch (error) {
        res.status(400).json(error)
    }
}

/* Función para traer a todos los carros */

const todosCarros = async(req, res) => {
    try {
        let review = await todosCarritos()

        res.status(200).json(review)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

module.exports = {
    agregarPlatilloCarrito,
    todosCarros
}
