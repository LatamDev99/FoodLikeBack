const {
    CategoriaPlatillo,
    Restaurante,
    Platillo
} = require("../db.js")
const { getPlatillos } = require("./platilloController.js")

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

const eliminandoCategoria = async ( id ) =>{
  
  try {
    await Platillo.destroy({
      where: {
        CategoriaPlatilloId: id
      }
    });

    await CategoriaPlatillo.destroy({
      where: {
        id
      }
    });
    
    return true
  } catch (error) {
    console.error('Error al eliminar la categoría y platillos:', error);
    throw error; 
  }
};

const cambiarCategoriaNombre = async( data ) =>{ 
  const {idCategoria, nuevoNombre} = data

    let clienteActualizado = await CategoriaPlatillo.findOne({
      where: {
          id: idCategoria
      }
    })
    clienteActualizado.nombre = nuevoNombre;
    clienteActualizado.value = nuevoNombre;
    clienteActualizado.label = nuevoNombre;
    await clienteActualizado.save();
}

const traerCategoriasPlatillos = async (dato) => {
  const { id: restauranteId } = dato; 
  try {

    let restaurante = await Restaurante.findAll({
      where: { id: restauranteId },
      include:
              CategoriaPlatillo     
  })

  const categoriaPlatilloIds = restaurante[0].CategoriaPlatillos.map(item => item.CategoriasP.CategoriaPlatilloId);

  const data =   getPlatillos(categoriaPlatilloIds)
  
  return data

  } catch (error) {
    console.error('Error al obtener las categorías de platillos:', error);
    throw error;
  }
};



module.exports = { agregarCategorias, traerCategorias, cambiarCategoriaPlatillo, eliminandoCategoria,cambiarCategoriaNombre, traerCategoriasPlatillos} 