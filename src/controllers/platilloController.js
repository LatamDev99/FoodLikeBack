const { Platillo, Restaurante, CategoriaPlatillo, CategoriaRestaurante } = require("../db")

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

    const { id, nombre, descripcion, precio , foto , promo , stock  , activo  } = platillo

        const platilloDb = await Platillo.findByPk(id);
        if(!platilloDb){
            throw new Error(`no se encontro platillo con id ${id}`)
        }
            
        const updates = {
            nombre,
            descripcion,
            foto,
            promo,
            stock,
            activo,
            precio
        }
        
        await platilloDb.update(updates);
        return true
  
}

const getPlatillos = async ( rest ) => {

    try {            
        const platillosPorCategoria = []

        for (let i = 0; i < rest.length; i++) {
        const categoriaId = rest[i];
        const platillos = await CategoriaPlatillo.findAll({
            where: {
            id: categoriaId,
            },include: Platillo
        });
        platillosPorCategoria.push(platillos);
        }
        
        return platillosPorCategoria

    } catch (error) {
        return error   
    }
}

const getPlatillosUsuario = async ( rest ) => {

    try {            
        const platillosPorCategoria = []

        for (let i = 0; i < rest.length; i++) {

        const categoriaId = rest[i];

        const platillos = await CategoriaPlatillo.findAll({
            where: {
                id: categoriaId,
            },
            attributes: ['id', 'nombre'],
            include: [
                {
                    model: Platillo,
                },
            ],
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

const elmPlatillo = async (platillo) =>{
    const plat = await Platillo.findByPk(platillo);
    await plat .destroy();
}

module.exports = {
    crearPlatillo,  
    actualizarPlatillo,
    getPlatillos,
    todosPlatillos,
    elmPlatillo,
    getPlatillosUsuario
}