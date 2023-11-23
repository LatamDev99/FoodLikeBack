const { Platillo, CategoriaPlatillo } = require("../../db")

const categoriasPlatillos = require("./Jsons/Platillos.json")


const platilloPruebas = async () => {

    const categoriaPlatillos = await CategoriaPlatillo.findAll();

    const idsPlatillos = categoriaPlatillos.map(restaurante => restaurante.id);

    for (let i = 0; i < idsPlatillos.length; i++) {
        const restauranteId = idsPlatillos[i];

        for (let j = 0; j < categoriasPlatillos.length; j++) {
          const categoriaPlatillo = categoriasPlatillos[j];
           const { nombre, descripcion, precio, foto, promo, stock } = categoriaPlatillo
          let obj = {
            categoriaId : restauranteId ,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            foto: foto,
            promo: promo,
            stock: stock
          }
          await crearPlatillo(obj);
        }
      }
}




const crearPlatillo = async ( platillo ) => {
   
    const { categoriaId, nombre, descripcion, precio, foto, promo ,stock } = platillo

    const infoPlatillo = {
            nombre,
            descripcion,
            precio,
            foto,
            promo,
            stock   
        }
  
        const categoria = await CategoriaPlatillo.findByPk(categoriaId)        
        const nuevoPlatillo = await Platillo.create(infoPlatillo);
        await categoria.addPlatillo(nuevoPlatillo)

        return true
}


module.exports = platilloPruebas