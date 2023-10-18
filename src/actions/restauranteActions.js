const bcrypt = require("bcrypt")

/*
Funcion para hashear la contraseña, tiene la contraseña la contraseña por parametro
*/
const crearContrasenaHash =  async (  contrasena  ) =>   {
    const rounds = 8;
    const passwordHash = await bcrypt.hash( contrasena, rounds  );
    return passwordHash
}

/*
Funcion para vericar la contraseña, tiene la contraseña la contraseña como parametro
*/

const verificarContrasenaHash = async (  contrasena , contrasenaHash  ) =>   {

    const passwordHash = await bcrypt.compare(  contrasena, contrasenaHash)

    return passwordHash
}

/*
Funcion para verificar el correo, tiene el correo como parámetro
*/

const verificarCorreo = (  correo  ) => {

    var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  
    var esValido = expReg.test(correo)    
    return esValido  
}

/*
Funcion para verificar el teléfono, tiene el teléfono como parámetro
*/

const verificarTelefono = ( telefono ) =>{

    var reglasCelular = /^(\(?(\+51)\)?)?(9)(\d{8})$/gm
    var reglasTelefono = /^(\(?(\01)\)?)?(4|5|6|7)(\d{6})$/gm

    if(telefono.length === 9){
        var esValido = reglasCelular.test(telefono)
        return esValido
    }

    if(telefono.length === 7){
        var esValido = reglasTelefono.test(telefono)
        return esValido
    }
}

/*
Funcion para verificar cuenta bancaria, tiene cuenta bancaria como parámetro
*/


const verificarCuentaBancaria = (   cuentaBancaria  ) =>{

    if(cuentaBancaria.length===14)    
    return true
    else
    return false
}

module.exports= {
    crearContrasenaHash,
    verificarContrasenaHash,
    verificarCorreo,
    verificarTelefono,
    verificarCuentaBancaria
}