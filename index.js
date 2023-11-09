const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const crearCategoriasBase = require("./src/TestData/CrearCategoriaR.js")
const crearRsDePrueba = require("./src/TestData/CrearR.js")
const crearClientesPrueba = require("./src/TestData/CrearC.js")

// Syncing all the models at once.
conn.sync({ force: true }).then(async() => {
  await crearCategoriasBase();  
  await crearRsDePrueba();
  await crearClientesPrueba();
  server.listen(3001, () => {
    console.log('%s listening at 3001'); 
  });
});