const categorias = require("./CategoriasR.json")
const {agregarCategorias} = require("../controllers/categoriaRestauranteController")

const crearCategoriasBase = async() => {
    for (let i = 0; i < categorias.length; i++) {
       await agregarCategorias(categorias[i])
    }
    return "ok"
}

module.exports = crearCategoriasBase