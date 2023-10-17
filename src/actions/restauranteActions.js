const bcrypt = require("bcrypt")



const crearContrasenaHash =  async (  contrasena  ) =>   {
    const rounds = 8;
    const passwordHash = await bcrypt.hash( contrasena, rounds  );

    return passwordHash
}

const verificarContrasenaHash = async (  contrasena , contrasenaHash  ) =>   {

    const passwordHash = await bcrypt.compare(  contrasena, contrasenaHash)

    return passwordHash
}


const verificarCorreo = (  correo  ) => {

    var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  
    var esValido = expReg.test(correo)
    
    return esValido  
  }

const verificarTelefono = ( telefono ) =>{

    var expReg1 = /^(\(?(\+51)\)?)?(9)(\d{8})$/gm
    var expReg2 = /^(\(?(\01)\)?)?(4|5|6|7)(\d{6})$/gm

    if(telefono.length === 9){
        var esValido = expReg1.test(telefono)

        return esValido
    }

    if(telefono.length === 7){
        var esValido = expReg2.test(telefono)

        return esValido
    }

}

module.exports= {
    crearContrasenaHash,
    verificarContrasenaHash,
    verificarCorreo,
    verificarTelefono
}