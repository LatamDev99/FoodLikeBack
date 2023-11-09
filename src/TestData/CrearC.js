const clientes = require("./Clientes.json")
const {registro} = require("../controllers/clienteController")
const { traerCategorias } = require("../controllers/categoriaRestauranteController")

const crearClientesPrueba = async () => {
    try {
        const categoriasArray = await traerCategorias();
        for (let i = 0; i < clientes.length; i++) {
            const {nombre, contrasena, correo, telefono, preferencias} = clientes[i]
            for (let index = 0; index < 3; index++) {
                const categoria = categoriasArray[Math.floor(Math.random() * categoriasArray.length)]
                preferencias.push(categoria.id)            
            }
            let cliente = {
                nombre: nombre,
                contrasena: contrasena,
                correo: correo,
                telefono: telefono,
                preferencias: preferencias
            }
            // console.log(rs);
            await registro(cliente)
        } 
    } catch (error) {
        console.log(error);
    }
}

module.exports = crearClientesPrueba