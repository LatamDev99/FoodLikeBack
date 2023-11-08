const {
    CategoriaPlatillo,
    Restaurante
} = require("../db.js")

const agregarCategorias = async( categoria ) =>{

    const { nombre, idRestaurante } = categoria

    const categoriaAgregada = await CategoriaPlatillo.findOne(
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
        const nuevaCategoria = await CategoriaPlatillo.create(categoriasAgregadas)
        await nuevaCategoria.addRestaurante(idRestaurante)

        return nuevaCategoria
    }else{
        return categoriaAgregada
    }
}

const traerCategorias = async() =>{
    let categoria = await CategoriaPlatillo.findAll({
        include:  Restaurante}
        )
    return categoria
}


module.exports = { agregarCategorias, traerCategorias } 