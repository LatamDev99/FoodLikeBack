const {
    CategoriaRestaurante
} = require("../db.js")

const agregarCategorias = async( categoria ) =>{

    const { nombre } = categoria

    const categoriaAgregada = await CategoriaRestaurante.findOne(
        {where : {
            nombre: nombre
        }}
    )

    const categoriasAgregadas= {
        nombre: nombre,
        value: nombre,
        label: nombre
    }

    if (categoriaAgregada== null){
        return await CategoriaRestaurante.create(categoriasAgregadas)
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