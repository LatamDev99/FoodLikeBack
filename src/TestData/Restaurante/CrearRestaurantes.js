const restaurantes = require("./Jsons/Restaurantes.json")
const { sequelize } = require("../../db.js");

const { Restaurante, CategoriaRestaurante } = require("../../db.js")
const { crearContrasenaHash } = require("../../actions/restauranteActions.js")

const pruebaRegistro = async( restaurante) => {
    const {nombre, contrasena, correo, representante, telefono, direccion, activo, categorias, horario, logo, fachada, cuentaBancaria, alcance} = restaurante
          
            const a = await crearContrasenaHash(contrasena)

            let objetoRestaurante = {nombre, 
                                    correo, 
                                    contrasena: a,
                                    representante,
                                    telefono,
                                    direccion,
                                    activo,
                                    horario,
                                    logo,
                                    fachada,    
                                    cuentaBancaria,
                                    categorias,
                                    alcance
                                    }  

        const rest =   await Restaurante.create(objetoRestaurante) 
        
        for (let i = 0; i < 4; i++) {
            const categoriaAleatoria = await CategoriaRestaurante.findOne({
                order: sequelize.random(),
              });
              await rest.addCategoriaRestaurante(categoriaAleatoria)            
        }            
    return true
}

const crearRestaurantesBase = async() => {
    for (let i = 0; i < restaurantes.length; i++) {
        pruebaRegistro(restaurantes[i])
    }
    return "ok"
}

module.exports = crearRestaurantesBase