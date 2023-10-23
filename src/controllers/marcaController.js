const {
    Marca,
    Restaurante
} = require("../db.js")
const {
    crearContrasenaHash,
    verificarContrasenaHash,
    verificarDuplicado,
    verificarContrasenaValida
} = require("../actions/clienteActions.js")

/*
Funcion para registrar nueva Marca
*/
async function registro(marca) {

    let duplicado = await verificarDuplicado(marca.correo)
    if (duplicado) {
        return "Ya existe una marca con ese correo"
    }

    let contrasenaValida = verificarContrasenaValida(marca.contrasena)
    if (!contrasenaValida) {
        return "Contraseña inválida"
    }

    let nuevaMarca = {
        nombre: marca.nombre,
        contrasena: await crearContrasenaHash(marca.contrasena),
        correo: marca.correo,
        representante: marca.representante,
        telefono: marca.telefono
    }

    await Marca.create(nuevaMarca)

    if (nuevaMarca.nombre.length == 0) {
        return "Ups, hubo un error"
    }

    return "Usuario creado con exito"
}
/*
Funcion para iniciar sesion
*/
async function sesion(credencial) {
    let marca = await Marca.findOne({
        where: {
            correo: credencial.correo,
        }
    })
    //Si no encuentra el email en la base de datos retorna false y si lo encuentra compara las contraseñas
    if (!marca) {
        return "Usuario no encontrado"
    }

    if (!marca.activo) return "Cuenta inactiva"

    let contrasenaHashBool = await verificarContrasenaHash(credencial.contrasena, marca.contrasena)
    if (contrasenaHashBool) {
        return marca
    } else {
        return "Contraseña incorrecta"
    }
}
/*
Funcion para obtener marca por id e incluir el modelo Restaurante
*/
async function marcaPorId(id) {
    let marca = await Marca.findByPk(id, {
        include: {
            model: Restaurante
        }
    })
    return marca
}
/*
Funcion para desactivar la cuenta
*/
async function desactivarMarca(marca) {
    let marcaDesactivado = await Marca.findOne({
        where: {
            correo: marca.correo
        }
    })
    let contrasenaHashBool = await verificarContrasenaHash(marca.contrasena, marcaDesactivado.contrasena)
    if (!contrasenaHashBool) {
        return "Contraseña incorrecta"
    }
    marcaDesactivado.activo = false
    await marcaDesactivado.save()

    return "Cuenta desactivada"
}
/*
Funcion para obtener todos las Marcas
*/
async function todosMarcas() {
    let marcas = await Marca.findAll()
    return marcas
}
/*
Funcion para obtener solo los clientes activos
*/
async function activosMarca() {
    let marcas = await Marca.findAll({
        where: {
            activo: true
        }
    })
    return marcas
}
/*
Funcion para obtener solo los clientes inactivos
*/
async function inactivosMarca() {
    let marcas = await Marca.findAll({
        where: {
            activo: false
        }
    })
    return marcas
}
/*
Funcion para cambiar la contraseña
*/
async function cambiarContrasena(marca) {
    let marcaActualizado = await Marca.findOne({
        where: {
            correo: marca.correo
        }
    })
    
    let contrasenaHashBool = await verificarContrasenaHash(marca.contrasena, marcaActualizado.contrasena)

    if (!contrasenaHashBool) {
        return "Contraseña incorrecta"
    }

    marcaActualizado.contrasena = await crearContrasenaHash(marca.nuevaContrasena)

    await marcaActualizado.save()

    return marcaActualizado

}
/*
Funcion para asociar un Restaurante a una Marca
*/
async function asociarRestaurante(marcaId, restauranteId) {
    let marcaRegistrada = await Marca.findByPk(marcaId)
    if (marcaRegistrada == null) {
        return "No se encontro la marca"
    }

    let restauranteRegistrado = await Restaurante.findByPk(restauranteId)
    if (restauranteRegistrado == null) {
        return "No se encontro el restaurante"
    }

    //Asociar la marca al restaurante
    await marcaRegistrada.addRestaurante(restauranteId)
    return "Afiliado con exito"
}
module.exports = {
    registro,
    todosMarcas,
    sesion,
    marcaPorId,
    desactivarMarca,
    activosMarca,
    inactivosMarca,
    cambiarContrasena,
    asociarRestaurante
};