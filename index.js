const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const crearCategoriasBase = require("./src/TestData/CrearCategoriaR.js")
const crearClientesPrueba = require("./src/TestData/CrearC.js");
const crearRestaurantesBase = require('./src/TestData/Restaurante/CrearRestaurantes.js');
const platilloPruebas = require('./src/TestData/Restaurante/CrearPlatillos.js');

const categoriasPrueba = require('./src/TestData/Restaurante/CrearCategoriasPlatillos.js');
    

conn.sync({ force: true }).then(async() => {
  
  await crearRestaurantesBase();    
  await crearCategoriasBase(); 
  await crearClientesPrueba(); 
  await categoriasPrueba()
  await platilloPruebas()

  server.listen(3001, () => {
    console.log('%s listening at 3001'); 
  });
});