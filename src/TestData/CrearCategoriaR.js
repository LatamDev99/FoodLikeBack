const categorias = require("./CategoriasR.json")
const {agregarCategorias} = require("../controllers/categoriaRestauranteController")

const crearCategoriasBase = () => {
    for (let i = 0; i < categorias.length; i++) {
        agregarCategorias(categorias[i])
    }
    return "ok"
}

module.exports = crearCategoriasBase