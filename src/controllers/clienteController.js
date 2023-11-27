const {
    Cliente,
    CategoriaRestaurante,
    TokenContrasena,
    Carrito
} = require("../db.js")
const {
    crearContrasenaHash,
    verificarContrasenaHash,
    verificarDuplicado,
    verificarContrasenaValida,
    tokenDb
} = require("../actions/clienteActions.js");

const {
    sendVerificationEmail,
    sendWelcomeEmail,
    sendPassToken
} = require("../actions/nodemailerAction.js")
const crypto = require("crypto");



const{
    conectarUsuarioACarrito
}
= require("./carritoDeComprasController.js");
const { log } = require("console");


// const { Where } = require("sequelize/types/utils.js");
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
        apellido: cliente.apellido,
        telefono: cliente.telefono
    }

    const clienteCreado = await Cliente.create(nuevoCliente)


    if (nuevoCliente.nombre.length == 0) {
        return "Ups, hubo un error"
    }

    await conectarUsuarioACarrito(clienteCreado.id)

    if (preferencias && preferencias.length > 0) {

        for (let index = 0; index < preferencias.length; index++) {
            const categoriaId = preferencias[index];
            const categoria = await CategoriaRestaurante.findByPk(categoriaId.toString());
            if (categoria) {
                await clienteCreado.addCategoriaRestaurante(categoria);
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
        include: CategoriaRestaurante
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
    let clientes = await Cliente.findAll(
        {include: Carrito}
    )
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

async function checkToken(token) {
    if(!token) return 400;

    const user = await Cliente.findOne({token});

    if(!user) return 404;

    user.emailToken = null;
    user.activo = true;

    sendWelcomeEmail(user)

    await user.save();
    return 202

};

const generarToken = async (email) => {
        try {
            const cliente = await Cliente.findOne({
                where: {
                  correo: email
                }
            });
            if(!cliente) return 404
            const token = await tokenDb(cliente);
            if(token === 409){
                throw new Error("token no generado");
            }
            const enviarToken = sendPassToken(token, email)
            console.log(enviarToken)
            return enviarToken
        } catch (error) {
            return error
        }
}

const verificarToken = async(tokenValue, nuevaContrasena) => {
    try {
        const tokenDb = await TokenContrasena.findOne({
            where: {
                token: tokenValue,
                activo: true
            },
            include: [Cliente]
        });
        const now = new Date();
    
        if(!tokenDb) return 404
        if(tokenDb.vence < now) {
            await tokenDb.update({
                activo: false
            })
            return 409
        }  
        const hash = await crearContrasenaHash(nuevaContrasena)
        const cliente = await Cliente.findByPk(tokenDb.Clientes[0].id)
        console.log(cliente);
        const update = await cliente.update({
            contrasena: await crearContrasenaHash(nuevaContrasena)
        });
        await tokenDb.update({
            activo: false
        })
        if(update) return 200
    } catch (error) {
        return error
    }

}

module.exports = {
    registro,
    todosClientes,
    sesion,
    desactivarCliente,
    activosClientes,
    inactivosClientes,
    cambiarContrasena,
    checkToken,
    generarToken,
    verificarToken
};