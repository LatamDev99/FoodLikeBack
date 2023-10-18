const { crearContrasenaHash , verificarContrasenaHash, verificarCorreo , verificarTelefono, verificarCuentaBancaria } = require("../actions/restauranteActions.js")
const { Restaurante } = require("../db.js")



const registro = async( restaurante ) => {

    const {nombre, contrasena, correo, representante, telefono, direccion, horario, logo, fachada, cuentaBancaria, alcance, activo} = restaurante

    let restCorreo = verificarCorreo(correo)
    var restTelefono = verificarTelefono(telefono)
    let restCuentaBancaria = verificarCuentaBancaria(cuentaBancaria)
 
    if(restCorreo){

        if (!restTelefono){
            return "Telefono inválido"
        } 
        
        if (!restCuentaBancaria){
            return "Número de cuenta inválido"
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
                                    horario,
                                    logo,
                                    fachada,
                                    cuentaBancaria,
                                    alcance,
                                    activo
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

const sesion = async( credencial ) => {

    let restaurante = await Restaurante.findOne({
        where: {
            correo: credencial.correo,
        }
    })

    let verificarSesionRestaurante = await verificarContrasenaHash( credencial.contrasena , restaurante.contrasena )

    if (verificarSesionRestaurante){
        return restaurante
    }else{
        return 'Existe un error en el correo o contraseña'
    }
}

const todosRestaurantes = async( ) => {

    let restaurante = await Restaurante.findAll()
    return restaurante
}

module.exports={registro, todosRestaurantes, sesion};