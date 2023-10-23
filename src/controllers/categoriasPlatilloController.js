const {
    CategoriaPlatillo
} = require("../db.js")

const agregarCategorias = async( categoria ) =>{

    const categoriaAgregada = await CategoriaPlatillo.findOne(
        {where : {
            nombre: categoria.nombre
        }}
    )

    if (categoriaAgregada== null){
        return await CategoriaPlatillo.create(categoria)
    }else{
        return categoriaAgregada
    }
}


const traerCategorias = async() =>{
    let categoria = await CategoriaPlatillo.findAll()
    return categoria
}


module.exports = { agregarCategorias, traerCategorias } 