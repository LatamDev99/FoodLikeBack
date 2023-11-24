const {
    Platillo,
    Cliente,
    Like,
    Restaurante
} = require("../db.js")


const registro  = async ( data ) => {
    const { idPlatillo, idCliente, idRestaurante}  = data

    const platilloEncontrado = await Platillo.findByPk(idPlatillo);
    
    let info  =  {
        idPlatillo:idPlatillo,
        idCliente:  idCliente,
        idRestaurante: idRestaurante,
    }

     const nuevoLike = await Like.create(info);

     await platilloEncontrado.addLike(nuevoLike);

     return true
}


const traerPlatilloIdConLike = async ( data ) =>{ 

    const { id } = data

    const platillo = await Platillo.findOne({
        where: {
          id: id,
        },
        include: Like, 
      });
      
    return platillo
}




const traerTodos = async () =>{

    const likes = await Like.findAll({
        include: Platillo             
      });
    return likes
}


module.exports =  { registro, traerTodos, traerPlatilloIdConLike }