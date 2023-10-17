const { crearContrasenaHash , verificarContrasenaHash, verificarCorreo , verificarTelefono } = require("../actions/restauranteActions.js")
const { Restaurante } = require("../db.js")


async function registro ( restaurante ){

    const {nombre, contrasena, correo, representante, telefono} = restaurante

    let restCorreo = verificarCorreo(correo)

    var restTelefono = verificarTelefono(telefono)
        
        console.log(restTelefono)
 
    

    if(restCorreo){

        if (!restTelefono){
            return "Telefono inválido"
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
                                    telefono
                                    }  
            await Restaurante.create(objetoRestaurante)
            
                                    
        }else{
    
            return "Ya existe un restaurante registrado con ese correo"
        }

    }else{
        return "Correo inválido"
    }

    

    return "Registrado con éxito"
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