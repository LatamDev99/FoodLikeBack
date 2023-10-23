const {
    Restaurante,
    Cliente,
    Platillo,
    Carrito
} = require("../db.js")

/* n*/ 

const enlazaUsuarioACarrito = async( idCliente ) => {

    // const {clienteId, platilloId} = carrito

 
    // const restaurante = await Restaurante.findByPk(restauranteId)
    // if (restaurante == null) {
    //     return "No se encontro el restaurante"
    // }

    const cliente = await Cliente.findByPk(idCliente)
    if (cliente == null) {
        return "No se encontro el cliente"
    }

    // const platillo = await Platillo.findByPk(platilloId)
    // if (platillo == null) {
    //     return "No se encontro el platillo"
    // }

    const nuevoCarrito = await Carrito.create()
    await nuevoCarrito.setCliente(cliente);
    // await nuevoCarrito.setRestaurante(restaurante);
    // await nuevoCarrito.setPlatillo(platillo);

    return "Carrito registrado con éxito"
}


const agregarPlatillosAlCarrito = async ( carrito ) =>{

    const {carritoId , platilloId} = carrito


     const car = await Carrito.findByPk(carritoId)
    if (car == null) {
        return "No se encontro el carrito"
    }

     const platillo = await Platillo.findByPk(platilloId)
    if (platillo == null) {
        return "No se encontro el platillo"
    }

    await car.setPlatillo(platillo);

    return "Platillo agregado con éxito"

}

/* Traer todos los Carritos */ 

const todosCarritos = async () =>{
    let reviews = await Carrito.findAll()
    return reviews
}



module.exports={
    enlazaUsuarioACarrito,
    agregarPlatillosAlCarrito,
    todosCarritos
}