const {
    Categoria
} = require("../db.js")

const agregarCategorias = async( categoria ) =>{

    const categoriaAgregada = await Categoria.findOne(
        {where : {
            nombre: categoria.nombre
        }}
    )

    if (categoriaAgregada== null){
        return await Categoria.create(categoria)
    }else{
        return categoriaAgregada
    }
}


const traerCategorias = async() =>{
    let categoria = await Categoria.findAll()
    return categoria
}


module.exports = { agregarCategorias, traerCategorias } 