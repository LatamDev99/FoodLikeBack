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
    await nuevoCarrito.setCliente(cliente);

    return "Carrito registrado con éxito"
}

/*Función para agregar Platillos al Carrito 

FALTA AGREGAR MÁS IDS*/ 

const agregarPlatillosAlCarrito = async ( carrito ) =>{

    const {carritoId , platilloId} = carrito


    const car = await Carrito.findByPk(carritoId)
    if (car == null) {
        return "No se encontro el carrito"
    }
    const platillo = await Platillo.findByPk(platilloId)
    if (platillo == null) {
        return `No se encuentra el platillo ${platilloId}`
    }

    await car.addPlatillo(platillo);  
    
    const nuevoCarrito = await Carrito.findByPk(car.id,{
            include: Platillo
    }) 

    return "Platillo agregado con éxito"

}

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

    return nuevoCarrito

    return "Platillo agregado con éxito"

}

/* Traer todos los Carritos */ 

const todosCarritos = async () =>{
    let reviews = await Carrito.findAll({
        include: Platillo})
    return reviews
}



module.exports={
    enlazaUsuarioACarrito,
    agregarPlatillosAlCarrito,
    todosCarritos,
    eliminarPlatillodelCarrito
}