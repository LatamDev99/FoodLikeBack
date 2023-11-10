const restaurantes = require("./Restaurantes.json")
const {registro} = require("../controllers/restauranteController")
const { traerCategorias } = require("../controllers/categoriaRestauranteController")

const crearRsDePrueba = async() => {
    const categoriasArray = await traerCategorias();
    for (let i = 0; i < restaurantes.length; i++) {
        const {nombre, contrasena, correo, representante, telefono, direccion, categorias} = restaurantes[i]
        for (let index = 0; index < 3; index++) {
            const categoria = categoriasArray[Math.floor(Math.random() * categoriasArray.length)]
           categorias.push(categoria.id)            
        }
        let rs = {
            nombre: nombre,
            contrasena: contrasena,
            correo: correo,
            representante: representante,
            telefono: telefono,
            direccion: direccion,
            categorias: categorias
        }
        // console.log(rs);
        await registro(rs)
    }
    return "ok"
}

module.exports = crearRsDePrueba