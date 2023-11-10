const { Platillo, Restaurante, CategoriaPlatillo, CategoriaRestaurante } = require("../db")
const categoriaplatillo = require("../models/categoriaplatillo")

const crearPlatillo = async ( platillo ) => {
   
    const { categoriaId, nombre, descripcion, precio, foto, promo ,stock } = platillo

    const infoPlatillo = {
            nombre,
            descripcion,
            precio,
            foto,
            promo,
            stock   
        }
  
        const categoria = await CategoriaPlatillo.findByPk(categoriaId)

        if(!categoria) return "La categoría no existe"
        
        const nuevoPlatillo = await Platillo.create(infoPlatillo);
        await categoria.addPlatillo(nuevoPlatillo)

        return true
}

const actualizarPlatillo = async( platillo ) => {

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

const getPlatillos = async ( rest ) => {

    const { id_restaurante } = rest
    try {
        
         let restaurante = await Restaurante.findOne({
            where: {
                id: id_restaurante
            },
            include: [CategoriaRestaurante, CategoriaPlatillo]
        })

        const {CategoriaPlatillos} = restaurante

        const soloIds = CategoriaPlatillos.map(categoria => categoria.id);

        const platillosPorCategoria = []

        for (let i = 0; i < soloIds.length; i++) {
        const categoriaId = soloIds[i];
        const platillos = await Platillo.findAll({
            where: {
            CategoriaPlatilloId: categoriaId,
            },
        });
        platillosPorCategoria.push(platillos);
        }

        return platillosPorCategoria

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