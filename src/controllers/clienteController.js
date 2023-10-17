const {Cliente} = require("../db.js")

async function registro( cliente ){
    console.log(cliente)
    let nuevoCliente = await Cliente.create(cliente)

    if(nuevoCliente.nombre.length == 0){
        return "Ups, hubo un error"
    }

    return "Usuario creado con exito"
}

async function sesion(credencial){
    let cliente = await Cliente.findOne({
        where: {
            correo: credencial.correo,
            contrasena: credencial.contrasena
        }
    })
    if (cliente.nombre.length == 0) {
        return "Usuario no encontrado"
    } else {
        return cliente
    }
}

async function todosClientes(){
    let clientes = await Cliente.findAll()
    return clientes
}

module.exports={registro, todosClientes, sesion};