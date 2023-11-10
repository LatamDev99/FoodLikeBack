const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const crearCategoriasBase = require("./src/TestData/CrearCategoriaR.js");
const crearRestaurantesBase = require('./src/TestData/CrearRestaurantes.js');


// Syncing all the models at once.
conn.sync({ force: true }).then(async() => {
  await crearCategoriasBase();  
  await crearRestaurantesBase()
  server.listen(3001, () => {
    console.log('%s listening at 3001'); 
  });
});