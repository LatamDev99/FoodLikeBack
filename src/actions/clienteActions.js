const bcrypt = require("bcrypt")
const { Cliente, TokenContrasena } = require("../db.js")
const crypto = require("crypto");

/*
Funcion para evitar registro duplicado
*/
const verificarDuplicado = async (  correo  ) => {
    let duplicado = await Cliente.findOne({
        where: {
            correo: correo
        }
    })
    if(duplicado){
        return true
    } else {
        return false
    }
}
/*
Funcion para validar password valida, por lo menos 1 numero, 1 letra mayuscula, no se aceptan caracteres especiales, resive la contraseña por parametro
*/
const verificarContrasenaValida = (  contrasena  ) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    if (!regex.test(contrasena)) {
        return false
    }
    return true
}

/*
Funcion para hashear la contraseña, resive la contraseña por parametro
*/
const crearContrasenaHash =  async (  contrasena  ) =>   {
    const rounds = 8;
    const passwordHash = await bcrypt.hash( contrasena, rounds  );

    return passwordHash
}
/*
Funcion para comparar la contraseña hasheada, resive la contraseña ingresada y la contraseña guardada en la DB por parametro
*/
const verificarContrasenaHash = async (  contrasena , contrasenaHash  ) =>   {

    const passwordHash = await bcrypt.compare(  contrasena, contrasenaHash)

    return passwordHash
}
/*
Funcion para validar que sea correo valido
*/
const verificarCorreo = (  correo  ) => {

    var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  
    var esValido = expReg.test(correo)
    
    return esValido  
}
/*
Funcion para validar numero telefonico valido
*/
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

const tokenDb = async (cliente) => {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 2);   
    const tokenDb = crypto.randomBytes(64).toString('hex')
    console.log(tokenDb);
    const tokenInfo = {
        token : tokenDb,
        vence : currentDate
    }
    const newToken = await TokenContrasena.create(tokenInfo)
    if(!newToken) return 409
    await cliente.addTokenContrasena(newToken);

    return tokenDb;

}   

module.exports= {
    crearContrasenaHash,
    verificarContrasenaHash,
    verificarCorreo,
    verificarTelefono,
    verificarDuplicado,
    verificarContrasenaValida,
    tokenDb
}