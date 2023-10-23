const {
    CategoriaRestaurante
} = require("../db.js")

const agregarCategorias = async( categoria ) =>{

    const categoriaAgregada = await CategoriaRestaurante.findOne(
        {where : {
            nombre: categoria.nombre
        }}
    )

    if (categoriaAgregada== null){
        return await CategoriaRestaurante.create(categoria)
    }else{
        return categoriaAgregada
    }
}


const traerCategorias = async() =>{
    let categoria = await CategoriaRestaurante.findAll()
    return categoria
}


module.exports = { agregarCategorias, traerCategorias } 