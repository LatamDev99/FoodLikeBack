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


const eliminarCategorias = async( categoria ) =>{

    const { categoriaId}  = categoria

    // const categoriaEliminada = await CategoriaRestaurante.findOne(
    //     {where : {
    //         id: categoria
    //     }}
    // )

    await CategoriaRestaurante.destroy({
        where: { id : categoriaId }
    })

    return "Categoria Eliminada"
}




const traerCategorias = async() =>{
    let categoria = await CategoriaRestaurante.findAll()
    return categoria
}


module.exports = { agregarCategorias, traerCategorias, eliminarCategorias } 