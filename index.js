const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const crearCategoriasBase = require("./src/TestData/CrearCategoriaR.js")
const crearRsDePrueba = require("./src/TestData/CrearR.js")
const crearClientesPrueba = require("./src/TestData/CrearC.js");
const crearRestaurantesBase = require('./src/TestData/CrearRestaurantes.js');


// Syncing all the models at once.
conn.sync({ force: true }).then(async() => {
  crearRestaurantesBase();
  await crearCategoriasBase();  
  await crearClientesPrueba();
  server.listen(3001, () => {
    console.log('%s listening at 3001'); 
  });
});