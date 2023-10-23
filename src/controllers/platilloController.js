const { Platillo, Restaurante, CategoriaPlatillo } = require("../db")

const crearPlatillo = async ( platillo ) => {
   
    const { restauranteId, categoriaId, nombre, descripcion, precio, foto, promo ,stock, activo} = platillo

    const infoPlatillo = {
            nombre,
            descripcion,
            precio,
            foto,
            promo,
            stock,
            activo      
        }
        
        const restaurante = await Restaurante.findByPk(restauranteId)
        const categoria = await CategoriaPlatillo.findByPk(categoriaId)
        
        if(!restaurante) return "El restaurante no existe"
        if(!categoria) return "La categoría no existe"
        
        const nuevoPlatillo = await Platillo.create(infoPlatillo);
        await nuevoPlatillo.setRestaurante(restaurante);
        await categoria.addPlatillo(nuevoPlatillo)

        return await Platillo.findByPk(nuevoPlatillo.id)
}

const actualizarPlatillo = async(platillo) => {

    const { platilloId, nombre, descripcion, precio , foto , promo , stock  , activo  } = platillo

        const platilloDb = await Platillo.findByPk(platilloId);
        if(!platilloDb){
            throw new Error(`no se encontro platillo con id ${platilloId}`)
        }
        /*hacer validaciones en los actions*/
        const updates = {
            nombre,
            descripcion,
            foto,
            promo,
            stock,
            activo
        }
        
        await platilloDb.update(updates);
        return platilloDb
  
}

const getPlatillos = async (id_restaurante) => {
    try {
        
        const restaurantCheck = await Restaurante.findByPk(id_restaurante)

        if (!restaurantCheck) return null
        const platillos = await Platillo.findAll({where: {
            restauranteId: id_restaurante
        }})
            

        return platillos
    } catch (error) {
        return error   
    }
}

const todosPlatillos = async () =>{
    let platillos = await Platillo.findAll()

    return platillos
}


module.exports = {
    crearPlatillo,
    actualizarPlatillo,
    getPlatillos,
    todosPlatillos
}