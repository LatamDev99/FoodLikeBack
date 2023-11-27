const {
    Cliente,
    Platillo,
    Carrito
} = require("../db.js")

const { sequelize } = require('../db.js')

/* Función que enlaza el primer carrito del Usuario */ 

const conectarUsuarioACarrito = async( idCliente ) => {

   const cliente = await Cliente.findByPk(idCliente)
    if (cliente == null) {
        return "No se encontro el cliente"
    }

    const nuevoCarrito = await Carrito.create()
    await nuevoCarrito.setCliente(cliente);

    return "Carrito registrado con éxito"
}


/*Función para agregar Platillos al Carrito */

const agregarPlatillosAlCarrito = async (carrito) => {

  const { clienteId, productos } = carrito
    try {
      
       const clienteConCarrito = await Cliente.findByPk(clienteId, {
        include: [
          {
            model: Carrito,
            include: Platillo,
          },
        ],
      });   

      const { Carritos } = clienteConCarrito

      const carritoActivo = Carritos.find(carrito => carrito.activo === true)

      console.log(carritoActivo)
      
      for (let i = 0; i < productos.length; i++) {
        const productoId = productos[i];
        await carritoActivo.addPlatillo(productoId);
      }
     
      const carritoActualizado = await Carrito.findByPk(carritoActivo.id, {
        include: [
          {
            model: Platillo,
          },
        ],
      });

      const total = carritoActualizado.Platillos.reduce((acc, platillo) => {
        return acc + parseFloat(platillo.precio);
      }, 0);

      carritoActualizado.activo = false;
      carritoActualizado.total = total;
    await carritoActualizado.save();

    conectarUsuarioACarrito(clienteId)

    return carritoActualizado;

    } catch (error) {
      console.error('Error al agregar platillos al carrito:', error.message);
      throw error;
    }
  };
  
  
/* Función para eliminar Platillos al Carrito */

const eliminarPlatillodelCarrito = async ( carrito ) =>{

    const {carritoId , platilloId} = carrito


    const car = await Carrito.findByPk(carritoId)
    if (car == null) {
        return "No se encontro el carrito"
    }

    await car.removePlatillo(platilloId)

    
    const nuevoCarrito = await Carrito.findByPk(car.id,{
            include: Platillo
    }) 

    return "Platillo eliminado del Carrito"

}

/* Traer todos los Carritos */ 

const todosCarritos = async () =>{
    let carrito = await Carrito.findAll({
        include: Platillo
        })
    return carrito
}
// include: Platillo
/* Obtener Carrito del Usuario por Id*/


const obtenerCarritoPorId = async ( carrito ) =>{
    const { carritoId } = carrito
    const car = await Carrito.findByPk(carritoId,{
        include: Platillo
    })
    if (car == null) {
        return "No se encontro el carrito"
    }
    return car
}



module.exports={
    conectarUsuarioACarrito,
    agregarPlatillosAlCarrito,
    todosCarritos,
    eliminarPlatillodelCarrito,
    obtenerCarritoPorId
}