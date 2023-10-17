const { crearContrasenaHash , verificarContrasenaHash } = require("../actions/restauranteActions.js")
const { Restaurante } = require("../db.js")


async function registro ( restaurante ){

    const {nombre, contrasena, correo} = restaurante

    let nuevaContrasena = await crearContrasenaHash( contrasena )

    let objetoRestaurante = {nombre, correo, contrasena : nuevaContrasena}
  
    let nuevoRestaurante = await Restaurante.create(objetoRestaurante)

    
    if(nuevoRestaurante.nombre.length == 0){
    
        return "Ups, hubo un error"
    }

    return nuevaContrasena
}





async function sesion ( credencial ){

    let restaurante = await Restaurante.findOne({
        where: {
            correo: credencial.correo,
        }
    })

    let verificarSesionRestaurante = verificarContrasenaHash( credencial.contrasena , restaurante.contrasena )

    if (verificarSesionRestaurante){
        return restaurante
    }else{
        return 'Contraseña incorrecta'
    }
}

async function todosRestaurantes(){

    let restaurante = await Restaurante.findAll()
    return restaurante
}

module.exports={registro, todosRestaurantes, sesion};