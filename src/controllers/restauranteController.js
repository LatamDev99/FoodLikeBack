const { crearContrasenaHash , verificarContrasenaHash, verificarCorreo , verificarTelefono, verificarCuentaBancaria } = require("../actions/restauranteActions.js")
const { Restaurante, CategoriaRestaurante, Categoria, CategoriaPlatillo } = require("../db.js")


/*Función para registrar nuevo restaurante */

const registro = async( restaurante ) => {
    const {nombre, contrasena, correo, representante, telefono, direccion, activo, categorias} = restaurante

    let restCorreo = verificarCorreo(correo)
    var restTelefono = verificarTelefono(telefono)
    // let restCuentaBancaria = verificarCuentaBancaria(cuentaBancaria)
 
    if(restCorreo){

        if (!restTelefono){
            return "Telefono inválido"
        } 
        
        // if (!restCuentaBancaria){
        //     return "Número de cuenta inválido"
        // }
        
        for (const categoriaId of categorias){
            const categoria = await CategoriaRestaurante.findByPk(categoriaId)
            if(!categoria){
                return "No existe la categoría en el sistema"
            }
        }
        

        var rest = await Restaurante.findOne({
            where: {
                correo: restaurante.correo,
            }
        })          
    
        if (rest===null){            
    
            let nuevaContrasena = await crearContrasenaHash( contrasena )
    
            let objetoRestaurante = {nombre, 
                                    correo, 
                                    contrasena : nuevaContrasena, 
                                    representante,
                                    telefono,
                                    direccion,
                                    activo
                                    }  

        const rest =   await Restaurante.create(objetoRestaurante)           
        
        if(categorias.length > 0){
           for (const categoriaId of categorias){
            const categoria = await CategoriaRestaurante.findByPk(categoriaId)
            if(categoria){  
                await rest.addCategoriaRestaurante(categoria)
            }
           }
        }        

        }else{    
            return "Ya existe un restaurante registrado con ese correo"
        }
    }else{
        return "Correo inválido"
    } 
        
    return true
}

/*Función para iniciar sesión restaurante */

const sesion = async( credencial ) => {

    const { correo , contrasena }  = credencial 

    let restaurante = await Restaurante.findOne({
        where: {
            correo: correo
        },
        include: [CategoriaRestaurante, CategoriaPlatillo]
    })

    if (!restaurante) {
        return 'Restaurante no encontrado';
    }

    let verificarSesionRestaurante = await verificarContrasenaHash( contrasena , restaurante.contrasena)

    if (verificarSesionRestaurante){
        return [true, restaurante]
    }else{
        return 'Existe un error en el correo o contraseña'
    }
}

/*Función para obtener todos los restaurantes */

const todosRestaurantes = async() => {
    let restaurante = await Restaurante.findAll({
        include:[
                CategoriaRestaurante,
                CategoriaPlatillo
        ]
        
    })
    return restaurante
}

/*Función para activar o desactivar restaurantes */

const restauranteDesAct = async ( restaurante ) =>{
    let restDesAct = await Restaurante.findOne({
        where: {
            correo: restaurante.correo
        }
    })

    let contrasenaHashBool = await verificarContrasenaHash(restaurante.contrasena, restDesAct.contrasena)

    if (!contrasenaHashBool) {
        return "Contraseña incorrecta"
    }

    if(restDesAct.activo){
        restDesAct.activo = false
        await restDesAct.save()
        return "Restaurante desactivado"
    }
    else{
        restDesAct.activo = true
        await restDesAct.save()
        return "Restaurante activado"
    }       
}

/* Función para cambiar contraseña de restaurante, tiene restaurante como parámetro */

const cambiarContrasena = async(  restaurante  ) =>{
    let restauranteContrasenaActualizada = await Restaurante.findOne({
        where: {
            correo: restaurante.correo
        }
    })
    
    let contrasenaHashBool = await verificarContrasenaHash(restaurante.contrasena, restauranteContrasenaActualizada.contrasena)

    if (!contrasenaHashBool) {
        return "Contraseña incorrecta"
    }

    restauranteContrasenaActualizada.contrasena = await crearContrasenaHash(restaurante.nuevaContrasena)

    await restauranteContrasenaActualizada.save()

    return "Contraseña actualizada"
}

/* Función para ver restaurantes activos */ 

async function activosRestaurantes() {
    let restaurante = await Restaurante.findAll({
        where: {
            activo: true
        }
    })
    return restaurante
}

/* Función para ver restaurantes inactivos */ 

async function inactivosRestaurantes() {
    let restaurante = await Restaurante.findAll({
        where: {
            activo: false
        }
    })
    return restaurante
}

async function cambiarDatos( restaurante ){

    const { horario , logo , fachada , cuentaBancaria, alcance, CategoriaRestaurantes } = restaurante

    let restauranteDatos = await Restaurante.findOne({
        where: {
            correo: restaurante.correo
        },
        include: CategoriaRestaurante
    })
    restauranteDatos.horario = horario
    restauranteDatos.logo = logo
    restauranteDatos.fachada = fachada
    restauranteDatos.cuentaBancaria = cuentaBancaria
    restauranteDatos.alcance = alcance

    const idsDeCategoriasDeRestaurantes = restauranteDatos.CategoriaRestaurantes.map((categoriaRestaurante) => categoriaRestaurante.dataValues.id); 
    const idsDeLasCategoriasEntrantes = CategoriaRestaurantes.map(cat => cat.id)

    const elementosNoEncontradosEnEntrantes = idsDeCategoriasDeRestaurantes.filter(id => !idsDeLasCategoriasEntrantes.includes(id));
    const elementosNoEncontradosEnCategoriasDeRestaurantes = idsDeLasCategoriasEntrantes.filter(id => !idsDeCategoriasDeRestaurantes.includes(id));

    for (const id of elementosNoEncontradosEnEntrantes){
        const cat = await CategoriaRestaurante.findByPk(id)
        if(cat){  
            await restauranteDatos.removeCategoriaRestaurante(cat)
        }
       }

    for (const id of elementosNoEncontradosEnCategoriasDeRestaurantes){
        const cat = await CategoriaRestaurante.findByPk(id)
        if(cat){  
            await restauranteDatos.addCategoriaRestaurante(cat)
        }
       }

    restauranteDatos.save()

        let restActualizado = await Restaurante.findOne({
            where: {
                correo: restaurante.correo
            },
            include: CategoriaRestaurante
        })        
        return [true, restActualizado]   
}
   

module.exports={
    registro, 
    todosRestaurantes, 
    sesion,
    restauranteDesAct,
    cambiarContrasena,
    activosRestaurantes,
    inactivosRestaurantes,
    cambiarDatos
};