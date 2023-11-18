const {
    CategoriaPlatillo,
    Restaurante,
    Platillo
} = require("../db.js")

const agregarCategorias = async( categoria ) =>{

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


const cambiarCategoriaPlatillo = async (data) => {
    try {
      const { idPlatillo, idCategoriaEntrante} = data;
  
      const platillo = await Platillo.findByPk(idPlatillo);

      const categoriaEntrante = await CategoriaPlatillo.findByPk(idCategoriaEntrante);

      if (!platillo || !categoriaEntrante ) {
        throw new Error("No se encontró el platillo o las categorías especificadas");
      }
  
      await platillo.update({ CategoriaPlatilloId: idCategoriaEntrante });
  
      console.log("Categoría del platillo cambiada exitosamente.");
    } catch (error) {
      console.error("Error al cambiar la categoría del platillo:", error.message);
    }
  };
  



const traerCategorias = async() =>{
    let categoria = await CategoriaPlatillo.findAll({
        include:  Restaurante}
        )
    return categoria
}
module.exports = { agregarCategorias, traerCategorias, cambiarCategoriaPlatillo } 