const {
    anadirPlatillo
} = require("../controllers/carritoController")

const agregarPlatillo = async (req, res) => {
    try {
        const {
            id_platillo,
            id_cliente,
            cantidad
        } = req.body
        const id_carrito = await anadirPlatillo(
            id_platillo,
            id_cliente,
            cantidad
        )
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = {
    agregarPlatillo
}