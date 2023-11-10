const {
    Restaurante,
    Cliente,
    Platillo,
    Carrito
} = require("../db.js")

/* Función que enlaza el primer carrito del Usuario */ 

const enlazaUsuarioACarrito = async( idCliente ) => {

   const cliente = await Cliente.findByPk(idCliente)
    if (cliente == null) {
        return "No se encontro el cliente"
    }

    const nuevoCarrito = await Carrito.create()
    // await nuevoCarrito.addCliente(cliente);

    return "Carrito registrado con éxito"
}

/*Función para agregar Platillos al Carrito */


const agregarPlatillosAlCarrito = async ( carrito ) =>{

    const {carritoId , platilloId} = carrito


    const car = await Carrito.findByPk(carritoId)
    if (car == null) {
        return `No se encontro el carrito ${carritoId}`
    }
    const platillo = await Platillo.findByPk(platilloId)
    if (platillo == null) {
        return `No se encuentra el platillo ${platilloId}`
    }

    await car.addPlatillo(platillo);  
    
    const nuevoCarrito = await Carrito.findByPk(car.id,{
            include: Platillo
    }) 

    return "Platillo agregado al carrito"

}

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
    let reviews = await Carrito.findAll({
        include: Platillo})
    return reviews
}

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
    enlazaUsuarioACarrito,
    agregarPlatillosAlCarrito,
    todosCarritos,
    eliminarPlatillodelCarrito,
    obtenerCarritoPorId
}