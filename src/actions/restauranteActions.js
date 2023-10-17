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

module.exports= {
    crearContrasenaHash,
    verificarContrasenaHash
}