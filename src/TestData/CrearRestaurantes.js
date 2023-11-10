const { registro } = require("../controllers/restauranteController")
const restaurantes = require("./Restaurantes.json")

const crearRestaurantesBase = () => {
    for (let i = 0; i < restaurantes.length; i++) {
        registro(restaurantes[i])
    }
    return "ok"
}

module.exports = crearRestaurantesBase