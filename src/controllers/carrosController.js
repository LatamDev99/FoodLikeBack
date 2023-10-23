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


    for (let i=0; i<platilloId.length; i++){
        const platillo = await Platillo.findByPk(platilloId[i])
        if (platillo == null) {
            return `No se encuentro platillo ${platilloId[i]}`
        }
    }
    

    console.log(platilloId.length)

    const updates = {
        platillos : platilloId  
    }
    await car.update(updates);  
 

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