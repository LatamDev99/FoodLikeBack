const { Platillo } = require("../db")

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
        const nuevoPlatillo = Platillo.create(infoPlatillo);
        return nuevoPlatillo
    } catch (error) {
        return error
    }
}

module.exports = {
    crearPlatillo
}