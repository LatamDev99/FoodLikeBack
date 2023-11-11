const {
    CategoriaPlatillo,
    Restaurante
} = require("../db.js")

const agregarCategorias = async( categoria ) =>{

    const { nombre, idRestaurante } = categoria

    const categoriasAgregadas= {
        nombre: nombre,
        value: nombre,
        label: nombre
    }
        const nuevaCategoria = await CategoriaPlatillo.create(categoriasAgregadas)
        await nuevaCategoria.addRestaurante(idRestaurante)

        return nuevaCategoria   
}

const traerCategorias = async() =>{
    let categoria = await CategoriaPlatillo.findAll({
        include:  Restaurante}
        )
    return categoria
}


module.exports = { agregarCategorias, traerCategorias } 