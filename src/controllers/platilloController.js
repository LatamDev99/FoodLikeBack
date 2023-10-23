const { Platillo, Restaurante } = require("../db")

const crearPlatillo = async ( platillo ) => {
    try {
        const id_restaurante = platillo.id_restaurante;

        const infoPlatillo = {
            nombre:     platillo.nombre , 
            descripcion:     platillo.descripcion,
            precio:     platillo.precio,
            foto:     platillo.foto,
            promo:     platillo.promo,
            stock:     platillo.stock,
            activo:     platillo.activo        
        }
        const restaurante = await Restaurante.findByPk(id_restaurante)
        if(!restaurante) return null
        const nuevoPlatillo = await Platillo.create(infoPlatillo);
        await nuevoPlatillo.setRestaurante(restaurante);
        return nuevoPlatillo
    } catch (error) {
        return error
    }
}

const actualizarPlatillo = async(platillo) => {
    try {
        const id = platillo.id
        const platilloDb = await Platillo.findByPk(id);
        if(!platilloDb){
            throw new Error(`no se encontro platillo con id ${id}`)
        }
        const updates = {}
        if(platillo.nombre) updates.platillo = platillo.nombre;
        if(platillo.descripcion) updates.descripcion = platillo.descripcion;
        if(platillo.precio) updates.precio = platillo.precio;
        if(platillo.foto) updates.foto = platillo.foto;
        if(platillo.promo) updates.promo = platillo.promo;
        if(platillo.stock) updates.stock = platillo.stock;
        if(platillo.activo === true || platillo.activo === false) updates.activo = platillo.activo;
        await platilloDb.update(updates);
        return platilloDb
    } catch (error) {
        return error
    }
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

module.exports = {
    crearPlatillo,
    actualizarPlatillo,
    getPlatillos
}