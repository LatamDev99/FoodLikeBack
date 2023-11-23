const categoriasPlatillos = require("./Jsons/CategoriaPlatillo.json")

const { Restaurante, CategoriaPlatillo } = require("../../db.js")

const categoriasPrueba =  async( ) =>{

    const restaurantes = await Restaurante.findAll();
    const idsRestaurantes = restaurantes.map(restaurante => restaurante.id);

    for (let i = 0; i < idsRestaurantes.length; i++) {
        const restauranteId = idsRestaurantes[i];

        for (let j = 0; j < categoriasPlatillos.length; j++) {
          const categoriaPlatillo = categoriasPlatillos[j];
           const { nombre } = categoriaPlatillo
          let obj = {
            idRestaurante : restauranteId ,
            nombre: nombre,
          }
          await addCategoria(obj);
        }
      }

}

const addCategoria = async( categoria ) =>{

    const { nombre, idRestaurante } = categoria

    const categoriasAgregadas= {
        nombre: nombre,
        value: nombre,
        label: nombre
    }
        const nuevaCategoria = await CategoriaPlatillo.create(categoriasAgregadas)
        await nuevaCategoria.addRestaurante(idRestaurante)

        return nuevaCategoria   
}

module.exports = categoriasPrueba;