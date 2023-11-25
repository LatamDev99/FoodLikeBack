const {
    Platillo,
    Cliente,
    Like,
    Restaurante,
    CategoriaPlatillo
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

  const { CategoriaPlatilloId } = platillo

  const categoriaPlatillo = await CategoriaPlatillo.findOne({
    where: {
      id: CategoriaPlatilloId,
      },
      include: [
        {
            model: Restaurante,
            attributes: ['id', 'logo'],
        },
    ],
  })

  const { Restaurantes } = categoriaPlatillo

  console.log(Restaurantes[0].id)

  const obj ={
    id :  Restaurantes[0].id,
    logo : Restaurantes[0].logo
  }  
  return [platillo , obj ]
}



const traerTodos = async () =>{

    const likes = await Like.findAll({
        include: Platillo             
      });
    return likes
}


module.exports =  { registro, traerTodos, traerPlatilloIdConLike }