const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const crearCategoriasBase = require("./src/TestData/CrearCategoriaR.js")

// Syncing all the models at once.
conn.sync({ force: true }).then(async() => {
  await crearCategoriasBase();  
  server.listen(3001, () => {
    console.log('%s listening at 3001'); 
  });
});