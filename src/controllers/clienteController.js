const {
    Cliente,
    Categoria
} = require("../db.js")
const {
    crearContrasenaHash,
    verificarContrasenaHash,
    verificarDuplicado,
    verificarContrasenaValida
} = require("../actions/clienteActions.js")


const{
    enlazaUsuarioACarrito
}
= require("./carrosController.js")
/*
Funcion para registrar nuevo cliente
*/
async function registro(cliente) {

    let duplicado = await verificarDuplicado(cliente.correo)
    if (duplicado) {
        return "Ya existe un usuario con ese correo"
    }

    let contrasenaValida = verificarContrasenaValida(cliente.contrasena)
    if (!contrasenaValida) {
        return "Contraseña inválida"
    }

    const preferencias = cliente.preferencias;

    let nuevoCliente = {
        nombre: cliente.nombre,
        contrasena: await crearContrasenaHash(cliente.contrasena),
        correo: cliente.correo,
        representante: cliente.representante,
        telefono: cliente.telefono
    }

    const clienteCarro = await Cliente.create(nuevoCliente)

    if (nuevoCliente.nombre.length == 0) {
        return "Ups, hubo un error"
    }

    await enlazaUsuarioACarrito(clienteCarro.id)

    if (preferencias && preferencias.length > 0) {
        for (const categoriaId of preferencias) {
            const categoria = await Categoria.findByPk(categoriaId);
            if (categoria) {
                await clienteCarro.addCategoria(categoria);
            }
        }
    }


    return "Usuario creado con exito"
}
/*
Funcion para iniciar sesion
*/
async function sesion(credencial) {
    let cliente = await Cliente.findOne({
        where: {
            correo: credencial.correo,
        },
        include: Categoria
    })
    //Si no encuentra el email en la base de datos retorna false y si lo encuentra compara las contraseñas
    if (!cliente) {
        return "Usuario no encontrado"
    }

    if (!cliente.activo) return "Cuenta inactiva"

    let contrasenaHashBool = await verificarContrasenaHash(credencial.contrasena, cliente.contrasena)
    if (contrasenaHashBool) {
        return cliente
    } else {
        return "Contraseña incorrecta"
    }
}
/*
Funcion para desactivar la cuenta
*/
async function desactivarCliente(cliente) {
    let clienteDesactivado = await Cliente.findOne({
        where: {
            correo: cliente.correo
        }
    })
    let contrasenaHashBool = await verificarContrasenaHash(cliente.contrasena, clienteDesactivado.contrasena)
    if (!contrasenaHashBool) {
        return "Contraseña incorrecta"
    }
    clienteDesactivado.activo = false
    await clienteDesactivado.save()

    return "Cuenta desactivada"
}
/*
Funcion para obtener todos los clientes
*/
async function todosClientes() {
    let clientes = await Cliente.findAll()
    return clientes
}
/*
Funcion para obtener solo los clientes activos
*/
async function activosClientes() {
    let clientes = await Cliente.findAll({
        where: {
            activo: true
        }
    })
    return clientes
}
/*
Funcion para obtener solo los clientes inactivos
*/
async function inactivosClientes() {
    let clientes = await Cliente.findAll({
        where: {
            activo: false
        }
    })
    return clientes
}
/*
Funcion para cambiar la contraseña
*/
async function cambiarContrasena(cliente) {
    let clienteActualizado = await Cliente.findOne({
        where: {
            correo: cliente.correo
        }
    })
    
    let contrasenaHashBool = await verificarContrasenaHash(cliente.contrasena, clienteActualizado.contrasena)

    if (!contrasenaHashBool) {
        return "Contraseña incorrecta"
    }

    clienteActualizado.contrasena = await crearContrasenaHash(cliente.nuevaContrasena)

    await clienteActualizado.save()

    return clienteActualizado

}
module.exports = {
    registro,
    todosClientes,
    sesion,
    desactivarCliente,
    activosClientes,
    inactivosClientes,
    cambiarContrasena
};